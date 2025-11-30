import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Car } from '../data/cars';

interface CarFiltersProps {
  cars: Car[];
  onFilterChange: (filteredCars: Car[]) => void;
}

export function CarFilters({ cars, onFilterChange }: CarFiltersProps) {
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState({
    brand: 'all',
    bodyType: 'all',
    fuelType: 'all',
    transmission: 'all',
    minPrice: '',
    maxPrice: '',
    minYear: '',
    maxYear: ''
  });

  const brands = [...new Set(cars.map(car => car.brand).filter(b => b))].sort();
  const bodyTypes = [...new Set(cars.map(car => car.bodyType).filter(b => b))].sort();
  const fuelTypes = [...new Set(cars.map(car => car.fuelType).filter(f => f))].sort();
  const transmissions = [...new Set(cars.map(car => car.transmission).filter(t => t))].sort();

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const applyFilters = () => {
    let filtered = cars;

    if (filters.brand !== 'all') {
      filtered = filtered.filter(car => car.brand === filters.brand);
    }
    if (filters.bodyType !== 'all') {
      filtered = filtered.filter(car => car.bodyType === filters.bodyType);
    }
    if (filters.fuelType !== 'all') {
      filtered = filtered.filter(car => car.fuelType === filters.fuelType);
    }
    if (filters.transmission !== 'all') {
      filtered = filtered.filter(car => car.transmission === filters.transmission);
    }
    if (filters.minPrice) {
      filtered = filtered.filter(car => car.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(car => car.price <= parseInt(filters.maxPrice));
    }
    if (filters.minYear) {
      filtered = filtered.filter(car => car.year >= parseInt(filters.minYear));
    }
    if (filters.maxYear) {
      filtered = filtered.filter(car => car.year <= parseInt(filters.maxYear));
    }

    onFilterChange(filtered);
  };

  const clearFilters = () => {
    setFilters({
      brand: 'all',
      bodyType: 'all',
      fuelType: 'all',
      transmission: 'all',
      minPrice: '',
      maxPrice: '',
      minYear: '',
      maxYear: ''
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3>Filter Cars</h3>
        <Button
          onClick={() => setShowFilters(!showFilters)}
          variant="outline"
          size="sm"
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>
      
      {showFilters && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block mb-2">Brand</label>
              <Select 
                value={filters.brand} 
                onValueChange={(value) => setFilters(prev => ({ ...prev, brand: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Brands</SelectItem>
                  {brands.map(brand => (
                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block mb-2">Body Type</label>
              <Select 
                value={filters.bodyType} 
                onValueChange={(value) => setFilters(prev => ({ ...prev, bodyType: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {bodyTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block mb-2">Fuel Type</label>
              <Select 
                value={filters.fuelType} 
                onValueChange={(value) => setFilters(prev => ({ ...prev, fuelType: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Fuel Types</SelectItem>
                  {fuelTypes.map(fuel => (
                    <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block mb-2">Transmission</label>
              <Select 
                value={filters.transmission} 
                onValueChange={(value) => setFilters(prev => ({ ...prev, transmission: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Transmissions</SelectItem>
                  {transmissions.map(trans => (
                    <SelectItem key={trans} value={trans}>{trans}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block mb-2">Min Price (¥)</label>
              <Input
                type="number"
                placeholder="0"
                value={filters.minPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
              />
            </div>

            <div>
              <label className="block mb-2">Max Price (¥)</label>
              <Input
                type="number"
                placeholder="No limit"
                value={filters.maxPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
              />
            </div>

            <div>
              <label className="block mb-2">Min Year</label>
              <Input
                type="number"
                placeholder="2000"
                value={filters.minYear}
                onChange={(e) => setFilters(prev => ({ ...prev, minYear: e.target.value }))}
              />
            </div>

            <div>
              <label className="block mb-2">Max Year</label>
              <Input
                type="number"
                placeholder="2024"
                value={filters.maxYear}
                onChange={(e) => setFilters(prev => ({ ...prev, maxYear: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={clearFilters} variant="outline">
              Clear All Filters
            </Button>
          </div>
        </>
      )}
    </div>
  );
}