"use client"

import { Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 border-t border-border">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl">
              <div className="h-8 w-8 rounded-lg bg-primary text-white flex items-center justify-center text-sm">
                🦷
              </div>
              <span>Dental Clinic</span>
            </div>
            <p className="text-sm opacity-80">
              Tu sonrisa es nuestra prioridad. Dentistas especializados con tecnología de punta.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="#servicios" className="hover:text-primary transition">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#ubicacion" className="hover:text-primary transition">
                  Ubicación
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-primary transition">
                  Inicio
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+526861234567" className="hover:text-primary transition">
                  (686) 123 4567
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@dentalclinic.com" className="hover:text-primary transition">
                  info@clinic.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Av. Reforma 123, Mexicali, BC</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold mb-4">Horario</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>Lunes - Viernes: 8AM - 8PM</li>
              <li>Sábado: 9AM - 5PM</li>
              <li>Domingo: Cerrado</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm opacity-70">
            <p>&copy; 2025 Dental Clinic. Todos los derechos reservados.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary transition">
                Privacidad
              </a>
              <a href="#" className="hover:text-primary transition">
                Términos
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
