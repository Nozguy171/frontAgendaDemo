"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SimpleSelect } from "@/components/ui/select";

export default function AppointmentForm({
  pro,
  slot,
  onConfirm,
}: {
  pro: any;
  slot: { dateISO: string; label: string } | null;
  onConfirm?: (data: any) => void;
}) {
  const [step, setStep] = useState(1);
  const [selectedProcedure, setSelectedProcedure] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    // Paso 1
    if (step === 1 && selectedProcedure) {
      setStep(2);
      return;
    }

    // Paso 2 — verificar teléfono
    if (step === 2 && phone.length === 10) {
      setLoading(true);

      try {
        const res = await fetch(
          "https://api.demoagenda.shop/customers/check?tenant=divasspa",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone }),
          }
        );

        const data = await res.json();
        setLoading(false);

        if (data.exists) {
          onConfirm?.({
            procedure: selectedProcedure,
            phone,
            slot,
            customerId: data.customer.id,
          });
        } else {
          setStep(3);
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
      }

      return;
    }

    // Paso 3 — nombre y confirmar
    if (step === 3 && name.trim()) {
      onConfirm?.({
        procedure: selectedProcedure,
        phone,
        name,
        slot,
      });
    }
  };

  return (
    <div className="space-y-6 text-white">

      {/* Hora seleccionada */}
      <div className="p-4 rounded-xl bg-[#1e1e1e] border border-pink-500/30 shadow-md">
        <p className="text-sm text-neutral-400">Hora seleccionada</p>
        <p className="text-xl font-bold text-pink-500">
          {slot?.label ?? "—"}
        </p>
      </div>

      <AnimatePresence mode="wait">

        {/* PASO 1 */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-pink-400">
              Selecciona el procedimiento
            </h3>

            <SimpleSelect
              options={pro.skills}
              value={selectedProcedure}
              onValueChange={setSelectedProcedure}
              placeholder="Selecciona uno"
              className="w-full bg-[#121212] text-white border border-neutral-700 rounded-xl"
            />

            <Button
              onClick={handleNext}
              className="w-full bg-pink-600 text-white hover:bg-pink-700 rounded-xl py-3 font-semibold"
              disabled={!selectedProcedure || loading}
            >
              Continuar
            </Button>
          </motion.div>
        )}

        {/* PASO 2 */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-pink-400">
              Ingresa tu número de teléfono
            </h3>

            <Input
              placeholder="6861234567"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              className="text-center text-xl text-white tracking-widest bg-[#121212] border border-neutral-700 rounded-xl"
            />

            <Button
              onClick={handleNext}
              className="w-full bg-pink-600 text-white hover:bg-pink-700 rounded-xl py-3 font-semibold"
              disabled={phone.length !== 10 || loading}
            >
              {loading ? "Verificando..." : "Continuar"}
            </Button>
          </motion.div>
        )}

        {/* PASO 3 */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-pink-400">
              Parece que eres nuevo ✨
            </h3>
            <p className="text-sm text-neutral-400">
              Ingresa tu nombre para continuar.
            </p>

            <Input
              placeholder="Tu nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-[#121212] text-white border border-neutral-700 rounded-xl"
            />

            <Button
              onClick={handleNext}
              className="w-full bg-pink-600 text-white hover:bg-pink-700 rounded-xl py-3 font-semibold"
              disabled={!name.trim() || loading}
            >
              Confirmar cita
            </Button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
