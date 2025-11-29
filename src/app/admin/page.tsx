"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminDashboard() {
  const TENANT = "divasspa";

  // ===== TENANT SETTINGS =====
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
const [weekStart, setWeekStart] = useState<string>("");  // L-V apertura
const [weekEnd, setWeekEnd] = useState<string>("");      // L-V cierre

const [satStart, setSatStart] = useState<string>("");    // Sábado apertura
const [satEnd, setSatEnd] = useState<string>("");        // Sábado cierre
const [sunStart, setSunStart] = useState("");
const [sunEnd, setSunEnd] = useState("");

  const [workingDays, setWorkingDays] = useState<number[]>([]);

  // ===== SERVICES =====
  const [services, setServices] = useState<any[]>([]);
  const [newServiceName, setNewServiceName] = useState<string>("");
  const [newServiceDuration, setNewServiceDuration] = useState<string>("");

  // ===== APPOINTMENTS =====
  const [appointmentsToday, setAppointmentsToday] = useState<any[]>([]);

  // ============================================
  // LOAD SETTINGS
  // ============================================
async function loadSettings() {
  const res = await fetch(`https://api.demoagenda.shop/admin/settings?tenant=${TENANT}`);
  const data = await res.json();

  setName(data.name ?? "");
  setPhone(data.phone ?? "");

  setWeekStart(data.weekStart ?? "");
  setWeekEnd(data.weekEnd ?? "");

  setSatStart(data.satStart ?? "");
  setSatEnd(data.satEnd ?? "");
setSunStart(data.sunStart ?? "");
setSunEnd(data.sunEnd ?? "");

  setWorkingDays(data.workingDays ?? [1,2,3,4,5,6]);
}


