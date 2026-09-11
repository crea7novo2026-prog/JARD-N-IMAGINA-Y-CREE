import { useEffect } from "react";
import { useJardin } from "@/lib/almacen";
import { estadoProCliente } from "@/lib/servidor/clientes";

export function ConsultorPro() {
  const correo = useJardin((s) => s.ajustes.correoCliente);
  const setAjustes = useJardin((s) => s.setAjustes);

  useEffect(() => {
    if (!correo.includes("@")) return;
    let vivo = true;
    async function tirar() {
      try {
        const r = await estadoProCliente({ data: { correo } });
        if (!vivo || !r.ok) return;
        const local = useJardin.getState().ajustes.demoPro;
        if (r.pro !== local) setAjustes({ demoPro: r.pro });
      } catch {
        /* sin red: deja el estado local */
      }
    }
    void tirar();
    const id = window.setInterval(() => void tirar(), 60_000);
    const onVis = () => {
      if (document.visibilityState === "visible") void tirar();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      vivo = false;
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [correo, setAjustes]);

  return null;
}
