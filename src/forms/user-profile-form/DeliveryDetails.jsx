import React from "react";
import { Link } from "react-router-dom";

const DeliveryDetails = ({ name, email, address, orderSummary, onConfirm }) => {
    return (
        <div className="flex flex-col gap-4">
            {/* Order Summary Section */}
            <div className="text-xl font-bold">Order Summary</div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                <div>
                    <span className="font-semibold">Restaurant: </span> {orderSummary.restaurantName}
                </div>
                <div className="my-2 border-t border-gray-300 dark:border-gray-600" />
                <div>
                    <span className="font-semibold">City: </span> {orderSummary.city}
                </div>
                <div className="my-2 border-t border-gray-300 dark:border-gray-600" />
                <div>
                    <div className="font-semibold">Items:</div>
                    {orderSummary.cartItems.map((item) => (
                        <div key={item._id}>
                            {item.name} - {item.quantity} x INR {(item.price / 100).toFixed(2)}
                        </div>
                    ))}
                </div>
                <div className="my-2 border-t border-gray-300 dark:border-gray-600" />
                <div>
                    <span className="font-semibold">Delivery Price: </span> INR {(orderSummary.deliveryPrice / 100).toFixed(2)}
                </div>
                <div className="my-2 border-t border-gray-300 dark:border-gray-600" />
                <div>
                    <span className="font-semibold">Total: </span> INR {orderSummary.totalCost}
                </div>
            </div>
            {/* Delivery Address Section */}
            <div className="text-xl font-bold">Delivery Details</div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                {address ? (
                    <div>
                        <div>
                            <span className="font-bold">Name:</span> {name}
                        </div>
                        <div>
                            <span className="font-bold">Email:</span> {email}
                        </div>
                        <div>
                            <span className="font-bold">Address:</span> {address.addressLine1}, {address.addressLine2}, {address.city}, {address.state}, {address.pincode}
                        </div>
                        <Link
                            to="/user-profile"
                            className="bg-gray-100 dark:bg-gray-700 flex items-center font-bold text-blue-500"
                        >
                            Edit Details
                        </Link>
                    </div>
                ) : (
                    <div>
                        <p>No address found </p>
                        <Link
                            to="/user-profile"
                            className="font-bold text-blue-500"
                        >
                            Click here to add address
                        </Link>
                    </div>
                )}
            </div>
            {address && (<button
                onClick={onConfirm}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
            >
                Confirm Order
            </button>
            )}
        </div>
    );
};

export default DeliveryDetails;
