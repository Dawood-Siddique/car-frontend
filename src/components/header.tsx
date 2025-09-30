
import { FC } from "react";
import logo from '../assets/logo.png';

const Header: FC = () => {
  return (
    <header className="text-white py-6 px-8 flex items-center justify-between shadow-lg rounded-b-lg" style={{ background: 'linear-gradient(to right, #2563eb, #60a5fa)' }}>
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-12 w-12 sm:h-10 sm:w-10 mr-4" />
        <h1 className="text-4xl sm:text-3xl font-bold">MH International</h1>
      </div>
    </header>
  );
};

export default Header;
