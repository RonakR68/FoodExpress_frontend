import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";

const OrderStatusDetail = ({ order }) => {
    //console.log(order);
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

    return (
        <div className="space-y-5">
            <div className="flex flex-col">
                <span className="font-bold dark:text-gray-200">Delivering to:</span>
                <span className="dark:text-gray-200">{order.deliveryDetails.name}</span>
                <span className="dark:text-gray-200">
                    {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
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
        </div>
    );
};

export default OrderStatusDetail;