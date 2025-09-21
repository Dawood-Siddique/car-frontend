import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CarList } from './components/car-list';
import { CarDetails } from './components/car-details';
import { AdminLogin } from './components/admin-login';
import { AdminDashboard } from './components/admin-dashboard';
import { cars as initialCars } from './data/cars';
import { type Car } from './types';
import { useState } from 'react';

export default function App() {
  const [cars, setCars] = useState<Car[]>(initialCars);

  const handleCarsUpdate = (updatedCars: Car[]) => {
    setCars(updatedCars);
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<CarList />} />
            <Route path="/car/:id" element={<CarDetails cars={cars} />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard cars={cars} onCarsUpdate={handleCarsUpdate} />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}