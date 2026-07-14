import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  index: number;
  title: string;
  /** Real screenshot path; when provided it replaces the generated placeholder. */
  src?: string;
  className?: string;
}

/**
 * Project artwork slot. Renders a designed placeholder (grid + oversized
 * number) until a real screenshot is supplied via `src`.
 */
export default function ImagePlaceholder({
  index,
  title,
  src,
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "group/img relative aspect-video w-full overflow-hidden rounded-lg border border-slate-800 bg-black",
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={`${title} preview`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
        />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 transition-transform duration-700 ease-out group-hover/img:scale-105"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(80% 90% at 20% 15%, rgba(2,87,122,0.55) 0%, rgba(0,0,0,0.9) 65%)," +
                "radial-gradient(60% 70% at 85% 90%, rgba(2,169,247,0.25) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(137,214,251,0.4) 1px, transparent 1px)," +
                "linear-gradient(to bottom, rgba(137,214,251,0.4) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />
          <span className="absolute -bottom-6 right-2 font-display text-[7rem] leading-none text-tech-light/15 select-none">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="absolute left-4 top-4 text-[10px] uppercase tracking-[0.35em] text-tech-light/60">
            {title}
          </span>
        </div>
      )}
    </div>
  );
}
