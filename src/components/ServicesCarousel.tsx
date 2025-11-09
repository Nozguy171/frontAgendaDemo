"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Item = {
  title: string;
  desc?: string;
  imageUrl?: string;
  href?: string;
};

type Props = {
  items: Item[];
  className?: string;
  auto?: boolean;          // autoplay
  interval?: number;       // ms entre pasos
};

export default function ServicesCarousel({
  items,
  className,
  auto = true,
  interval = 3000,
}: Props) {
  const viewportRef = React.useRef<HTMLDivElement | null>(null);
  const cardRef = React.useRef<HTMLDivElement | null>(null);
  const gapPx = 16; // debe coincidir con el gap de la fila

  // extendemos para “loop”
  const clones = items.slice(0, Math.min(items.length, 4));
  const data = React.useMemo(() => [...items, ...clones], [items, clones]);

  const getStep = React.useCallback(() => {
    const card = cardRef.current;
    if (!card) return 0;
    const w = card.getBoundingClientRect().width;
    return Math.round(w + gapPx);
  }, []);

  const scrollByOne = React.useCallback(
    (dir: 1 | -1) => {
      const vp = viewportRef.current;
      if (!vp) return;
      const step = getStep();
      if (!step) return;

      const maxScroll = vp.scrollWidth - vp.clientWidth;
      const target = vp.scrollLeft + dir * step;

      // si estamos por llegar al final, desplazamos y luego saltamos al inicio “sin animación”
      if (target >= maxScroll - step / 2) {
        vp.scrollTo({ left: maxScroll, behavior: "smooth" });
        // al terminar la animación, saltamos
        setTimeout(() => {
          vp.scrollTo({ left: 0, behavior: "instant" as ScrollBehavior });
        }, 350);
      } else if (target <= 0 && dir === -1) {
        // si vamos hacia atrás en el inicio, saltamos al “final”
        vp.scrollTo({ left: maxScroll, behavior: "instant" as ScrollBehavior });
        requestAnimationFrame(() => {
          vp.scrollBy({ left: -step, behavior: "smooth" });
        });
      } else {
        vp.scrollBy({ left: dir * step, behavior: "smooth" });
      }
    },
    [getStep]
  );

  // autoplay
  React.useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => scrollByOne(1), interval);
    return () => clearInterval(id);
  }, [auto, interval, scrollByOne]);

  return (
    <div className={cn("relative", className)}>
      {/* máscara y padding para no cortar bordes */}
      <div
        className="relative overflow-x-auto hide-scrollbar px-2"
        ref={viewportRef}
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0, black 24px, black calc(100% - 24px), transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0, black 24px, black calc(100% - 24px), transparent 100%)",
        }}
      >
        <div
          className="grid auto-cols-[85%] xs:auto-cols-[75%] sm:auto-cols-[58%] md:auto-cols-[42%] lg:auto-cols-[32%] grid-flow-col gap-4 py-1 snap-x snap-mandatory"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {data.map((it, i) => (
            <div
              key={`${it.title}-${i}`}
              className="snap-start"
              ref={i === 0 ? cardRef : undefined}
            >
              <article className="h-full rounded-2xl border bg-white shadow-sm overflow-hidden hover:shadow-md transition">
                <div className="relative h-40 w-full bg-slate-100">
                  {it.imageUrl ? (
                    <Image
                      src={it.imageUrl}
                      alt={it.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 85vw, (max-width: 768px) 58vw, (max-width: 1024px) 42vw, 32vw"
                      priority={i < 2}
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-content-center text-slate-400">
                      (sin imagen)
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-base font-semibold text-slate-900">
                    {it.title}
                  </h3>
                  {it.desc && (
                    <p className="text-sm text-slate-600 mt-1">{it.desc}</p>
                  )}
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      {/* Controles 1 a 1 */}
      <button
        type="button"
        aria-label="Anterior"
        onClick={() => scrollByOne(-1)}
        className="absolute -left-1 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-white/90 border shadow hover:bg-white active:scale-[0.98]"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Siguiente"
        onClick={() => scrollByOne(1)}
        className="absolute -right-1 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-white/90 border shadow hover:bg-white active:scale-[0.98]"
      >
        ›
      </button>
    </div>
  );
}
