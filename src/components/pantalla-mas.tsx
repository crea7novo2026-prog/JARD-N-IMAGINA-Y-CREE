import { Link } from "@tanstack/react-router";
import { BookOpen, Bug, ClipboardList, MessagesSquare, PenLine, Settings2, Store } from "lucide-react";
import { APP_FRASE, APP_NAME } from "@/lib/marca";

const ITEMS = [
  {
    to: "/",
    titulo: "Hoy",
    texto: "Vivero, luna, riego y lo que pide el patio.",
    icono: ClipboardList,
  },
  {
    to: "/plagas",
    titulo: "Plagas",
    texto: "Signos, temporada y tratamiento responsable.",
    icono: Bug,
  },
  {
    to: "/vivero",
    titulo: "Vivero en línea",
    texto: "ABBA ROSEUS CLERODENDRUM. Mosaico con foto y precio.",
    icono: Store,
  },
  {
    to: "/comunidad",
    titulo: "Comunidad en línea",
    texto: "Chat libre. Preguntas y consejos.",
    icono: MessagesSquare,
  },
  {
    to: "/bitacora",
    titulo: "Diario de la comunidad",
    texto: "Notas que ve quien comparte el código del jardín.",
    icono: ClipboardList,
  },
  {
    to: "/autor",
    titulo: "Taller del autor",
    texto: "Mantenimiento. Solo con tu clave.",
    icono: PenLine,
  },
  {
    to: "/catalogo",
    titulo: "Catálogo",
    texto: "Especies de casa y huerto latinoamericano.",
    icono: BookOpen,
  },
  {
    to: "/ajustes",
    titulo: "Ajustes",
    texto: "15 plantas de cortesía, luego $2 / $20. Código y autor.",
    icono: Settings2,
  },
] as const;

export function PantallaMas() {
  return (
    <main className="px-5 pb-8 pt-8">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-silenciado">Más</p>
      <h1 className="mt-1 text-2xl font-semibold leading-tight">{APP_NAME}</h1>
      <p className="mt-2 text-sm text-silenciado">{APP_FRASE}</p>
      <ul className="mt-6 space-y-2">
        {ITEMS.map((it) => {
          const Icono = it.icono;
          return (
            <li key={it.to}>
              <Link
                to={it.to}
                className="flex min-h-16 items-center gap-3 rounded-xl bg-superficie px-4"
              >
                <Icono className="size-5 text-luna" />
                <span>
                  <span className="block text-sm font-medium">{it.titulo}</span>
                  <span className="block text-xs text-silenciado">{it.texto}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
