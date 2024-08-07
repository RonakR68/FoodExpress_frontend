import React, { useEffect, useState } from "react";
import { useGetMyOrders } from "@/api/OrderApi";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from "react-router-dom";
import io from "socket.io-client";

const OrderStatusPage = () => {
    const [sort, setSort] = useState('latest');
    const [status, setStatus] = useState('');
    const { orders, isLoading, refetch } = useGetMyOrders(sort, status);
    const [realTimeOrders, setRealTimeOrders] = useState(orders || []);
    useEffect(() => {
        if (orders) {
            setRealTimeOrders(orders);
        }
    }, [orders]);

    useEffect(() => {
        refetch();
    }, [sort, status, refetch]);

    useEffect(() => {
        const socket = io(import.meta.env.VITE_API_BASE_URL);

        socket.on("statusUpdate", (statusUpdateData) => {
            //console.log('Status update received:', statusUpdateData);
            setRealTimeOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === statusUpdateData._id
                        ? { ...order, status: statusUpdateData.status }
                        : order
                )
            );
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const handleSortChange = (e) => {
        setSort(e.target.value);
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };


    if (isLoading) {
        return "Loading...";
    }

    // if (!realTimeOrders || realTimeOrders.length === 0) {
    //     return "No orders found";
    // }


    return (
        <div className="space-y-10">
            <div className="flex justify-between items-center">
                <div>
                    <label htmlFor="sort">Sort by: </label>
                    <select
                        id="sort"
                        value={sort}
                        onChange={handleSortChange}
                        className="dark:bg-gray-700 dark:text-gray-200"
                    >
                        <option value="latest">Latest</option>
                        <option value="rating">Rating</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="status">Filter by status: </label>
                    <select
                        id="status"
                        value={status}
                        onChange={handleStatusChange}
                        className="dark:bg-gray-700 dark:text-gray-200"
                    >
                        <option value="">All</option>
                        <option value="pending">Pending</option>
                        <option value="delivered">Delivered</option>
                    </select>
                </div>
            </div>
            {realTimeOrders && realTimeOrders.length > 0 ? (realTimeOrders.map((order) => (
                <div key={order._id} className="space-y-10 bg-gray-50 p-10 rounded-lg dark:bg-gray-700">
                    <OrderStatusHeader order={order} />
                    <div className="grid gap-10 md:grid-cols-2">
                        <OrderStatusDetail order={order} />
                        <AspectRatio ratio={16 / 5}>
                            <Link
                                to={`/detail/${order.restaurant._id}`}
                                className="font-bold tracking-tight mb-2 group-hover:underline dark:text-gray-200"
                            >
                                <img
                                    src={order.restaurant.imageUrl}
                                    className="rounded-md object-cover h-full w-full"
                                />
                            </Link>
                        </AspectRatio>
                    </div>
                </div>
            ))
        ) : (<div>No orders found</div>)}
        </div>
    );
};

export default OrderStatusPage;