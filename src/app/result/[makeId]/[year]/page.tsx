import { Suspense } from "react";
import { notFound } from "next/navigation";
import BackButton from "./backButton";

// Definir la función para obtener los datos
const fetchVehicleModels = async (makeId: string, year: string) => {
  const res = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data.Results;
};

// Componente para renderizar los modelos de vehículos
const VehicleModels = async ({
  params,
}: {
  params: { makeId: string; year: string };
}) => {
  const { makeId, year } = params;

  try {
    const models = await fetchVehicleModels(makeId, year);

    if (models.length === 0) {
      return <p>No models found for the selected make and year.</p>;
    }

    return (
      <div className="flex flex-col items-center p-4">
        <h1 className="text-2xl font-bold mb-4">Vehicle Models</h1>
        <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
          {models.map((model: any) => (
            <li key={model.Model_Name} className="mb-2">
              {model.Model_Name}
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    console.error(error);
    return <p>Error fetching data. Please try again later.</p>;
  }
};

// Función para obtener marcas de vehículos desde la API
const fetchVehicleMakes = async () => {
  const res = await fetch(
    "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json",
  );
  if (!res.ok) {
    throw new Error("Failed to fetch vehicle makes");
  }
  const data = await res.json();
  return data.Results.map((make: any) => make.Make_Id); // Ajusta si es necesario
};

// Función para generar parámetros estáticos
export async function generateStaticParams() {
  const makes = await fetchVehicleMakes();
  const years = Array.from(
    { length: new Date().getFullYear() - 2014 },
    (_, i) => (2015 + i).toString(),
  );

  // Genera las combinaciones de `makeId` y `year`
  const paths = makes.flatMap((makeId: string) =>
    years.map((year) => ({
      makeId: makeId,
      year: year,
    })),
  );

  return paths.map(({ makeId, year }: { makeId: string; year: string }) => ({
    params: { makeId, year },
  }));
}

const ResultPage = ({
  params,
}: {
  params: { makeId: string; year: string };
}) => {
  return (
    <div className="flex flex-col items-center p-4">
      <BackButton />
      <Suspense fallback={<p>Loading...</p>}>
        <VehicleModels params={params} />
      </Suspense>
    </div>
  );
};

export default ResultPage;
