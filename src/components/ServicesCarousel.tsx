"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ServiceItem {
  title: string
  desc: string
  imageUrl: string
}

interface ServicesCarouselProps {
  items: ServiceItem[]
  className?: string
  auto?: boolean
  // puedes pasar "center", "top", "bottom" si quieres ajustar foco
  objectPosition?: "center" | "top" | "bottom" | "left" | "right"
}

export default function ServicesCarousel({
  items,
  className = "",
  auto = false,
  objectPosition = "center",
}: ServicesCarouselProps) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!auto) return
    const interval = setInterval(() => setCurrent((p) => (p + 1) % items.length), 5000)
    return () => clearInterval(interval)
  }, [auto, items.length])

  const next = () => setCurrent((p) => (p + 1) % items.length)
  const prev = () => setCurrent((p) => (p - 1 + items.length) % items.length)

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Contenedor fijo con ratio uniforme para TODAS las fotos */}
      <div className="relative overflow-hidden rounded-2xl bg-muted">
        {/* altura base + ratio; en desktop se hace más panorámico */}
        <div className="aspect-[16/9] md:aspect-[21/9] h-[360px] md:h-[520px] w-full">
          <div
            className="flex h-full w-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {items.map((item, idx) => (
              <div
                key={`${item.title}-${idx}`}
                className="min-w-full relative h-full"
              >
                <Image
                  src={item.imageUrl || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  // recorte limpio y uniforme
                  className="object-cover"
                  style={{ objectPosition }}
                  sizes="100vw"
                  priority={idx === 0}
                />

                {/* capa para texto */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent flex flex-col justify-end p-6 md:p-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow">
                    {item.title}
                  </h3>
                  <p className="text-white/90">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controles */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/25 hover:bg-black/40 text-white p-2 rounded-full transition"
          aria-label="Previous"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/25 hover:bg-black/40 text-white p-2 rounded-full transition"
          aria-label="Next"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Indicadores */}
      <div className="flex justify-center gap-2">
        {items.map((_, idx) => (
          <button
            key={`dot-${idx}`}
            onClick={() => setCurrent(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === current ? "bg-primary w-8" : "bg-border w-2"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
