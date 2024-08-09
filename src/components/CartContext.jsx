import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = sessionStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        setCartItems((prev) => {
            const existingItem = prev.find((i) => i._id === item._id);
            if (existingItem) {
                return prev.map((i) =>
                    i._id === item._id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            } else {
                return [...prev, { ...item, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (item) => {
        setCartItems((prev) => {
            const existingItem = prev.find((i) => i._id === item._id);
            if (existingItem.quantity > 1) {
                return prev.map((i) =>
                    i._id === item._id
                        ? { ...i, quantity: i.quantity - 1 }
                        : i
                );
            } else {
                return prev.filter((i) => i._id !== item._id);
            }
        });
    };

    const clearCart = () => setCartItems([]);

    const clearCartItem = (cartItem) => {
        setCartItems((prev) => prev.filter((item) => item._id !== cartItem._id));
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, clearCartItem }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
