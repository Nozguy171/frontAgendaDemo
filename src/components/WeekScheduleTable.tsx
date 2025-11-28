"use client";
import { Professional, TimeSlot } from "@/features/availability/types";
import { useMemo, useRef, useState } from "react";

type Cell = { dateISO: string; label: string; status: "available" | "busy" | "off" };

const fmtDay = (d: Date) =>
  d.toLocaleDateString(undefined, { weekday: "short", day: "2-digit", month: "short" });

const fmtTime = (d: Date) =>
  d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });

const startOfDay = (d: Date) => new Date(d.setHours(0, 0, 0, 0));
const addDays = (d: Date, n: number) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

// -----------------------------
// 🔥 Generar bloques de 15 min
// -----------------------------
function buildQuarterRows(startH: number, startM: number, endH: number, endM: number, base: Date) {
  const rows: { label: string; date: Date }[] = [];
  let h = startH;
  let m = startM;

  while (h < endH || (h === endH && m <= endM)) {
    const d = new Date(base);
    d.setHours(h, m, 0, 0);
    rows.push({ label: fmtTime(d), date: d });

    m += 15;
    if (m >= 60) {
      m = 0;
      h++;
    }
  }

  return rows;
}

function parseHM(str: string) {
  const [h, m] = str.split(":").map(Number);
  return { h, m };
}

