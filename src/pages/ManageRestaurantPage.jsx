import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import {
    useCreateMyRestaurant,
    useGetMyRestaurant,
    useGetMyRestaurantOrders,
    useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ManageRestaurantPage = () => {
    const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant();
    const { restaurant } = useGetMyRestaurant();
    const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateMyRestaurant();
    const { orders, isLoading: isOrdersLoading } = useGetMyRestaurantOrders();
    const [realTimeOrders, setRealTimeOrders] = useState(orders || []);
    //console.log('orders');
    //console.log(orders);
    // console.log('restaurant');
    // console.log(restaurant);
    useEffect(() => {
        if (orders) {
            setRealTimeOrders(orders);
        }
    }, [orders]);

    useEffect(() => {
        const socket = io(import.meta.env.VITE_API_BASE_URL);

        socket.on("orderUpdate", (orderData) => {
            if (restaurant && orderData.restaurant._id === restaurant._id) {
                //console.log('Order update received:', orderData);
                setRealTimeOrders((prevOrders) => {
                    const existingOrder = prevOrders.find(order => order._id === orderData._id);
                    if (existingOrder) {
                        // Update existing order
                        return prevOrders.map(order =>
                            order._id === orderData._id
                                ? { ...order, ...orderData }
                                : order
                        );
                    } else {
                        // Add new order
                        return [...prevOrders, orderData];
                    }
                });
            }
        });

        socket.on("reviewUpdate", ({ orderId, review }) => {
            //console.log('Review update received:', orderId, review);

            setRealTimeOrders((prevOrders) => {
                return prevOrders.map(order =>
                    order._id === orderId
                        ? { ...order, reviews: [...order.reviews, review] }
                        : order
                );
            });
        });

        return () => {
            socket.disconnect();
        };
    }, [restaurant?._id]);

    if (isOrdersLoading) {
        return "Loading...";
    }

    const isEditing = !!restaurant; // true if restaurant exists for user

    return (
        <Tabs defaultValue="orders">
            <TabsList>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
            </TabsList>
            <TabsContent
                value="orders"
                className="space-y-5 bg-gray-50 p-10 rounded-lg dark:bg-gray-700 ">
                <h2 className="text-2xl font-bold">{realTimeOrders?.length} orders</h2>
                {realTimeOrders?.map((order) => (
                    <OrderItemCard key={order._id} order={order} />
                ))}
            </TabsContent>
            <TabsContent value="manage-restaurant">
                <ManageRestaurantForm
                    restaurant={restaurant}
                    onSave={isEditing ? updateRestaurant : createRestaurant}
                    isLoading={isCreateLoading || isUpdateLoading}
                />
            </TabsContent>
        </Tabs>
    );
};

export default ManageRestaurantPage;
