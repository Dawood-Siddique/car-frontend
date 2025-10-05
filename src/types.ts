export interface Credentials {
  email: string;
  password: string;
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  transmission: 'Manual' | 'Automatic';
  bodyType: 'Sedan' | 'SUV' | 'Hatchback' | 'Coupe' | 'Convertible' | 'Pickup';
  color: string;
  image: string;
  description: string;
  features: string[];
  location: string;
}

export interface ImageSlider {
  id: string
  url: string
  alt: string
  title: string
  description: string
}