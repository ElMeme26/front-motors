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
          Sistema de gestión de ingresos vehiculares a talleres.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card title="Entradas de vehículos">
          <p>Consulta los vehículos actualmente en el taller.</p>
          <Link href="/vehiculos">
            <Button>Ver vehículos</Button>
          </Link>
        </Card>

        <Card title="Administración y NHTSA">
          <p>
            Accede como administrador para crear nuevas entradas y usar la API
            de NHTSA.
          </p>
          <div className="flex gap-2 mt-2 flex-wrap">
            <Link href="/vehiculos/nuevo">
              <Button>Nuevo ingreso</Button>
            </Link>
            <Link href="/vin">
              <Button variant="secondary">NHTSA</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

