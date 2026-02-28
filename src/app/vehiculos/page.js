import Link from "next/link";
import { API } from "@/config";

export const dynamic = "force-dynamic";

async function fetchVehiculos(searchParams) {
  const page = Number(searchParams?.page || 1);
  const limit = Number(searchParams?.limit || 10);

  const url = new URL(`${API}/vehiculos`);
  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(limit));

  const res = await fetch(url.toString(), { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Error al obtener vehículos");
  }

  return res.json();
}

export default async function VehiculosPage({ searchParams }) {
  try {
    const { data, total, page, limit, totalPages } = await fetchVehiculos(
      searchParams
    );

    return (
      <main className="p-4 space-y-4">
        <h1 className="text-2xl font-bold">Vehículos en el taller</h1>
        <p className="text-slate-600">
          Mostrando página {page} de {totalPages} ({total} registros)
        </p>

        {data.length === 0 && <p>No hay vehículos registrados.</p>}

        <ul className="divide-y divide-slate-200">
          {data.map((v) => (
            <li key={v.id} className="py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <p className="font-semibold">
                  {v.marca} {v.modelo} ({v.anio})
                </p>
                <p className="text-sm text-slate-600">
                  Placas: <span className="font-mono">{v.placas}</span> · Dueño:{" "}
                  {v.dueno}
                </p>
                <p className="text-sm text-slate-500">
                  Motivo: {v.motivo} · Estado: {v.estado || "sin estado"}
                </p>
              </div>
              <div className="flex gap-2">
                <Link href={`/vehiculos/${encodeURIComponent(v.placas)}`} className="text-sm text-slate-700 underline">
                  Ver detalle
                </Link>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 mt-4">
          {page > 1 && (
            <Link
              href={`/vehiculos?page=${page - 1}&limit=${limit}`}
              className="text-sm underline"
            >
              Página anterior
            </Link>
          )}
          {page < totalPages && (
            <Link
              href={`/vehiculos?page=${page + 1}&limit=${limit}`}
              className="text-sm underline"
            >
              Página siguiente
            </Link>
          )}
        </div>
      </main>
    );
  } catch (err) {
    return (
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-2">Vehículos en el taller</h1>
        <p className="text-red-600">
          Error al cargar los vehículos: {err.message}
        </p>
      </main>
    );
  }
}

