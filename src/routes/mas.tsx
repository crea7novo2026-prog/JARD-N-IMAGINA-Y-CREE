import { createFileRoute } from "@tanstack/react-router";
import { PantallaMas } from "@/components/pantalla-mas";

export const Route = createFileRoute("/mas")({ component: PantallaMas });
