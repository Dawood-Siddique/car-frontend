
import { FC } from "react";
import logo from '../assets/logo.png';
import { ShieldCheck, Car } from "lucide-react";

const Header: FC = () => {
  return (
     <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Company Name */}
          <div className="flex items-center gap-3">
            <div className="bg-primary rounded-lg p-2">
              <Car className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">MH INTERNATIONAL</h1>
              <p className="text-sm text-muted-foreground">Premium Auto Sales</p>
            </div>
          </div>

          {/* Navigation and Admin Button */}
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <a href="#inventory" className="text-foreground hover:text-primary transition-colors">
                Inventory
              </a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors">
                About Us
              </a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors">
                Contact
              </a>
            </nav>
            
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
