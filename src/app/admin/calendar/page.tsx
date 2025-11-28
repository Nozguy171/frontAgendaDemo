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
  const [selectedSlot, setSelectedSlot] = useState<{
    dateISO: string;
    label: string;
  } | null>(null);

  const TENANT = "divasspa";

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

  async function load() {
    const settingsRes = await fetch(
      `https://api.demoagenda.shop/admin/settings?tenant=${TENANT}`
    );
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

  workingDays: data.workingDays,

  skills: data.services?.map((s: any) => s.name) ?? ["General"],

  slots: data.busySlots.map((s: any) => ({
    start: s.start,
    end: s.end,
    status: "busy",
  })),
});

  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate({ procedure, phone, name, slot, customerId }: any) {
    const resServices = await fetch(
      `https://api.demoagenda.shop/services?tenant=${TENANT}`
    );
    const services = await resServices.json();

    const service = services.find((s: any) => s.name === procedure);
    if (!service) {
      alert("Servicio no encontrado.");
      return;
    }

    let finalCustomerId = customerId;
    if (!finalCustomerId) {
      const resNew = await fetch(
        `https://api.demoagenda.shop/customers/create?tenant=${TENANT}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone, name }),
        }
      );
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
        <p className="text-neutral-400 mt-1">Consulta y crea citas manualmente</p>
      </div>

      {/* TABLA */}
      <div className="container max-w-5xl">
        <div className="p-6 rounded-2xl border border-neutral-800 bg-[#111113] shadow-md">
          <WeekScheduleTable
            pro={pro}
            onPick={(slot) => {
              setSelectedSlot(slot);
              setOpen(true);
            }}
          />
        </div>
      </div>

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
            Crear cita (Admin)
          </DialogTitle>

          <AppointmentForm
            pro={pro}
            slot={selectedSlot}
            onConfirm={handleCreate}
          />
        </DialogContent>
      </Dialog>
    </main>
  );
}
