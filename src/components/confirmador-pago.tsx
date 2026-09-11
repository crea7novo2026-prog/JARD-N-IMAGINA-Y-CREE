import { useEffect } from "react";
import { useJardin } from "@/lib/almacen";
import { confirmarPago } from "@/lib/servidor/pagar";

export function ConfirmadorPago() {
  const activar = useJardin((s) => s.activarDemoPro);
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    if (q.get("pago") !== "ok") return;
    const sessionId = q.get("session_id");
    if (!sessionId) return;
    void confirmarPago({ data: { sessionId } }).then((r) => {
      if (r.ok) activar();
      const url = new URL(window.location.href);
      url.searchParams.delete("pago");
      url.searchParams.delete("session_id");
      window.history.replaceState({}, "", url.pathname + url.search);
    });
  }, [activar]);
  return null;
}
