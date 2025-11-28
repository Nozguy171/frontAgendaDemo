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
  {
    title: "Carbón activado",
    desc: "Mascarilla para eliminar impurezas.",
    imageUrl: "/images/facial-carbon.jpg"
  },
  {
    title: "Rejuvenecedor",
    desc: "Tratamiento para líneas finas y arrugas.",
    imageUrl: "/images/facial-rejuvenecedor.jpg"
  },
  {
    title: "Humectante",
    desc: "Mascarilla nutritiva para suavizar la piel.",
    imageUrl: "/images/facial-humectante.jpg"
  },
  {
    title: "Masaje relajante",
    desc: "Reduce tensión y calma la mente.",
    imageUrl: "/images/masaje-relajante.jpg"
  },
  {
    title: "Masaje reparador",
    desc: "Masaje para aliviar molestias y dolores.",
    imageUrl: "/images/masaje-terapeutico.jpg"
  },
  {
    title: "Masaje deportivo",
    desc: "Masaje para mejorar el rendimiento físico.",
    imageUrl: "/images/masaje-deportivo.jpg"
  }
]



const equipo = [
  {
    name: "Paloma Romero",
    speciality: "Cosmetóloga & Masajista Profesional",
    experience: "8+ años",
    imageUrl: "/images2/paloma.jpeg",
    bio: "Especialista en masajes terapéuticos, faciales profundos y tratamientos de bienestar. Atención personalizada y experiencia premium.",
  },
]

const MAP = {
  lat: 32.60336183437693,
  lng: -115.4771202697527,
  zoom: 17,
  query: "Centro Recreativo Juventud 2000, Mexicali",
}

const beneficios = [
  { icon: <HeartPulse className="h-6 w-6" />, title: "Atención cálida", desc: "Paloma te guía paso a paso para ofrecerte la mejor experiencia." },
  { icon: <Calendar className="h-6 w-6" />, title: "Agendamiento sencillo", desc: "Programa tu cita en minutos y recibe recordatorios automáticos." },
  { icon: <ShieldCheck className="h-6 w-6" />, title: "Espacio seguro e higiénico", desc: "Limpieza constante y productos de uso profesional." },
]

const precios = [
  { name: "Primera consulta", price: "$300 MXN", items: ["Valoración", "Plan de tratamiento", "Radiografía básica*"] },
  { name: "Limpieza profesional", price: "$700 MXN", items: ["Profilaxis completa", "Flúor", "Recomendaciones personalizadas"] },
  { name: "Blanqueamiento", price: "$1,800 MXN", items: ["Sesión en consultorio", "Guía de cuidado", "Seguimiento"] },
]

const testimonios = [
  { 
    name: "María García", 
    role: "Clienta", 
    text: "El masaje relajante estuvo increíble. Salí como nueva, súper recomendada Paloma.", 
    rating: 5 
  },
  { 
    name: "Carolina López", 
    role: "Clienta", 
    text: "Los faciales dejan la piel bien suavecita y con glow. El trato de Paloma es súper profesional.", 
    rating: 5 
  },
  { 
    name: "Ana Rodríguez", 
    role: "Clienta", 
    text: "El ambiente es muy tranquilo, limpio y bonito. Me encantó la experiencia, volveré pronto.", 
    rating: 5 
  },
]

const whyUs = [
  { icon: "💆‍♀️", title: "Experiencia relajante", desc: "Ambiente cómodo para desconectar del estrés." },
  { icon: "🌸", title: "Cuidado personalizado", desc: "Cada servicio adaptado a tu piel y tu cuerpo." },
  { icon: "✨", title: "Productos premium", desc: "Usamos productos de alta calidad para tu piel." },
  { icon: "🤍", title: "Atención 1 a 1", desc: "Tratamiento directo con Paloma, sin asistentes." },
]

const certificaciones = [
  { name: "Cosmetología", desc: "Certificada en estética y bienestar" },
  { name: "Masoterapia", desc: "Técnicas profesionales de masaje" },
  { name: "SPA Protocol", desc: "Protocolos de higiene y cuidado" },
]


