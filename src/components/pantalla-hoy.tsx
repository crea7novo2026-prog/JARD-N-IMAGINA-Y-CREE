import { Link } from "@tanstack/react-router";
import { Droplets, Leaf, Plus } from "lucide-react";
import { useMemo } from "react";
import { useJardin } from "@/lib/almacen";
import { consejoLunarPara, diasHasta, proximoRiego, tareasDelDia } from "@/lib/cuidados";
import { infoLunar } from "@/lib/luna";
import { especiePorId } from "@/lib/catalogo-especies";
import { BarraDemo } from "./barra-demo";
import { MarcadorFoto } from "./marcador-foto";

export function PantallaHoy() {
  const plantas = useJardin((s) => s.plantas);
  const bitacora = useJardin((s) => s.bitacora);
  const nombre = useJardin((s) => s.ajustes.nombreMostrar);
  const registrar = useJardin((s) => s.registrar);
  const actualizar = useJardin((s) => s.actualizarPlanta);

  const luna = useMemo(() => infoLunar(new Date()), []);
  const tareas = useMemo(() => tareasDelDia(plantas, bitacora, new Date()), [plantas, bitacora]);
  const fechaLarga = new Date().toLocaleDateString("es-NI", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <main className="px-5 pb-8 pt-8">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-silenciado">Patio de hoy</p>
      <h1 className="mt-1 text-xl font-semibold capitalize">{fechaLarga}</h1>
      {nombre ? (
        <p className="mt-1 text-sm text-silenciado">Hola, {nombre}. Esto es lo que pide el patio.</p>
      ) : (
        <p className="mt-1 text-sm text-silenciado">Hoy en el diario del jardín y la luna.</p>
      )}

      <div className="mt-5">
        <BarraDemo />
      </div>

      <section className="mt-6 overflow-hidden rounded-xl bg-superficie p-5 shadow-suave">
        <p className="text-xs uppercase tracking-[0.16em] text-hoja">Fase lunar</p>
        <h2 className="mt-1 font-serif text-3xl italic text-luna">{luna.etiqueta}</h2>
        <p className="mt-2 text-sm leading-relaxed text-texto">{luna.consejo}</p>
        <p className="mt-2 text-xs text-silenciado">{luna.tradicion}</p>
        <p className="mt-3 text-[11px] leading-relaxed text-silenciado/90">
          La luna aquí es tradición de jardinería más calendario práctico. Complementa lo que ves en la
          hoja; no la sustituye.
        </p>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-superficie-2">
          <div
            className="h-full rounded-full bg-luna"
            style={{ width: `${Math.round(luna.iluminacion * 100)}%` }}
          />
        </div>
        <p className="mt-1 text-right text-[11px] text-silenciado">
          {Math.round(luna.iluminacion * 100)}% iluminada
        </p>
      </section>

      {!plantas.length ? (
        <section className="mt-6 rounded-xl border border-borde bg-superficie p-6 text-center">
          <Leaf className="mx-auto size-8 text-hoja" />
          <h2 className="mt-3 text-lg font-semibold">Tu jardín empieza con una foto</h2>
          <p className="mt-2 text-sm text-silenciado">
            Agrega hasta 15 plantas gratis. Comprueba riego, foto y luna con las tuyas. La 16 pide pago.
          </p>
          <Link
            to="/agregar"
            className="mt-5 inline-flex h-12 items-center justify-center rounded-lg bg-luna px-5 text-sm font-semibold text-fondo"
          >
            Agregar primera planta
          </Link>
        </section>
      ) : (
        <>
          <section className="mt-6">
            <div className="flex items-end justify-between">
              <h2 className="text-sm font-semibold">Pendiente</h2>
              <Link to="/agregar" className="flex items-center gap-1 text-xs font-medium text-luna">
                <Plus className="size-3.5" /> Planta
              </Link>
            </div>
            <ul className="mt-3 space-y-2">
              {tareas.slice(0, 8).map((t, i) => (
                <li key={t.planta.id + t.clase + i} className="rounded-xl bg-superficie p-4">
                  <div className="flex gap-3">
                    <MarcadorFoto src={t.planta.fotoDataUrl} alt="" className="size-14 shrink-0 rounded-md" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{t.titulo}</p>
                      <p className="mt-0.5 text-xs text-silenciado">{t.detalle}</p>
                      {t.clase === "regar" && diasHasta(proximoRiego(t.planta, t.especie)) <= 0 && (
                        <button
                          type="button"
                          className="mt-3 inline-flex h-10 items-center gap-1.5 rounded-md bg-superficie-2 px-3 text-xs font-medium text-ok active:bg-luna active:text-fondo"
                          onClick={() => {
                            const iso = new Date().toISOString();
                            actualizar(t.planta.id, { ultimoRiego: iso });
                            registrar({
                              plantaId: t.planta.id,
                              fechaIso: iso,
                              tipo: "riego",
                              titulo: `Riego · ${t.planta.apodo}`,
                              nota: "Marcado desde Hoy.",
                            });
                          }}
                        >
                          <Droplets className="size-3.5" />
                          Ya la regué
                        </button>
                      )}
                      {t.clase === "fertilizar" && (
                        <button
                          type="button"
                          className="mt-3 inline-flex h-10 items-center gap-1.5 rounded-md bg-superficie-2 px-3 text-xs font-medium active:bg-luna active:text-fondo"
                          onClick={() => {
                            const iso = new Date().toISOString();
                            actualizar(t.planta.id, { ultimoFertilizante: iso });
                            registrar({
                              plantaId: t.planta.id,
                              fechaIso: iso,
                              tipo: "fertilizante",
                              titulo: `Abono · ${t.planta.apodo}`,
                              nota: "Marcado desde Hoy.",
                            });
                          }}
                        >
                          Ya la nutrí
                        </button>
                      )}
                      {t.clase === "luna" && (
                        <button
                          type="button"
                          className="mt-3 inline-flex h-10 items-center gap-1.5 rounded-md bg-superficie-2 px-3 text-xs font-medium active:bg-luna active:text-fondo"
                          onClick={() => {
                            const iso = new Date().toISOString();
                            actualizar(t.planta.id, { ultimaPoda: iso });
                            registrar({
                              plantaId: t.planta.id,
                              fechaIso: iso,
                              tipo: "poda",
                              titulo: `Poda · ${t.planta.apodo}`,
                              nota: "Marcado desde Hoy.",
                            });
                          }}
                        >
                          Ya la podé
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-sm font-semibold">Según la fase, en tu inventario</h2>
            <ul className="mt-3 space-y-2">
              {plantas.slice(0, 6).map((p) => {
                const esp = especiePorId(p.especieId);
                if (!esp) return null;
                return (
                  <li key={p.id} className="text-sm text-silenciado">
                    <Link to="/planta/$id" params={{ id: p.id }} className="text-texto">
                      {p.apodo}
                    </Link>
                    {" — "}
                    {consejoLunarPara(esp, luna)}
                  </li>
                );
              })}
            </ul>
          </section>
        </>
      )}
    </main>
  );
}
