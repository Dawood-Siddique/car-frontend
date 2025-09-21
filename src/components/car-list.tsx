import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CarFilters } from './car-filters';
import { CarCard } from './car-card';
import { ContactInfo } from './contact-info';
import { Button } from './ui/button';
import { Car } from '@/types';
import { ShieldCheck } from 'lucide-react';
import { fetchCars } from '../services/cars';

export function CarList() {
  const navigate = useNavigate();
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleFilterChange = (newFilteredCars: Car[]) => {
    setFilteredCars(newFilteredCars);
  };

  useEffect(() => {
    const loadCars = async () => {
      try {
        const fetchedCars = await fetchCars();
        setCars(fetchedCars);
        setFilteredCars(fetchedCars);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load cars');
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading cars...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <p className="text-muted-foreground">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8 relative">
        <h1 className="text-4xl mb-4">Find Your Perfect Car</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Browse through our extensive collection of quality used cars.
          Filter by brand, price, and features to find exactly what you're looking for.
        </p>
      </div>

      {/* Filters */}
      <CarFilters cars={cars} onFilterChange={handleFilterChange} />

      {/* Results Summary */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">
          Showing {filteredCars.length} of {cars.length} cars
        </p>
      </div>

      {/* Car Grid */}
      {filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 mb-16">
          <p className="text-muted-foreground mb-4">No cars match your current filters.</p>
          <p className="text-muted-foreground">Try adjusting your search criteria.</p>
        </div>
      )}

      {/* Contact Information Section */}
      <ContactInfo />
    </div>
  );
}