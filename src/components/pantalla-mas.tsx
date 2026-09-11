import { Link } from "@tanstack/react-router";
import { BookOpen, Bug, ClipboardList, LogOut, MessagesSquare, PenLine, Settings2, Store } from "lucide-react";
import { useJardin } from "@/lib/almacen";
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
    texto: "Sesión, código de cliente y plan.",
    icono: Settings2,
  },
] as const;

export function PantallaMas() {
  const setAjustes = useJardin((s) => s.setAjustes);
  const correo = useJardin((s) => s.ajustes.correoCliente);

  function cerrarSesion() {
    setAjustes({
      correoCliente: "",
      telefonoCliente: "",
      clienteListo: false,
      demoPro: false,
    });
  }

  return (
    <main className="px-5 pb-8 pt-8">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-silenciado">Más</p>
      <h1 className="mt-1 text-2xl font-semibold leading-tight">{APP_NAME}</h1>
      <p className="mt-2 text-sm text-silenciado">{APP_FRASE}</p>

      <button
        type="button"
        onClick={cerrarSesion}
        className="mt-5 flex min-h-16 w-full items-center gap-3 rounded-xl bg-luna px-4 text-left text-fondo"
      >
        <LogOut className="size-5" />
        <span>
          <span className="block text-sm font-semibold">Cerrar sesión</span>
          <span className="block text-xs opacity-80">
            {correo.includes("@") ? correo : "Volver a pedir nombre, correo y teléfono"}
          </span>
        </span>
      </button>

      <ul className="mt-4 space-y-2">
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
