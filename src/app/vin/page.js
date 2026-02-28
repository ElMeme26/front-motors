'use client';

import { useState } from 'react';
import { API } from '@/config';
import StatusBox from '@/components/StatusBox';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function VinPage() {
  const [vin, setVin] = useState('');
  const [modelyear, setModelyear] = useState('');
  const [marca, setMarca] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [vinResult, setVinResult] = useState(null);
  const [modelos, setModelos] = useState([]);

  const decodeVin = async (ev) => {
    ev.preventDefault();
    setError('');
    setSuccess('');
    setVinResult(null);
    setLoading(true);

    try {
      const params = new URLSearchParams();
      if (modelyear) params.set('modelyear', modelyear);

      const res = await fetch(
        `${API}/api-externa/vin/${encodeURIComponent(vin)}${
          params.toString() ? `?${params.toString()}` : ''
        }`
      );

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'Error al decodificar VIN');
        return;
      }

      setVinResult(data.data);
      setSuccess('VIN decodificado correctamente');
    } catch (err) {
      setError('Error de red / API no disponible');
    } finally {
      setLoading(false);
    }
  };

  const fetchModelos = async (ev) => {
    ev.preventDefault();
    setError('');
    setSuccess('');
    setModelos([]);
    setLoading(true);

    try {
      const res = await fetch(
        `${API}/api-externa/modelos/${encodeURIComponent(marca)}`
      );
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || 'Error al obtener modelos');
        return;
      }

      setModelos(data.data || []);
      setSuccess('Modelos cargados correctamente');
    } catch (err) {
      setError('Error de red / API no disponible');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Consulta con API NHTSA (vPIC)</h1>
      <p className="text-slate-700">
        Usa la API pública de NHTSA para decodificar VIN y consultar modelos por
        marca. Documentación de referencia:{" "}
        <a
          href="https://vpic.nhtsa.dot.gov/api/"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          vPIC Vehicle API
        </a>
        .
      </p>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Decodificar VIN</h2>
        <form onSubmit={decodeVin} className="space-y-3 max-w-md">
          <Input
            placeholder="VIN"
            value={vin}
            onChange={(e) => setVin(e.target.value)}
          />
          <Input
            placeholder="Año del modelo (opcional, ej. 2011)"
            value={modelyear}
            onChange={(e) => setModelyear(e.target.value)}
          />
          <Button type="submit" disabled={loading}>
            Decodificar VIN
          </Button>
        </form>

        {vinResult && (
          <div className="mt-3 border rounded-lg p-3 bg-white">
            <p>
              <strong>Marca:</strong> {vinResult.Make || 'N/D'}
            </p>
            <p>
              <strong>Modelo:</strong> {vinResult.Model || 'N/D'}
            </p>
            <p>
              <strong>Año:</strong> {vinResult.ModelYear || 'N/D'}
            </p>
            <p className="text-sm text-slate-600 mt-2">
              (Estos datos vienen de la API pública de NHTSA vPIC.)
            </p>
          </div>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Modelos por marca</h2>
        <form onSubmit={fetchModelos} className="space-y-3 max-w-md">
          <Input
            placeholder="Marca (ej. honda)"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
          />
          <Button type="submit" disabled={loading}>
            Consultar modelos
          </Button>
        </form>

        {modelos.length > 0 && (
          <div className="mt-3">
            <p className="mb-2 text-slate-700">
              Modelos encontrados para {marca}:
            </p>
            <ul className="list-disc ml-5 text-sm">
              {modelos.slice(0, 20).map((m) => (
                <li key={`${m.modelId}-${m.modelName}`}>
                  {m.modelName} ({m.makeName})
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <StatusBox loading={loading} error={error} success={success} />
    </main>
  );
}

