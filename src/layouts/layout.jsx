import React from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { useTopRatedRestaurants } from "@/api/RestaurantApi";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { useGetMyUser } from "@/api/MyUserApi";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Layout = ({ children, showHero = false }) => {
  const { topRatedRestaurants, isLoading } = useTopRatedRestaurants();
  const autoScrollDelay = 2000;
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
                  Explore top-rated Restaurants below!
                </h2>
                <Carousel
                  className="relative"
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  plugins={[
                    Autoplay({
                      delay: autoScrollDelay,
                      stopOnInteraction: false,
                      stopOnMouseEnter: true,
                    }),
                  ]}
                >
                  <CarouselContent>
                    {topRatedRestaurants.map((restaurant) => (
                      <CarouselItem key={restaurant._id} className="relative w-full h-[400px]">
                        <Link to={`/detail/${restaurant._id}`}>
                          <img
                            src={restaurant.imageUrl}
                            alt={restaurant.restaurantName}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-75 text-white p-4 flex justify-center items-center">
                            <p className="text-sm text-center truncate">
                              {restaurant.restaurantName} - {restaurant.city} - Rating: {(restaurant.rating || 0).toFixed(1)}
                            </p>
                          </div>
                        </Link>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2" />
                  <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2" />
                </Carousel>
              </>
            ) : (
              <p className="text-center text-xl font-semibold mb-4 dark:text-white">
                Oops! Currently there are no restaurants serviceable in your city.
              </p>
            )}
          </div>
        </>
      )}
      <div className="container mx-auto flex-1 py-10">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
