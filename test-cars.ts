import { fetchCars } from './src/services/cars.ts';

async function main() {
  try {
    const cars = await fetchCars();
    console.log('Fetched cars:', cars);
  } catch (error) {
    console.error('Error:', (error as Error).message);
  }
}

main();