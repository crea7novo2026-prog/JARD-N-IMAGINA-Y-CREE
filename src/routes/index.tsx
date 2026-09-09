import { createFileRoute } from "@tanstack/react-router";
import { PantallaHoy } from "@/components/pantalla-hoy";
import { PantallaVivero } from "@/components/pantalla-vivero";

function PortadaHoy() {
  return (
    <>
      <PantallaVivero />
      <PantallaHoy />
    </>
  );
}

export const Route = createFileRoute("/")({ component: PortadaHoy });
