import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "../auth/AuthContext";
import { useCart } from "./CartContext.jsx";

const MobileNavLinks = () => {
  const { logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleCartClick = () => {
    if (cartItems.length > 0) {
      
      const restaurantId = sessionStorage.getItem('cart-restaurantId');

      if (restaurantId) {
        navigate(`/detail/${restaurantId}`);
      } else {
        navigate('/cart-empty');
      }
    } else {
      navigate('/cart-empty');
    }
  };

  return (
    <>
      <nav className="flex flex-col gap-4">
      <Link
          to="/"
          className="flex items-center font-bold hover:text-red-500 dark:hover:text-red-500 dark:bg-gray-900 bg-white"
        >
          Home
        </Link>
        <Link
          to="/order-status"
          className="flex items-center font-bold hover:text-red-500 dark:hover:text-red-500 dark:bg-gray-900 bg-white"
        >
          My Orders
        </Link>
        <div className="font-bold relative cursor-pointer" onClick={handleCartClick}>
          My Cart
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-1">
              {cartItems.length}
            </span>
          )}
        </div>
        <Link
          to="/manage-restaurant"
          className="flex items-center font-bold hover:text-red-500 dark:hover:text-red-500 dark:bg-gray-900 bg-white"
        >
          My Restaurant
        </Link>
        <Link
          to="/user-profile"
          className="flex items-center font-bold hover:text-red-500 dark:hover:text-red-500 dark:bg-gray-900 bg-white"
        >
          My Profile
        </Link>
        <Button
          onClick={() => logout()}
          className="flex items-center px-3 font-bold hover:bg-gray-500 dark:hover:bg-gray-600"
        >
          Sign Out
        </Button>
      </nav>
    </>
  );
};

export default MobileNavLinks;