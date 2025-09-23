import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { type Car } from '@/types';
import { Pencil, Trash2, Plus, Upload, X, Image as ImageIcon } from 'lucide-react';
import { createCar, updateCar, uploadImage } from '../services/cars';

interface AdminDashboardProps {
  cars: Car[];
  onCarsUpdate: (cars: Car[]) => void;
}

export function AdminDashboard({ cars, onCarsUpdate }: AdminDashboardProps) {
  const navigate = useNavigate();
  const { logout, isAdminLoggedIn, accessToken } = useAuth();

  useEffect(() => {
    if (!isAdminLoggedIn) {
      navigate('/admin/login');
    }
  }, [isAdminLoggedIn, navigate]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    price: '',
    mileage: '',
    fuelType: '',
    transmission: '',
    bodyType: '',
    color: '',
    location: '',
    description: '',
    features: '',
    image: ''
  });

  const resetForm = () => {
    setFormData({
      brand: '',
      model: '',
      year: '',
      price: '',
      mileage: '',
      fuelType: '',
      transmission: '',
      bodyType: '',
      color: '',
      location: '',
      description: '',
      features: '',
      image: ''
    });
    setImagePreview('');
    setEditingCar(null);
  };

  const handleImageUpload = async (file: File) => {
    if (file && file.type.startsWith('image/')) {
      try {
        const uploadResult = await uploadImage(file, accessToken!);
        const fullUrl = `${import.meta.env.VITE_BASE_URL}${uploadResult.url}`;
        setFormData(prev => ({ ...prev, image: uploadResult.id }));
        setImagePreview(fullUrl);
      } catch (error) {
        console.error('Failed to upload image:', error);
        alert('Failed to upload image. Please try again.');
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) {
            handleImageUpload(file);
          }
          break;
        }
      }
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: '' }));
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Add paste event listener to the dialog
  useEffect(() => {
    const handleGlobalPaste = (e: ClipboardEvent) => {
      if (isDialogOpen) {
        const items = e.clipboardData?.items;
        if (items) {
          for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.type.startsWith('image/')) {
              const file = item.getAsFile();
              if (file) {
                handleImageUpload(file);
              }
              break;
            }
          }
        }
      }
    };

    if (isDialogOpen) {
      document.addEventListener('paste', handleGlobalPaste);
    }

    return () => {
      document.removeEventListener('paste', handleGlobalPaste);
    };
  }, [isDialogOpen]);

  const handleEdit = (car: Car) => {
    setEditingCar(car);
    setFormData({
      brand: car.brand,
      model: car.model,
      year: car.year.toString(),
      price: car.price.toString(),
      mileage: car.mileage.toString(),
      fuelType: car.fuelType,
      transmission: car.transmission,
      bodyType: car.bodyType,
      color: car.color,
      location: car.location,
      description: car.description,
      features: car.features.join(', '),
      image: car.image
    });
    setImagePreview(car.image);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleDelete = (carId: string) => {
    if (confirm('Are you sure you want to delete this car?')) {
      const updatedCars = cars.filter(car => car.id !== carId);
      onCarsUpdate(updatedCars);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Access token at submit:', accessToken);

    if (!accessToken) {
      alert('Your session has expired. Please log in again.');
      logout();
      navigate('/admin/login');
      return;
    }

    const baseCarData = {
      brand: formData.brand,
      model: formData.model,
      year: parseInt(formData.year),
      price: parseInt(formData.price),
      mileage: parseInt(formData.mileage),
      fuelType: formData.fuelType as Car['fuelType'],
      transmission: formData.transmission as Car['transmission'],
      bodyType: formData.bodyType as Car['bodyType'],
      color: formData.color,
      location: formData.location,
      description: formData.description,
      features: formData.features.split(',').map(f => f.trim()).filter(f => f)
    };

    if (editingCar) {
      const fullCarData: Car = { ...baseCarData, id: editingCar.id, image: formData.image };
      try {
        const updatedCar = await updateCar(fullCarData, accessToken!);
        const updatedCars = cars.map(car => car.id === editingCar.id ? updatedCar : car);
        onCarsUpdate(updatedCars);
      } catch (error) {
        console.error('Failed to update car:', error);
        console.error('Error details:', error);
        alert(`Failed to update car: ${error instanceof Error ? error.message : 'Unknown error'}`);
        return;
      }
    } else {
      const createCarData = { ...baseCarData, image: formData.image };
      try {
        const newCar = await createCar(createCarData, accessToken!);
        onCarsUpdate([...cars, newCar]);
      } catch (error) {
        console.error('Failed to create car:', error);
        console.error('Error details:', error);
        alert(`Failed to add car: ${error instanceof Error ? error.message : 'Unknown error'}`);
        return;
      }
    }

    setIsDialogOpen(false);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1>Admin Dashboard</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => {
              logout();
              navigate('/');
            }}>
              Logout
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2>Car Management</h2>
            <Button onClick={handleAdd}>
              <Plus className="w-4 h-4 mr-2" />
              Add New Car
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Brand</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Fuel Type</TableHead>
                  <TableHead>Transmission</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cars.map((car) => (
                  <TableRow key={car.id}>
                    <TableCell>{car.brand}</TableCell>
                    <TableCell>{car.model}</TableCell>
                    <TableCell>{car.year}</TableCell>
                    <TableCell>${car.price.toLocaleString()}</TableCell>
                    <TableCell>{car.fuelType}</TableCell>
                    <TableCell>{car.transmission}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(car)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(car.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingCar ? 'Edit Car' : 'Add New Car'}
              </DialogTitle>
              <DialogDescription>
                {editingCar 
                  ? 'Make changes to the car details below.' 
                  : 'Fill in the details below to add a new car to the inventory.'
                }
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">Brand</label>
                  <Input
                    value={formData.brand}
                    onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <label className="block mb-2">Model</label>
                  <Input
                    value={formData.model}
                    onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <label className="block mb-2">Year</label>
                  <Input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <label className="block mb-2">Price ($)</label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <label className="block mb-2">Mileage</label>
                  <Input
                    type="number"
                    value={formData.mileage}
                    onChange={(e) => setFormData(prev => ({ ...prev, mileage: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <label className="block mb-2">Fuel Type</label>
                  <Select value={formData.fuelType} onValueChange={(value: Car['fuelType']) => setFormData(prev => ({ ...prev, fuelType: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Petrol">Petrol</SelectItem>
                      <SelectItem value="Diesel">Diesel</SelectItem>
                      <SelectItem value="Electric">Electric</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block mb-2">Transmission</label>
                  <Select value={formData.transmission} onValueChange={(value: Car['transmission']) => setFormData(prev => ({ ...prev, transmission: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Automatic">Automatic</SelectItem>
                      <SelectItem value="Manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block mb-2">Body Type</label>
                  <Select value={formData.bodyType} onValueChange={(value: Car['bodyType']) => setFormData(prev => ({ ...prev, bodyType: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sedan">Sedan</SelectItem>
                      <SelectItem value="SUV">SUV</SelectItem>
                      <SelectItem value="Hatchback">Hatchback</SelectItem>
                      <SelectItem value="Coupe">Coupe</SelectItem>
                      <SelectItem value="Convertible">Convertible</SelectItem>
                      <SelectItem value="Pickup">Pickup</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block mb-2">Color</label>
                  <Input
                    value={formData.color}
                    onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <label className="block mb-2">Location</label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="City, State"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block mb-2">Car Image</label>
                  
                  {/* Image Upload Area */}
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
                      isDragOver 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onPaste={handlePaste}
                  >
                    {imagePreview || formData.image ? (
                      <div className="relative">
                        <img
                          src={imagePreview || formData.image}
                          alt="Car preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={removeImage}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600 mb-2">
                          Drag and drop an image here, or click to select
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                          You can also paste an image from your clipboard (Ctrl+V)
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Choose File
                        </Button>
                      </div>
                    )}
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block mb-2">Features (comma-separated)</label>
                  <Input
                    value={formData.features}
                    onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
                    placeholder="Air Conditioning, Navigation System, Leather Seats"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block mb-2">Description</label>
                  <textarea
                    className="w-full p-2 border rounded-md min-h-[100px] resize-none"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingCar ? 'Update' : 'Add'} Car
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}