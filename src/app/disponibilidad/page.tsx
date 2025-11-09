"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProfessionalCard from "@/features/availability/components/ProfessionalCard";
import ProfessionalDialog from "@/features/availability/components/ProfessionalDialog";
import { PROS } from "@/features/availability/mocks";
import { Professional, TimeSlot } from "@/features/availability/types";
import { motion } from "framer-motion";
import Reveal from "@/components/animate/Reveal";
import { fadeInUp, stagger } from "@/lib/anim";

export default function DisponibilidadPage() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Professional | null>(null);

  return (
    <main className="section">
      {/* HERO mini, estilo landing */}
      <section className="container text-center mb-10">
        <Reveal variants={stagger} className="space-y-2" retrigger amount={0.25}>
          <motion.p variants={fadeInUp} className="inline-flex items-center gap-2 text-sm font-medium text-sky-600 bg-sky-50 border border-sky-100 px-3 py-1 rounded-full">
            Agenda fácil • WhatsApp incluido
          </motion.p>
          <motion.h1 variants={fadeInUp} className="h2">Consulta de disponibilidad</motion.h1>
          <motion.p variants={fadeInUp} className="lead text-slate-600">
            Selecciona un profesional para ver horarios y procedimientos.
          </motion.p>
        </Reveal>
      </section>

      {/* GRID profesionales */}
      <section className="container">
        <Reveal variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8" retrigger>
          {PROS.map((p) => (
            <motion.div key={p.id} variants={fadeInUp}>
              <ProfessionalCard
                name={p.name}
                role={p.role}
                phone={p.phone}
                photoUrl={p.photoUrl}
                hoursLabel={p.hoursLabel}
                onClick={() => { setCurrent(p); setOpen(true); }}
              />
            </motion.div>
          ))}
        </Reveal>

        <div className="text-center mt-12">
          <Link href="/"><Button variant="outline">Volver al inicio</Button></Link>
        </div>
      </section>

      {/* DIALOG detalle */}
      <ProfessionalDialog
        open={open}
        onOpenChange={setOpen}
        pro={current}


      />
    </main>
  );
}
