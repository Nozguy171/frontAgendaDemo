import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
title: "Sonrisa Plus Dental — Agenda en línea",
description:
"Landing base para consultorios: promueve servicios, capta pacientes y conecta con 'Consulta disponibilidad'.",
openGraph: {
title: "Sonrisa Plus Dental — Agenda en línea",
description:
"Landing base para consultorios: promueve servicios, capta pacientes y conecta con 'Consulta disponibilidad'.",
type: "website",
locale: "es_MX",
},
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="es">
<body>{children}</body>
</html>
);
}