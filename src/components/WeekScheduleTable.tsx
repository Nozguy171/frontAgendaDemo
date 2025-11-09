"use client";
import { Professional, TimeSlot } from "@/features/availability/types";
import { useMemo, useRef, useState } from "react";

/* Utilidades */
type Cell = { dateISO: string; label: string; status: "available"|"busy"|"off"; slot?: TimeSlot };
const dayFmtFull = (d: Date) =>
  d.toLocaleDateString(undefined, { weekday: "short", day: "2-digit", month: "short" });
const dayFmtShort = (d: Date) =>
  d.toLocaleDateString(undefined, { weekday: "short", day: "2-digit" });
const hourLabel = (d: Date) =>
  d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
function startOfDay(d: Date) { const x=new Date(d); x.setHours(0,0,0,0); return x; }
function addDays(d: Date, n: number) { const x=new Date(d); x.setDate(x.getDate()+n); return x; }
function buildHourGrid(minHour=9, maxHour=18, stepMin=60, baseDate=new Date()) {
  const base = startOfDay(baseDate);
  const out: {label:string, date:Date}[] = [];
  for (let h=minHour; h<=maxHour; h++) {
    const d = new Date(base); d.setHours(h,0,0,0); out.push({ label: hourLabel(d), date: d });
    let m = stepMin;
    while (m<60) { const d2=new Date(base); d2.setHours(h,m,0,0); out.push({ label: hourLabel(d2), date: d2 }); m+=stepMin; }
  }
  return out;
}

