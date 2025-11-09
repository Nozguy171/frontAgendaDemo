"use client";
import { TimeSlot } from "@/features/availability/types";

const colsClass = (n: 3|4|5|6) =>
  ({3:"grid-cols-3",4:"grid-cols-4",5:"grid-cols-5",6:"grid-cols-6"} as const)[n];

export default function ScheduleGrid({
  slots,
  onSelect,
  columns = 4,
}: {
  slots: TimeSlot[];
  onSelect?: (s: TimeSlot) => void;
  columns?: 3 | 4 | 5 | 6;
}) {
  return (
    <div className={`grid ${colsClass(columns)} gap-2 text-sm`}>
      {slots.map((s) => {
        const isBusy = s.status === "busy";
        const label = new Date(s.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        return (
          <button
            key={`${s.start}-${s.end}`}
            disabled={isBusy}
            onClick={() => !isBusy && onSelect?.(s)}
            className={[
              "p-2 rounded-lg border text-center font-medium transition",
              isBusy
                ? "bg-rose-50 border-rose-200 text-rose-600 cursor-not-allowed"
                : "bg-violet-50 border-violet-200 text-violet-700 hover:bg-violet-100 hover:border-violet-300"
            ].join(" ")}
            aria-label={`Slot ${label} ${isBusy ? "ocupado" : "disponible"}`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
