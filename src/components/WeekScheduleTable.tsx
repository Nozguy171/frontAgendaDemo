"use client";
import { Professional, TimeSlot } from "@/features/availability/types";
import { useMemo, useRef } from "react";

/* ---------- Utils ---------- */

type Cell = { dateISO: string; label: string; status: "available" | "busy" | "off" };

const dayFmtFull = (d: Date) =>
  d.toLocaleDateString(undefined, { weekday: "short", day: "2-digit", month: "short" });
const hourLabel = (d: Date) =>
  d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const startOfDay = (d: Date) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};
const addDays = (d: Date, n: number) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};

/** Construye filas por HORA (HH:00) dentro de [minHour, maxHour] inclusive. */
function buildHourRows(minHour: number, maxHour: number, baseDate = new Date()) {
  const base = startOfDay(baseDate);
  const out: { label: string; date: Date }[] = [];
  for (let h = minHour; h <= maxHour; h++) {
    const d = new Date(base);
    d.setHours(h, 0, 0, 0);
    out.push({ label: hourLabel(d), date: d });
  }
  return out;
}

/** Parse de `hoursLabel` (ej: "Lun–Vie 9:00–18:00" o "Lun–Sáb 10–20"). */
function parseHoursLabel(label?: string): { minH: number; maxH: number } | null {
  if (!label) return null;
  const m = label.match(
    /(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?\s*[–-]\s*(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?/i
  );
  if (!m) return null;

  const to24 = (hStr: string, _m?: string, ampm?: string) => {
    let h = parseInt(hStr, 10);
    if (!ampm) return h;
    const A = ampm.toUpperCase();
    if (A === "AM") return h % 12;
    return (h % 12) + 12;
  };

  const h1 = to24(m[1], m[2], m[3]);
  const h2 = to24(m[4], m[5], m[6]);
  if (isNaN(h1) || isNaN(h2)) return null;
  return { minH: Math.min(h1, h2), maxH: Math.max(h1, h2) };
}

/** Clave local yyyy-mm-dd|HH para empatar EXACTO día y hora. */
const keyDayHour = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}|${String(d.getHours()).padStart(2, "0")}`;

/** Indexa SOLO los busy por fecha-hora local (HH:00). */
function buildBusyIndex(slots: TimeSlot[]) {
  const set = new Set<string>();
  for (const s of slots) {
    if (s.status !== "busy") continue; // ignoramos 'available'
    const ds = new Date(s.start); // respeta el offset del ISO
    ds.setMinutes(0, 0, 0);       // UI es por HH:00
    set.add(keyDayHour(ds));
  }
  return set;
}

/* ---------- Tabla única responsiva (móvil = igual que desktop) ---------- */

export default function WeekScheduleTable({
  pro,
  onPick,
}: {
  pro: Professional;
  onPick?: (p: { dateISO: string; label: string }) => void;
}) {
  const { rowLabels, days, grid } = useMemo(() => {
    const today = new Date();
    const workingDays = new Set(pro.workingDays ?? [1, 2, 3, 4, 5]);

    // Horario laboral desde hoursLabel; fallback 8–20
    const parsed = parseHoursLabel(pro.hoursLabel);
    const minH = parsed?.minH ?? 8;
    const maxH = parsed?.maxH ?? 20;

    // Horas del horario (no recortamos por slots)
    const hourRows = buildHourRows(minH, maxH, today);
    const rowLabels = hourRows.map((h) => h.label);
    const days = Array.from({ length: 7 }, (_, i) => addDays(startOfDay(today), i));

    // Busy exactos por día+hora
    const busyIdx = buildBusyIndex(pro.slots);

    // Día laboral => disponible salvo que exista busy en esa fecha-hora
    const grid: Cell[][] = hourRows.map((hRow) =>
      days.map((d) => {
        const cellDate = new Date(d);
        cellDate.setHours(hRow.date.getHours(), 0, 0, 0);
        const dateISO = cellDate.toISOString();

        if (!workingDays.has(d.getDay())) {
          return { dateISO, label: hourLabel(cellDate), status: "off" };
        }

        const k = keyDayHour(cellDate);
        if (busyIdx.has(k)) return { dateISO, label: hourLabel(cellDate), status: "busy" };

        return { dateISO, label: hourLabel(cellDate), status: "available" };
      })
    );

    return { rowLabels, days, grid };
  }, [pro]);

  const scrollerRef = useRef<HTMLDivElement>(null);
  const scrollBy = (dx: number) => scrollerRef.current?.scrollBy({ left: dx, behavior: "smooth" });

  return (
    <div className="relative">
      {/* Botones de scroll (opcionales) sólo visibles en pantallas pequeñas */}
      <div className="mb-2 flex gap-2 md:hidden justify-end">
        <button
          onClick={() => scrollBy(-280)}
          className="px-2 py-1 text-xs rounded-md border bg-white"
          aria-label="Scroll izquierda"
        >
          ←
        </button>
        <button
          onClick={() => scrollBy(280)}
          className="px-2 py-1 text-xs rounded-md border bg-white"
          aria-label="Scroll derecha"
        >
          →
        </button>
      </div>

      <div className="border rounded-2xl overflow-hidden shadow-sm">
        <div
          ref={scrollerRef}
          className="overflow-x-auto"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {/* max-h + overflow-y para que cabeza/columna queden sticky también en móvil */}
          <div className="max-h-[70vh] overflow-y-auto">
            <table className="w-full min-w-[860px] md:min-w-[1024px] border-separate border-spacing-0">
              <thead className="sticky top-0 z-20 bg-white">
                <tr>
                  <th className="sticky left-0 z-30 bg-white text-left p-2 text-[11px] font-semibold text-slate-500 border-b w-[86px]">
                    Hora
                  </th>
                  {days.map((d, i) => (
                    <th
                      key={i}
                      className="p-2 text-[11px] font-semibold text-slate-500 border-b min-w-[130px]"
                    >
                      {dayFmtFull(d)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {grid.map((row, r) => (
                  <tr key={r}>
                    <td className="sticky left-0 z-10 bg-white px-2 py-1 text-[13px] font-medium text-slate-700 border-b">
                      {rowLabels[r]}
                    </td>
                    {row.map((cell, c) => {
                      const base =
                        "w-full px-2 py-1.5 rounded-lg border text-[13px] font-medium transition text-center";
                      const off =
                        "bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed";
                      const busy =
                        "bg-rose-50 border-rose-200 text-rose-600 cursor-not-allowed";
                      const free =
                        "bg-green-50 border-green-200 text-green-700 hover:bg-green-100 cursor-pointer";
                      const cls =
                        cell.status === "off" ? off : cell.status === "busy" ? busy : free;

                      return (
                        <td key={c} className="p-1 border-b">
                          <button
                            disabled={cell.status !== "available"}
                            onClick={() =>
                              cell.status === "available" &&
                              onPick?.({ dateISO: cell.dateISO, label: cell.label })
                            }
                            className={`${base} ${cls} w-full`}
                          >
                            {cell.status === "off"
                              ? "—"
                              : cell.status === "busy"
                              ? "Ocupado"
                              : "Disponible"}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Leyenda compacta (se ve en todos los tamaños) */}
      <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-slate-500">
        <span className="inline-flex items-center gap-1">
          <span className="h-3 w-3 rounded bg-green-100 border border-green-200" /> Disponible
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="h-3 w-3 rounded bg-rose-100 border border-rose-200" /> Ocupado
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="h-3 w-3 rounded bg-slate-100 border border-slate-200" /> No laboral
        </span>
      </div>
    </div>
  );
}
