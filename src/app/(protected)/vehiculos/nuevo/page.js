'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { clearToken } from '@/lib/auth';
import StatusBox from '@/components/StatusBox';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function NuevoVehiculoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialMarca = searchParams.get('marca') ?? '';
  const initialModelo = searchParams.get('modelo') ?? '';
  const initialAnio = searchParams.get('anio') ?? '';

  const [marca, setMarca] = useState(initialMarca);
  const [modelo, setModelo] = useState(initialModelo);
  const [anio, setAnio] = useState(initialAnio);
  const [dueno, setDueno] = useState('');
  const [placas, setPlacas] = useState('');
  const [motivo, setMotivo] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function validar() {
    if (!marca.trim()) return 'Marca requerida';
    if (!modelo.trim()) return 'Modelo requerido';
    if (!dueno.trim()) return 'Nombre del dueño requerido';
    if (!placas.trim()) return 'Placas requeridas';
    if (!motivo.trim()) return 'Motivo requerido';
    const year = Number(anio);
    const current = new Date().getFullYear();
    if (!Number.isInteger(year) || year < 1900 || year > current + 1) {
      return 'Año inválido';
    }
    return '';
  }

  const crear = async (ev) => {
    ev.preventDefault();
    setError('');
    setSuccess('');

    const v = validar();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);
    try {
      await apiFetch('/vehiculos', {
        method: 'POST',
        body: JSON.stringify({
          marca: marca.trim(),
          modelo: modelo.trim(),
          anio: Number(anio),
          dueno: dueno.trim(),
          placas: placas.trim(),
          motivo: motivo.trim(),
        }),
      });

      setSuccess('Vehículo registrado correctamente');
      setMarca('');
      setModelo('');
      setAnio('');
      setDueno('');
      setPlacas('');
      setMotivo('');
    } catch (err) {
      if (err.status === 403) {
        setError('No autorizado, necesitas rol de admin');
        return;
      }
      if (err.status === 401) {
        clearToken();
        router.replace('/login');
        return;
      }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-4 max-w-xl mx-auto flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Nueva entrada de vehículo</h1>

      <form onSubmit={crear} className="space-y-4">
        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-slate-700">
            Datos del vehículo
          </h2>
          <Input
            placeholder="Marca"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
          />
          <Input
            placeholder="Modelo"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
          />
          <Input
            placeholder="Año"
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
          />
          <Input
            placeholder="Placas"
            value={placas}
            onChange={(e) => setPlacas(e.target.value)}
          />
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-slate-700">
            Cliente y motivo
          </h2>
          <Input
            placeholder="Nombre del dueño"
            value={dueno}
            onChange={(e) => setDueno(e.target.value)}
          />
          <Input
            placeholder="Motivo de ingreso"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
          />
        </section>

        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push('/vehiculos')}
          >
            Ver listado
          </Button>
        </div>
      </form>

      <StatusBox loading={loading} error={error} success={success} />
    </main>
  );
}