const preguntas = [
  { q: "¿Cómo agendar mi cita?", a: "Puedes agendar por WhatsApp o desde esta página." },
  { q: "¿Duelen las depilaciones?", a: "Paloma utiliza técnicas suaves y productos profesionales." },
  { q: "¿Qué facial me conviene?", a: "En tu primera visita Paloma evalúa tu piel y te recomienda." },
  { q: "¿Aceptan citas el mismo día?", a: "Sí, sujeto a disponibilidad." },
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
<p className="text-sm uppercase tracking-widest font-semibold text-primary">Bienestar y relajación</p>

<motion.h1 className="h1 text-foreground">
  Spa de relajación y belleza en Mexicali
</motion.h1>

<motion.p>
  Masajes, faciales, depilación y tratamientos personalizados con Paloma Romero.
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
✓ Sin compromiso • ✓ Respuesta en 24h • ✓ Ambiente relajante
            </motion.p>
          </Reveal>

          {/* Right: Hero image */}
          <motion.div variants={fadeIn} initial="hidden" animate="show" className="relative">
<div className="aspect-square w-full rounded-2xl overflow-hidden border border-border shadow-2xl relative">
  <Image
    src="/images2/paloma.jpeg"
    alt="Divas Spa Mexicali"
    fill
    className="object-cover"
    priority
  />
</div>


            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-6 -left-6 bg-background rounded-xl shadow-lg p-4 border border-border"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="text-sm">
                  <p className="font-bold">Atención personalizada</p>
<p className="text-xs text-muted-foreground">Con Paloma Romero</p>

                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-primary text-white border-y">
        <div className="container">
<Reveal
  variants={stagger}
  className="grid grid-cols-2 md:grid-cols-5 gap-6"
  retrigger
  amount={0.25}
>
  {[
    { label: "Años de experiencia", value: "+8" },
    { label: "Clientes felices", value: "+1200" },
    { label: "Servicios premium", value: "100%" },
    { label: "Horario entre semana", value: "10AM-7PM" },
    { label: "Horario sábado", value: "10AM-4PM" },
  ].map((stat, i) => (
    <motion.div key={i} variants={fadeInUp} className="text-center">
      <p className="text-xl md:text-2xl font-bold mb-1">{stat.value}</p>
      <p className="text-xs opacity-80">{stat.label}</p>
    </motion.div>
  ))}
</Reveal>

        </div>
      </section>

<section id="servicios" className="section bg-background">
  <div className="container">

    <div className="text-center mb-12">
      <h2 className="h2 title-glow mb-3">Nuestros servicios</h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Faciales y masajes diseñados para tu bienestar, relajación y cuidado personal.
      </p>
    </div>

    {/* FACIALES */}
    <div className="mb-12">
      <h3 className="text-2xl font-bold mb-4 text-primary text-center">Limpieza facial</h3>

      <div className="grid md:grid-cols-3 gap-8">

        {/* Carbón activado */}
<Card className="p-6 border-border bg-card">
          <div className="h-48 w-full relative rounded-xl overflow-hidden mb-4">
            <Image src="/images2/carbon.webp" alt="Facial carbón" fill className="object-cover" />
          </div>
          <h4 className="text-xl font-bold mb-2">Carbón activado</h4>
          <p className="text-muted-foreground">Mascarilla purificante contra impurezas.</p>
        </Card>

        {/* Rejuvenecedor */}
<Card className="p-6 border-border bg-card">
          <div className="h-48 w-full relative rounded-xl overflow-hidden mb-4">
            <Image src="/images2/rejuvenece.jpg" alt="Facial rejuvenecedor" fill className="object-cover" />
          </div>
          <h4 className="text-xl font-bold mb-2">Rejuvenecedor</h4>
          <p className="text-muted-foreground">Tratamiento para líneas finas y arrugas.</p>
        </Card>

        {/* Humectante */}
<Card className="p-6 border-border bg-card">
          <div className="h-48 w-full relative rounded-xl overflow-hidden mb-4">
            <Image src="/images2/humecta.jpg" alt="Facial humectante" fill className="object-cover" />
          </div>
          <h4 className="text-xl font-bold mb-2">Humectante</h4>
          <p className="text-muted-foreground">Hidratación profunda para suavizar la piel.</p>
        </Card>

      </div>
    </div>

    {/* MASAJES */}
    <div>
      <h3 className="text-2xl font-bold mb-4 text-primary text-center">Masajes</h3>

      <div className="grid md:grid-cols-3 gap-8">

        {/* Relajante */}
<Card className="p-6 border-border bg-card">
          <div className="h-48 w-full relative rounded-xl overflow-hidden mb-4">
            <Image src="/images2/relaja.jpg" alt="Masaje relajante" fill className="object-cover" />
          </div>
          <h4 className="text-xl font-bold mb-2">Masaje relajante</h4>
          <p className="text-muted-foreground">Reduce estrés y calma la mente.</p>
        </Card>

        {/* Reparador */}
<Card className="p-6 border-border bg-card">
          <div className="h-48 w-full relative rounded-xl overflow-hidden mb-4">
            <Image src="/images2/reparador.jpg" alt="Masaje reparador" fill className="object-cover" />
          </div>
          <h4 className="text-xl font-bold mb-2">Masaje reparador</h4>
          <p className="text-muted-foreground">Alivia dolores y contracturas.</p>
        </Card>

        {/* Deportivo */}
<Card className="p-6 border-border bg-card">
          <div className="h-48 w-full relative rounded-xl overflow-hidden mb-4">
            <Image src="/images2/deportivo.jpg" alt="Masaje deportivo" fill className="object-cover" />
          </div>
          <h4 className="text-xl font-bold mb-2">Masaje deportivo</h4>
          <p className="text-muted-foreground">Optimiza rendimiento y recuperación.</p>
        </Card>

      </div>
    </div>

  </div>
</section>

<section className="section bg-background" id="nuestro-espacio">
  <div className="container">
    
    <Reveal variants={stagger} className="mb-12 text-center" retrigger amount={0.25}>
      <motion.div variants={fadeInUp} className="flex items-center justify-center gap-3 mb-4">
        <div className="h-1 w-12 bg-primary"></div>
        <p className="text-sm uppercase tracking-widest font-semibold text-primary">Nuestro espacio</p>
        <div className="h-1 w-12 bg-primary"></div>
      </motion.div>

      <motion.h2 variants={fadeInUp} className="h2 title-glow mb-4">
        Un lugar diseñado para tu relajación
      </motion.h2>

      <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Ambiente cómodo, limpio y pensado para brindarte una experiencia cálida y tranquila.
      </motion.p>
    </Reveal>

    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }}
      className="relative rounded-2xl overflow-hidden border border-border shadow-xl max-w-3xl mx-auto"
    >
      <div className="aspect-video relative w-full">
        <Image
          src="/images2/local.jpeg"
          alt="Interior del spa"
          fill
          className="object-cover"
        />
      </div>
    </motion.div>

  </div>
