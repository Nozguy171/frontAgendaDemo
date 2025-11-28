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
  photoUrl?: string;

  hoursWeekStart: string; // "10:00"
  hoursWeekEnd: string;   // "19:00"

  hoursSatStart: string;  // "10:00"
  hoursSatEnd: string;    // "16:00"

  skills: string[];
  slots: TimeSlot[];
  workingDays?: number[];
};
