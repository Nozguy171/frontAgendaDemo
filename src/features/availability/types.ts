export type TimeSlot = {
    id: number;                 // 👈 LO AGREGAMOS
  start: string;  // ISO
  end: string;    // ISO
  status: "available" | "busy";
};
export type Professional = {
  id: string;
  name: string;
  role: string;
  phone?: string;
  photoUrl?: string;

  hoursWeekStart: string;
  hoursWeekEnd: string;

  hoursSatStart: string;
  hoursSatEnd: string;

  hoursSunStart: string;   // 🔥 AGREGAR
  hoursSunEnd: string;     // 🔥 AGREGAR

  skills: string[];
  slots: TimeSlot[];
  workingDays?: number[];
};

