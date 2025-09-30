
import { Car } from "lucide-react";
import { FC } from "react";

const Header: FC = () => {
  return (
    <header className="bg-blue-500 text-white py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Car className="h-8 w-8 mr-2" />
        <h1 className="text-2xl font-bold">Prestige Motors</h1>
      </div>
    </header>
  );
};

export default Header;
