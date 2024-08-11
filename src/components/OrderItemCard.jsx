import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { ORDER_STATUS } from "@/config/order-status-config";
import { useUpdateMyRestaurantOrder } from "@/api/MyRestaurantApi";
import { useEffect, useState } from "react";
import SeeReviewPopup from "./SeeReviewPopup";

const OrderItemCard = ({ order }) => {
    //console.log(order);
    const { updateRestaurantStatus, isLoading } = useUpdateMyRestaurantOrder();
    const [status, setStatus] = useState(order.status);
    const [isReviewPopupOpen, setReviewPopupOpen] = useState(false);

    useEffect(() => {
        if (order?.status) {
            setStatus(order.status);
        }
    }, [order.status]);

    const handleStatusChange = async (newStatus) => {
        if (order?._id) {
            await updateRestaurantStatus({
                orderId: order._id,
                status: newStatus,
            });
            setStatus(newStatus);
        }
    };

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

    if (!order) {
        return <div>Loading...</div>;
    }

    const review = order.reviews?.[0];
    console.log(review);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
                    <div>
                        Customer Name:
                        <span className="ml-2 font-normal dark:text-gray-300">
                            {order.deliveryDetails?.name || "N/A"}
                        </span>
                    </div>
                    <div>
                        Delivery address:
                        <span className="ml-2 font-normal dark:text-gray-300">
                            {order.deliveryDetails?.addressLine1 || ""}, {order.deliveryDetails?.city || ""}, {order.deliveryDetails?.pincode || ""}
                        </span>
                    </div>
                    <div>
                        Date & Time:
                        <span className="ml-2 font-normal dark:text-gray-300">{formatDateTime()}</span>
                    </div>
                    <div>
                        Total Cost:
                        <span className="ml-2 font-normal dark:text-gray-300">
                            INR {(order.totalAmount / 100).toFixed(2) || "N/A"}
                        </span>
                    </div>
                </CardTitle>
                <Separator />
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                    {order.cartItems?.map((cartItem) => {
                        // Find the review for the current item
                        const itemReview = review?.itemReviews.find(
                            (itemReview) => itemReview.menuItemId.toString() === cartItem.menuItemId
                        );
                        // Get the rating or show "N/A" if there is no rating
                        const rating = itemReview ? itemReview.rating : "N/A";
                        // Determine if "Rated:" should be shown
                        const shouldShowRating = review && review.itemReviews.length > 0;
                        
                        return (
                            <div key={cartItem.menuItemId} className="flex justify-between items-center">
                                <div>
                                    <Badge variant="outline" className="mr-2 dark:text-gray-300">
                                        {cartItem.quantity}
                                    </Badge>
                                    {cartItem.name}
                                </div>
                                {shouldShowRating && (
                                    <div className="dark:text-gray-300">
                                        Rated: {rating === "N/A" ? "N/A" : `${rating} / 5`}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="status" className="dark:text-gray-300">What is the status of this order?</Label>
                    <Select
                        value={status}
                        disabled={isLoading}
                        onValueChange={(value) => handleStatusChange(value)}
                    >
                        <SelectTrigger id="status">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            {ORDER_STATUS.map((status) => (
                                <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                {review && (
                    <div className="mt-4">
                        <div className="text-gray-700 dark:text-gray-300">
                            <strong>Rating:</strong> {review.rating}
                        </div>
                        <button
                            className="text-blue-500 hover:underline mt-1"
                            onClick={() => setReviewPopupOpen(true)}
                        >
                            See Review
                        </button>
                        <SeeReviewPopup
                            isOpen={isReviewPopupOpen}
                            onClose={() => setReviewPopupOpen(false)}
                            review={review}
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default OrderItemCard;
