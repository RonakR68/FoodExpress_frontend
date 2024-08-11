import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "@/config/order-status-config";
import { useState, useEffect } from "react";
import ReviewPopup from "@/components/ReviewPopup";
import { useSubmitReview } from "@/api/OrderApi";

const OrderStatusHeader = ({ order }) => {
    const [showRating, setShowRating] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [rating, setRating] = useState(0);
    const { submitReview } = useSubmitReview();

    useEffect(() => {
        if (order.reviews && order.reviews.length > 0) {
            setSubmitted(true);
            setRating(order.reviews[0].rating); 
        }
    }, [order]);

    

    const getExpectedDelivery = () => {
        const created = new Date(order.createdAt);

        created.setMinutes(
            created.getMinutes() + order.restaurant.estimatedDeliveryTime
        );

        const hours = created.getHours();
        const minutes = created.getMinutes();

        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${hours}:${paddedMinutes}`;
    };

    const getOrderStatusInfo = () => {
        return (
            ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0]
        );
    };

    const handleRateOrderClick = () => {
        setShowRating(true);
        //console.log("Rate this order clicked");
    };

    const handleReviewSubmit = async ({ rating, review, itemReviews }) => {
        // Submit the review
        try {
            await submitReview({
                orderId: order._id,
                rating,
                comment: review,
                itemReviews
            });
            //console.log("Submitted Review:", { rating, review });
            setRating(rating);
            setSubmitted(true);
        } catch (error) {
            console.error("Error submitting review:", error);
        } finally {
            setShowRating(false);
        }


    };

    return (
        <>
            <h3 className="text-3xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between dark:text-gray-200">
                <span>Order Status: {getOrderStatusInfo().label}</span>
                {order.status === "delivered" ? (
                    submitted ? (
                        <div>
                            <span className="text-blue-500 cursor-pointer">
                                Rated:{" "}
                                {[...Array(5)].map((_, index) => (
                                    <span key={index} className={index < rating ? "text-yellow-500" : "text-gray-400"}>
                                        ★
                                    </span>
                                ))}
                            </span>
                        </div>
                    ) : (
                        <span
                            className="text-blue-500 cursor-pointer"
                            onClick={handleRateOrderClick}
                        >
                            Rate this order
                        </span>
                    )
                ) : (
                    <span>Expected by: {getExpectedDelivery()}</span>
                )}
            </h3>
            <Progress
                className="animate-pulse"
                value={getOrderStatusInfo().progressValue}
            />
            {showRating && (
                <ReviewPopup
                    order={order}
                    onClose={() => setShowRating(false)}
                    onSubmit={handleReviewSubmit}
                />
            )}
        </>
    );
};
export default OrderStatusHeader;