import { useParams, useNavigate } from 'react-router-dom';
import { type Car } from '@/types';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ContactButtons } from './contact-buttons';
import {
  Calendar,
  Fuel,
  Gauge,
  MapPin,
  Palette,
  Settings,
  Car as CarIcon,
  ArrowLeft
} from 'lucide-react';

interface CarDetailsProps {
  cars: Car[];
}

export function CarDetails({ cars }: CarDetailsProps) {
   const { id } = useParams<{ id: string }>();
   const navigate = useNavigate();

   const car = cars.find(c => c.id == id);

  if (!car) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <p>Car not found</p>
        <Button onClick={() => navigate('/')}>
          Back to Listings
        </Button>
      </div>
    );
  }
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('en-US').format(mileage);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Button
        onClick={() => navigate('/')}
        variant="outline"
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Listings
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Image */}
          <div className="aspect-video overflow-hidden rounded-lg mb-6">
            <img
              src={car.image}
              alt={`${car.brand} ${car.model}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Car Info */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="mb-2">{car.brand} {car.model}</h1>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{car.year}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Palette className="w-4 h-4" />
                    <span>{car.color}</span>
                  </div>
                  <Badge variant="secondary">{car.bodyType}</Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="text-primary text-2xl">{formatPrice(car.price)}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <Gauge className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Mileage</p>
                  <p>{formatMileage(car.mileage)} miles</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <Fuel className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Fuel Type</p>
                  <p>{car.fuelType}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <Settings className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Transmission</p>
                  <p>{car.transmission}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Location: {car.location}</span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="mb-4">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {car.description}
            </p>
          </div>

          {/* Features */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="mb-4">Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {car.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CarIcon className="w-4 h-4 text-primary" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <ContactButtons car={car} />
          </div>
        </div>
      </div>
    </div>
  );
}