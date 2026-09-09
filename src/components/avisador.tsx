import { useEffect } from "react";
import { useJardin } from "@/lib/almacen";
import { revisarMantenimiento } from "@/lib/avisos";

export function Avisador() {
  const plantas = useJardin((s) => s.plantas);
  const activos = useJardin((s) => s.ajustes.recordatoriosActivos);

  useEffect(() => {
    revisarMantenimiento(plantas, activos);
    const onVis = () => revisarMantenimiento(useJardin.getState().plantas, useJardin.getState().ajustes.recordatoriosActivos);
    document.addEventListener("visibilitychange", onVis);
    const id = window.setInterval(onVis, 30 * 60 * 1000);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.clearInterval(id);
    };
  }, [plantas, activos]);

  return null;
}
