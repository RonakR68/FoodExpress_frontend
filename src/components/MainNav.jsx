import React from "react";
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";
import { useAuth } from "../auth/AuthContext"; // Import the custom auth hook
import { useNavigate } from "react-router-dom"; // Import useNavigate

const MainNav = () => {
    const { isAuthenticated } = useAuth(); // Use custom auth hook
    const navigate = useNavigate(); // Initialize navigate

    const handleLoginClick = () => {
        navigate("/api/auth/login");
    };

    return (
        <span className="flex space-x-2 items-center">
            {isAuthenticated ? (
                <UsernameMenu />
            ) : (
                <Button
                    variant="ghost"
                    className="font-bold hover:text-red-500 dark:hover:text-red-500 hover:bg-white dark:hover:bg-gray-700"
                    onClick={handleLoginClick}
                >
                    Sign In
                </Button>
            )}
        </span>
    );
};

export default MainNav;
