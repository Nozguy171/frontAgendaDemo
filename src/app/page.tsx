"use client";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, ShieldCheck, HeartPulse, PhoneCall, MapPin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Reveal from "@/components/animate/Reveal";
import { fadeInUp, fadeIn, stagger } from "@/lib/anim";
import { Clock, CreditCard, Star, MessageCircle } from "lucide-react";
import ServicesCarousel from "@/components/ServicesCarousel";
import Image from "next/image";

const services = [
  { title: "Limpieza dental", desc: "Profilaxis y pulido.", imageUrl: "/images/limpieza.jpg" },
  { title: "Resinas y caries", desc: "Restauraciones estéticas.", imageUrl: "/images/resinas.jpg" },
  { title: "Ortodoncia", desc: "Brackets y alineadores.", imageUrl: "/images/ortodoncia.jpg" },
  { title: "Endodoncia", desc: "Tratamientos de conducto.", imageUrl: "/images/endodoncia.jpg" },
  { title: "Extracciones", desc: "Cirugía simple y compleja.", imageUrl: "/images/extracciones.jpg" },
  { title: "Blanqueamiento", desc: "Resultados visibles.", imageUrl: "/images/blanqueamiento.jpg" },
];

const MAP = {
  // Juventud 2000 aprox — ajústalo si ocupas precisión
  lat: 32.60336183437693,
  lng: -115.4771202697527,
  zoom: 17, // 14–17 recomendado
  query: "Centro Recreativo Juventud 2000, Mexicali",
};

const beneficios = [
  { icon: <HeartPulse className="h-6 w-6"/>, title: "Atención humana", desc: "Explicamos opciones y priorizamos tu comodidad." },
  { icon: <Calendar className="h-6 w-6"/>, title: "Agenda fácil", desc: "Sin llamadas: agenda en línea y recibe recordatorios." },
  { icon: <ShieldCheck className="h-6 w-6"/>, title: "Higiene certificada", desc: "Esterilización y materiales de alta calidad." },
];

const precios = [
  { name: "Primera consulta", price: "$300 MXN", items: ["Valoración", "Plan de tratamiento", "Radiografía básica*"] },
  { name: "Limpieza profesional", price: "$700 MXN", items: ["Profilaxis completa", "Flúor", "Recomendaciones personalizadas"] },
  { name: "Blanqueamiento", price: "$1,800 MXN", items: ["Sesión en consultorio", "Guía de cuidado", "Seguimiento"] },
];

export default function Page() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="section">
        <div className="container grid md:grid-cols-2 gap-10 items-center">
          {/* Columna izquierda */}
<Reveal variants={stagger} className="space-y-4" retrigger amount={0.25}>
            <motion.p variants={fadeInUp} className="inline-flex items-center gap-2 text-sm font-medium text-sky-600 bg-sky-50 border border-sky-100 px-3 py-1 rounded-full mb-0">
              <Sparkles className="h-4 w-4" /> Tu sonrisa, nuestra prioridad
            </motion.p>
            <motion.h1 variants={fadeInUp} className="h1">Dentista en Mexicali — atención moderna y sin complicaciones</motion.h1>
            <motion.p variants={fadeInUp} className="lead">Limpiezas, resinas, ortodoncia y más. Agenda fácil y recibe recordatorios por WhatsApp.</motion.p>
<motion.div variants={fadeInUp} className="mt-4 flex flex-wrap gap-4">
  {/* CTA primario con gradiente */}
  <Button
    asChild
    className="text-base px-5 py-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 text-white shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.98] transition"
  >
    <Link href="/disponibilidad">
      <Calendar className="mr-2 h-5 w-5" />
      Consulta disponibilidad
    </Link>
  </Button>

  {/* Secundario “outline pill” */}
  <Button
    asChild
    variant="outline"
    className="text-base px-5 py-3 rounded-full border-slate-300 text-slate-700 hover:bg-slate-50"
  >
    <a href="#servicios">Ver servicios</a>
  </Button>
</motion.div>

            <motion.p variants={fadeIn} className="mt-1 text-xs text-slate-500">* Demo: la agenda se conectará más adelante.</motion.p>
          </Reveal>

          {/* Columna derecha */}
          <div className="relative">
<div className="aspect-[4/3] w-full rounded-2xl overflow-hidden border relative shadow-sm">
  <Image
    src="/images/dentista.webp"
    alt="Consultorio dental moderno en Mexicali"
    fill
    priority
    className="object-cover object-center"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent" />
</div>

            <motion.div className="absolute -bottom-5 -right-5 hidden md:block" variants={fadeIn} initial="hidden" animate="show">
              <div className="rounded-2xl border bg-white shadow-md p-4 flex items-center gap-3">
                <ShieldCheck className="text-sky-600" />
                <div className="text-sm"><b>Estrictos protocolos</b><br/>Esterilización certificada</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
<section id="servicios" className="section bg-slate-50 border-y">
  <div className="container">
    <h2 className="h2 mb-6">Servicios</h2>

    <ServicesCarousel
      items={services}
      className="mt-2"
      auto
    />
  </div>
