import Link from "next/link";
import { redirect } from "next/navigation";
import { API } from "@/config";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import VehiculosSearch from "@/components/VehiculosSearch";

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
  const placasQuery = searchParams?.placas;
  if (placasQuery) {
    redirect(`/vehiculos/${encodeURIComponent(placasQuery)}`);
  }

  try {
    const { data, total, page, limit, totalPages } = await fetchVehiculos(
      searchParams
    );

    return (
      <main className="space-y-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">Vehículos en el taller</h1>
          <p className="text-slate-600">
            Mostrando página {page} de {totalPages} ({total} registros)
          </p>
        </div>

        <Card className="space-y-4" title="Buscar por placas">
          <VehiculosSearch />
        </Card>

        <Card title="Listado de vehículos">
          {data.length === 0 ? (
            <p className="text-slate-600">No hay vehículos registrados.</p>
          ) : (
            <div className="space-y-3">
              <ul className="divide-y divide-slate-200">
                {data.map((v) => (
                  <li
                    key={v.id}
                    className="py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
                  >
                    <div>
                      <p className="font-semibold">
                        {v.marca} {v.modelo} ({v.anio})
                      </p>
                      <p className="text-sm text-slate-600">
                        Placas:{" "}
                        <span className="font-mono">{v.placas}</span> · Dueño:{" "}
                        {v.dueno}
                      </p>
                      <p className="text-xs text-slate-500">
                        Motivo: {v.motivo}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-1 text-xs rounded-full bg-teal-50 text-teal-800 border border-teal-100">
                        {v.estado || "Sin estado"}
                      </span>
                      <Link
                        href={`/vehiculos/${encodeURIComponent(v.placas)}`}
                        className="text-sm text-teal-700 underline"
                      >
                        Ver detalle
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-3 justify-end pt-2">
                {page > 1 && (
                  <Link href={`/vehiculos?page=${page - 1}&limit=${limit}`}>
                    <Button variant="secondary">Página anterior</Button>
                  </Link>
                )}
                {page < totalPages && (
                  <Link href={`/vehiculos?page=${page + 1}&limit=${limit}`}>
                    <Button variant="primary">Página siguiente</Button>
                  </Link>
                )}
              </div>
            </div>
          )}
        </Card>
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

