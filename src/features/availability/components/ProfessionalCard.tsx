"use client";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ProfessionalCard({
  name, role, phone, photoUrl, hoursLabel, onClick,
}: {
  name: string; role: string; phone?: string; photoUrl?: string; hoursLabel?: string; onClick?: () => void;
}) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="cursor-pointer"
    >
      <Card className="p-5 text-center rounded-2xl border-slate-200 shadow-sm hover:shadow-md">
<div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden mb-4 ring-4 ring-sky-100 shadow-[0_0_15px_rgba(139,92,246,0.2)] bg-slate-100">
  {photoUrl && (
    <img
      src={photoUrl}            // ej: "/images/ana.jpg"
      alt={name}
      loading="lazy"
      draggable={false}
      className="h-full w-full object-cover select-none"
      onError={(e) => {
        // oculta si falla (por si el nombre no coincide)
        (e.currentTarget as HTMLImageElement).style.display = "none";
      }}
    />
  )}
</div>

        <h3 className="text-lg font-semibold tracking-tight">{name}</h3>
        <p className="text-sm text-slate-600">{role}</p>
        {hoursLabel && <p className="text-xs text-slate-500 mt-1">{hoursLabel}</p>}
        {phone && <p className="text-xs text-slate-500">{phone}</p>}
      </Card>
    </motion.div>
  );
}
