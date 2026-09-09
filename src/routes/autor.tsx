import { createFileRoute } from "@tanstack/react-router";
import { TallerAutor } from "@/components/taller-autor";

export const Route = createFileRoute("/autor")({ component: TallerAutor });
