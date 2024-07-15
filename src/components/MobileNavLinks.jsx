import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const MobileNavLinks = () => {
  
  return (
    <>
      <Link
        to="/user-profile"
        className="flex bg-white items-center font-bold hover:text-red-500"
      >
        Your Profile
      </Link>
      <Button
        className="flex items-center px-3 font-bold hover:bg-gray-500"
      >
        Sign Out
      </Button>
    </>
  );
};

export default MobileNavLinks;