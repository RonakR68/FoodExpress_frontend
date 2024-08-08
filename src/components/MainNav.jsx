import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";
import { useAuth } from "../auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from 'react-icons/fa';

const MainNav = () => {
    const { isAuthenticated } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/api/auth/login");
    };

    const updateCartItems = () => {
        if (isAuthenticated) {
            const cartData = Object.keys(sessionStorage)
                .filter((key) => key.startsWith('cartItems-'))
                .map((key) => JSON.parse(sessionStorage.getItem(key)));

            setCartItems(cartData.flat());
        }
    };

    useEffect(() => {
        updateCartItems();

        // Event listener for changes in sessionStorage
        const handleStorageChange = (e) => {
            if (e.storageArea === sessionStorage) {
                updateCartItems();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [isAuthenticated]);

    const handleCartClick = () => {
        if (cartItems.length > 0) {
            const restaurantId = Object.keys(sessionStorage)
                .find((key) => key.startsWith('cartItems-'))
                .split('-')[1]; // Extract the restaurantId from the key

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