</section>

      <section className="section bg-background">
        <div className="container">
          <Reveal variants={stagger} className="mb-12 text-center" retrigger amount={0.25}>
<p className="text-sm uppercase tracking-widest font-semibold text-primary">Tu especialista</p>

<motion.h2 className="h2  title-glow mb-4">Atención personalizada con Paloma</motion.h2>

<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
  Paloma Romero, cosmetóloga y masajista con más de 8 años de experiencia en bienestar y estética corporal.
  Atención cálida, profesional y completamente personalizada.
</p>

          </Reveal>

<Reveal variants={stagger} className="flex justify-center">
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
  Atención profesional, cálida y personalizada directamente con Paloma Romero.
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

      <section id="por-que-nosotros" className="section bg-background">
        <div className="container">
          <Reveal variants={stagger} className="mb-12 text-center" retrigger amount={0.25}>
            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-3 mb-4">
              <div className="h-1 w-12 bg-primary"></div>
              <p className="text-sm uppercase tracking-widest font-semibold text-primary">Diferencia real</p>
              <div className="h-1 w-12 bg-primary"></div>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="h2 title-glow mb-4">Por qué elegirnos</motion.h2>
<motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
  Razones por las que nuestras clientas confían en Paloma para su bienestar y relajación.
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
            <motion.h2 variants={fadeInUp} className="h2 title-glow mb-4">Respaldos y certificaciones</motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Profesionales certificados internacionalmente con estándares de calidad garantizados.
            </motion.p>
          </Reveal>

          <Reveal variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center gap-6
