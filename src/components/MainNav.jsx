import React from "react";
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const MainNav = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/api/auth/login");
    };

    return (
        <span className="flex space-x-2 items-center">
            {isAuthenticated ? (
                <>
                    <Link to="/order-status" className="font-bold hover:text-red-500 dark:hover:text-red-500">
                        Order Status
                    </Link>
                    <UsernameMenu />
                </>
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
