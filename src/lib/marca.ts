export const APP_NAME = "El Diario de las Bitácoras del Jardín y Luna";
export const APP_CORTO = "Diario y Luna";
export const APP_FRASE = "El diario de tu jardín, unido por la luna y la bitácora.";
export const VIVERO_NOMBRE = "ABBA ROSEUS CLERODENDRUM VIVEROS";
export const SALA_VIVERO = "ABBA-ROSEUS";
export const SALA_COMUNIDAD = "ABBA-ROSEUS";
export const CLAVE_AUTOR_DEFECTO = "LUNA-DIARIO";
export const CORREO_AUTOR = "crea.7novo2026@gmail.com";
export const WHATSAPP_VENTA_URL = "https://tinyurl.com/ViverosChat";

export function codigoClienteDeCorreo(correo: string) {
  const slug = correo.trim().toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 24);
  return `CLI-${slug.slice(0, 8).toUpperCase()}`;
}

export function enlaceWhatsAppPedido(opts: {
  titulo: string;
  precio: string;
  cliente?: string;
  cantidad?: string | number;
  contacto?: string;
  cuando?: string;
  nota?: string;
  verbo?: "comprar" | "contratar";
}) {
  const quien = opts.cliente?.trim() || "un cliente";
  const n = Number(opts.cantidad) || 1;
  const verbo = opts.verbo ?? "comprar";
  let texto = `Hola, quiero ${verbo} ${opts.titulo} (${opts.precio}). Soy ${quien} de Diario y Luna. Cantidad: ${n}.`;
  if (opts.contacto?.trim()) texto += ` Mi contacto: ${opts.contacto.trim()}.`;
  if (opts.cuando?.trim()) texto += ` Fecha: ${opts.cuando.trim()}.`;
  if (opts.nota?.trim()) texto += ` Nota: ${opts.nota.trim()}`;
  return `https://api.whatsapp.com/send/?phone=50578503734&text=${encodeURIComponent(texto)}&type=phone_number&app_absent=0`;
}