</section>


{/* BARRA DE INFORMACIÓN (estilo destacado) */}
<section className="py-10 md:py-12 bg-sky-400/90 text-slate-900 border-y">
  <div className="container max-w-6xl">
    <Reveal variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center" retrigger amount={0.25}>
      {/* Teléfono / WhatsApp */}
      <motion.div variants={fadeInUp} className="flex flex-col items-center gap-3">
        <div className="h-16 w-16 rounded-full bg-violet-700 text-white grid place-content-center shadow-md">
          <MessageCircle className="h-8 w-8" />
        </div>
        <p className="text-2xl font-extrabold tracking-tight">964 586 025</p>
        <p className="uppercase tracking-wide text-sm font-semibold">Número de atención</p>
      </motion.div>

      {/* Horario */}
      <motion.div variants={fadeInUp} className="flex flex-col items-center gap-3">
        <div className="h-16 w-16 rounded-full bg-violet-700 text-white grid place-content-center shadow-md">
          <Clock className="h-8 w-8" />
        </div>
        <p className="text-2xl font-extrabold tracking-tight">8:00 AM - 8:00 PM</p>
        <p className="uppercase tracking-wide text-sm font-semibold">Horario de atención</p>
      </motion.div>

      {/* Formas de pago */}
      <motion.div variants={fadeInUp} className="flex flex-col items-center gap-3">
        <div className="h-16 w-16 rounded-full bg-violet-700 text-white grid place-content-center shadow-md">
          <CreditCard className="h-8 w-8" />
        </div>
        <p className="text-2xl font-extrabold tracking-tight">Aceptamos todas</p>
        <p className="uppercase tracking-wide text-sm font-semibold">Formas de pago</p>
      </motion.div>

      {/* Especialidades */}
      <motion.div variants={fadeInUp} className="flex flex-col items-center gap-3">
        <div className="h-16 w-16 rounded-full bg-violet-700 text-white grid place-content-center shadow-md">
          <Star className="h-8 w-8" />
        </div>
        <p className="text-2xl font-extrabold tracking-tight">Conoce</p>
        <p className="uppercase tracking-wide text-sm font-semibold">Nuestras especialidades</p>
      </motion.div>
    </Reveal>
  </div>
