import { useEffect } from "react";
import { useJardin } from "@/lib/almacen";
import { SALA_VIVERO } from "@/lib/marca";
import { listarOfertas } from "@/lib/servidor/comunidad";
import { traerJardin } from "@/lib/servidor/sincronizar";
import type { OfertaVenta } from "@/lib/tipos";

function aOferta(o: {
  id: string;
  planta_id?: string | null;
  plantaId?: string | null;
  titulo: string;
  detalle: string;
  precio: string;
  pago_url?: string;
  pagoUrl?: string;
  foto?: string | null;
}): OfertaVenta {
  return {
    id: o.id,
    plantaId: o.plantaId ?? o.planta_id ?? null,
    titulo: o.titulo,
    detalle: o.detalle,
    precio: o.precio,
    pagoUrl: o.pagoUrl ?? o.pago_url ?? "",
    foto: o.foto,
    actualizadoEn: new Date().toISOString(),
  };
}

export function SincronizadorVivero() {
  const setVitrina = useJardin((s) => s.setVitrina);

  useEffect(() => {
    let vivo = true;
    async function tirar() {
      try {
        const [tabla, pack] = await Promise.all([
          listarOfertas({ data: { sala: SALA_VIVERO } }),
          traerJardin({ data: { codigo: SALA_VIVERO } }),
        ]);
        if (!vivo) return;
        const mapa = new Map<string, OfertaVenta>();
        if (pack.ok && pack.carga) {
          try {
            const data = JSON.parse(pack.carga) as { tipo?: string; ofertas?: OfertaVenta[] };
            if (Array.isArray(data.ofertas)) {
              for (const o of data.ofertas) mapa.set(o.id, o);
            }
          } catch {
            /* ignore */
          }
        }
        if (tabla.ok) {
          for (const o of tabla.items) mapa.set(o.id, aOferta(o));
        }
        if (mapa.size) setVitrina([...mapa.values()]);
      } catch {
        /* sin red: vitrina local */
      }
    }
    void tirar();
    const id = window.setInterval(() => void tirar(), 4000);
    const onVis = () => {
      if (document.visibilityState === "visible") void tirar();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      vivo = false;
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [setVitrina]);

  return null;
}
