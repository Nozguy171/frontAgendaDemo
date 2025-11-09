export default function Footer() {
return (
<footer className="border-t">
<div className="container py-10 text-sm text-slate-600 flex flex-col md:flex-row items-center justify-between gap-4">
<p>© {new Date().getFullYear()} Sonrisa Plus Dental. Todos los derechos reservados.</p>
<p className="opacity-80">Hecho con Next.js + Tailwind</p>
</div>
</footer>
);
}