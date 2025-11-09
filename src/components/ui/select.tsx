"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/** 
 * Select nativo estilizado (simple y robusto).
 * Uso:
 * <SimpleSelect
 *   options={["Limpieza","Resinas"]}
 *   value={value}
 *   onValueChange={setValue}
 *   placeholder="Selecciona uno"
 * />
 */
export function SimpleSelect({
  options,
  value,
  onValueChange,
  placeholder,
  className,
  disabled,
}: {
  options: string[];
  value?: string;
  onValueChange?: (v: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <div className={cn("relative", className)}>
      <select
        value={value ?? ""}
        onChange={(e) => onValueChange?.(e.target.value)}
        disabled={disabled}
        className={cn(
          "w-full appearance-none rounded-xl border border-slate-300 bg-white px-3 py-2.5 pr-10",
          "text-[14px] text-slate-800 outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500",
          "disabled:opacity-50"
        )}
      >
        <option value="" disabled>
          {placeholder ?? "Selecciona una opción"}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      {/* caret */}
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
        ▼
      </span>
    </div>
  );
}

/* ---------- Stubs de compatibilidad (por si en otro lado importaste estos nombres) ---------- */

export function Select(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} />;
}
export function SelectTrigger(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} />;
}
export function SelectContent(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} />;
}
export function SelectItem({
  children,
}: React.HTMLAttributes<HTMLDivElement> & { value?: string }) {
  return <div>{children}</div>;
}
export function SelectValue({
  placeholder,
}: {
  placeholder?: string;
}) {
  return <span className="text-slate-500">{placeholder ?? ""}</span>;
}
