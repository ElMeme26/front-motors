'use client';
import { clearToken, getToken, getRole } from '@/lib/auth';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

function NavLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        isActive
          ? 'bg-teal-600 text-white'
          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  const router = useRouter();
  const token = getToken();
  const role = getRole();

  const handleLogout = () => {
    clearToken();
    router.replace('/login');
    router.refresh();
  };

  const isAdmin = token && role === 'admin';

  return (
    <header className="border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between py-4 px-4">
        <Link href="/" className="text-xl font-bold text-teal-700">
          Motors DFS
        </Link>
        <nav className="flex items-center gap-2">
          <NavLink href="/">Inicio</NavLink>
          <NavLink href="/vehiculos">Vehículos</NavLink>
          <NavLink href="/vin">VIN / NHTSA</NavLink>

          {isAdmin && (
            <>
              <NavLink href="/vehiculos/nuevo">Nueva entrada</NavLink>
              <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                Admin
              </span>
            </>
          )}

          {token ? (
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-100 hover:text-red-800"
            >
              Cerrar sesión
            </button>
          ) : (
            <NavLink href="/login">Iniciar sesión</NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}

