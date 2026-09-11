import { Link, useRouterState } from "@tanstack/react-router";
import { Leaf, MoonStar, MoreHorizontal, Store, SunMedium } from "lucide-react";
import { useEffect } from "react";
import { useJardin } from "@/lib/almacen";
import { Avisador } from "@/components/avisador";
import { ConfirmadorPago } from "@/components/confirmador-pago";
import { ConsultorPro } from "@/components/consultor-pro";
import { PuertaCliente } from "@/components/puerta-cliente";
import { Sincronizador } from "@/components/sincronizador";
import { SincronizadorVivero } from "@/components/sincronizador-vivero";
import { cn } from "@/lib/utils";

const PESTANAS = [
  { to: "/", etiqueta: "Hoy", icono: SunMedium },
  { to: "/jardin", etiqueta: "Jardín", icono: Leaf },
  { to: "/vivero", etiqueta: "Oferta", icono: Store },
  { to: "/luna", etiqueta: "Luna", icono: MoonStar },
  { to: "/mas", etiqueta: "Más", icono: MoreHorizontal },
] as const;

export function Cascaron({ children }: { children: React.ReactNode }) {
  const hidratar = useJardin((s) => s.hidratar);
  const ajustes = useJardin((s) => s.ajustes);
  const ruta = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    void useJardin.persist.rehydrate();
    hidratar();
  }, [hidratar]);

  return (
    <div className="lienzo-app">
      <div className="marco-app">
        {!(ajustes.correoCliente.includes("@") && (ajustes.telefonoCliente || "").replace(/\D/g, "").length >= 6) ? (
          <PuertaCliente />
        ) : (
          <>
            <nav
              className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 border-t border-borde bg-superficie/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md min-[900px]:static min-[900px]:max-w-none min-[900px]:translate-x-0 min-[900px]:border-r min-[900px]:border-t-0 min-[900px]:bg-superficie"
              aria-label="Principal"
            >
              <ul className="grid grid-cols-5 min-[900px]:flex min-[900px]:h-full min-[900px]:flex-col min-[900px]:gap-2 min-[900px]:p-3">
                {PESTANAS.map((p) => {
                  const activa =
                    p.to === "/"
                      ? ruta === "/" || ruta === "/vivero"
                      : ruta === p.to || ruta.startsWith(p.to + "/");
                  const Icono = p.icono;
                  return (
                    <li key={p.to}>
                      <Link
                        to={p.to}
                        className={cn(
                          "flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px] font-medium min-[900px]:min-h-16 min-[900px]:rounded-lg",
                          activa ? "text-luna" : "text-silenciado",
                        )}
                      >
                        <Icono className="size-5" strokeWidth={activa ? 2.2 : 1.7} />
                        {p.etiqueta}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="min-h-dvh pb-20 min-[900px]:pb-0">
              <Sincronizador />
              <SincronizadorVivero />
              <Avisador />
              <ConfirmadorPago />
              <ConsultorPro />
              {children}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
