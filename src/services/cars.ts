import { type Car } from "@/types";

const API_URL = import.meta.env.VITE_BASE_URL;

if (!API_URL) {
  throw new Error('VITE_BASE_URL is not defined. Please check your .env file.');
}

export const fetchCars = async (): Promise<Car[]> => {
  const response = await fetch(`${API_URL}api/cars/`);

  if (!response.ok) {
    throw new Error('Failed to fetch cars');
  }

  const data = await response.json();
  return data;
};