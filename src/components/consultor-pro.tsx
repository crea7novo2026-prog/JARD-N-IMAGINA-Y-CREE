import { useEffect } from "react";
import { useJardin } from "@/lib/almacen";
import { estadoProCliente } from "@/lib/servidor/clientes";

export function ConsultorPro() {
  const correo = useJardin((s) => s.ajustes.correoCliente);
  const demoPro = useJardin((s) => s.ajustes.demoPro);
  const setAjustes = useJardin((s) => s.setAjustes);

  useEffect(() => {
    if (!correo.includes("@")) return;
    void estadoProCliente({ data: { correo } }).then((r) => {
      if (!r.ok) return;
      if (r.pro !== demoPro) setAjustes({ demoPro: r.pro });
    });
  }, [correo, demoPro, setAjustes]);

  return null;
}
