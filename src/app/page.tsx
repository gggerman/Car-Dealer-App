"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const [vehicleTypes, setVehicleTypes] = useState<any[]>([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    fetch(
      "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json",
    )
      .then((response) => response.json())
      .then((data) => setVehicleTypes(data.Results));
  }, []);

  const years = Array.from(
    new Array(new Date().getFullYear() - 2014),
    (x, i) => i + 2015,
  );

  const handleNextClick = () => {
    if (selectedVehicleId && selectedYear) {
      router.push(`/result/${selectedVehicleId}/${selectedYear}`);
    }
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-center min-h-screen max-w-sm mx-auto">
      <h1 className="text-2xl font-bold">Car Dealer App</h1>

      <div className="flex flex-col gap-3 items-center justify-center">
        <select
          onChange={(e) => setSelectedVehicleId(e.target.value)}
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
        >
          <option>Select Vehicle Type</option>
          {vehicleTypes.map((type: any) => (
            <option key={type.MakeName} value={type.MakeId}>
              {type.MakeName}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
        >
          <option>Select Model Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <button
        disabled={!selectedVehicleId || !selectedYear}
        onClick={handleNextClick}
        className="text-white bg-blue-700 hover:bg-blue-800 disabled:bg-gray-300 disabled:hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Next
      </button>
    </div>
  );
};

export default Home;