function key(d: Date) {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}-${d.getHours()}-${d.getMinutes()}`;
}

function parseLocalDate(str: string) {
  const [datePart, timePart] = str.split("T");
  const [y, m, d] = datePart.split("-").map(Number);
  const [hh, mm, ss] = timePart.split(":").map(Number);
  return new Date(y, m - 1, d, hh, mm, ss ?? 0);
}

function buildBusy(slots: TimeSlot[]) {
  const set = new Set<string>();

  for (const s of slots) {
    if (s.status !== "busy") continue;

    const d = parseLocalDate(s.start);
    d.setSeconds(0, 0);
    set.add(key(d));
  }

  return set;
}

// =======================================
// 🔥 COMPONENTE PRINCIPAL
// =======================================
export default function WeekScheduleTable({
  pro,
  onPick,
}: {
  pro: Professional;
  onPick?: (slot: { dateISO: string; label: string }) => void;
}) {
  const [weekOffset, setWeekOffset] = useState(0);

  const { rowLabels, days, grid } = useMemo(() => {
    const base = new Date();
    base.setDate(base.getDate() + weekOffset * 7);

    const busy = buildBusy(pro.slots);

    const days = Array.from({ length: 7 }, (_, i) => addDays(startOfDay(new Date(base)), i));

    // ============================
    // 🔥 Por cada día elegimos horario
    // ============================
// =========================
// 🔥 Construir TODAS las horas posibles
// =========================
let allHours: Set<string> = new Set();

days.forEach((d) => {
  const day = d.getDay();

  if (day === 0) return; // domingo off

  const start = day === 6 ? pro.hoursSatStart : pro.hoursWeekStart;
  const end   = day === 6 ? pro.hoursSatEnd   : pro.hoursWeekEnd;

  const { h: sh, m: sm } = parseHM(start);
  const { h: eh, m: em } = parseHM(end);

  const rows = buildQuarterRows(sh, sm, eh, em, d);
  rows.forEach((r) => allHours.add(r.label));
});

// Ordenar horas
const rowLabels = Array.from(allHours).sort((a, b) => {
  const [ah, am] = a.split(":").map(Number);
  const [bh, bm] = b.split(":").map(Number);
  return ah === bh ? am - bm : ah - bh;
});

    function toLocalISOString(d: Date) {
      const pad = (n: number) => n.toString().padStart(2, "0");
      return (
        d.getFullYear() +
        "-" + pad(d.getMonth() + 1) +
        "-" + pad(d.getDate()) +
        "T" + pad(d.getHours()) +
        ":" + pad(d.getMinutes()) +
        ":00"
      );
    }

    // ============================
    // 🔥 GRID FINAL 7 DÍAS × ROWS
    // ============================
    const grid: Cell[][] = rowLabels.map((label) =>
      days.map((d) => {
        const day = d.getDay();

        if (day === 0) {
          return { dateISO: "", label, status: "off" };
        }

        let start = pro.hoursWeekStart;
        let end = pro.hoursWeekEnd;

        if (day === 6) {
          start = pro.hoursSatStart;
          end = pro.hoursSatEnd;
        }

        const { h: sh, m: sm } = parseHM(start);
        const { h: eh, m: em } = parseHM(end);

        const [lh, lm] = label.split(":").map(Number);
const inside =
  (lh > sh || (lh === sh && lm >= sm)) &&
  (lh < eh || (lh === eh && lm <= em));

if (!inside) {
  return { dateISO: "", label, status: "off" };
}


        const x = new Date(d);
        x.setHours(lh, lm, 0, 0);
        const iso = toLocalISOString(x);

        if (busy.has(key(x))) {
          return { dateISO: iso, label, status: "busy" };
        }

        return { dateISO: iso, label, status: "available" };
      })
    );

    return { rowLabels, days, grid };
  }, [pro, weekOffset]);

  const scroller = useRef<HTMLDivElement>(null);

  // ======================
  // 🔥 CLASES
  // ======================
  const baseBtn =
    "w-full px-2 py-2 rounded-md text-[13px] font-medium transition text-center select-none";

  const clsAvailable =
    "bg-primary/10 border border-primary text-primary hover:bg-primary hover:text-primary-foreground";

  const clsBusy =
    "bg-[#2d0b18] border border-pink-800 text-pink-700 cursor-not-allowed opacity-50";

  const clsOff = "bg-muted border-border text-muted-foreground cursor-not-allowed";

  return (
    <div className="relative">

      {/* Navegación semanas */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setWeekOffset(weekOffset - 1)}
          className="px-4 py-2 rounded-lg bg-secondary text-muted-foreground border border-border hover:bg-muted"
        >
          ← Semana anterior
        </button>

        <span className="text-primary font-semibold text-sm">
          Semana del {fmtDay(days[0])}
        </span>

        <button
          onClick={() => setWeekOffset(weekOffset + 1)}
          className="px-4 py-2 rounded-lg bg-secondary text-muted-foreground border border-border hover:bg-muted"
        >
          Semana siguiente →
        </button>
      </div>

      {/* TABLA */}
      <div className="border border-border rounded-2xl overflow-hidden shadow bg-card text-card-foreground">
        <div ref={scroller} className="overflow-auto max-h-[62vh]">
          <table className="w-full table-fixed border-separate border-spacing-0">
            
            {/* HEADER */}
            <thead className="bg-secondary sticky top-0 z-40 text-muted-foreground">
              <tr>
                <th className="sticky left-0 top-0 z-50 bg-secondary px-3 py-2 text-[11px] font-semibold border-b border-border text-foreground">
                  Hora
                </th>
                {days.map((d, i) => (
                  <th
                    key={i}
                    className="px-3 py-2 text-[11px] font-semibold border-b border-border text-foreground"
                  >
                    {fmtDay(d)}
                  </th>
                ))}
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {grid.map((row, i) => (
                <tr key={i}>
                  <td className="sticky left-0 bg-secondary z-30 px-3 py-2 text-[13px] font-medium border-b border-border text-foreground">
                    {rowLabels[i]}
                  </td>

                  {row.map((cel, j) => {
                    const cls =
                      cel.status === "available"
                        ? clsAvailable
                        : cel.status === "busy"
                        ? clsBusy
                        : clsOff;

                    return (
                      <td key={j} className="p-1 border-b border-border">
                        <button
                          onClick={() =>
                            cel.status === "available" &&
                            onPick?.({ dateISO: cel.dateISO, label: cel.label })
                          }
                          disabled={cel.status !== "available"}
                          className={`${baseBtn} ${cls}`}
                        >
                          {cel.status === "available"
                            ? "Disponible"
                            : cel.status === "busy"
                            ? "Ocupado"
                            : "—"}
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

      {/* LEYENDA */}
      <div className="mt-4 flex gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded bg-primary/20 border border-primary" /> Libre
        </span>
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded bg-primary/30 border border-primary" /> Ocupado
        </span>
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded bg-muted border border-border" /> No Laboral
        </span>
      </div>

    </div>
  );
}
