'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

export default function VehiculosSearch() {
  const [placas, setPlacas] = useState('');
  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault();
    const trimmed = placas.trim();
    if (!trimmed) return;
    router.push(`/vehiculos/${encodeURIComponent(trimmed)}`);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col md:flex-row gap-3 items-center">
      <input
        name="placas"
        value={placas}
        onChange={(e) => setPlacas(e.target.value)}
        placeholder="Ejemplo: ABC-123"
        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
      />
      <Button type="submit" variant="secondary">
        Ir al detalle
      </Button>
    </form>
  );
}
