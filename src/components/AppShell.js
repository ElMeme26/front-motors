import Navbar from "./Navbar";

export default function AppShell({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-8 w-full">
        {children}
      </main>
      <footer className="border-t bg-slate-900 text-slate-100 text-center py-4 mt-auto text-sm">
        <p>&copy; 2026 Full-Motors · Todos los derechos reservados</p>
      </footer>
    </div>
  );
}

