import { useEffect, useRef } from "react";
import { useJardin } from "@/lib/almacen";
import { SALA_VIVERO } from "@/lib/marca";
import { publicarJardin, traerJardin } from "@/lib/servidor/sincronizar";
import type { Conocimiento, Especie, FichaAutor } from "@/lib/tipos";

export function Sincronizador() {
  const plantas = useJardin((s) => s.plantas);
  const bitacora = useJardin((s) => s.bitacora);
  const conocimiento = useJardin((s) => s.conocimiento);
  const fichasAutor = useJardin((s) => s.fichasAutor);
  const codigo = useJardin((s) => s.ajustes.codigoJardin);
  const primer = useRef(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!codigo) return;
    let vivo = true;
    void (async () => {
      try {
        const r = await traerJardin({ data: { codigo } });
        if (!vivo || !r.ok || !r.carga) return;
        const local = useJardin.getState();
        const remoto = JSON.parse(r.carga) as { exportadoEn?: string; tipo?: string };
        if (remoto.tipo === "paquete-autor") return;
        if (
          !local.ajustes.syncEn ||
          (remoto.exportadoEn && remoto.exportadoEn > (local.ajustes.syncEn ?? ""))
        ) {
          local.aplicarCopia(JSON.parse(r.carga), true);
          local.setAjustes({ syncEn: remoto.exportadoEn ?? new Date().toISOString(), codigoJardin: codigo });
        }
      } catch {
        /* sin red */
      }
    })();
    return () => {
      vivo = false;
    };
  }, [codigo]);

  useEffect(() => {
    let vivo = true;
    void (async () => {
      try {
        const r = await traerJardin({ data: { codigo: SALA_VIVERO } });
        if (!vivo || !r.ok || !r.carga) return;
        const pack = JSON.parse(r.carga) as {
          tipo?: string;
          exportadoEn?: string;
          fichasAutor?: FichaAutor[];
          conocimiento?: Conocimiento[];
          catalogoExtra?: Especie[];
          catalogoOcultos?: string[];
          vitrina?: import("@/lib/tipos").OfertaVenta[];
          ventasEspecie?: import("@/lib/tipos").VentaEspecie[];
        };
        const local = useJardin.getState();
        if (pack.exportadoEn && local.ajustes.packEn && pack.exportadoEn <= local.ajustes.packEn) return;
        if (Array.isArray(pack.fichasAutor) || Array.isArray(pack.catalogoExtra) || Array.isArray(pack.vitrina)) {
          local.aplicarPaqueteAutor(
            pack.fichasAutor ?? [],
            pack.conocimiento,
            pack.catalogoExtra,
            pack.catalogoOcultos,
          );
          if (Array.isArray(pack.vitrina)) local.setVitrina(pack.vitrina);
          if (Array.isArray(pack.ventasEspecie)) {
            for (const v of pack.ventasEspecie) local.guardarVentaEspecie(v);
          }
          local.setAjustes({ packEn: pack.exportadoEn ?? new Date().toISOString() });
        }
      } catch {
        /* offline */
      }
    })();
    return () => {
      vivo = false;
    };
  }, [fichasAutor.length]);

  useEffect(() => {
    if (!codigo) return;
    if (primer.current) {
      primer.current = false;
      return;
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const estado = useJardin.getState();
      const copia = estado.copiaParaNube();
      const syncEn = new Date().toISOString();
      estado.setAjustes({ syncEn });
      void publicarJardin({
        data: { codigo: estado.ajustes.codigoJardin, carga: JSON.stringify({ ...copia, exportadoEn: syncEn }) },
      }).catch(() => undefined);
    }, 1600);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [plantas, bitacora, conocimiento, fichasAutor, codigo]);

  return null;
}
