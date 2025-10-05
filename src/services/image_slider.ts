import { type ImageSlider } from "@/types";

const API_URL = import.meta.env.VITE_BASE_URL;

if (!API_URL){
    throw new Error('VITE_BASE_URL is not defined. Please check your .env file.')
}

export const fetchImageSlider = async (): Promise<ImageSlider[]> => {
    const response = await fetch(`${API_URL}api/cars/image-slider/`);

    if (!response.ok) {
        throw new Error('Failed to fetch image slider data');
    }

    const data = await response.json();
    return data;
}

export const createImageSlider = async (imageSliderData: Omit<ImageSlider, 'id'>, accessToken: string): Promise<ImageSlider> => {
    const response = await fetch(`${API_URL}api/cars/image-slider/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(imageSliderData),
    });

    if (!response.ok) {
        throw new Error(`Failed to create image slider: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

export const updateImageSlider = async (imageSliderData: ImageSlider, accessToken: string): Promise<ImageSlider> => {
    const response = await fetch(`${API_URL}api/cars/image-slider/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(imageSliderData),
    });

    if (!response.ok) {
        throw new Error(`Failed to update image slider: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

export const deleteImageSlider = async (imageSliderId: string, accessToken: string): Promise<void> => {
    const formData = new FormData();
    formData.append('id', imageSliderId);

    const response = await fetch(`${API_URL}api/cars/image-slider/`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
    });

    if (!response.ok) {
        throw new Error(`Failed to delete image slider: ${response.status} ${response.statusText}`);
    }
}



