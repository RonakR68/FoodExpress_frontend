import { useGetRestaurant } from "@/api/RestaurantApi";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CheckoutButton from "@/components/CheckoutButton";
import { useCreateCheckoutSession } from "@/api/OrderApi";


const DetailPage = () => {
    const { restaurantId } = useParams();
    const navigate = useNavigate();
    const { restaurant, isLoading } = useGetRestaurant(restaurantId);
    //console.log('detail page');
    //console.log(restaurant);
    const { createCheckoutSession, isLoading: isCheckoutLoading } = useCreateCheckoutSession();
    const [cartItems, setCartItems] = useState(() => {
        const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
        return storedCartItems ? JSON.parse(storedCartItems) : [];
    });

    //check and add item if it is not in cart
    //update the quantity if item is already in cart
    const addToCart = (menuItem) => {
        setCartItems((prevCartItems) => {
            const existingCartItem = prevCartItems.find(
                (cartItem) => cartItem._id === menuItem._id
            );

            let updatedCartItems;

            if (existingCartItem) {
                updatedCartItems = prevCartItems.map((cartItem) =>
                    cartItem._id === menuItem._id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                updatedCartItems = [
                    ...prevCartItems,
                    {
                        _id: menuItem._id,
                        name: menuItem.name,
                        price: menuItem.price,
                        quantity: 1,
                    },
                ];
            }

            //store user cart items in local storage
            sessionStorage.setItem(
                `cartItems-${restaurantId}`,
                JSON.stringify(updatedCartItems)
            );

            return updatedCartItems;
        });
    };

    const removeFromCart = (menuItem) => {
        setCartItems((prevCartItems) => {
            const existingCartItem = prevCartItems.find(
                (cartItem) => cartItem._id === menuItem._id
            );

            if (!existingCartItem) {
                return prevCartItems;
            }

            let updatedCartItems;

            if (existingCartItem.quantity > 1) {
                updatedCartItems = prevCartItems.map((cartItem) =>
                    cartItem._id === menuItem._id
                        ? { ...cartItem, quantity: cartItem.quantity - 1 }
                        : cartItem
                );
            } else {
                updatedCartItems = prevCartItems.filter(
                    (cartItem) => cartItem._id !== menuItem._id
                );
            }

            sessionStorage.setItem(
                `cartItems-${restaurantId}`,
                JSON.stringify(updatedCartItems)
            );

            return updatedCartItems;
        });
    };

    const clearCartItem = (cartItem) => {
        setCartItems((prevCartItems) => {
            const updatedCartItems = prevCartItems.filter(
                (item) => cartItem._id !== item._id
            );

            sessionStorage.setItem(
                `cartItems-${restaurantId}`,
                JSON.stringify(updatedCartItems)
            );

            return updatedCartItems;
        });
    };

    const onCheckout = async (userFormData) => {
        if (!restaurant) {
            return;
        }
        //console.log("on Check out");
        //console.log(userFormData);
        const checkoutData = {
            cartItems: cartItems.map((cartItem) => ({
                menuItemId: cartItem._id,
                name: cartItem.name,
                quantity: cartItem.quantity.toString(),
            })),
            restaurantId: restaurant._id,
            deliveryDetails: {
                name: userFormData.name,
                email: userFormData.email,
                addressLine1: userFormData.address.addressLine1,
                addressLine2: userFormData.address.addressLine2,
                city: userFormData.address.city,
                state: userFormData.address.state,
                pincode: userFormData.address.pincode,
                //country: userFormData.address.country,
                

            },
        };

        try {
            const data = await createCheckoutSession(checkoutData);

            // Check if the order was created successfully
            if (data.message === "Order created successfully") {
                // Clear cart items after successful order placement
                setCartItems([]);
                sessionStorage.removeItem(`cartItems-${restaurantId}`);
                navigate("/order-status");
            } else {
                // Handle case where order creation was not successful
                console.error("Order creation failed:", data.message);
            }
        } catch (error) {
            console.error("An error occurred during checkout:", error);
        }

    };

    const getTotalCost = () => {
        const totalInPence = cartItems.reduce(
            (total, cartItem) => total + cartItem.price * cartItem.quantity,
            0
        );

        const totalWithDelivery = totalInPence + restaurant.deliveryPrice;

        return (totalWithDelivery / 100).toFixed(2);
    };

    if (isLoading || !restaurant) {
        return "Loading...";
    }

    const orderSummary = {
        restaurantName: restaurant.restaurantName,
        city: restaurant.city,
        cartItems,
        deliveryPrice: restaurant.deliveryPrice,
        totalCost: getTotalCost(),
    };

    return (
        <div className="flex flex-col gap-10">
            <AspectRatio ratio={16 / 5}>
                <img
                    src={restaurant.imageUrl}
                    className="rounded-md object-cover h-full w-full"
                />
            </AspectRatio>
            <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
                <div className="flex flex-col gap-4">
                    <RestaurantInfo restaurant={restaurant} />
                    <span className="text-2xl font-bold tracking-tight">Menu</span>
                    {restaurant.menuItems.map((menuItem) => {
                        const cartItem = cartItems.find(
                            (item) => item._id === menuItem._id
                        );
                        const cartItemQuantity = cartItem ? cartItem.quantity : 0;
                        return (
                            <MenuItem
                                key={menuItem._id}
                                menuItem={menuItem}
                                cartItemQuantity={cartItemQuantity}
                                addToCart={() => addToCart(menuItem)}
                                removeFromCart={() => removeFromCart(menuItem)}
                            />
                        );
                    })}
                </div>

                <div>
                    <Card>
                        <OrderSummary
                            restaurant={restaurant}
                            cartItems={cartItems}
                            removeFromCart={(cartItem) => removeFromCart(cartItem)}
                            clearCartItem={(cartItem) => clearCartItem(cartItem)}
                        />
                        <CardFooter>
                            <CheckoutButton
                                disabled={cartItems.length === 0}
                                onCheckout={onCheckout}
                                isLoading={isCheckoutLoading}
                                orderSummary={orderSummary}
                            />
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DetailPage;