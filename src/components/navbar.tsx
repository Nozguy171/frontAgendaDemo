import Link from "next/link";
import { Button } from "@/components/ui/button";


export default function Navbar() {
return (
<header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b">
<div className="container flex h-16 items-center justify-between">
<Link href="#" className="font-bold tracking-tight text-xl">SonrisaPlus</Link>
<nav className="hidden md:flex gap-6 text-sm text-slate-700">
<a href="#servicios" className="hover:underline">Servicios</a>
<a href="#beneficios" className="hover:underline">Beneficios</a>
<a href="#precios" className="hover:underline">Precios</a>
<a href="#contacto" className="hover:underline">Contacto</a>
</nav>
<Link href="/disponibilidad">
<Button>Consulta disponibilidad</Button>
</Link>
</div>
</header>
);
}