import React from "react";
import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";
import { ModeToggle } from "./mode-toggle";
import { useNavigate } from "react-router-dom";
import SearchBar from "@/components/SearchBar";

const Header = () => {
  const navigate = useNavigate();

  const handleSearchSubmit = (searchFormValues) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 border-b-2 border-b-red-500 py-6 bg-white dark:bg-gray-800">
      <div className="container mx-auto flex items-center px-2">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold tracking-tight text-red-500 dark:text-red-500 mr-auto"
        >
          Food Express
        </Link>

        {/* Search Bar */}
        <div className="flex-grow mx-4"> {/* This makes the search bar centered */}
          <SearchBar
            placeHolder="Search Restaurant's by City or Pincode"
            onSubmit={handleSearchSubmit}
          />
        </div>

        {/* Navigation */}
        <div className="space-x-6 hidden md:flex items-center">
          <MainNav />
          <ModeToggle />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </div>
  );
};

export default Header;
