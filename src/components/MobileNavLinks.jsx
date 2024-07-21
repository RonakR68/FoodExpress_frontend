import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const MobileNavLinks = () => {

  return (
    <>
      <Link
        to="/order-status"
        className="flex items-center font-bold hover:text-red-500 dark:hover:text-red-500 dark:bg-gray-900 bg-white"
      >
        Order Status
      </Link>
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
        Your Profile
      </Link>
      <Button className="flex items-center px-3 font-bold hover:bg-gray-500 dark:hover:bg-gray-600">
        Sign Out
      </Button>
    </>
  );
};

export default MobileNavLinks;