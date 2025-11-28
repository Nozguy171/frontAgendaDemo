"use client"

import { Mail, Phone, MapPin, Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-background text-foreground pt-16 pb-10 border-t border-border">
      <div className="container">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">

          {/* BRAND */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl text-primary">
              <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-primary text-primary-foreground">
                💖
              </div>
              <span>Divas Spa</span>
            </div>

            <p className="text-sm text-muted-foreground">
              Masajes, faciales y bienestar. Atención personalizada de Paloma Romero.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h4 className="font-semibold mb-4 text-primary">Enlaces</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#servicios" className="hover:text-primary transition">Servicios</a>
              </li>
              <li>
                <a href="#nuestro-espacio" className="hover:text-primary transition">Nuestro espacio</a>
              </li>
              <li>
                <a href="#ubicacion" className="hover:text-primary transition">Ubicación</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-primary transition">FAQ</a>
              </li>
            </ul>
          </div>

          {/* CONTACTO */}
          <div>
            <h4 className="font-semibold mb-4 text-primary">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
<a href="tel:+526861234567" className="text-2xl font-bold hover:text-primary transition">
  (+52) 686 123 4567
</a>

              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:info@divasspa.com" className="hover:text-primary transition">
                  info@divasspa.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span>Mexicali, BC — Islas Hawai #682</span>
              </li>
            </ul>
          </div>

{/* HORARIO */}
<div>
  <h4 className="font-semibold mb-4 text-primary">Horario</h4>
  <ul className="space-y-2 text-sm text-muted-foreground">
    <li>
      <span className="font-semibold text-foreground">Lunes a Viernes:</span>{" "}
      10:00 AM – 7:00 PM
    </li>
    <li>
      <span className="font-semibold text-foreground">Sábado:</span>{" "}
      10:00 AM – 4:00 PM
    </li>
    <li>
      <span className="font-semibold text-foreground">Domingo:</span>{" "}
      Cerrado
    </li>
  </ul>
</div>

        </div>


      </div>
    </footer>
  )
}
