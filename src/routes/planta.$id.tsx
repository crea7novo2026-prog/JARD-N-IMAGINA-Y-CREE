import { createFileRoute } from "@tanstack/react-router";
import { FichaPlanta } from "@/components/ficha-planta";

export const Route = createFileRoute("/planta/$id")({
  component: function RutaPlanta() {
    const { id } = Route.useParams();
    return <FichaPlanta id={id} />;
  },
});
