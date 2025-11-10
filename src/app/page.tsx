"use client"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, ShieldCheck, HeartPulse, MapPin, ArrowRight, Star } from "lucide-react"
import { motion } from "framer-motion"
import Reveal from "@/components/animate/Reveal"
import { fadeInUp, fadeIn, stagger } from "@/lib/anim"
import ServicesCarousel from "@/components/ServicesCarousel"
import Image from "next/image"
import { useState } from "react"

const services = [
  { title: "Limpieza dental", desc: "Profilaxis y pulido.", imageUrl: "/images/limpieza.jpg" },
  { title: "Resinas y caries", desc: "Restauraciones estéticas.", imageUrl: "/images/resinas.jpg" },
  { title: "Ortodoncia", desc: "Brackets y alineadores.", imageUrl: "/images/ortodoncia.jpg" },
  { title: "Endodoncia", desc: "Tratamientos de conducto.", imageUrl: "/images/endodoncia.jpg" },
  { title: "Extracciones", desc: "Cirugía simple y compleja.", imageUrl: "/images/extracciones.jpg" },
  { title: "Blanqueamiento", desc: "Resultados visibles.", imageUrl: "/images/blanqueamiento.jpg" },
]

const equipo = [
  {
    name: "Dra. Ana Rodriguez",
    speciality: "Odontóloga General",
    experience: "10+ años",
    imageUrl: "/images/ana.jpg",
    bio: "Restauraciones estéticas y tratamientos integrales centrados en el paciente.",
  },
  {
    name: "Dr. Luis Méndez",
    speciality: "Ortodoncista",
    experience: "12+ años",
    imageUrl: "/images/luis.jpg",
    bio: "Brackets y alineadores invisibles con enfoque en estética y función.",
  },
  {
    name: "Dra. Sofía López",
    speciality: "Endodoncista",
    experience: "9+ años",
    imageUrl: "/images/sofia.jpg",
    bio: "Tratamientos de conducto sin dolor con tecnología de última generación.",
  },
]

const MAP = {
  lat: 32.60336183437693,
  lng: -115.4771202697527,
  zoom: 17,
  query: "Centro Recreativo Juventud 2000, Mexicali",
}

const beneficios = [
  { icon: <HeartPulse className="h-6 w-6" />, title: "Atención humana", desc: "Explicamos opciones y priorizamos tu comodidad." },
  { icon: <Calendar className="h-6 w-6" />, title: "Agenda fácil", desc: "Sin llamadas: agenda en línea y recibe recordatorios." },
  { icon: <ShieldCheck className="h-6 w-6" />, title: "Higiene certificada", desc: "Esterilización y materiales de alta calidad." },
]

const precios = [
  { name: "Primera consulta", price: "$300 MXN", items: ["Valoración", "Plan de tratamiento", "Radiografía básica*"] },
  { name: "Limpieza profesional", price: "$700 MXN", items: ["Profilaxis completa", "Flúor", "Recomendaciones personalizadas"] },
  { name: "Blanqueamiento", price: "$1,800 MXN", items: ["Sesión en consultorio", "Guía de cuidado", "Seguimiento"] },
]

const testimonios = [
  { name: "María García", role: "Paciente", text: "Excelente atención, muy profesionales y amables. Mi sonrisa cambió completamente.", rating: 5 },
  { name: "Carlos López", role: "Paciente", text: "El mejor servicio dental que he encontrado. Recomendado 100%.", rating: 5 },
  { name: "Ana Rodríguez", role: "Paciente", text: "Clínica moderna, dentistas expertos. Volveré definitivamente.", rating: 5 },
]

const whyUs = [
  { icon: "🎯", title: "Precisión de expertos", desc: "Cada procedimiento con tecnología de punta y técnicas de última generación." },
  { icon: "⏰", title: "Agendamiento sin estrés", desc: "Citas en línea, recordatorios automáticos, horario extendido hasta las 8 PM." },
  { icon: "💰", title: "Presupuestos transparentes", desc: "Sin costos ocultos. Cotización completa y planes de pago flexibles." },
  { icon: "🤝", title: "Trato humano", desc: "Explicamos cada procedimiento. Tu comodidad es nuestra prioridad." },
]