" retrigger amount={0.25}>
            {certificaciones.map((cert) => (
              <motion.div key={cert.name} variants={fadeInUp}>
                <div className="h-full flex flex-col items-center justify-center p-6 rounded-xl bg-background border border-border hover:shadow-lg hover:border-primary/30 transition-all text-center">
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

      <section id="faq" className="section bg-gradient-to-br from-background to-accent/5">
        <div className="container">
          <Reveal variants={stagger} className="mb-12 text-center" retrigger amount={0.25}>
            <motion.h2 variants={fadeInUp} className="h2 title-glow mb-4">Preguntas frecuentes</motion.h2>
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
                    className="w-full text-left p-6 rounded-lg border border-border bg-background hover:bg-muted/50 transition-all hover:shadow-md group"
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

      <section className="section bg-background">
        <div className="container">
          <Reveal variants={stagger} className="mb-12" retrigger amount={0.25}>
<motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
  Razones por las que nuestras clientas confían en Paloma para su bienestar y relajación.
</motion.p>

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

      <section className="section bg-background">
        <div className="container">
          <Reveal variants={stagger} className="mb-12 text-center" retrigger amount={0.25}>
<motion.h2 variants={fadeInUp} className="h2 title-glow mb-4">Lo que dicen nuestras clientas</motion.h2>
<motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
  Experiencias reales de bienestar y relajación.
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

      <section id="ubicacion" className="relative bg-background py-0">
        <div className="container max-w-6xl">
          <div className="rounded-3xl overflow-hidden border border-border shadow-2xl relative min-h-[500px]">
            <div className="relative w-full h-[500px]">
<iframe
  className="h-full w-full"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3360.5494089096537!2d-115.4818943!3d32.6181896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d77a708b53fc87%3A0xfa10e454c690a4e!2sIsla%20Hawai%20682%2C%20Jardines%20del%20Lago%2C%2021330%20Mexicali%2C%20B.C.!5e0!3m2!1ses!2smx!4v1764364700446!5m2!1ses!2smx"
  style={{ border: 0 }}
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>

            </div>


<motion.div
  variants={fadeInUp}
  initial="hidden"
  whileInView="show"
  viewport={{ once: false, amount: 0.3 }}
  className="md:absolute md:right-6 md:top-1/2 -translate-y-1/2 z-10"
>
  <Card className="w-full md:w-[480px] p-8 shadow-2xl border-border bg-background card">
    <h3 className="text-3xl font-bold mb-2">Agenda tu cita</h3>
    <p className="text-sm text-muted-foreground uppercase tracking-widest mb-6">
      Rápido y sin complicaciones
    </p>

    <div className="space-y-4">
      <Button asChild className="btn-primary w-full py-4 text-lg">
        <Link href="/disponibilidad">
          Agendar ahora
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </Button>

      <Button 
        asChild 
        variant="outline" 
        className="w-full py-3 text-base border-primary/40 text-primary hover:bg-primary/10"
      >
        <a href="https://wa.me/526865092483?text=Hola%20tengo%20una%20pregunta">
          Preguntar por WhatsApp
        </a>
      </Button>
    </div>
  </Card>
</motion.div>

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

        </div>

        {/* Info band */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 py-12 border-t border-border">
          <Reveal variants={stagger} className="col-span-full grid grid-cols-1 md:grid-cols-3 gap-8" retrigger amount={0.25}>
            <motion.div variants={fadeInUp} className="space-y-2">
              <p className="text-sm uppercase tracking-widest font-bold text-primary">Teléfono</p>
<a href="tel:+526865092483" className="text-2xl font-bold hover:text-primary transition">
  (+52) 686 509 2483
</a>

              <p className="text-sm text-muted-foreground">Disponible 24/7 por WhatsApp</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-2">
<p className="text-2xl font-bold">10:00 AM - 7:00 PM</p>
<p className="text-sm text-muted-foreground">Lunes a Viernes</p>

<p className="text-2xl font-bold mt-4">10:00 AM - 4:00 PM</p>
<p className="text-sm text-muted-foreground">Sábado</p>

            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-2">
              <p className="text-sm uppercase tracking-widest font-bold text-primary">Ubicación</p>
              <p className="text-sm font-semibold">Islas Hawai #682, Mexicali, BC</p>
              <p className="text-sm text-muted-foreground">Jardines del Lago</p>
            </motion.div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-gradient-to-br from-primary to-primary/90 text-white text-center">
        <Reveal variants={stagger} retrigger amount={0.25}>
<motion.h2>Tu momento de paz te espera</motion.h2>
          <motion.p variants={fadeInUp} className="lead text-white/90 max-w-2xl mx-auto mb-8">
Agenda tu masaje o facial con Paloma Romero y vive la experiencia Divas Spa.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Button asChild className="bg-background text-primary hover:bg-background/90 text-base px-8 py-4 font-bold">
              <Link href="/disponibilidad">
                Agendar ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </Reveal>
      </section>

      <Footer />

<a
href="https://wa.me/526861234567?text=Hola%20quisiera%20agendar%20una%20cita"
  target="_blank"
  rel="noreferrer"
  className="fixed right-6 bottom-6 z-50 h-16 w-16 rounded-full bg-green-500 text-white shadow-xl hover:shadow-2xl hover:scale-110 transition-all flex items-center justify-center"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    fill="currentColor"
    className="h-8 w-8"
  >
    <path d="M16 3C9.4 3 4 8.4 4 15c0 2.5.8 4.9 2.2 6.9L4 29l7.3-2.1c1.9 1 4.1 1.5 6.7 1.5 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 22.4c-2.1 0-4-.6-5.7-1.7l-.4-.3-4.3 1.2 1.2-4.2-.3-.4C5.4 18.3 4.8 16.7 4.8 15 4.8 9.7 9.7 4.8 16 4.8S27.2 9.7 27.2 15 22.3 25.4 16 25.4zm6-9.1c-.3-.1-1.8-.9-2.1-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.7.2-.2.3-.3.4-.5.1-.1.1-.3.2-.4.1-.2.1-.4 0-.6-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.7c.2.3 2.4 3.7 6 5.1 3.6 1.4 3.6.9 4.3.9.7 0 2.2-.8 2.5-1.7.3-.9.3-1.7.2-1.8-.1-.1-.3-.2-.6-.3z"/>
  </svg>
</a>

    </>
  )
}
