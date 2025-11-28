import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Divas Spa — Masajes, faciales y bienestar en Mexicali",
  description:
    "Spa profesional en Mexicali. Masajes relajantes, faciales, depilación y cuidado personalizado con Paloma Romero. Agenda tu cita fácilmente.",
  keywords: [
    "spa Mexicali",
    "masajes Mexicali",
    "faciales Mexicali",
    "Divas Spa",
    "Paloma Romero",
    "depilación Mexicali",
    "bienestar Mexicali",
  ],
  openGraph: {
    title: "Divas Spa — Bienestar y relajación en Mexicali",
    description:
      "Masajes, faciales y tratamientos personalizados con Paloma Romero. Atención cálida y profesional.",
    url: "https://divasspa.demoagenda.shop",
    type: "website",
    locale: "es_MX",
    siteName: "Divas Spa",
    images: [
      {
        url: "/images2/paloma.jpeg",
        width: 1200,
        height: 630,
        alt: "Divas Spa Mexicali — Paloma Romero",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Divas Spa — Masajes y faciales en Mexicali",
    description: "Relájate con la atención profesional de Paloma Romero.",
    images: ["/images2/paloma.jpeg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-background text-foreground">{children}</body>
    </html>
  );
}
