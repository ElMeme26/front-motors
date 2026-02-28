import Link from "next/link";
import { API } from "@/config";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export const dynamic = "force-dynamic";

async function fetchVehiculo(placas) {
  const res = await fetch(`${API}/vehiculos/${encodeURIComponent(placas)}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Error al obtener vehículo");
  }

  return res.json();
}

export default async function VehiculoDetallePage({ params }) {
  const placas = (await params).placas;
  const vehiculo = await fetchVehiculo(placas);

  if (!vehiculo) {
    return (
      <main className="space-y-4">
        <h1 className="text-2xl font-bold">Detalle de vehículo</h1>
        <Card>
          <p>No se encontró el vehículo con placas {placas}.</p>
          <div className="mt-3">
            <Link href="/vehiculos">
              <Button variant="secondary">Volver al listado</Button>
            </Link>
          </div>
        </Card>
      </main>
    );
  }

  return (
    <main className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-bold">
          Vehículo <span className="font-mono">{vehiculo.placas}</span>
        </h1>
        <Link href="/vehiculos">
          <Button variant="secondary">Volver al listado</Button>
        </Link>
      </div>

      <Card title="Datos del vehículo">
        <div className="grid md:grid-cols-2 gap-2 text-sm">
          <p>
            <strong>Marca:</strong> {vehiculo.marca}
          </p>
          <p>
            <strong>Modelo:</strong> {vehiculo.modelo}
          </p>
          <p>
            <strong>Año:</strong> {vehiculo.anio}
          </p>
          <p>
            <strong>Estado:</strong> {vehiculo.estado || "Sin estado"}
          </p>
        </div>
      </Card>

      <Card title="Cliente y motivo">
        <p className="text-sm">
          <strong>Dueño:</strong> {vehiculo.dueno}
        </p>
        <p className="text-sm">
          <strong>Motivo de ingreso:</strong> {vehiculo.motivo}
        </p>
      </Card>

      <Card title="Fechas">
        <p className="text-sm">
          <strong>Fecha de ingreso:</strong>{" "}
          {vehiculo.fecha_ingreso
            ? new Date(vehiculo.fecha_ingreso).toLocaleString()
            : "N/D"}
        </p>
        {vehiculo.fecha_salida && (
          <p className="text-sm">
            <strong>Fecha de salida:</strong>{" "}
            {new Date(vehiculo.fecha_salida).toLocaleString()}
          </p>
        )}
      </Card>
    </main>
  );
}

