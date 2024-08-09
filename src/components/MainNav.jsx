import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";
import { useAuth } from "../auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from "./CartContext.jsx";

const MainNav = () => {
    const { isAuthenticated } = useAuth();
    const { cartItems } = useCart();
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/api/auth/login");
    };

    const handleCartClick = () => {
        if (cartItems.length > 0) {
            const restaurantId = Object.keys(sessionStorage)
                .find((key) => key.startsWith('cartItems-'))
                .split('-')[1];
            navigate(`/detail/${restaurantId}`);
        } else {
            navigate('/cart-empty');
        }
    };

    return (
        <span className="flex space-x-2 items-center">
            {isAuthenticated ? (
                <>
                    <Link to="/order-status" className="font-bold hover:text-red-500 dark:hover:text-red-500">
                        My Orders
                    </Link>

                    <div className="relative cursor-pointer" onClick={handleCartClick}>
                        <FaShoppingCart className="text-xl" />
                        {cartItems.length > 0 && (
                            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-1">
                                {cartItems.length}
                            </span>
                        )}
                    </div>

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