</section>


      {/* BENEFICIOS */}
      <section id="beneficios" className="section">
        <div className="container">
          <Reveal variants={stagger} className="grid md:grid-cols-3 gap-6" retrigger amount={0.25}>
            {beneficios.map((b) => (
              <motion.div key={b.title} variants={fadeInUp}>
                <Card>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-sky-50 text-sky-600">{b.icon}</div>
                    <div>
                      <h3 className="font-semibold">{b.title}</h3>
                      <p className="mt-1 text-slate-600">{b.desc}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* PRECIOS */}
      <section id="precios" className="section bg-slate-50 border-y">
        <div className="container">
          <h2 className="h2 mb-8">Precios</h2>
          <Reveal variants={stagger} className="grid md:grid-cols-3 gap-6" retrigger amount={0.25}>
            {precios.map((p) => (
              <motion.div key={p.name} variants={fadeInUp}>
                <Card className="flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{p.name}</h3>
                    <p className="mt-1 text-3xl font-bold">{p.price}</p>
                    <ul className="mt-3 text-slate-600 space-y-1 list-disc ml-5">
                      {p.items.map(i => <li key={i}>{i}</li>)}
                    </ul>
                  </div>
                  <div className="mt-6">
                    <Link href="/disponibilidad"><Button className="w-full">Agendar</Button></Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </Reveal>
          <p className="text-xs text-slate-500 mt-3">* Sujeto a valoración.</p>
        </div>
      </section>
{/* UBICACIÓN + TARJETA FLOTANTE + FOOTER CLÍNICO */}
<section id="ubicacion" className="relative bg-slate-50 py-0">
  <div className="container max-w-6xl">
{/* MAPA recortado limpio sin overlays */}
<div className="relative -mt-4">
  <div className="rounded-3xl overflow-hidden border shadow relative">
    {/* Pin animado */}
{/* Pin animado — estable + glow violeta */}
<div className="absolute top-1/2 left-[20%] z-30 -translate-y-full">
  <div className="relative flex items-center justify-center">
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ scale: [1, 1.08, 1], y: [0, -3, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="relative flex items-center justify-center"
      style={{ transformOrigin: "center" }}
    >
      {/* Halo externo */}
      <motion.span
        className="absolute h-14 w-14 rounded-full bg-violet-500/25"
        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.2, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
      />

      {/* Pin principal con glow */}
      <div className="relative h-12 w-12 rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-500 shadow-[0_0_15px_rgba(139,92,246,0.6)] flex items-center justify-center">
        <MapPin className="h-6 w-6 text-white drop-shadow-md" />
        {/* Brillo y sombra */}
        <div className="absolute inset-0 rounded-full bg-white/10 blur-md" />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-[6px] bg-violet-400/40 rounded-full blur-sm" />
      </div>
    </motion.div>
  </div>
</div>


    {/* IFRAME limpio sin botones */}
    <div className="relative w-full h-[400px] overflow-hidden">
      <iframe
        className="h-full w-full pointer-events-none select-none"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://maps.google.com/maps?ll=${MAP.lat},${MAP.lng}&z=${MAP.zoom}&t=m&hl=es&output=embed&disableDefaultUI=1&zoomControl=0&mapTypeControl=0&streetViewControl=0&fullscreenControl=0`}
        title="Mapa - Juventud 2000, Mexicali"
      />
    </div>
  </div>

  {/* Botón Ver en Maps */}
  <div className="mt-3 flex justify-start">
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP.query)}`}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium bg-white hover:bg-slate-50 transition shadow-sm"
    >
      Ver en Google Maps
    </a>
  </div>


      {/* TARJETA FLOTANTE */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
        className="md:absolute md:-top-16 lg:-top-10 md:right-6 z-10"
      >
        <Card className="w-full md:w-[520px] p-6 md:p-8 shadow-2xl border-violet-200 bg-white/95 backdrop-blur">
          <h3 className="text-3xl font-extrabold text-violet-700">Contáctanos</h3>
          <p className="text-xs uppercase tracking-wider text-violet-700/80 mb-5">
            Para consultas y asesorías
          </p>

          <form className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Nombre</label>
                <Input placeholder="Tu nombre" />
              </div>
              <div>
                <label className="text-sm font-medium">Teléfono</label>
                <Input placeholder="(686) 123 4567" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Correo</label>
                <Input type="email" placeholder="tucorreo@ejemplo.com" />
              </div>
              <div>
                <label className="text-sm font-medium">Asunto</label>
                <Input placeholder="Cita / Información" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Mensaje</label>
              <Textarea
                rows={4}
                placeholder="Cuéntanos en qué te ayudamos"
                className="resize-none"
              />
            </div>

            <Button
              type="button"
              className="w-full py-3 text-lg bg-violet-700 hover:bg-violet-800 transition-all"
            >
              Enviar mensaje
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>

    {/* BANDA INFERIOR (FOOTER CLÍNICO) */}
    <div className="mt-10 rounded-3xl bg-cyan-400 py-10 md:py-12 shadow-inner">
      <div className="px-6 md:px-10">
        <Reveal variants={stagger} className="grid md:grid-cols-3 gap-10 text-slate-900" retrigger amount={0.25}>
          {/* Logo / texto corto */}
          <motion.div variants={fadeInUp} className="space-y-3">
            <div className="inline-flex items-center gap-3 bg-white rounded-xl px-3 py-2 shadow-sm">
              <div className="h-8 w-8 rounded-full bg-sky-500 grid place-content-center text-white font-bold">N</div>
              <span className="font-semibold">Sonrisa Plus</span>
            </div>
            <p className="text-sm leading-relaxed">
              Con la tecnología dental más avanzada para ayudarte a lucir tu mejor sonrisa.
            </p>
          </motion.div>

          {/* Especialidades */}
          <motion.div variants={fadeInUp}>
            <h4 className="font-extrabold tracking-wide uppercase mb-3">Especialidades</h4>
            <ul className="space-y-1 text-sm">
              <li>Estética dental</li>
              <li>Ortodoncia</li>
              <li>Implantes dentales</li>
              <li>Odontopediatría</li>
              <li>Endodoncia</li>
            </ul>
          </motion.div>

          {/* Contacto */}
          <motion.div variants={fadeInUp}>
            <h4 className="font-extrabold tracking-wide uppercase mb-3">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Av. Reforma 123, Mexicali, BC
              </li>
              <li className="flex items-center gap-2">
                <PhoneCall className="h-4 w-4" /> (686) 123 4567
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" /> WhatsApp disponible
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" /> Higiene certificada
              </li>
            </ul>
          </motion.div>
        </Reveal>
      </div>
    </div>
  </div>
</section>



      {/* CTA final */}
      <section className="section">
        <div className="container text-center">
          <Reveal variants={stagger} retrigger amount={0.25}>
            <motion.h2 variants={fadeInUp} className="h2">Listo para sonreír sin pendientes</motion.h2>
            <motion.p variants={fadeInUp} className="lead mt-2">Da clic para ver disponibilidad y agendar en minutos.</motion.p>
            <motion.div variants={fadeInUp} className="mt-5">
              <Link href="/disponibilidad"><Button className="text-base"><Calendar className="mr-2 h-5 w-5"/>Consulta disponibilidad</Button></Link>
            </motion.div>
          </Reveal>
        </div>
      </section>

      <Footer />

      {/* Botón flotante WhatsApp */}
      <a
        href="https://wa.me/526861234567?text=Hola%20quiero%20informes"
        target="_blank" rel="noreferrer"
        className="fixed right-4 bottom-4 md:right-6 md:bottom-6 rounded-full shadow-lg p-4 bg-green-500 text-white hover:scale-[1.03] transition"
        aria-label="WhatsApp"
      >
        WA
      </a>
    </>
  );
}
