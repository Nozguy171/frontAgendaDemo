import { Professional } from "./types";

export const PROS: Professional[] = [
  {
    id: "ana",
    name: "Dra. Ana Rodríguez",
    role: "Ortodoncia y estética",
    phone: "(686) 111 2233",
    photoUrl: "/images/ana.jpg",
    hoursLabel: "Lun–Vie 9:00–18:00",
    skills: ["Limpieza", "Resinas", "Brackets", "Blanqueamiento"],
    workingDays: [1,2,3,4,5],
    slots: [
      { start: "2025-11-08T09:00:00-08:00", end: "2025-11-08T10:00:00-08:00", status: "busy" },
      { start: "2025-11-08T10:00:00-08:00", end: "2025-11-08T11:00:00-08:00", status: "busy" },
      { start: "2025-11-08T11:00:00-08:00", end: "2025-11-08T12:00:00-08:00", status: "available" },
      { start: "2025-11-08T12:00:00-08:00", end: "2025-11-08T13:00:00-08:00", status: "available" },
      { start: "2025-11-08T13:00:00-08:00", end: "2025-11-08T14:00:00-08:00", status: "busy" },
      { start: "2025-11-08T14:00:00-08:00", end: "2025-11-08T15:00:00-08:00", status: "available" },
    ],
  },
  {
    id: "luis",
    name: "Dr. Luis Méndez",
    role: "Endodoncia y cirugía",
    phone: "(686) 555 4422",
    photoUrl: "/images/luis.jpg",
    hoursLabel: "Lun–Sáb 10:00–20:00",
    skills: ["Endodoncia", "Extracciones", "Reconstrucción"],
    workingDays: [1,2,3,4,5,6],
    slots: [
      { start: "2025-11-08T10:00:00-08:00", end: "2025-11-08T11:00:00-08:00", status: "available" },
      { start: "2025-11-08T11:00:00-08:00", end: "2025-11-08T12:00:00-08:00", status: "busy" },
      { start: "2025-11-08T12:00:00-08:00", end: "2025-11-08T13:00:00-08:00", status: "available" },
      { start: "2025-11-08T13:00:00-08:00", end: "2025-11-08T14:00:00-08:00", status: "busy" },
    ],
  },
  {
    id: "sofia",
    name: "Dra. Sofía López",
    role: "Odontopediatría",
    phone: "(686) 777 8899",
    photoUrl: "/images/sofia.jpg",
    hoursLabel: "Mar–Sáb 9:00–17:00",
    skills: ["Atención infantil", "Selladores", "Profilaxis"],
    workingDays: [2,3,4,5,6],
    slots: [
      { start: "2025-11-08T09:00:00-08:00", end: "2025-11-08T10:00:00-08:00", status: "busy" },
      { start: "2025-11-08T10:00:00-08:00", end: "2025-11-08T11:00:00-08:00", status: "available" },
      { start: "2025-11-08T11:00:00-08:00", end: "2025-11-08T12:00:00-08:00", status: "available" },
      { start: "2025-11-08T12:00:00-08:00", end: "2025-11-08T13:00:00-08:00", status: "busy" },
    ],
  },
];
