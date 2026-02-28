import Navbar from "./Navbar";

export default function AppShell({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-8">
        {children}
      </main>
      <footer className="bg-slate-200 text-center py-4 mt-auto">
        <p>&copy; 2026 Motors DFS. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

