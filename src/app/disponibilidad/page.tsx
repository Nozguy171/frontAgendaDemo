"use client";

import { useEffect, useState } from "react";
import WeekScheduleTable from "@/components/WeekScheduleTable";
import AppointmentForm from "@/components/AppointmentForm";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { Professional } from "@/features/availability/types";
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function DisponibilidadPage() {
  const [pro, setPro] = useState<Professional | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{
    dateISO: string;
    label: string;
  } | null>(null);
  function parseLocal(iso: string) {
  const [datePart, timePart] = iso.split("T");
  const [y, m, d] = datePart.split("-").map(Number);
  const [hh, mm] = timePart.split(":").map(Number);
  return new Date(y, m - 1, d, hh, mm);
}

async function reloadAvailability() {
  const res = await fetch("https://api.demoagenda.shop/availability/week?tenant=divasspa");
  const data = await res.json();

  setPro({
    id: "1",
    name: "Spa",
    role: "",
    phone: "",
    photoUrl: "",

    hoursWeekStart: data.weekStart,
    hoursWeekEnd: data.weekEnd,

    hoursSatStart: data.satStart,
    hoursSatEnd: data.satEnd,
    hoursSunStart: data.sunStart,
    hoursSunEnd: data.sunEnd,

    workingDays: data.workingDays,

    skills: data.services?.map((s: any) => s.name) ?? ["General"],

    slots: data.busySlots.map((s: any) => ({
      id: s.id,          // 👈👈👈 IMPORTANTE
      start: s.start,
      end: s.end,
      status: "busy",
    })),
  });
}


  // ============================
  // CARGAR DISPONIBILIDAD
  // ============================
useEffect(() => {
  async function load() {
    const res = await fetch("https://api.demoagenda.shop/availability/week?tenant=divasspa");
    const data = await res.json();

    setPro({
      id: "1",
      name: "Spa",
      role: "",
      phone: "",
      photoUrl: "",

      hoursWeekStart: data.weekStart,
      hoursWeekEnd: data.weekEnd,

      hoursSatStart: data.satStart,
      hoursSatEnd: data.satEnd,

      hoursSunStart: data.sunStart,
      hoursSunEnd: data.sunEnd,

      workingDays: data.workingDays,

      skills: data.services?.map((s: any) => s.name) ?? ["General"],

      slots: data.busySlots.map((s: any) => ({
        id: s.id,        // 👈👈👈 LO MISMO AQUÍ
        start: s.start,
        end: s.end,
        status: "busy",
      })),
    });
  }

  load();
}, []);


  function toLocalISO(date: Date) {
  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes()) +
    ":00"
  );
}

  // ============================
  //   CREAR LA PUTA CITA
  // ============================
  async function handleCreate({ procedure, phone, name, slot, customerId }: any) {
    try {
      // 1) OBTENER SERVICIOS
      console.log("RAW SLOT:", slot);
console.log("slot.dateISO:", slot?.dateISO);
console.log("parseLocal(slot.dateISO):", parseLocal(slot?.dateISO));


      const resServices = await fetch(
        "https://api.demoagenda.shop/services?tenant=divasspa"
      );
      const services = await resServices.json();

      const service = services.find((s: any) => s.name === procedure);
      if (!service) {
        alert("Servicio no encontrado.");
        return;
      }

      // 2) SI NO EXISTE CUSTOMER → CREARLO
      let finalCustomerId = customerId;

      if (!finalCustomerId) {
        const resNew = await fetch(
          "https://api.demoagenda.shop/customers/create?tenant=divasspa",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone, name }),
          }
        );

        const newC = await resNew.json();
        finalCustomerId = newC.id;
      }

      // 3) CALCULAR HORAS
const start = parseLocal(slot.dateISO);

const end = new Date(start.getTime() + service.duration_minutes * 60000);


      // 4) CREAR CITA
      const resAppt = await fetch(
        "https://api.demoagenda.shop/admin/appointments",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tenant: "divasspa",
            serviceId: service.id,
            customerId: finalCustomerId,
start: toLocalISO(start),
end: toLocalISO(end),

            blocks: service.duration_minutes / 5,
          }),
        }
      );

      const appt = await resAppt.json();
      console.log("CITA CREADA:", appt);

      alert("Cita creada con éxito ✨");
      setOpen(false);

    } catch (err) {
      console.error(err);
      alert("Error al crear cita.");
    }
  }

  if (!pro) return <div className="text-white">Cargando...</div>;

  return (
    
    <main className="section">
      <button
  onClick={() => (window.location.href = "/")}
  className="
    fixed top-6 left-6 z-50 
    px-4 py-2 rounded-lg 
    bg-[#1a1a1e] text-white 
    border border-neutral-700 
    hover:bg-[#222] transition
  "
>
  ← Volver
</button>

      <section className="container mb-10 text-center">
        <h1 className="h2 text-white">Agenda tu cita</h1>
        <p className="lead text-slate-400">
          Selecciona un horario disponible para continuar.
        </p>
      </section>

      <section className="container">
        <WeekScheduleTable
          pro={pro}
          onPick={(slot) => {
            setSelectedSlot(slot);
            setOpen(true);
          }}
        />
      </section>

      {/* MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="
            max-w-md p-6 rounded-2xl
            bg-[#0e0e11] text-white border border-neutral-800
            shadow-[0_0_35px_rgba(255,47,168,0.25)]
          "
        >
          <DialogTitle className="text-lg font-semibold text-pink-500 mb-2">
            Agendar cita
          </DialogTitle>

          <AppointmentForm
            pro={pro}
            slot={selectedSlot}
onConfirm={async (data) => {
  await handleCreate(data);
  await reloadAvailability();  // recarga busySlots
}}

          />
        </DialogContent>
      </Dialog>
    </main>
  );
}
