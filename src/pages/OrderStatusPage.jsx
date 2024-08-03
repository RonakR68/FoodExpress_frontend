import React, { useEffect, useState } from "react";
import { useGetMyOrders } from "@/api/OrderApi";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from "react-router-dom";
import io from "socket.io-client";

const OrderStatusPage = () => {
    const { orders, isLoading } = useGetMyOrders();
    const [realTimeOrders, setRealTimeOrders] = useState(orders || []);
    useEffect(() => {
        if (orders) {
            setRealTimeOrders(orders);
        }
    }, [orders]);

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

    if (isLoading) {
        return "Loading...";
    }

    if (!realTimeOrders || realTimeOrders.length === 0) {
        return "No orders found";
    }


    return (
        <div className="space-y-10">
            {realTimeOrders.map((order) => (
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
            }
        </div >
    );
};

export default OrderStatusPage;