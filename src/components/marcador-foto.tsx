import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

export function MarcadorFoto({
  src,
  alt,
  className,
}: {
  src?: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-square overflow-hidden rounded-lg bg-superficie-2 shadow-[inset_0_1px_0_color-mix(in_oklab,var(--color-texto)_8%,transparent)]",
        className,
      )}
    >
      {src ? (
        <img src={src} alt={alt} className="size-full object-cover object-center" />
      ) : (
        <div className="flex size-full flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_30%_20%,#24382c,transparent_55%)]">
          <Leaf className="size-8 text-hoja/80" strokeWidth={1.4} />
          <span className="text-xs text-silenciado">Sin foto</span>
        </div>
      )}
    </div>
  );
}
