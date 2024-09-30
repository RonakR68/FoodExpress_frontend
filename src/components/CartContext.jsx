import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = sessionStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [restaurantId, setRestaurantId] = useState(() => {
        return sessionStorage.getItem('cart-restaurantId') || null;
    });

    const [showModal, setShowModal] = useState(false);
    const [pendingItem, setPendingItem] = useState(null);
    const [pendingRestaurantId, setPendingRestaurantId] = useState(null);

    useEffect(() => {
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
        sessionStorage.setItem('cart-restaurantId', restaurantId);
    }, [cartItems, restaurantId]);

    const addToCart = (item, newRestaurantId) => {
        // Check if cart is not empty and restaurant IDs don't match
        if (cartItems.length > 0 && newRestaurantId !== restaurantId) {
            setShowModal(true);
            setPendingItem(item);
            setPendingRestaurantId(newRestaurantId);
            return;
        }
        setCartItems((prev) => {
            const existingItem = prev.find((i) => i._id === item._id);
            if (existingItem) {
                return prev.map((i) =>
                    i._id === item._id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            } else {
                return [...prev, { ...item, quantity: 1, restaurantId: newRestaurantId }];
            }
        });
        sessionStorage.setItem('cart-restaurantId', restaurantId);
        setRestaurantId(newRestaurantId);
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

    const handleModalDecision = (clearCartFlag) => {
        if (clearCartFlag) {
            clearCart(); // Clear existing cart
            addToCart(pendingItem, pendingRestaurantId); // Add the pending item
        }
        setShowModal(false); // Close the modal
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, clearCartItem }}>
            {children}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-card p-6 rounded-lg shadow-lg max-w-md w-full">
                        <p className="text-lg text-foreground dark:text-white mb-4">
                            Your cart contains items from another restaurant. Would you like to clear your cart?
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="bg-primary dark:bg-primary text-primary-foreground dark:text-primary-foreground px-4 py-2 rounded-md shadow hover:bg-primary-600 dark:hover:bg-primary-700"
                                onClick={() => handleModalDecision(true)}>
                                Yes
                            </button>
                            <button
                                className="bg-muted dark:bg-muted text-muted-foreground px-4 py-2 rounded-md shadow hover:bg-muted-600 dark:hover:bg-muted-700"
                                onClick={() => handleModalDecision(false)}>
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
