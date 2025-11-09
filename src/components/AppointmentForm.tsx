"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { SimpleSelect } from "@/components/ui/select";

export default function AppointmentForm({ pro, onConfirm }: { pro: any; onConfirm?: (data: any) => void }) {
  const [step, setStep] = useState(1);
  const [selectedProcedure, setSelectedProcedure] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const handleNext = () => {
    if (step === 1 && selectedProcedure) setStep(2);
    else if (step === 2 && phone.length === 10) {
      // Simular comprobación
      setTimeout(() => {
        if (phone === "6861234567") {
          alert("Usuario encontrado: Bienvenido de nuevo 😄");
          onConfirm?.({ procedure: selectedProcedure, phone });
        } else {
          setStep(3);
        }
      }, 600);
    } else if (step === 3 && name.trim()) {
      alert("✅ Usuario registrado y cita confirmada");
      onConfirm?.({ procedure: selectedProcedure, phone, name });
    }
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
{step === 1 && (
  <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-3">
    <h3 className="font-bold text-lg">Selecciona el procedimiento</h3>
    <SimpleSelect
      options={pro.skills}
      value={selectedProcedure}
      onValueChange={setSelectedProcedure}
      placeholder="Selecciona uno"
      className="w-full"
    />
    <Button onClick={handleNext} className="w-full mt-4" disabled={!selectedProcedure}>
      Continuar
    </Button>
  </motion.div>
)}


        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3"
          >
            <h3 className="font-bold text-lg">Ingresa tu número de teléfono</h3>
            <Input
              placeholder="Ej. 6861234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
              className="text-center tracking-widest text-lg font-medium"
            />
            <Button onClick={handleNext} className="w-full mt-4">
              Continuar
            </Button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3"
          >
            <h3 className="font-bold text-lg">Parece que eres nuevo 😄</h3>
            <p className="text-slate-600 text-sm">Coloca tu nombre para registrar la cita.</p>
            <Input
              placeholder="Tu nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button onClick={handleNext} className="w-full mt-4">
              Confirmar cita
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
