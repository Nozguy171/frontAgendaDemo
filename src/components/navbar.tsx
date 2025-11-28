"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const SECTIONS = [
  { id: "top", label: "Inicio", href: "#top" },
  { id: "servicios", label: "Servicios", href: "#servicios" },
  { id: "nuestro-espacio", label: "Nuestro espacio", href: "#nuestro-espacio" },
  { id: "por-que-nosotros", label: "Nosotros", href: "#por-que-nosotros" },
  { id: "faq", label: "FAQ", href: "#faq" },
  { id: "ubicacion", label: "Ubicación", href: "#ubicacion" },
]

export default function Navbar() {
  const [active, setActive] = useState<string>("top")

  // Scroll suave
  useEffect(() => {
    const onClick = (e: Event) => {
      const target = e.target as HTMLElement
      const anchor = target.closest("a") as HTMLAnchorElement | null
      if (!anchor) return

      const href = anchor.getAttribute("href") || ""
      if (!href.startsWith("#")) return

      const el = document.querySelector(href)
      if (el) {
        e.preventDefault()
        const y = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - 64
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
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: "-64px 0px -70% 0px", threshold: [0, 0.25, 0.5] }
    )

    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur border-b border-border">
      <nav className="container flex items-center justify-between h-16">

        {/* LOGO */}
        <Link
          href="/"
          className="font-bold text-lg flex items-center gap-2 text-primary"
        >
          <span className="text-primary">Divas Spa</span>
        </Link>

        {/* LINKS */}
        <ul className="hidden md:flex items-center gap-2">
          {SECTIONS.map(s => (
            <li key={s.id}>
              <a
                href={s.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-semibold transition-all",
                  active === s.id
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                )}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href="/disponibilidad"
          className="ml-4 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition"
        >
          Agendar
        </Link>
      </nav>
    </header>
  )
}
