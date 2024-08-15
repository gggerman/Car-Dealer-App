"use client"; // Marca este archivo como un componente de cliente

import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push("/")}
      className="flex self-start text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 1024 1024"
      >
        <path
          fill="currentColor"
          d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64"
        />
        <path
          fill="currentColor"
          d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312z"
        />
      </svg>
      <span className="sr-only">Icon description</span>
    </button>
  );
};

export default BackButton;
