import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CarList } from './components/car-list';
import { CarDetails } from './components/car-details';
import { AdminLogin } from './components/admin-login';
import { AdminDashboard } from './components/admin-dashboard';
import { type Car, type ImageSlider } from './types';
import { useState, useEffect } from 'react';
import { fetchCars } from './services/cars';
import { fetchImageSlider } from './services/image_slider';

export default function App() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [imageSliders, setImageSliders] = useState<ImageSlider[]>([]);

  const handleCarsUpdate = (updatedCars: Car[]) => {
    setCars(updatedCars);
  };

  const handleImageSlidersUpdate = (updatedImageSliders: ImageSlider[]) => {
    setImageSliders(updatedImageSliders);
  };

  useEffect(() => {
    const loadCars = async () => {
      try {
        const fetchedCars = await fetchCars();
        setCars(fetchedCars);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load cars');
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  useEffect(() => {
    const loadImageSliders = async () => {
      try {
        const fetchedImageSliders = await fetchImageSlider();
        setImageSliders(fetchedImageSliders);
      } catch (err) {
        console.error('Failed to load image sliders:', err);
      }
    };

    loadImageSliders();
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<CarList cars={cars} loading={loading} error={error} />} />
            <Route path="/car/:id" element={<CarDetails cars={cars} />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard cars={cars} onCarsUpdate={handleCarsUpdate} imageSliders={imageSliders} onImageSlidersUpdate={handleImageSlidersUpdate} />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}