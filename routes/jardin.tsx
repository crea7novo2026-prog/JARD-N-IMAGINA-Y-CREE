import { createFileRoute } from "@tanstack/react-router";
import { PantallaJardin } from "@/components/pantalla-jardin";

export const Route = createFileRoute("/jardin")({ component: PantallaJardin });
