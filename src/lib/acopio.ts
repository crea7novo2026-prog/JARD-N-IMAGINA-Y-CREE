import { catalogoEfectivo } from "./catalogo-especies";

export function repartirTexto(texto: string) {
  const bruto = texto.replace(/\s+/g, " ").trim();
  if (bruto.length < 12) return [] as { especieId: string; extracto: string }[];
  const bajo = bruto.toLowerCase();
  const hits: { especieId: string; extracto: string }[] = [];
  for (const e of catalogoEfectivo()) {
    const nombres = [e.nombreComun, e.nombreCientifico, e.id.replace(/-/g, " ")].filter(Boolean);
    const pego = nombres.some((n) => n.length > 3 && bajo.includes(n.toLowerCase()));
    if (!pego) continue;
    const clave = e.nombreComun;
    const i = bajo.indexOf(clave.toLowerCase());
    const desde = i >= 0 ? Math.max(0, i - 80) : 0;
    const extracto = bruto.slice(desde, desde + 420).trim();
    hits.push({ especieId: e.id, extracto: extracto || bruto.slice(0, 420) });
  }
  return hits;
}

export function esPdf(archivo: File) {
  return archivo.type === "application/pdf" || /\.pdf$/i.test(archivo.name);
}

export async function leerArchivoComoTexto(
  archivo: File,
  onPaso?: (aviso: string) => void,
): Promise<string> {
  const liviano =
    archivo.type.startsWith("text/") ||
    /\.(txt|csv|md|json|html)$/i.test(archivo.name);
  if (liviano) return archivo.text();
  if (esPdf(archivo)) return leerPdfConOcr(archivo, onPaso);
  if (archivo.type.startsWith("image/")) {
    onPaso?.("Leyendo la imagen con OCR…");
    return ocrLienzo(await bitmapACanvas(archivo));
  }
  return "";
}

async function bitmapACanvas(archivo: File) {
  const bmp = await createImageBitmap(archivo);
  const lienzo = document.createElement("canvas");
  const max = 1400;
  const escala = Math.min(1, max / Math.max(bmp.width, bmp.height));
  lienzo.width = Math.max(1, Math.round(bmp.width * escala));
  lienzo.height = Math.max(1, Math.round(bmp.height * escala));
  const ctx = lienzo.getContext("2d");
  if (!ctx) throw new Error("Sin lienzo");
  ctx.drawImage(bmp, 0, 0, lienzo.width, lienzo.height);
  return lienzo;
}

export async function leerPdfConOcr(archivo: File, onPaso?: (aviso: string) => void) {
  onPaso?.("Abriendo el PDF…");
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();
  const data = new Uint8Array(await archivo.arrayBuffer());
  const doc = await pdfjs.getDocument({ data }).promise;
  const tope = Math.min(doc.numPages, 8);
  const partes: string[] = [];
  for (let i = 1; i <= tope; i += 1) {
    onPaso?.(`Página ${i} de ${tope}…`);
    const page = await doc.getPage(i);
    const texto = await textoDePagina(page as never);
    if (texto.replace(/\s+/g, "").length > 40) {
      partes.push(texto);
      continue;
    }
    onPaso?.(`OCR en página ${i}…`);
    const lienzo = await paginaACanvas(page as never);
    partes.push(await ocrLienzo(lienzo));
  }
  return partes.join("\n\n").trim();
}

async function textoDePagina(page: { getTextContent: () => Promise<{ items: unknown[] }> }) {
  const contenido = await page.getTextContent();
  return contenido.items
    .map((item) => (typeof item === "object" && item && "str" in item ? String(item.str) : ""))
    .join(" ");
}

async function paginaACanvas(page: {
  getViewport: (opts: { scale: number }) => { width: number; height: number };
  render: (opts: Record<string, unknown>) => { promise: Promise<void> };
}) {
  const viewport = page.getViewport({ scale: 1.6 });
  const lienzo = document.createElement("canvas");
  lienzo.width = Math.ceil(viewport.width);
  lienzo.height = Math.ceil(viewport.height);
  const ctx = lienzo.getContext("2d");
  if (!ctx) throw new Error("Sin lienzo");
  await page.render({ canvasContext: ctx, canvas: lienzo, viewport }).promise;
  return lienzo;
}

async function ocrLienzo(lienzo: HTMLCanvasElement) {
  const { createWorker } = await import("tesseract.js");
  let worker: Awaited<ReturnType<typeof createWorker>> | undefined;
  try {
    worker = await createWorker("spa+eng");
  } catch {
    worker = await createWorker("eng");
  }
  try {
    const { data } = await worker.recognize(lienzo);
    return data.text.trim();
  } finally {
    await worker.terminate();
  }
}
