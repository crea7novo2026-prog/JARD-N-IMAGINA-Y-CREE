import { createFileRoute } from "@tanstack/react-router";
import { PantallaPlagas } from "@/components/pantalla-plagas";

export const Route = createFileRoute("/plagas")({ component: PantallaPlagas });
