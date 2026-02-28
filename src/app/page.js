import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function HomePage() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold mb-4">
          Gestión de ingresos vehiculares
        </h1>
        <p className="text-lg text-slate-700">
          Digitaliza las entradas de vehículos a tu taller mecánico y olvídate
          del papeleo.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card title="Entradas de vehículos">
          <p>Consulta y filtra los vehículos actualmente en el taller.</p>
          <Link href="/vehiculos">
            <Button>Ver vehículos</Button>
          </Link>
        </Card>

        <Card title="Administración y NHTSA">
          <p>
            Accede como administrador para crear nuevas entradas y usar la API
            de NHTSA para decodificar VIN.
          </p>
          <div className="flex gap-2 mt-2 flex-wrap">
            <Link href="/login">
              <Button variant="secondary">Login</Button>
            </Link>
            <Link href="/vehiculos/nuevo">
              <Button>Nuevo ingreso</Button>
            </Link>
            <Link href="/vin">
              <Button variant="secondary">Decodificar VIN</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

