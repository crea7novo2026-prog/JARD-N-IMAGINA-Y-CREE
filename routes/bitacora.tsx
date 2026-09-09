import { createFileRoute } from "@tanstack/react-router";
import { PantallaBitacora } from "@/components/pantalla-bitacora";

export const Route = createFileRoute("/bitacora")({ component: PantallaBitacora });
