import { API } from "@/config";

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
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-2">Detalle de vehículo</h1>
        <p>No se encontró el vehículo con placas {placas}.</p>
      </main>
    );
  }

  return (
    <main className="p-4 space-y-2">
      <h1 className="text-2xl font-bold">Vehículo {vehiculo.placas}</h1>
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
        <strong>Dueño:</strong> {vehiculo.dueno}
      </p>
      <p>
        <strong>Motivo:</strong> {vehiculo.motivo}
      </p>
      <p>
        <strong>Estado:</strong> {vehiculo.estado || "sin estado"}
      </p>
      <p>
        <strong>Fecha de ingreso:</strong>{" "}
        {vehiculo.fecha_ingreso
          ? new Date(vehiculo.fecha_ingreso).toLocaleString()
          : "N/D"}
      </p>
      {vehiculo.fecha_salida && (
        <p>
          <strong>Fecha de salida:</strong>{" "}
          {new Date(vehiculo.fecha_salida).toLocaleString()}
        </p>
      )}
    </main>
  );
}

