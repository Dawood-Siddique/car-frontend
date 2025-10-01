import { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { ImageWithFallback } from './figma/ImageWithFallback';

const sliderImages = [
    {
        url: "https://images.unsplash.com/photo-1705747401901-28363172fe7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjBzaG93cm9vbXxlbnwxfHx8fDE3NTkyNjE4MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Luxury Car Showroom",
        title: "Premium Collection",
        description: "Discover our carefully curated selection of luxury vehicles"
    },
    {
        url: "https://images.unsplash.com/photo-1644749700856-a82a92828a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYXIlMjBkZWFsZXJzaGlwfGVufDF8fHx8MTc1OTI2MTgxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Modern Car Dealership",
        title: "Expert Service",
        description: "Professional guidance from our experienced team"
    },
    {
        url: "https://images.unsplash.com/photo-1696176559269-c944fb2ec40f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwY2FycyUyMGNvbGxlY3Rpb258ZW58MXx8fHwxNzU5MzQ2MDAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Premium Cars Collection",
        title: "Quality Assured",
        description: "Every vehicle undergoes thorough inspection and certification"
    },
    {
        url: "https://images.unsplash.com/photo-1749222152514-b819f229db99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbW90aXZlJTIwYnVzaW5lc3N8ZW58MXx8fHwxNzU5MzQ2MDAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        alt: "Automotive Business",
        title: "Trusted Partner",
        description: "Your reliable partner in finding the perfect vehicle"
    }
];

export function ImageSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden bg-gray-900">
            <Carousel className="w-full h-full">
                <CarouselContent className="-ml-0">
                    {sliderImages.map((image, index) => (
                        <CarouselItem key={index} className="pl-0">
                            <div className="relative w-full h-[400px] md:h-[500px]">
                                <ImageWithFallback
                                    src={image.url}
                                    alt={image.alt}
                                    className="w-full h-full object-cover"
                                />

                                {/* Overlay with gradient */}
                                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>

                                {/* Content overlay */}
                                <div className="absolute inset-0 flex items-center">
                                    <div className="max-w-7xl mx-auto px-6 w-full">
                                        <div className="max-w-2xl text-white">
                                            <h2 className="text-4xl md:text-6xl font-bold mb-4">{image.title}</h2>
                                            <p className="text-lg md:text-xl mb-8 text-gray-200">{image.description}</p>
                                            <div className="flex gap-4">
                                                <a
                                                    href="#inventory"
                                                    className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg transition-colors inline-block"
                                                >
                                                    View Inventory
                                                </a>
                                                <a
                                                    href="#contact"
                                                    className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-lg transition-colors inline-block"
                                                >
                                                    Contact Us
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-4 bg-white/20 border-white/20 text-white hover:bg-white/30" />
                <CarouselNext className="right-4 bg-white/20 border-white/20 text-white hover:bg-white/30" />
            </Carousel>

            {/* Slide indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                {sliderImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}