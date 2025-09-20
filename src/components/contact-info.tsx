import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ArrowRight, MessageCircle, Phone, Mail } from 'lucide-react';

// Business contact information
const BUSINESS_CONTACT = {
  name: 'Premier Auto Sales',
  phone: '+1234567890',
  email: 'info@premierautosales.com'
};

export function ContactInfo() {
  const handleWhatsApp = () => {
    window.open(`https://wa.me/${BUSINESS_CONTACT.phone.replace(/\D/g, '')}?text=${encodeURIComponent('Hi! I\'m interested in your cars. Can you provide more information?')}`, '_blank');
  };

  const handleViber = () => {
    window.open(`viber://chat?number=${BUSINESS_CONTACT.phone}`, '_blank');
  };

  const handleEmail = () => {
    window.open(`mailto:${BUSINESS_CONTACT.email}?subject=Car Inquiry&body=${encodeURIComponent('Hi! I\'m interested in your cars. Can you provide more information?')}`, '_blank');
  };

  const steps = [
    {
      number: 1,
      title: "Contact Us",
      description: "Reach out to us using any of the contact methods below to express your interest in our cars",
      icon: <MessageCircle className="w-6 h-6" />
    },
    {
      number: 2,
      title: "Get Information",
      description: "We'll send you detailed information about available cars and answer all your questions",
      icon: <Phone className="w-6 h-6" />
    },
    {
      number: 3,
      title: "Pay 40% Upfront",
      description: "Secure your purchase with just 40% payment upfront - no need to pay the full amount immediately",
      icon: <Mail className="w-6 h-6" />
    },
    {
      number: 4,
      title: "We Deliver",
      description: "We'll safely deliver your chosen car directly to your location at your convenience",
      icon: <MessageCircle className="w-6 h-6" />
    }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-blue-900">Interested in Any Car?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Follow our simple 4-step process to get your dream car with convenient payment options and delivery service
          </p>
        </div>

        {/* Steps with arrows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <Card className="flex-1 bg-white border-2 border-blue-100 hover:border-blue-200 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <span className="text-lg">{step.number}</span>
                  </div>
                  <div className="text-blue-600 mb-3 flex justify-center">
                    {step.icon}
                  </div>
                  <h3 className="mb-2 text-blue-900">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
              
              {/* Arrow pointing to next step */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex items-center justify-center px-4">
                  <ArrowRight className="w-8 h-8 text-blue-400" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="mb-2 text-blue-900">Ready to Find Your Perfect Car?</h3>
            <p className="text-gray-600">
              Contact us now for instant response and personalized service. Our team is ready to help you!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleWhatsApp}
              className="bg-green-600 hover:bg-green-700 gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </Button>
            <Button 
              onClick={handleViber}
              className="bg-purple-600 hover:bg-purple-700 gap-2"
            >
              <Phone className="w-4 h-4" />
              Viber
            </Button>
            <Button 
              onClick={handleEmail}
              className="bg-blue-600 hover:bg-blue-700 gap-2"
            >
              <Mail className="w-4 h-4" />
              Email
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}