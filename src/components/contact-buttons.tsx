import { Button } from './ui/button';
import { MessageCircle, Phone, Mail } from 'lucide-react';
import { Car } from '../data/cars';

interface ContactButtonsProps {
  car: Car;
}

// Business contact information
const BUSINESS_CONTACT = {
  name: 'Premier Auto Sales',
  phone: '+1234567890',
  email: 'info@premierautosales.com'
};

export function ContactButtons({ car }: ContactButtonsProps) {
  const handleWhatsApp = () => {
    const message = `Hi! I'm interested in the ${car.year} ${car.brand} ${car.model} listed for ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(car.price)}. Could you please provide more details?`;
    const whatsappUrl = `https://wa.me/${BUSINESS_CONTACT.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleViber = () => {
    const message = `Hi! I'm interested in the ${car.year} ${car.brand} ${car.model} listed for ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(car.price)}`;
    const viberUrl = `viber://chat?number=${BUSINESS_CONTACT.phone}&text=${encodeURIComponent(message)}`;
    window.open(viberUrl, '_blank');
  };

  const handleEmail = () => {
    const subject = `Inquiry about ${car.year} ${car.brand} ${car.model}`;
    const body = `Hello,

I am interested in the ${car.year} ${car.brand} ${car.model} listed for ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(car.price)}.

Could you please provide more information about the vehicle's condition, maintenance history, and availability for viewing?

Thank you for your time.

Best regards`;
    
    const emailUrl = `mailto:${BUSINESS_CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(emailUrl, '_blank');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="mb-4">Contact Us</h3>
      <div className="space-y-3">
        <div className="text-muted-foreground mb-4">
          <p><strong>Dealer:</strong> {BUSINESS_CONTACT.name}</p>
          <p><strong>Phone:</strong> {BUSINESS_CONTACT.phone}</p>
          <p><strong>Email:</strong> {BUSINESS_CONTACT.email}</p>
        </div>

        <Button 
          onClick={handleWhatsApp}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Contact via WhatsApp
        </Button>

        <Button 
          onClick={handleViber}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
        >
          <Phone className="w-4 h-4 mr-2" />
          Contact via Viber
        </Button>

        <Button 
          onClick={handleEmail}
          variant="outline"
          className="w-full"
        >
          <Mail className="w-4 h-4 mr-2" />
          Send Email
        </Button>
      </div>
    </div>
  );
}