async function saveSettings() {
  await fetch(`https://api.demoagenda.shop/admin/settings?tenant=${TENANT}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
body: JSON.stringify({
  name,
  phone,
  weekStart,
  weekEnd,
  satStart,
  satEnd,
  sunStart,
  sunEnd,
  workingDays
}),

  });

  alert("Información del negocio actualizada ✔️");
  loadSettings();
}


  // ============================================
  // SERVICES
  // ============================================
  async function loadServices() {
    const res = await fetch(`https://api.demoagenda.shop/admin/services?tenant=${TENANT}`);
    setServices(await res.json());
  }

  async function createService() {
    if (!newServiceName || !newServiceDuration) return;

    await fetch(`https://api.demoagenda.shop/admin/services?tenant=${TENANT}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newServiceName,
        durationMinutes: Number(newServiceDuration),
      }),
    });

    setNewServiceName("");
    setNewServiceDuration("");
    loadServices();
  }

  async function deleteService(id: number) {
    await fetch(`https://api.demoagenda.shop/admin/services/${id}`, { method: "DELETE" });
    loadServices();
  }

  // ============================================
  // APPOINTMENTS TODAY
  // ============================================
  function getLocalDate() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
async function loadAppointmentsToday() {
  const today = getLocalDate();
  const res = await fetch(
    `https://api.demoagenda.shop/appointments/day?tenant=${TENANT}&date=${today}`
  );
  const data = await res.json();

  const fixed = data.map((a:any) => ({
    id: a.id,
    date: a.date,
    startTime: a.start_time,
    endTime: a.end_time,
    customer: a.customer,
    service: a.service,
  }));

  setAppointmentsToday(fixed);
}

  useEffect(() => {
    loadSettings();
    loadServices();
    loadAppointmentsToday();
  }, []);

  // ============================================
  // WORKING DAY TOGGLE
  // ============================================
  function toggleDay(id: number) {
    setWorkingDays((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  }

  const DAYS = [
    { id: 0, name: "Dom" },
    { id: 1, name: "Lun" },
    { id: 2, name: "Mar" },
    { id: 3, name: "Mié" },
    { id: 4, name: "Jue" },
    { id: 5, name: "Vie" },
    { id: 6, name: "Sáb" },
  ];

  return (
    <div className="space-y-12 container py-10">

      {/* HEADER */}
      <section className="space-y-1">
        <h1 className="h2 title-glow">Panel administrativo</h1>
        <p className="text-muted-foreground">Bienvenida, Divas Spa 💅</p>
      </section>

      {/* RESUMEN */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="card">
          <h2 className="h3">Citas de hoy</h2>
          <p className="mt-2 text-lg">
            Hoy tienes <span className="font-bold text-primary">{appointmentsToday.length}</span> citas.
          </p>
        </div>

        <div className="card flex flex-col justify-between">
          <h2 className="h3 mb-3">Calendario</h2>
          <Link href="/admin/calendar">
            <button className="btn-primary w-full">Ver calendario</button>
          </Link>
        </div>

      </section>

      {/* SETTINGS */}
      <section className="card space-y-6">
        <h2 className="h3 text-primary">Información del negocio</h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            className="bg-secondary text-foreground"
            placeholder="Nombre del negocio"
            value={name ?? ""}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            className="bg-secondary text-foreground"
            placeholder="Teléfono"
            value={phone ?? ""}
            onChange={(e) => setPhone(e.target.value)}
          />

{/* Lunes a Viernes */}
<div className="border p-4 rounded-lg">
  <p className="font-semibold mb-2">Horario Lunes a Viernes</p>

  <label className="text-sm text-muted-foreground">Apertura</label>
  <Input
    type="time"
    className="bg-secondary text-foreground mb-2"
    value={weekStart}
    onChange={(e) => setWeekStart(e.target.value)}
  />

  <label className="text-sm text-muted-foreground">Cierre</label>
  <Input
    type="time"
    className="bg-secondary text-foreground"
    value={weekEnd}
    onChange={(e) => setWeekEnd(e.target.value)}
  />
</div>

{/* Sábado */}
<div className="border p-4 rounded-lg">
  <p className="font-semibold mb-2">Horario Sábado</p>

  <label className="text-sm text-muted-foreground">Apertura</label>
  <Input
    type="time"
    className="bg-secondary text-foreground mb-2"
    value={satStart}
    onChange={(e) => setSatStart(e.target.value)}
  />

  <label className="text-sm text-muted-foreground">Cierre</label>
  <Input
    type="time"
    className="bg-secondary text-foreground"
    value={satEnd}
    onChange={(e) => setSatEnd(e.target.value)}
  />
</div>
{/* Domingo */}
<div className="border p-4 rounded-lg">
  <p className="font-semibold mb-2">Horario Domingo</p>

  <label className="text-sm text-muted-foreground">Apertura</label>
  <Input
    type="time"
    className="bg-secondary text-foreground mb-2"
    value={sunStart}
    onChange={(e) => setSunStart(e.target.value)}
  />

  <label className="text-sm text-muted-foreground">Cierre</label>
  <Input
    type="time"
    className="bg-secondary text-foreground"
    value={sunEnd}
    onChange={(e) => setSunEnd(e.target.value)}
  />
</div>


        </div>

        {/* WORKING DAYS */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">Días laborales</p>

          <div className="flex gap-2 flex-wrap">
            {DAYS.map((d) => (
              <button
                key={d.id}
                onClick={() => toggleDay(d.id)}
                className={`px-4 py-2 rounded-lg border text-sm font-semibold transition
                  ${
                    workingDays.includes(d.id)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-secondary text-muted-foreground border-muted"
                  }`}
              >
                {d.name}
              </button>
            ))}
          </div>
        </div>

        <button className="btn-primary" onClick={saveSettings}>
          Guardar cambios
        </button>
      </section>

      {/* SERVICES */}
      <section className="card space-y-6">
        <h2 className="h3 text-primary">Servicios</h2>

        <div className="grid sm:grid-cols-3 gap-4">
          <Input
            className="bg-secondary text-foreground"
            placeholder="Nombre"
            value={newServiceName ?? ""}
            onChange={(e) => setNewServiceName(e.target.value)}
          />

<select
  className="bg-secondary text-foreground rounded-lg px-3 py-2 border border-muted focus:outline-none focus:ring-2 focus:ring-primary"
  value={newServiceDuration ?? ""}
  onChange={(e) => setNewServiceDuration(e.target.value)}
>
  <option value="">Duración</option>
  <option value="15">15 min</option>
  <option value="30">30 min</option>
  <option value="45">45 min</option>
  <option value="60">60 min</option>
  <option value="75">1h 15m</option>
  <option value="90">1h 30m</option>
  <option value="105">1h 45m</option>
  <option value="120">2 horas</option>
</select>


          <button className="btn-primary" onClick={createService}>
            Agregar
          </button>
        </div>

        {services.map((s) => (
          <div
            key={s.id}
            className="flex justify-between items-center p-4 border rounded-xl bg-secondary"
          >
            <div>
              <p className="font-semibold">{s.name}</p>
              <p className="text-sm text-muted-foreground">
                {s.durationMinutes} min
              </p>
            </div>

            <button
              className="btn-outline text-primary border-primary"
              onClick={() => deleteService(s.id)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </section>

      {/* APPOINTMENTS TODAY */}
      <section className="card space-y-6">
        <h2 className="h3 text-primary">Citas de hoy</h2>

        {appointmentsToday.length === 0 && (
          <p className="text-muted-foreground">No hay citas hoy.</p>
        )}

{appointmentsToday.length > 0 && (
  <div className="grid gap-3">
    {appointmentsToday.map((a) => (
      <div
        key={a.id}
        className="
          flex flex-col gap-2 p-4 rounded-xl
          bg-[#1a1a1d] border border-neutral-700
          shadow-[0_0_15px_rgba(255,47,168,0.15)]
          transition hover:shadow-[0_0_25px_rgba(255,47,168,0.25)]
        "
      >
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg text-white">
            {a.customer?.name ?? "Cliente"}
          </p>

          <span className="
            px-2 py-1 text-xs rounded-md 
            bg-pink-900/30 text-pink-300 border border-pink-800
          ">
            {a.service?.name ?? "Servicio"}
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-400">
          <span className="flex items-center gap-1">
            🗓️ {a.date}
          </span>

          <span className="flex items-center gap-1">
            ⏰ {a.startTime} → {a.endTime}
          </span>
        </div>
      </div>
    ))}
  </div>
)}

      </section>

    </div>
  );
}
