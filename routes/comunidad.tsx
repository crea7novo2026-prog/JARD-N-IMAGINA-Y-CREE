import { createFileRoute } from "@tanstack/react-router";
import { PantallaComunidad } from "@/components/pantalla-comunidad";

export const Route = createFileRoute("/comunidad")({ component: PantallaComunidad });
