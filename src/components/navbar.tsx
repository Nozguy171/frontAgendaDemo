"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
// Si no tienes esta utilidad, cambia cn(...) por un template string condicional
import { cn } from "@/lib/utils"

const SECTIONS = [
  { id: "top", label: "Inicio", href: "#top" },
  { id: "servicios", label: "Servicios", href: "#servicios" },
  { id: "por-que-nosotros", label: "Nosotros", href: "#por-que-nosotros" },
  { id: "tratamientos", label: "Tratamientos", href: "#tratamientos" },
  { id: "faq", label: "FAQ", href: "#faq" },
  { id: "ubicacion", label: "Ubicación", href: "#ubicacion" },
]

export default function Navbar() {
  const [active, setActive] = useState<string>("top")

  // Scroll suave SOLO para enlaces con hash (anclas en la misma página)
  useEffect(() => {
    const onClick = (e: Event) => {
      const target = e.target as HTMLElement
      const anchor = target.closest("a") as HTMLAnchorElement | null
      if (!anchor) return
      const href = anchor.getAttribute("href") || ""
      const isHash = href.startsWith("#")
      if (!isHash) return

      const el = document.querySelector(href)
      if (el) {
        e.preventDefault()
        const y = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - 64 // altura navbar
        window.scrollTo({ top: y, behavior: "smooth" })
      }
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  // Scrollspy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      {
        rootMargin: "-64px 0px -70% 0px", // compensa nav fijo
        threshold: [0, 0.25, 0.5, 1],
      }
    )

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 w-full bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border"
    >
      <nav className="container flex items-center justify-between h-16">
        <Link href="/" className="font-bold">
          Sonrisa Plus
        </Link>

        <ul className="hidden md:flex items-center gap-2">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={s.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-semibold transition-colors",
                  active === s.id
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                )}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA: Agendar (ruta a /disponibilidad) */}
        <Link
          href="/disponibilidad"
          className="ml-3 inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition"
        >
          Agendar
        </Link>
      </nav>
    </header>
  )
}
