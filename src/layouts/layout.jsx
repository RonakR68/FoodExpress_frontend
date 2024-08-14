import React from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useTopRatedRestaurants } from "@/api/RestaurantApi";
import { Link } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { useGetMyUser } from "@/api/MyUserApi";
import RestaurantRecommendations from "@/components/RestaurantRecommendations";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Layout = ({ children, showHero = false }) => {
  const { topRatedRestaurants, isLoading } = useTopRatedRestaurants();
  const { isAuthenticated } = useAuth();
  const { currentUser } = useGetMyUser();
  const defaultAddress = isAuthenticated && currentUser && currentUser.addresses.find(address => address.isDefault);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {showHero && (
        <>
          {isAuthenticated && currentUser && defaultAddress && (
            <div className="text-center my-4 dark:text-white">
              <span className="text-xl font-semibold">Location:</span>
              <span className="text-base ml-2">{defaultAddress.name} - {defaultAddress.addressLine1}, {defaultAddress.addressLine2}, {defaultAddress.city}, {defaultAddress.state}, {defaultAddress.pincode}</span>
              <Link to="/user-profile" className="text-blue-500 hover:underline ml-2">Change Location</Link>
            </div>
          )}
          <div className="relative w-full max-w-screen-lg mx-auto mt-8">
            {!isLoading && topRatedRestaurants && topRatedRestaurants.length > 0 ? (
              <>
                <h2 className="text-center text-xl font-semibold mb-4 dark:text-white">
                  Explore Top-Rated Restaurants!
                </h2>
                <div className="flex overflow-x-scroll space-x-4 p-4">
                  {topRatedRestaurants.map((restaurant) => (
                    <div key={restaurant._id} className="min-w-[300px] bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transform transition duration-300">
                      <Link to={`/detail/${restaurant._id}`}>
                        <img
                          src={restaurant.imageUrl}
                          alt={restaurant.restaurantName}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-bold truncate dark:text-white">{restaurant.restaurantName}</h3>
                          <p className="text-sm truncate dark:text-gray-300">{restaurant.city}</p>
                          <p className="text-sm dark:text-gray-300">
                            Rating: {(restaurant.rating || 0).toFixed(1)}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-center text-xl font-semibold mb-4 dark:text-white">
                Oops! Currently there are no restaurants serviceable in your city.
              </p>
            )}
          </div>
          {defaultAddress && (
            <RestaurantRecommendations userId={currentUser._id} pincode={defaultAddress.pincode} />
          )}
        </>
      )}
      <div className="container mx-auto flex-1 py-10">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
