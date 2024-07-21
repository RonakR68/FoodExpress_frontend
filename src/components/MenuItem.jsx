import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

const MenuItem = ({ menuItem, cartItemQuantity, addToCart, removeFromCart }) => {
    return (
        <Card className="bg-white dark:bg-gray-800 text-black dark:text-white">
            <CardHeader>
                <CardTitle className="text-black dark:text-white">{menuItem.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between font-bold text-black dark:text-white">
                <span>INR {(menuItem.price / 100).toFixed(2)}</span>
                <div className="flex items-center gap-2">
                    <Button
                        onClick={removeFromCart}
                        disabled={cartItemQuantity <= 0}
                        className="bg-rose-500 dark:bg-rose-500"
                    >
                        -
                    </Button>
                    <span>{cartItemQuantity}</span>
                    <Button
                        onClick={addToCart}
                        className="bg-green-500 dark:bg-green-500"
                    >
                        +
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default MenuItem;