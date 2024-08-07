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
    const [sort, setSort] = useState('latest');
    const [status, setStatus] = useState('');
    const { orders, isLoading: isOrdersLoading, refetch } = useGetMyRestaurantOrders(sort, status);
    const [realTimeOrders, setRealTimeOrders] = useState(orders || []);
    //console.log('orders');
    //console.log(orders);
    // console.log('restaurant');
    // console.log(restaurant);
    useEffect(() => {
        if (orders) {
            //console.log(orders);
            setRealTimeOrders(orders);
        }
    }, [orders]);

    useEffect(() => {
        refetch();
    }, [sort, status, refetch]);

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
        <Tabs defaultValue={isEditing ? "orders" : "manage-restaurant"}>
            <TabsList>
                {isEditing && <TabsTrigger value="orders">Orders</TabsTrigger>}
                <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
            </TabsList>
            <TabsContent
                value="orders"
                className="space-y-5 bg-gray-100 p-10 rounded-lg dark:bg-gray-700">
                <div className="flex justify-between items-center">
                    <div>
                        <label htmlFor="sort">Sort by: </label>
                        <select
                            id="sort"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="bg-gray-300 dark:bg-gray-900 dark:text-gray-200"
                        >
                            <option value="latest">Latest</option>
                            <option value="rating">Rating</option>
                            <option value="totalCost">Total Cost</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="status">Filter by status: </label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="bg-gray-300 dark:bg-gray-900 dark:text-gray-200"
                        >
                            <option value="">All</option>
                            <option value="pending">Pending</option>
                            <option value="delivered">Delivered</option>
                        </select>
                    </div>
                </div>
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
