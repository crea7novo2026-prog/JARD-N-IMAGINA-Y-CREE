import { CORREO_AUTOR } from "./marca";

type Fila = {
  correo: string;
  pais: string;
  telefono: string;
  nombre: string;
  creado_en: string;
};

function limpio(s: string) {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[()\\]/g, " ")
    .replace(/[^\x20-\x7E]/g, " ");
}

export function descargarPdfClientes(items: Fila[]) {
  const encabezado = "Base de clientes — Diario y Luna (solo el autor)";
  const filas = items.length
    ? items.map((c, i) => {
        const fecha = (c.creado_en || "").slice(0, 10);
        return `${i + 1}. ${c.nombre || "Sin nombre"}  |  ${c.correo}  |  +${c.pais} ${c.telefono}  |  ${fecha}`;
      })
    : ["Aun no hay clientes registrados."];
  const lineas = [encabezado, `Total: ${items.length}`, "", ...filas];
  const contenido = lineas.map((l, i) => `BT /F1 11 Tf 40 ${780 - i * 16} Td (${limpio(l)}) Tj ET`).join("\n");
  const stream = contenido;
  const objs = [
    "1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj",
    "2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj",
    `3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj`,
    `4 0 obj << /Length ${stream.length} >> stream\n${stream}\nendstream endobj`,
    "5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj",
  ];
  let cuerpo = "%PDF-1.4\n";
  const offsets = [0];
  for (const o of objs) {
    offsets.push(cuerpo.length);
    cuerpo += o + "\n";
  }
  const xrefAt = cuerpo.length;
  cuerpo += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= objs.length; i += 1) {
    cuerpo += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  cuerpo += `trailer << /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xrefAt}\n%%EOF`;
  const blob = new Blob([cuerpo], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `clientes-diario-luna-${new Date().toISOString().slice(0, 10)}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
}

export function mailtoCambioClave() {
  const asunto = encodeURIComponent("Cambio de clave de autor — Diario y Luna");
  const cuerpo = encodeURIComponent(
    "Soy el autor de Diario y Luna.\nQuiero cambiar la clave del taller.\nClave actual (si la recuerdo):\nClave nueva que deseo:\nFecha:",
  );
  return `mailto:${CORREO_AUTOR}?subject=${asunto}&body=${cuerpo}`;
}
