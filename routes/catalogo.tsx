import { createFileRoute } from "@tanstack/react-router";
import { PantallaCatalogo } from "@/components/pantalla-catalogo";

export const Route = createFileRoute("/catalogo")({ component: PantallaCatalogo });