const certificaciones = [
  { name: "SEDEC", desc: "Colegio de Cirujanos Dentistas" },
  { name: "ADA", desc: "Asociación Dental Americana" },
  { name: "ISO 9001", desc: "Certificación de calidad" },
  { name: "IMSS", desc: "Afiliado institucional" },
]

const tratamientos = [
  { icon: "✨", title: "Blanqueamiento Dental", desc: "Recupera el brillo natural de tu sonrisa con resultados visibles en una sesión.", tiempo: "45-60 min", resultados: "Resultados inmediatos" },
  { icon: "🦷", title: "Ortodoncia Invisible", desc: "Alineadores transparentes. Nadie notará que los llevas puesto.", tiempo: "Variable", resultados: "6-24 meses" },
  { icon: "🛡️", title: "Implantes Dentales", desc: "Dientes permanentes que se ven y funcionan como naturales.", tiempo: "Multifase", resultados: "Duran 10+ años" },
  { icon: "👄", title: "Estética Dental", desc: "Diseño de sonrisa personalizado. Carillas, resinas, contouring.", tiempo: "60-90 min", resultados: "Sonrisa de cine" },
]

const preguntas = [
  { q: "¿Duelen los procedimientos?", a: "No. Usamos anestesia local de última generación y técnicas indoloras. Tu comodidad es garantizada." },
  { q: "¿Cuánto cuesta una sonrisa perfecta?", a: "Depende del tratamiento. Ofrecemos presupuestos sin costo y planes de pago. Agendar una valoración." },
  { q: "¿Necesito varias citas?", a: "Muchos procedimientos se hacen en una sesión. Te lo confirmaremos en tu consulta inicial." },
  { q: "¿Aceptan seguros?", a: "Sí. Trabajamos con IMSS, ISSSTE, Seguros Monterrey, y planes dentales privados." },
  { q: "¿Primera cita es gratis?", a: "La valoración cuesta $300 MXN (reembolsable si tomas tratamiento). Incluye radiografía y plan personalizado." },
  { q: "¿Cómo agendar?", a: "Ve a /disponibilidad, elige fecha y hora, o envía un WhatsApp. Respuesta en menos de 2 horas." },
]

