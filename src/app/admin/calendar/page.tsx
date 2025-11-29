"use client";

import { useEffect, useState } from "react";
import WeekScheduleTable from "@/components/WeekScheduleTable";
import AppointmentForm from "@/components/AppointmentForm";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { Professional } from "@/features/availability/types";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AdminCalendarPage() {
  const [pro, setPro] = useState<Professional | null>(null);
  const [open, setOpen] = useState(false);
  const [openBusy, setOpenBusy] = useState(false);
const [openChangeService, setOpenChangeService] = useState(false);
const [openReschedule, setOpenReschedule] = useState(false);
const [rescheduleData, setRescheduleData] = useState<{
  newStart: Date | null;
  newEnd: Date | null;
}>({
  newStart: null,
  newEnd: null,
});

  const [selectedSlot, setSelectedSlot] = useState<{ dateISO: string; label: string } | null>(null);

const [selectedBusy, setSelectedBusy] = useState<{
  id: number;
  dateISO: string;
  label: string;
} | null>(null);

  const TENANT = "divasspa";

  // ==========================
  // 🔥 ADMIN ACTIONS
  // ==========================

  async function eliminarCita() {
    if (!selectedBusy) return;

    await fetch(`https://api.demoagenda.shop/admin/appointments/${selectedBusy.id}`, {
      method: "DELETE",
    });

    alert("Cita eliminada");
    setOpenBusy(false);
    await load();
  }

  async function cambiarServicio(serviceId: number) {
    if (!selectedBusy) return;

    await fetch(`https://api.demoagenda.shop/admin/appointments/${selectedBusy.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serviceId }),
    });

    alert("Servicio actualizado ✔️");
    setOpenBusy(false);
    await load();
  }

  async function reagendarCita(nuevoISOStart: string, nuevoISOEnd: string) {
    if (!selectedBusy) return;

    await fetch(`https://api.demoagenda.shop/admin/appointments/${selectedBusy.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        start: nuevoISOStart,
        end: nuevoISOEnd,
      }),
    });

    alert("Cita reagendada");
    setOpenBusy(false);
    await load();
  }

  // ==========================
  // PARSE FECHAS
  // ==========================

  function parseLocal(iso: string) {
    const [datePart, timePart] = iso.split("T");
    const [yyyy, mm, dd] = datePart.split("-").map(Number);
    const [hh, mi] = timePart.split(":").map(Number);
    return new Date(yyyy, mm - 1, dd, hh, mi);
  }

  function toLocalISO(date: Date) {
    const pad = (n: number) => String(n).padStart(2, "0");
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

  // ==========================
  // LOAD DATA
  // ==========================

  async function load() {
    const settingsRes = await fetch(`https://api.demoagenda.shop/admin/settings?tenant=${TENANT}`);
    const settings = await settingsRes.json();

    const availRes = await fetch(
      `https://api.demoagenda.shop/availability/week?tenant=${TENANT}`
    );
    const data = await availRes.json();

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
  id: s.id,             // <-- ADD THIS
  start: s.start,
  end: s.end,
  status: "busy",
})),

    });
  }

  useEffect(() => {
    load();
  }, []);

  // ==========================
  // Crear cita
  // ==========================

  async function handleCreate({ procedure, phone, name, slot, customerId }: any) {
    const resServices = await fetch(`https://api.demoagenda.shop/services?tenant=${TENANT}`);
    const services = await resServices.json();

    const service = services.find((s: any) => s.name === procedure);
    if (!service) {
      alert("Servicio no encontrado.");
      return;
    }

    let finalCustomerId = customerId;
    if (!finalCustomerId) {
      const resNew = await fetch(`https://api.demoagenda.shop/customers/create?tenant=${TENANT}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, name }),
      });
      const newC = await resNew.json();
      finalCustomerId = newC.id;
    }

    const start = parseLocal(slot.dateISO);
    const end = new Date(start.getTime() + service.duration_minutes * 60000);

    await fetch(`https://api.demoagenda.shop/admin/appointments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tenant: TENANT,
        serviceId: service.id,
        customerId: finalCustomerId,
        start: toLocalISO(start),
        end: toLocalISO(end),
        blocks: service.duration_minutes / 5,
      }),
    });

    alert("Cita creada con éxito ✨");
    setOpen(false);
    await load();
  }

  if (!pro) return <div className="p-10 text-white">Cargando...</div>;

  return (
    <main className="min-h-screen bg-[#0e0e11] text-white py-10">

      {/* HEADER */}
      <div className="container max-w-5xl mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/admin">
            <button className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-[#1a1a1e] border border-neutral-700 hover:bg-[#222] transition">
              <ArrowLeft size={16} />
              Volver al panel
            </button>
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-pink-500">Calendario semanal (Admin)</h1>
        <p className="text-neutral-400 mt-1">Consulta y administra citas</p>
      </div>

      {/* TABLA */}
      <div className="container max-w-5xl">
        <div className="p-6 rounded-2xl border border-neutral-800 bg-[#111113] shadow-md">
          <WeekScheduleTable
            pro={pro}
            adminMode={true}
            onPick={(slot) => {
              setSelectedSlot(slot);
              setOpen(true);
            }}
            onPickBusy={(slot) => {
              setSelectedBusy(slot);
              setOpenBusy(true);
            }}
          />
        </div>
      </div>
<Dialog open={openReschedule} onOpenChange={setOpenReschedule}>
  <DialogContent className="max-w-md bg-[#111] text-white border border-neutral-800 rounded-2xl">
    <DialogTitle className="text-pink-500 mb-4">Reagendar cita</DialogTitle>

    <div className="flex flex-col gap-3">

<input
  type="datetime-local"
  className="bg-[#222] p-3 rounded-lg"
  onChange={(e) => {
    const start = new Date(e.target.value);
    const end = new Date(start.getTime() + 45 * 60000);

    setRescheduleData({
      newStart: start,
      newEnd: end,
    });
  }}
/>


<button
  className="bg-blue-600 px-4 py-2 rounded-lg w-full mt-2"
  onClick={async () => {
    if (!rescheduleData.newStart || !rescheduleData.newEnd) return;

    await reagendarCita(
      toLocalISO(rescheduleData.newStart),
      toLocalISO(rescheduleData.newEnd)
    );

    setOpenReschedule(false);

    // limpiar
    setRescheduleData({
      newStart: null,
      newEnd: null,
    });
  }}
>
  Guardar cambios
</button>

    </div>
  </DialogContent>
</Dialog>

      {/* MODAL BUSY */}
      <Dialog open={openBusy} onOpenChange={setOpenBusy}>
        <DialogContent className="max-w-md bg-[#111] text-white border border-neutral-800 rounded-2xl">
          <DialogTitle className="text-pink-500 mb-4">Opciones de cita</DialogTitle>
<button
  onClick={() => {
    setOpenBusy(false);
    setOpenChangeService(true);
  }}
  className="btn-primary w-full"
>
  Cambiar servicio
</button>

<button
  onClick={() => {
    setOpenBusy(false);
    setOpenReschedule(true);
  }}
  className="bg-blue-600 px-4 py-2 rounded-lg w-full"
>
  Reagendar
</button>

<button
  onClick={eliminarCita}
  className="bg-red-600 px-4 py-2 rounded-lg w-full"
>
  Eliminar cita
</button>

        </DialogContent>
      </Dialog>
<Dialog open={openChangeService} onOpenChange={setOpenChangeService}>
  <DialogContent className="max-w-md bg-[#111] text-white border border-neutral-800 rounded-2xl">
    <DialogTitle className="text-pink-500 mb-4">Cambiar servicio</DialogTitle>

    {pro?.skills?.map((name, idx) => (
      <button
        key={idx}
        className="w-full px-4 py-2 rounded-lg bg-primary/20 border border-primary mb-2"
        onClick={async () => {
          const services = await fetch(
            `https://api.demoagenda.shop/services?tenant=${TENANT}`
          ).then((r) => r.json());

          const service = services.find((s: any) => s.name === name);

          await cambiarServicio(service.id);
          setOpenChangeService(false);
        }}
      >
        {name}
      </button>
    ))}
  </DialogContent>
</Dialog>

      {/* MODAL CREAR */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md p-6 bg-[#0e0e11] border border-neutral-800 rounded-2xl shadow-[0_0_35px_rgba(255,47,168,0.25)] text-white">
          <DialogTitle className="text-pink-500 mb-3">Crear cita</DialogTitle>

          <AppointmentForm pro={pro} slot={selectedSlot} onConfirm={handleCreate} />
        </DialogContent>
      </Dialog>
    </main>
  );
}
