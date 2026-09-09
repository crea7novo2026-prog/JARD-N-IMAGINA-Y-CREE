const ANCHO_MAX = 720;
const CALIDAD = 0.72;

export function comprimirFoto(archivo: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onerror = () => reject(new Error("No se pudo leer la foto"));
    lector.onload = () => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const escala = Math.min(1, ANCHO_MAX / img.width);
        const w = Math.max(1, Math.round(img.width * escala));
        const h = Math.max(1, Math.round(img.height * escala));
        const lienzo = document.createElement("canvas");
        lienzo.width = w;
        lienzo.height = h;
        const ctx = lienzo.getContext("2d");
        if (!ctx) {
          reject(new Error("Sin lienzo"));
          return;
        }
        ctx.fillStyle = "#16241B";
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        resolve(lienzo.toDataURL("image/jpeg", CALIDAD));
      };
      img.onerror = () => reject(new Error("Imagen no válida"));
      img.src = String(lector.result);
    };
    lector.readAsDataURL(archivo);
  });
}
