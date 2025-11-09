export type TimeSlot = {
  start: string;  // ISO
  end: string;    // ISO
  status: "available" | "busy";
};

export type Professional = {
  id: string;
  name: string;
  role: string;
  phone?: string;
  photoUrl?: string;     // ej: "/images/ana.jpg"
  hoursLabel?: string;   // "Lun–Vie 9–18 h"
  skills: string[];
  slots: TimeSlot[];     // agenda del DÍA base (hoy)
  /** 0=Dom ... 6=Sáb  (p.ej. [1,2,3,4,5] = Lun-Vie) */
  workingDays?: number[];
};
