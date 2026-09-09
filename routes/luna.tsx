import { createFileRoute } from "@tanstack/react-router";
import { PantallaLuna } from "@/components/pantalla-luna";

export const Route = createFileRoute("/luna")({ component: PantallaLuna });
