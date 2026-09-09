import { useEffect, useRef } from "react";
import { especiePorId } from "@/lib/catalogo-especies";
import { fichaAutomatica, fichaDeCatalogo } from "@/lib/ficha-auto";
import { useJardin } from "@/lib/almacen";

export function RecolectorFicha({ plantaId }: { plantaId: string }) {
  const hecho = useRef(false);

  useEffect(() => {
    if (hecho.current) return;
    hecho.current = true;
    const st = useJardin.getState();
    const p = st.plantas.find((x) => x.id === plantaId);
    if (!p) return;
    const esp = especiePorId(p.especieId);
    const nombre = p.apodo || esp?.nombreComun || "planta";
    void (async () => {
      const local = esp ? fichaDeCatalogo(esp.id) : "";
      const red = await fichaAutomatica(nombre, esp?.nombreCientifico);
      const cuerpo = [local, red].filter(Boolean).join("\n\n");
      if (!cuerpo) return;
      const ya = st.conocimiento.some((c) => c.plantaId === p.id && c.titulo.startsWith("Ficha ·"));
      if (!ya) {
        st.guardarConocimiento({
          especieId: p.especieId,
          plantaId: p.id,
          titulo: `Ficha · ${nombre}`,
          cuerpo,
        });
      }
      if (!p.notasPersonales) {
        st.actualizarPlanta(p.id, { notasPersonales: cuerpo });
      }
    })();
  }, [plantaId]);

  return null;
}
