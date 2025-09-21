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

export const createCar = async (carData: Omit<Car, 'id'>, accessToken: string): Promise<Car> => {
  const response = await fetch(`${API_URL}api/cars/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(carData),
  });

  if (!response.ok) {
    throw new Error(`Failed to create car: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const updateCar = async (carData: Car, accessToken: string): Promise<Car> => {
  const response = await fetch(`${API_URL}api/cars/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(carData),
  });

  if (!response.ok) {
    throw new Error(`Failed to update car: ${response.status} ${response.statusText}`);
  }

  return response.json();
};