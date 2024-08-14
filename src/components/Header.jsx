import React from "react";
import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";
import { ModeToggle } from "./mode-toggle";

const Header = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 border-b-2 border-b-red-500 py-6 bg-white dark:bg-gray-800">
      <div className="container mx-auto flex justify-between items-center px-2">
        {/* logo */}
        <Link
          to="/"
          className="text-3xl font-bold tracking-tight text-red-500 dark:text-red-500 mr-auto"
        >
          Food Express
        </Link>
        <div className="md:hidden">
          <MobileNav />
        </div>
        <div className="space-x-6 hidden md:flex items-center">
          <MainNav />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
