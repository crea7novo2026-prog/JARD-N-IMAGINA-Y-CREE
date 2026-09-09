import { createFileRoute } from "@tanstack/react-router";
import { FlujoAgregar } from "@/components/flujo-agregar";

export const Route = createFileRoute("/agregar")({ component: FlujoAgregar });
