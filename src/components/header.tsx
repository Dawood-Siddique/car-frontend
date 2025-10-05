
import { FC } from "react";
import logo from '../assets/logo.png';
import { ShieldCheck, Car } from "lucide-react";

const Header: FC = () => {
  return (
     <header style={{ backgroundColor: 'white', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '1rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo and Company Name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ borderRadius: '0.625rem', padding: '0.5rem' }}>
              <img src={logo} alt="Logo" style={{ width: '2rem', height: '2rem' }} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.5rem', lineHeight: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>MH INTERNATIONAL</h1>
              <p style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: 'var(--muted-foreground)' }}>Premium Auto Sales</p>
            </div>
          </div>

          {/* Navigation and Admin Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <nav style={{ display: 'none', alignItems: 'center', gap: '1.5rem' }}>
              <a href="#inventory" style={{ color: 'var(--foreground)' }}>
                Inventory
              </a>
              <a href="#about" style={{ color: 'var(--foreground)' }}>
                About Us
              </a>
              <a href="#contact" style={{ color: 'var(--foreground)' }}>
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
