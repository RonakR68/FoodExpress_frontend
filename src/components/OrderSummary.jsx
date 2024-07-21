import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash } from "lucide-react";


const OrderSummary = ({ restaurant, cartItems, clearCartItem }) => {
    //console.log(cartItems);
    const getTotalCost = () => {
        const totalInPence = cartItems.reduce(
            (total, cartItem) => total + cartItem.price * cartItem.quantity,
            0
        );

        const totalWithDelivery = totalInPence + restaurant.deliveryPrice;

        return (totalWithDelivery / 100).toFixed(2);
    };

    return (
        <>
            <CardHeader>
                <CardTitle className="text-2xl font-bold tracking-tight flex justify-between dark:text-gray-300">
                    <span>Your Order</span>
                    <span>INR {getTotalCost()}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5 dark:text-gray-300">
                {cartItems.map((item) => (
                    <div key={item._id} className="flex justify-between">
                        <span>
                            <Badge variant="outline" className="mr-2 dark:text-gray-300">
                                {item.quantity}
                            </Badge>
                            {item.name}
                        </span>
                        <span className="flex items-center gap-1">
                            <Trash
                                className="cursor-pointer"
                                color="red"
                                size={20}
                                onClick={() => clearCartItem(item)}
                            />
                            INR {((item.price * item.quantity) / 100).toFixed(2)}
                        </span>
                    </div>
                ))}
                <Separator />
                <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>INR {(restaurant.deliveryPrice / 100).toFixed(2)}</span>
                </div>
                <Separator />
            </CardContent>
        </>
    );
};

export default OrderSummary;