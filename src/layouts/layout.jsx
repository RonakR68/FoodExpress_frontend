import React from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { useTopRatedRestaurants } from "@/api/RestaurantApi";
import Autoplay from "embla-carousel-autoplay";

const Layout = ({ children, showHero = false }) => {
  const { topRatedRestaurants, isLoading } = useTopRatedRestaurants();
  const autoScrollDelay = 2000;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {showHero && !isLoading && topRatedRestaurants.length > 0 && (
        <div className="relative w-full max-w-screen-lg mx-auto mt-8">
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
                  <a href={`/detail/${restaurant._id}`} className="block h-full relative">
                    <img
                      src={restaurant.imageUrl}
                      alt={restaurant.restaurantName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-75 text-white p-4 flex justify-center items-center">
                      <p className="text-sm text-center truncate">{restaurant.restaurantName} - {restaurant.city} - Rating: {restaurant.rating || 0}</p>
                    </div>
                  </a>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2" />
            <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2" />
          </Carousel>
        </div>
      )}
      <div className="container mx-auto flex-1 py-10">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
