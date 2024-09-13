import { useState } from "react";

const ReviewPopup = ({ order, onClose, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [itemRatings, setItemRatings] = useState(
        order.cartItems.map((item) => ({
            menuItemId: item.menuItemId,
            name: item.name,
            rating: 0, // initial rating for each item
        }))
    );

    const handleStarClick = (index) => {
        setRating(index + 1); // Rating is 1-indexed
    };

    const handleItemStarClick = (menuItemId, index) => {
        setItemRatings((prev) =>
            prev.map((item) =>
                item.menuItemId === menuItemId
                    ? { ...item, rating: index + 1 }
                    : item
            )
        );
    };

    const handleSubmit = () => {
        onSubmit({ rating, review, itemReviews: itemRatings.filter((item) => item.rating > 0), });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{ zIndex: 9999 }}>
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg space-y-4">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold dark:text-gray-200">Rate this Order</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
                    >
                        X
                    </button>
                </div>
                <div className="space-y-4">
                    {itemRatings.map((item) => (
                        <div key={item.menuItemId} className="flex justify-between items-center">
                            <span className="text-lg dark:text-gray-200">{item.name}</span>
                            <div className="flex">
                                {[...Array(5)].map((_, index) => (
                                    <span
                                        key={index}
                                        className={`cursor-pointer text-2xl ${index < item.rating ? "text-yellow-500" : "text-gray-400 dark:text-gray-600"}`}
                                        onClick={() => handleItemStarClick(item.menuItemId, index)}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-lg dark:text-gray-200">Overall Rating</span>
                    <div className="flex">
                        {[...Array(5)].map((_, index) => (

                            <span
                                key={index}
                                className={`cursor-pointer text-2xl ${index < rating ? "text-yellow-500" : "text-gray-400 dark:text-gray-600"}`}
                                onClick={() => handleStarClick(index)}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                </div>
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    maxLength={200}
                    placeholder="Write your review here..."
                    className="w-full border dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300"
                />
                <div className="flex justify-end gap-2">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={handleSubmit}
                    >
                        Submit Review
                    </button>
                    <button
                        className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewPopup;