/* -------- Desktop (tabla) -------- */
function DesktopWeekTable({ pro, onPick }: { pro: Professional; onPick?: (p:{dateISO:string;label:string})=>void }) {
  const { rowLabels, days, grid } = useMemo(() => {
    const base = new Date();
    const working = new Set((pro.workingDays ?? [1,2,3,4,5]));
    let minH = 9, maxH = 18, step = 60;
    if (pro.slots.length) {
      const starts = pro.slots.map(s => new Date(s.start).getHours());
      const ends   = pro.slots.map(s => new Date(s.end).getHours());
      minH = Math.min(...starts, 9); maxH = Math.max(...ends, 18);
      step = pro.slots.some(s => new Date(s.start).getMinutes() !== 0) ? 30 : 60;
    }
    const hourRows = buildHourGrid(minH, maxH, step, base);
    const rowLabels = hourRows.map(h => h.label);
    const days = Array.from({ length: 7 }, (_, i) => addDays(startOfDay(base), i));
    const byLabel = new Map<string, TimeSlot>();
    pro.slots.forEach(s => byLabel.set(hourLabel(new Date(s.start)), s));
    const grid: Cell[][] = rowLabels.map(label => days.map((d, idx) => {
      const dateISO = d.toISOString(), dow = d.getDay();
      if (!(pro.workingDays ?? [1,2,3,4,5]).includes(dow)) return { dateISO, label, status:"off" };
      if (idx===0) { const baseSlot = byLabel.get(label); if (!baseSlot) return { dateISO, label, status:"off" };
        return { dateISO, label, status: baseSlot.status, slot: baseSlot }; }
      if (!byLabel.has(label)) return { dateISO, label, status:"off" };
      return { dateISO, label, status:"available" };
    }));
    return { rowLabels, days, grid };
  }, [pro]);

  const scrollerRef = useRef<HTMLDivElement>(null);
  const scrollBy = (dx:number)=> scrollerRef.current?.scrollBy({ left: dx, behavior:"smooth" });

  return (
    <div className="relative hidden md:block">
      <div className="mb-2 flex justify-end gap-2 md:hidden">
        <button onClick={()=>scrollBy(-280)} className="px-2 py-1 text-xs rounded-md border bg-white">←</button>
        <button onClick={()=>scrollBy(280)} className="px-2 py-1 text-xs rounded-md border bg-white">→</button>
      </div>
      <div className="border rounded-2xl overflow-hidden shadow-sm">
        <div ref={scrollerRef} className="overflow-x-auto" style={{ WebkitOverflowScrolling:"touch" }}>
          <div className="max-h-[60vh] overflow-y-auto">
            <table className="w-full min-w-[1024px] border-separate border-spacing-0">
              <thead className="sticky top-0 z-20 bg-white">
                <tr>
                  <th className="sticky left-0 z-30 bg-white text-left p-2 text-[11px] font-semibold text-slate-500 border-b w-[86px]">Hora</th>
                  {days.map((d,i)=>
                    <th key={i} className="p-2 text-[11px] font-semibold text-slate-500 border-b min-w-[130px]">
                      {dayFmtFull(d)}
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {grid.map((row,r)=>(
                  <tr key={r}>
                    <td className="sticky left-0 z-10 bg-white px-2 py-1 text-[13px] font-medium text-slate-700 border-b">
                      {rowLabels[r]}
                    </td>
                    {row.map((cell,c)=>{
                      const base="w-full px-2 py-1.5 rounded-lg border text-[13px] font-medium transition text-center";
                      const busy="bg-rose-50 border-rose-200 text-rose-600 cursor-not-allowed";
                      const free="bg-green-50 border-green-200 text-green-700 hover:bg-green-100 cursor-pointer";
                      const off ="bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed";
                      const cls = cell.status==="busy"?busy:cell.status==="off"?off:free;
                      return (
                        <td key={c} className="p-1 border-b">
                          <button
                            disabled={cell.status!=="available"}
                            onClick={()=> cell.status==="available" && onPick?.({ dateISO: cell.dateISO, label: cell.label })}
                            className={`${base} ${cls} w-full`}
                          >
                            {cell.status==="off"?"—":cell.status==="busy"?"Ocupado":"Disponible"}
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
    </div>
  );
}

/* -------- Mobile (pestañas + chips) -------- */
function MobileWeek({ pro, onPick }:{ pro:Professional; onPick?:(p:{dateISO:string;label:string})=>void }) {
  const base = startOfDay(new Date());
  const days = Array.from({length:7},(_,i)=>addDays(base,i));
  const working = new Set((pro.workingDays ?? [1,2,3,4,5]));
  const byHour = new Map<string, TimeSlot>();
  pro.slots.forEach(s=> byHour.set(hourLabel(new Date(s.start)), s));
  const [dayIdx, setDayIdx] = useState(0);
  const [onlyAvail, setOnlyAvail] = useState(true);

  // horas del día base (si no hay, asumimos 9–18)
  let minH=9,maxH=18,step=60;
  if (pro.slots.length) {
    const starts=pro.slots.map(s=>new Date(s.start).getHours());
    const ends=pro.slots.map(s=>new Date(s.end).getHours());
    minH=Math.min(...starts,9); maxH=Math.max(...ends,18);
    step=pro.slots.some(s=>new Date(s.start).getMinutes()!==0)?30:60;
  }
  const hourRows = buildHourGrid(minH,maxH,step,new Date());

  // slots del día seleccionado
  const selected = days[dayIdx];
  const dow = selected.getDay();
  const offDay = !working.has(dow);
  const items = hourRows.map(h=>{
    const label = h.label;
    if (offDay || !byHour.has(label)) return { label, status:"off" as const, dateISO:selected.toISOString() };
    if (dayIdx===0) {
      const st = byHour.get(label)!; return { label, status: st.status, dateISO:selected.toISOString() };
    }
    return { label, status:"available" as const, dateISO:selected.toISOString() };
  }).filter(x=> !onlyAvail || x.status==="available");

  return (
    <div className="md:hidden">
      {/* pestañas días */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 -mx-1 px-1">
        {days.map((d,i)=>{
          const isOff=!working.has(d.getDay());
          const active=i===dayIdx;
          return (
            <button
              key={i}
              onClick={()=>setDayIdx(i)}
              className={`shrink-0 px-3 py-2 rounded-xl text-sm border transition 
              ${active ? "bg-sky-50 border-sky-200 text-sky-700" : "bg-white border-slate-200 text-slate-600"}
              ${isOff ? "opacity-50" : ""}`}
            >
              {dayFmtShort(d)}
            </button>
          );
        })}
      </div>

      {/* filtro */}
      <div className="mt-2 mb-3 flex items-center justify-between">
        <span className="text-sm text-slate-600">Horarios {offDay ? "(no laboral)" : ""}</span>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={onlyAvail} onChange={e=>setOnlyAvail(e.target.checked)} />
          Solo disponibles
        </label>
      </div>

      {/* chips de horas */}
      <div className="flex flex-wrap gap-2">
        {items.length===0 && (
          <div className="text-sm text-slate-500">Sin horarios para mostrar.</div>
        )}
        {items.map((x,idx)=>{
          const cls = x.status==="available"
            ? "bg-green-50 text-green-700 border border-green-200"
            : x.status==="busy"
              ? "bg-rose-50 text-rose-600 border border-rose-200"
              : "bg-slate-50 text-slate-400 border border-slate-200";
          return (
            <button
              key={idx}
              disabled={x.status!=="available"}
              onClick={()=> x.status==="available" && onPick?.({ dateISO:x.dateISO, label:x.label })}
              className={`px-3 py-2 rounded-lg text-sm cursor-${x.status==="available"?"pointer":"not-allowed"} ${cls}`}
            >
              {x.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* -------- Export: decide según breakpoint -------- */
export default function WeekScheduleTable({
  pro, onPick,
}: { pro: Professional; onPick?: (p:{dateISO:string;label:string})=>void }) {
  return (
    <>
      <MobileWeek pro={pro} onPick={onPick} />
      <DesktopWeekTable pro={pro} onPick={onPick} />
    </>
  );
}
