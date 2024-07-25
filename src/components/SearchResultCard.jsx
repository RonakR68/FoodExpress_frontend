import { Link } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";
import { Banknote, Clock, Dot, Star } from "lucide-react";


const SearchResultCard = ({ restaurant }) => {
    const rating = restaurant.rating || 0;
    const reviewCount = restaurant.reviews?.length || 0;

    return (
        <Link
            to={`/detail/${restaurant._id}`}
            className="grid lg:grid-cols-[2fr_3fr] gap-5 group"
        >
            <AspectRatio ratio={16 / 6}>
                <img
                    src={restaurant.imageUrl}
                    className="rounded-md w-full h-full object-cover"
                />
            </AspectRatio>
            <div>
                <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline">
                    {restaurant.restaurantName}
                </h3>
                <div id="card-content" className="grid md:grid-cols-2 gap-2">
                    <div className="flex flex-row flex-wrap">
                        {restaurant.cuisines.map((item, index) => (
                            <span key={index} className="flex">
                                <span>{item}</span>
                                {index < restaurant.cuisines.length - 1 && <Dot />}
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-2 flex-col">
                        <div className="flex items-center gap-1 text-green-600">
                            <Clock className="text-green-600" />
                            {restaurant.estimatedDeliveryTime} mins
                        </div>
                        <div className="flex items-center gap-1">
                            <Banknote />
                            Delivery charges: INR {(restaurant.deliveryPrice / 100).toFixed(2)}
                        </div>
                        <div className="flex items-center gap-1">
                            <Star className="text-yellow-500" />
                            Rating: {rating.toFixed(1)} ({reviewCount})
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default SearchResultCard;