import { Link, useNavigate } from "@tanstack/react-router";
import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { especiePorId } from "@/lib/catalogo-especies";
import { LIMITE_GRATIS, useJardin } from "@/lib/almacen";
import { diasHasta, etiquetaUbicacion, proximoRiego } from "@/lib/cuidados";
import { HojaPro } from "./hoja-pro";
import { BarraDemo } from "./barra-demo";
import { MarcadorFoto } from "./marcador-foto";

export function PantallaJardin() {
  const navigate = useNavigate();
  const plantas = useJardin((s) => s.plantas);
  const proActivo = useJardin((s) => s.ajustes.demoPro);
  const puede = useJardin((s) => s.puedeAgregar());
  const [q, setQ] = useState("");
  const [pro, setPro] = useState(false);

  const lista = useMemo(() => {
    const n = q.trim().toLowerCase();
    return plantas.filter((p) => {
      const e = especiePorId(p.especieId);
      const bolsa = `${p.apodo} ${p.nombrePropio ?? ""} ${e?.nombreComun ?? ""} ${e?.nombreCientifico ?? ""} ${p.ubicacion}`.toLowerCase();
      return !n || bolsa.includes(n);
    });
  }, [plantas, q]);

  return (
    <main className="px-5 pb-8 pt-8">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-silenciado">Inventario</p>
          <h1 className="mt-1 text-2xl font-semibold">Jardín</h1>
          <p className="text-sm text-silenciado">
            {plantas.length} página{plantas.length === 1 ? "" : "s"} del diario
            {!proActivo ? ` · demo ${plantas.length}/${LIMITE_GRATIS}` : " · Pro"}
          </p>
        </div>
        <button
          type="button"
          className="flex size-12 items-center justify-center rounded-lg bg-luna text-fondo"
          aria-label="Agregar planta"
          onClick={() => {
            if (puede) void navigate({ to: "/agregar" });
            else setPro(true);
          }}
        >
          <Plus className="size-5" />
        </button>
      </div>

      <div className="mt-4">
        <BarraDemo />
      </div>

      <label className="mt-5 flex h-12 items-center gap-2 rounded-lg bg-superficie px-3">
        <Search className="size-4 text-silenciado" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por apodo o especie"
          className="h-full w-full bg-transparent text-sm outline-none placeholder:text-silenciado"
        />
      </label>

      {!plantas.length ? (
        <section className="mt-10 text-center">
          <h2 className="text-lg font-semibold">Tu jardín empieza con una foto</h2>
          <p className="mt-2 text-sm text-silenciado">El inventario vivo nace de lo que sí tienes en casa.</p>
          <Link
            to="/agregar"
            className="mt-5 inline-flex h-12 items-center justify-center rounded-lg bg-luna px-5 text-sm font-semibold text-fondo"
          >
            Agregar primera planta
          </Link>
        </section>
      ) : (
        <ul className="mt-5 grid grid-cols-2 gap-3">
          {lista.map((p) => {
            const e = especiePorId(p.especieId);
            const d = e ? diasHasta(proximoRiego(p, e)) : 0;
            return (
              <li key={p.id}>
                <Link to="/planta/$id" params={{ id: p.id }} className="block rounded-xl bg-superficie p-2">
                  <MarcadorFoto src={p.fotoDataUrl} alt={p.apodo} className="rounded-lg" />
                  <p className="mt-2 truncate px-1 text-sm font-medium">{p.nombrePropio || p.apodo}</p>
                  <p className="truncate px-1 text-xs text-silenciado">
                    {p.nombrePropio ? p.apodo : e?.nombreComun}
                  </p>
                  <p className="mt-1 px-1 text-[11px] text-luna">
                    {etiquetaUbicacion(p.ubicacion)}
                    {e ? ` · riego ${d <= 0 ? "hoy" : `en ${d} d`}` : ""}
                    {p.intervaloRiegoAprendido ? " · ritmo propio" : ""}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      <HojaPro abierta={pro} onCerrar={() => setPro(false)} />
    </main>
  );
}
