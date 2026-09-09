import { createFileRoute } from "@tanstack/react-router";
import { PantallaHoy } from "@/components/pantalla-hoy";

export const Route = createFileRoute("/patio")({ component: PantallaHoy });
