import React from 'react';
import { useGetRecommendedRestaurants } from "@/api/MyUserApi";
import { Link } from "react-router-dom";

const RestaurantRecommendations = ({ userId, pincode }) => {
    const { recommendedRestaurants, isLoading } = useGetRecommendedRestaurants(userId, pincode);
    if (isLoading) {
        //return <div>Loading...</div>;
    }

    if (!recommendedRestaurants || recommendedRestaurants.length === 0) {
        return null;
    }

    return (
        <div className="relative w-full max-w-screen-lg mx-auto mt-8">
            <h2 className="text-center text-xl font-semibold mb-4 dark:text-white">
                Try Restaurants Recommended Only For You!
            </h2>
            <div className="flex overflow-x-scroll space-x-4 p-4">
                {recommendedRestaurants.map((restaurant) => (
                    <div key={restaurant._id} className="min-w-[300px] bg-white dark:bg-gray-800 rounded-lg shadow-lg border:transparent hover:scale-105 hover:shadow-xl transform transition duration-300">
                        <Link to={`/detail/${restaurant._id}`}>
                            <img
                                src={restaurant.imageUrl}
                                alt={restaurant.restaurantName}
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-bold truncate dark:text-white">{restaurant.restaurantName}</h3>
                                <p className="text-sm truncate dark:text-gray-300">{restaurant.cuisines.join(", ")}</p>
                                <p className="text-sm dark:text-gray-300">Rating: {restaurant.rating.toFixed(1)} ({restaurant.reviews.length})</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RestaurantRecommendations;
