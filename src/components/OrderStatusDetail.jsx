import { Separator } from "./ui/separator";
import { Link, useNavigate } from "react-router-dom";

const OrderStatusDetail = ({ order }) => {
    //console.log(order);
    const navigate = useNavigate();
    const formatDateTime = () => {
        if (!order?.createdAt) return "N/A";

        const orderDateTime = new Date(order.createdAt);

        // Format date
        const date = orderDateTime.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });

        // Format time
        const hours = orderDateTime.getHours();
        const minutes = orderDateTime.getMinutes();
        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const time = `${hours}:${paddedMinutes}`;

        return `${date}, ${time}`;
    };

    const repeatOrder = () => {
        const repeatOrderData = {
            restaurantId: order.restaurant._id,
            cartItems: order.cartItems.map((item) => ({
                menuItemId: item.menuItemId,
                name: item.name,
                quantity: item.quantity,
            })),
        };

        // Navigate to restaurant detail page with order data
        navigate(`/detail/${order.restaurant._id}`, { state: { repeatOrderData } });
    };

    return (
        <div className="space-y-5">
            <div className="flex flex-col">
                <span className="font-bold dark:text-gray-200">Delivering to:</span>
                <span className="dark:text-gray-200">{order.deliveryDetails.name}</span>
                <span className="dark:text-gray-200">
                    {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}, {order.deliveryDetails.pincode}
                </span>
            </div>
            <div className="flex flex-col">
                <span className="font-bold dark:text-gray-200">Your Order From:</span>
                <Link
                    to={`/detail/${order.restaurant._id}`}
                    className="font-bold tracking-tight mb-2 group-hover:underline dark:text-gray-200"
                >
                    {order.restaurant.restaurantName}
                </Link>
                <ul className="dark:text-gray-200">
                    {order.cartItems.map((item) => (
                        <li key={item.menuItemId}>
                            {item.name} x {item.quantity}
                        </li>
                    ))}
                </ul>
                <div className="mt-4">
                    <span className="font-bold dark:text-gray-200">Date & Time:  </span>
                    <span className="dark:text-gray-200">{formatDateTime()}</span>
                </div>
            </div>
            <Separator />
            <div className="flex flex-col">
                <span className="font-bold dark:text-gray-200">Total</span>
                <span className="dark:text-gray-200">INR {(order.totalAmount / 100).toFixed(2)}</span>
            </div>
            <div>
                <button
                    onClick={repeatOrder}
                    className="text-blue-500 hover:underline dark:text-blue-400"
                >
                    Repeat Order
                </button>
            </div>
        </div>
    );
};

export default OrderStatusDetail;