import { createFileRoute } from "@tanstack/react-router";
import { PantallaAjustes } from "@/components/pantalla-ajustes";

export const Route = createFileRoute("/ajustes")({ component: PantallaAjustes });
