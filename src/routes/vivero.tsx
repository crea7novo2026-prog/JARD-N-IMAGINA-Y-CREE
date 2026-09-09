import { createFileRoute } from "@tanstack/react-router";
import { PantallaVivero } from "@/components/pantalla-vivero";

export const Route = createFileRoute("/vivero")({ component: PantallaVivero });
