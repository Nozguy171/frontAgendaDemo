// src/components/ui/toast-lite.tsx
"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ToastLiteProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  duration?: number; // ms (default 5000)
  className?: string;
};

export default function ToastLite({
  open,
  onClose,
  title = "Listo",
  description,
  duration = 5000,
  className,
}: ToastLiteProps) {
  useEffect(() => {
    if (!open) return;
    const id = setTimeout(onClose, duration);
    return () => clearTimeout(id);
  }, [open, duration, onClose]);

  const content = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: 30, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.98 }}
          transition={{ type: "spring", damping: 20, stiffness: 260 }}
          className="fixed inset-0 z-[9999] pointer-events-none"
        >
          {/* contenedor inferior centrado */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-auto">
            <div
              className={cn(
                "max-w-[92vw] sm:min-w-[380px] rounded-2xl border shadow-xl",
                "bg-white/95 backdrop-blur p-4 sm:p-5",
                "border-violet-200",
                className
              )}
              role="status"
              aria-live="polite"
            >
              <div className="flex items-start gap-3">
                {/* iconito */}
                <div className="mt-0.5 h-9 w-9 rounded-full grid place-content-center bg-violet-600/10 text-violet-700">
                  ✅
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{title}</h3>
                  {description ? (
                    <p className="text-sm text-slate-600 mt-0.5">{description}</p>
                  ) : null}
                </div>

                <button
                  onClick={onClose}
                  className="rounded-full px-3 py-1.5 text-sm font-medium bg-violet-600 text-white hover:bg-violet-700 active:bg-violet-800 transition"
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Portal para que viva fuera del Dialog
  if (typeof window === "undefined") return null;
  return createPortal(content, document.body);
}
