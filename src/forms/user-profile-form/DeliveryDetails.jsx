import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

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
                    <span className="font-semibold">City: </span>  {orderSummary.city}
                </div>
                <div className="my-2 border-t border-gray-300 dark:border-gray-600" />
                <div className="font-semibold mb-2">Items</div>
                <div className="space-y-2">
                    {orderSummary.cartItems.map((item) => (
                        <div
                            key={item._id}
                            className="flex items-center justify-between"
                        >
                            <div className="flex items-center">
                                <Badge variant="outline" className="mr-2 dark:text-gray-300">
                                    {item.quantity}
                                </Badge>
                                {item.name}
                            </div>
                            <div>{(item.price / 100).toFixed(2)}</div>
                        </div>
                    ))}
                </div>
                <div className="my-2 border-t border-gray-300 dark:border-gray-600" />
                <div className="mt-4 flex justify-between font-semibold">
                    <span>Delivery Charges</span>
                    <span>{(orderSummary.deliveryPrice / 100).toFixed(2)}</span>
                </div>
                <div className="my-2 border-t border-gray-300 dark:border-gray-600" />
                <div className="mt-2 flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>{orderSummary.totalCost}</span>
                </div>
            </div>
            {/* Delivery Address Section */}
            <div className="text-xl font-bold">Delivery Address</div>
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