export default function Page() {
  const [openFaq, setOpenFaq] = useState<string | null>(null)

  return (
    <>
      <Navbar />

      <section id="top" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-accent/5 pt-20">
        {/* Decoratives */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

        <div className="container relative z-10 grid md:grid-cols-2 gap-12 items-center py-20">
          {/* Left */}
          <Reveal variants={stagger} className="space-y-6" retrigger amount={0.25}>
            <motion.div variants={fadeInUp} className="flex items-center gap-3">
              <div className="h-1 w-12 bg-primary"></div>
              <p className="text-sm uppercase tracking-widest font-semibold text-primary">Tu sonrisa, nuestra misión</p>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="h1 text-foreground">
              Dentista moderno en Mexicali
            </motion.h1>

            <motion.p variants={fadeInUp} className="lead text-lg text-muted-foreground">
              Tecnología avanzada, dentistas especializados, y atención que te hace sentir en casa. Agenda tu cita sin complicaciones.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild className="btn-primary text-base px-8 py-4 flex items-center justify-center group">
                <Link href="/disponibilidad">
                  Agendar consulta
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button asChild variant="outline" className="btn-outline text-base flex items-center justify-center bg-transparent">
                <a href="#servicios">Explorar servicios</a>
              </Button>
            </motion.div>

            <motion.p variants={fadeIn} className="text-xs text-muted-foreground pt-2">
              ✓ Sin compromiso • ✓ Respuesta en 24h • ✓ Consultorio moderno
            </motion.p>
          </Reveal>

          {/* Right: Hero image */}
          <motion.div variants={fadeIn} initial="hidden" animate="show" className="relative">
            <div className="aspect-square w-full rounded-2xl overflow-hidden border border-border shadow-2xl">
              <Image
                src="/images/dentista.webp"
                alt="Consultorio dental moderno"
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-border"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="text-sm">
                  <p className="font-bold">Certificado</p>
                  <p className="text-xs text-muted-foreground">Esterilización garantizada</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-primary text-white border-y">
        <div className="container">
          <Reveal variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12" retrigger amount={0.25}>
            {[
              { label: "Años de experiencia", value: "+15" },
              { label: "Pacientes felices", value: "+5000" },
              { label: "Tratamientos exitosos", value: "99%" },
              { label: "Horario extendido", value: "8AM-8PM" },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeInUp} className="text-center">
                <p className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</p>
                <p className="text-sm opacity-90">{stat.label}</p>
              </motion.div>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="servicios" className="section bg-white">
        <div className="container">
          <Reveal variants={stagger} className="mb-12" retrigger amount={0.25}>
            <motion.div variants={fadeInUp} className="max-w-2xl">
              <h2 className="h2 mb-4">Nuestros servicios</h2>
              <p className="text-lg text-muted-foreground">
                Cada tratamiento adaptado a tus necesidades con tecnología de punta y profesionales certificados.
              </p>
            </motion.div>
          </Reveal>

          <ServicesCarousel items={services} className="mt-8" auto />
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <Reveal variants={stagger} className="mb-12 text-center" retrigger amount={0.25}>
            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-3 mb-4">
              <div className="h-1 w-12 bg-primary"></div>
              <p className="text-sm uppercase tracking-widest font-semibold text-primary">Conoce a nuestro equipo</p>
              <div className="h-1 w-12 bg-primary"></div>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="h2 mb-4">Profesionales certificados</motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Dentistas especializados con experiencia comprobada para ofrecerte la mejor atención.
            </motion.p>
          </Reveal>

          <Reveal variants={stagger} className="grid md:grid-cols-3 gap-8" retrigger amount={0.25}>
            {equipo.map((member) => (
              <motion.div key={member.name} variants={fadeInUp}>
                <Card className="overflow-hidden border-border h-full hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                  <div className="relative h-80 overflow-hidden bg-muted">
                    <Image
                      src={member.imageUrl || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <p className="text-white text-sm leading-relaxed">{member.bio}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary text-sm font-semibold mb-2">{member.speciality}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="h-2 w-2 rounded-full bg-primary"></span>
                      <span>{member.experience} experiencia</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </Reveal>

          <motion.div variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.3 }} className="text-center mt-12">
            <p className="text-muted-foreground mb-6">
              Todos nuestros profesionales están certificados y se actualizan constantemente en las nuevas técnicas dentales.
            </p>
            <Button asChild className="btn-primary">
              <Link href="/disponibilidad">
                Conocer disponibilidad de nuestro equipo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section id="por-que-nosotros" className="section bg-white">
        <div className="container">
          <Reveal variants={stagger} className="mb-12 text-center" retrigger amount={0.25}>
            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-3 mb-4">
              <div className="h-1 w-12 bg-primary"></div>
              <p className="text-sm uppercase tracking-widest font-semibold text-primary">Diferencia real</p>
              <div className="h-1 w-12 bg-primary"></div>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="h2 mb-4">Por qué elegirnos</motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cuatro razones por las que 5,000+ pacientes confían en nosotros para su salud dental.
            </motion.p>
          </Reveal>

          <Reveal variants={stagger} className="grid md:grid-cols-2 gap-8" retrigger amount={0.25}>
            {whyUs.map((item) => (
              <motion.div key={item.title} variants={fadeInUp}>
                <Card className="p-8 h-full border-border hover:shadow-xl hover:-translate-y-1 transition-all group cursor-default">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container">
          <Reveal variants={stagger} className="mb-12 text-center" retrigger amount={0.25}>
            <motion.h2 variants={fadeInUp} className="h2 mb-4">Respaldos y certificaciones</motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Profesionales certificados internacionalmente con estándares de calidad garantizados.
            </motion.p>
          </Reveal>

          <Reveal variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-6" retrigger amount={0.25}>
            {certificaciones.map((cert) => (
              <motion.div key={cert.name} variants={fadeInUp}>
                <div className="h-full flex flex-col items-center justify-center p-6 rounded-xl bg-white border border-border hover:shadow-lg hover:border-primary/30 transition-all text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{cert.name}</div>
                  <p className="text-sm text-muted-foreground">{cert.desc}</p>
                </div>
              </motion.div>
            ))}
          </Reveal>

          <motion.p variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.3 }} className="text-center text-sm text-muted-foreground mt-12">
            Todos nuestros procedimientos cumplen con los estándares sanitarios internacionales más exigentes.
          </motion.p>
        </div>
      </section>

      <section id="tratamientos" className="section bg-white">
        <div className="container">
          <Reveal variants={stagger} className="mb-12 text-center" retrigger amount={0.25}>
            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-3 mb-4">
              <div className="h-1 w-12 bg-primary"></div>
              <p className="text-sm uppercase tracking-widest font-semibold text-primary">Especialidades</p>
              <div className="h-1 w-12 bg-primary"></div>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="h2 mb-4">Tratamientos especializados</motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Soluciones a medida para cada necesidad dental con resultados que duran.
            </motion.p>
          </Reveal>

          <Reveal variants={stagger} className="grid md:grid-cols-2 gap-6" retrigger amount={0.25}>
            {tratamientos.map((t) => (
              <motion.div key={t.title} variants={fadeInUp}>
                <Card className="p-8 h-full border-border hover:shadow-xl hover:-translate-y-2 transition-all group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-5xl">{t.icon}</div>
                    <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">{t.tiempo}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{t.title}</h3>
                  <p className="text-muted-foreground mb-6">{t.desc}</p>
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-semibold text-primary">✓ {t.resultados}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </Reveal>

          <motion.div variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.3 }} className="text-center mt-12">
            <Button asChild className="btn-primary">
              <Link href="/disponibilidad">
                Consultar disponibilidad
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section id="faq" className="section bg-gradient-to-br from-background to-accent/5">
        <div className="container">
          <Reveal variants={stagger} className="mb-12 text-center" retrigger amount={0.25}>
            <motion.h2 variants={fadeInUp} className="h2 mb-4">Preguntas frecuentes</motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Resolvemos tus dudas. No hay preguntas tontas, solo decisiones informadas.
            </motion.p>
          </Reveal>

          <div className="max-w-3xl mx-auto space-y-4">
            <Reveal variants={stagger} retrigger amount={0.25}>
              {preguntas.map((item) => (
                <motion.div key={item.q} variants={fadeInUp}>
                  <button
                    onClick={() => setOpenFaq(openFaq === item.q ? null : item.q)}
                    className="w-full text-left p-6 rounded-lg border border-border bg-white hover:bg-muted/50 transition-all hover:shadow-md group"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-foreground">{item.q}</h3>
                      <motion.div animate={{ rotate: openFaq === item.q ? 180 : 0 }} transition={{ duration: 0.3 }}>
                        <ArrowRight className="h-5 w-5 text-primary rotate-90" />
                      </motion.div>
                    </div>
                    <motion.div initial={false} animate={{ height: openFaq === item.q ? "auto" : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <p className="text-muted-foreground mt-4">{item.a}</p>
                    </motion.div>
                  </button>
                </motion.div>
              ))}
            </Reveal>
          </div>

          <motion.p variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.3 }} className="text-center text-sm text-muted-foreground mt-12">
            ¿Más preguntas? Contáctanos por WhatsApp o agendar una consulta inicial.
          </motion.p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <Reveal variants={stagger} className="mb-12" retrigger amount={0.25}>
            <motion.div variants={fadeInUp} className="max-w-2xl">
              <h2 className="h2 mb-4">¿Por qué elegirnos?</h2>
              <p className="text-lg text-muted-foreground">
                Cada tratamiento adaptado a tus necesidades con tecnología de punta y profesionales certificados.
              </p>
            </motion.div>
          </Reveal>

          <Reveal variants={stagger} className="grid md:grid-cols-3 gap-8" retrigger amount={0.25}>
            {beneficios.map((b) => (
              <motion.div key={b.title} variants={fadeInUp}>
                <Card className="h-full p-8 hover:shadow-xl hover:-translate-y-1 cursor-default border-border">
                  <div className="h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                    {b.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{b.title}</h3>
                  <p className="text-muted-foreground">{b.desc}</p>
                </Card>
              </motion.div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <Reveal variants={stagger} className="mb-12 text-center" retrigger amount={0.25}>
            <motion.h2 variants={fadeInUp} className="h2 mb-4">Lo que dicen nuestros pacientes</motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Historias reales de sonrisas transformadas
            </motion.p>
          </Reveal>

          <Reveal variants={stagger} className="grid md:grid-cols-3 gap-8" retrigger amount={0.25}>
            {testimonios.map((t) => (
              <motion.div key={t.name} variants={fadeInUp}>
                <Card className="p-8 h-full border-border">
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{t.text}"</p>
                  <div>
                    <p className="font-bold">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="ubicacion" className="relative bg-white py-0">
        <div className="container max-w-6xl">
          <div className="rounded-3xl overflow-hidden border border-border shadow-2xl relative min-h-[500px]">
            <div className="relative w-full h-[500px]">
              <iframe
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?ll=${MAP.lat},${MAP.lng}&z=${MAP.zoom}&t=m&hl=es&output=embed&disableDefaultUI=1`}
                title="Ubicación"
              />
            </div>

            {/* Animated pin */}
            <div className="absolute top-1/2 left-1/3 z-20 -translate-y-full -translate-x-1/2">
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }} className="relative">
                <div className="absolute inset-0 bg-primary/30 rounded-full blur-md animate-pulse"></div>
                <div className="relative h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg">
                  <MapPin className="h-6 w-6" />
                </div>
              </motion.div>
            </div>
          </div>

          <div className="mt-6 flex justify-start">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP.query)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold border border-border rounded-lg hover:bg-muted transition-all"
            >
              Ver en Google Maps
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Contact card */}
          <motion.div variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.3 }} className="md:absolute md:-top-24 md:right-6 z-10 mt-8 md:mt-0">
            <Card className="w-full md:w-[480px] p-8 shadow-2xl border-border bg-white">
              <h3 className="text-3xl font-bold mb-2">Contáctanos</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-widest mb-6">Estamos listos para ayudarte</p>

              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Nombre</label>
                    <Input placeholder="Tu nombre" className="border-border" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Teléfono</label>
                    <Input placeholder="(686) 123 4567" className="border-border" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">Correo</label>
                  <Input type="email" placeholder="tu@email.com" className="border-border" />
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">Mensaje</label>
                  <Textarea rows={4} placeholder="Cuéntanos en qué te ayudamos..." className="border-border resize-none" />
                </div>

                <Button className="w-full btn-primary py-3 text-base">Enviar mensaje</Button>
              </form>
            </Card>
          </motion.div>
        </div>

        {/* Info band */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 py-12 border-t border-border">
          <Reveal variants={stagger} className="col-span-full grid grid-cols-1 md:grid-cols-3 gap-8" retrigger amount={0.25}>
            <motion.div variants={fadeInUp} className="space-y-2">
              <p className="text-sm uppercase tracking-widest font-bold text-primary">Teléfono</p>
              <a href="tel:+526861234567" className="text-2xl font-bold hover:text-primary transition">
                (686) 123 4567
              </a>
              <p className="text-sm text-muted-foreground">Disponible 24/7 por WhatsApp</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-2">
              <p className="text-sm uppercase tracking-widest font-bold text-primary">Horario</p>
              <p className="text-2xl font-bold">8:00 AM - 8:00 PM</p>
              <p className="text-sm text-muted-foreground">Lunes a sábado</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-2">
              <p className="text-sm uppercase tracking-widest font-bold text-primary">Ubicación</p>
              <p className="text-sm font-semibold">Av. Reforma 123, Mexicali, BC</p>
              <p className="text-sm text-muted-foreground">Centro Recreativo Juventud 2000</p>
            </motion.div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-gradient-to-br from-primary to-primary/90 text-white text-center">
        <Reveal variants={stagger} retrigger amount={0.25}>
          <motion.h2 variants={fadeInUp} className="h2 text-white mb-4">Tu sonrisa perfecta está a un clic</motion.h2>
          <motion.p variants={fadeInUp} className="lead text-white/90 max-w-2xl mx-auto mb-8">
            Consulta inicial sin costo. Conoce nuestro equipo y equipamiento de última generación.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Button asChild className="bg-white text-primary hover:bg-white/90 text-base px-8 py-4 font-bold">
              <Link href="/disponibilidad">
                Agendar ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </Reveal>
      </section>

      <Footer />

      {/* WhatsApp floating */}
      <a
        href="https://wa.me/526861234567?text=Hola%20quisiera%20agendar%20una%20cita"
        target="_blank"
        rel="noreferrer"
        className="fixed right-6 bottom-6 z-50 h-16 w-16 rounded-full bg-green-500 text-white shadow-xl hover:shadow-2xl hover:scale-110 transition-all flex items-center justify-center font-bold text-2xl"
        aria-label="WhatsApp"
        title="Contáctanos por WhatsApp"
      >
        💬
      </a>
    </>
  )
}
