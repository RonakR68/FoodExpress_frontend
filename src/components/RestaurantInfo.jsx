import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Dot } from "lucide-react";

const RestaurantInfo = ({ restaurant }) => {
    return (
        <Card className="border-slate-300 dark:border-slate-700 dark:bg-gray-700">
            <CardHeader>
                <CardTitle className="text-3xl font-bold tracking-tight dark:text-gray-300">
                    {restaurant.restaurantName}
                </CardTitle>
                <CardDescription className="dark:text-gray-300">
                    {restaurant.addressLine1}, {restaurant.city}, {restaurant.state}, {restaurant.pincode}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2 dark:text-gray-300">
                {restaurant.cuisines.map((item, index) => (
                    <span key={index} className="flex items-center">
                        <span>{item}</span>
                        {index < restaurant.cuisines.length - 1 && <Dot className="mx-1" />}
                    </span>
                ))}
            </CardContent>
        </Card>
    );
};

export default RestaurantInfo;