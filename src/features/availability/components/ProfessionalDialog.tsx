// src/features/availability/components/ProfessionalDialog.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import WeekScheduleTable from "@/components/WeekScheduleTable";
import { Professional } from "../types";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SimpleSelect } from "@/components/ui/select";
import ToastLite from "@/components/ui/toast-lite";

type PickedSlot = { dateISO: string; label: string };

export default function ProfessionalDialog({
  open,
  onOpenChange,
  pro,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  pro: Professional | null;
}) {
  // estado del flujo de agendado
  const [picked, setPicked] = useState<PickedSlot | null>(null);
  const [procedure, setProcedure] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: procedimiento, 2: teléfono, 3: nombre (si es nuevo)

  // toast
  const [toastOpen, setToastOpen] = useState(false);

  // opciones memorizadas (evita re-renders del select)
  const skillOptions = useMemo(() => (pro?.skills ?? []).map((s) => s), [pro?.skills]);

  // reset helpers
  const resetFlow = () => {
    setPicked(null);
    setProcedure("");
    setPhone("");
    setName("");
    setStep(1);
  };

  // si se cierra el diálogo → resetea
  const handleOpenChange = (v: boolean) => {
    onOpenChange(v);
    if (!v) resetFlow();
  };

  // si cambia de profesional mientras está abierto → resetea
  useEffect(() => {
    if (open) resetFlow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pro?.id]);

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          className="
            bg-white/95 backdrop-blur border-violet-200 sm:rounded-3xl rounded-none
            sm:max-w-4xl sm:w-[92vw] w-screen sm:max-h-[88vh] max-h-[100dvh] h-[100dvh] sm:h-auto
            p-0 overflow-hidden
          "
        >
          {/* Radix requiere título accesible */}
          <DialogTitle className="sr-only">
            {pro?.name ?? "Detalle de profesional"}
          </DialogTitle>

          {pro && (
            <div className="flex flex-col h-full">
              {/* Header compacto */}
              <div className="relative">
                <div className="h-20 w-full bg-gradient-to-r from-sky-50 via-violet-50 to-fuchsia-50 border-b" />
                <div className="px-6 -mt-10 pb-2">
                  <div className="grid grid-cols-[88px_1fr] gap-4 items-end">
                    <div className="relative w-22 h-22 rounded-full overflow-hidden ring-4 ring-white shadow-lg bg-slate-100">
                      {pro.photoUrl && (
                        <img
                          src={pro.photoUrl}
                          alt={pro.name}
                          className="h-full w-full object-cover select-none"
                          loading="lazy"
                          draggable={false}
                        />
                      )}
                    </div>

                    <div className="flex flex-col">
                      <h1 className="text-[22px] font-extrabold text-slate-900 leading-tight">
                        {pro.name}
                      </h1>
                      <div className="text-[13px] text-slate-600">
                        {pro.role}
                        {pro.hoursLabel && (
                          <>
                            <span className="mx-2 text-slate-300">•</span>
                            <span>{pro.hoursLabel}</span>
                          </>
                        )}
                      </div>
                      {pro.phone && (
                        <div className="mt-1 text-[13px] text-slate-500">
                          {pro.phone}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Procedimientos chips */}
              <div className="px-6 pt-2">
                <h4 className="font-extrabold tracking-tight text-slate-800 text-base mb-2">
                  Procedimientos
                </h4>
                <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                  {(pro.skills ?? []).map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[12px] font-medium 
                        bg-white/80 border-slate-200 text-slate-700 shadow-sm hover:bg-slate-50 shrink-0"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Agenda o flujo de agendado */}
              {!picked ? (
                <>
                  <div className="px-6 mt-4 mb-2 flex items-center justify-between">
                    <h4 className="font-extrabold tracking-tight text-slate-800 text-base">
                      Agenda (7 días)
                    </h4>
                    <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-500">
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

                  <div className="px-6 pb-24 overflow-auto sm:max-h-[62vh]">
                    <WeekScheduleTable
                      pro={pro}
                      onPick={(p) => {
                        setPicked(p);
                        setStep(1);
                      }}
                    />
                  </div>
                </>
              ) : (
                // ======== Flujo de agendado ========
                <div className="px-6 pb-24 overflow-auto sm:max-h-[62vh]">
                  <div className="rounded-2xl border bg-white/80 p-5 shadow-sm">
                    <p className="text-sm text-slate-600">
                      <b>Horario seleccionado:</b> {picked.label}
                    </p>

                    {/* Paso 1: procedimiento */}
                    {step === 1 && (
                      <div className="mt-4 space-y-3">
                        <label className="text-sm font-medium">
                          Selecciona el procedimiento
                        </label>

                        <SimpleSelect
                          options={skillOptions}
                          value={procedure}
                          placeholder="Selecciona uno"
                          onValueChange={setProcedure}
                          className="w-full"
                        />

                        <div className="flex gap-3 pt-2">
                          <Button
                            className="rounded-full px-5"
                            onClick={() => setStep(2)}
                            disabled={!procedure}
                          >
                            Continuar
                          </Button>
                          <Button
                            variant="outline"
                            className="rounded-full px-5"
                            onClick={resetFlow}
                          >
                            Cambiar horario
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Paso 2: teléfono */}
                    {step === 2 && (
                      <div className="mt-4 space-y-3">
                        <label className="text-sm font-medium">
                          Número de teléfono (10 dígitos)
                        </label>
                        <input
                          inputMode="numeric"
                          pattern="\d*"
                          maxLength={10}
                          value={phone}
                          onChange={(e) =>
                            setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                          }
                          placeholder="6861234567"
                          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-center tracking-widest text-lg font-medium outline-none focus:ring-2 focus:ring-violet-500"
                          aria-label="Número de teléfono a 10 dígitos"
                        />

                        <div className="flex gap-3 pt-2">
                          <Button
                            className="rounded-full px-5"
                            onClick={() => {
                              if (phone.length !== 10) return;
                              // pseudo verificación → pasamos al paso 3
                              setStep(3);
                            }}
                            disabled={phone.length !== 10}
                          >
                            Continuar
                          </Button>
                          <Button
                            variant="outline"
                            className="rounded-full px-5"
                            onClick={() => setStep(1)}
                          >
                            Atrás
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Paso 3: nombre (si es nuevo) + Confirmar */}
                    {step === 3 && (
                      <div className="mt-4 space-y-4">
                        {phone !== "6861234567" && (
                          <>
                            <p className="text-sm text-slate-600">
                              Parece que eres <b>nuevo usuario</b>. Por favor, coloca tu nombre:
                            </p>
                            <input
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Tu nombre completo"
                              className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500"
                              aria-label="Nombre completo"
                            />
                          </>
                        )}

                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                          <Button
                            className="rounded-full px-5"
                            onClick={() => {
                              // Simulación de agendado OK
                              setToastOpen(true);
                              resetFlow();
                              onOpenChange(false);
                            }}
                            disabled={
                              !procedure ||
                              phone.length !== 10 ||
                              (phone !== "6861234567" && !name.trim())
                            }
                          >
                            Confirmar
                          </Button>

                          <Button
                            variant="outline"
                            className="rounded-full px-5"
                            onClick={() => setStep(2)}
                          >
                            Atrás
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* CTA WhatsApp (general) */}
              {pro.phone && !picked && (
                <div className="mt-auto sticky bottom-0 bg-gradient-to-t from-white via-white/95 to-white/90 backdrop-blur-sm border-t px-6 py-4 z-10 shadow-[0_-6px_10px_rgba(0,0,0,0.04)]">
                  <div className="flex justify-center">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={`https://wa.me/52${pro.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                        `Hola ${pro.name}, me interesa una cita`
                      )}`}
                      className="inline-flex items-center justify-center cursor-pointer rounded-full px-6 py-2.5 text-white 
                        bg-green-600 hover:bg-green-700 active:bg-green-800 shadow-md hover:shadow-lg transition-all 
                        text-base font-semibold"
                      role="button"
                      aria-label="Abrir WhatsApp"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 mr-2"
                        aria-hidden="true"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.149-.198.297-.767.967-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.654-2.058-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.297.297-.495.099-.198.05-.372-.025-.52-.074-.148-.67-1.611-.917-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.372-.01-.57-.01a1.1 1.1 0 00-.794.372c-.273.297-1.04 1.015-1.04 2.479s1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.693.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347z" />
                        <path d="M12.004 2.004C6.485 2.004 2 6.489 2 12.008c0 2.114.557 4.172 1.616 5.983L2 22l4.108-1.587a10.01 10.01 0 005.896 1.899h.004c5.519 0 10.004-4.485 10.004-10.004S17.523 2.004 12.004 2.004zm0 18.018a7.965 7.965 0 01-4.079-1.126l-.292-.173-2.425.937.646-2.354-.16-.292a7.953 7.953 0 01-1.213-4.224c0-4.411 3.589-8 8.001-8 2.137 0 4.144.833 5.657 2.347a7.95 7.95 0 012.343 5.653c-.002 4.411-3.591 8.002-8.002 8.002z" />
                      </svg>
                      WhatsApp
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Toast global (vive fuera del Dialog) */}
      <ToastLite
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        title="Cita agendada 🎉"
        description="Tu cita se registró correctamente. Te contactaremos por WhatsApp."
      />
    </>
  );
}
