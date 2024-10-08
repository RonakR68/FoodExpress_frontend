import { CircleUserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useAuth } from "../auth/AuthContext";
import { useGetMyUser } from "@/api/MyUserApi";

const UsernameMenu = () => {
  const { logout } = useAuth();
  const user = useGetMyUser();
  //console.log(user.currentUser)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-red-500 gap-2">
        <CircleUserRound className="text-red-500" />
        {user?.currentUser?.name}
      </DropdownMenuTrigger>
      <DropdownMenuContent>

        <DropdownMenuItem>
          <Link
            to="/manage-restaurant"
            className="font-bold hover:text-red-500"
          >
            My Restaurant
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link to="/user-profile" className="font-bold hover:text-red-500">
            My Profile
          </Link>
        </DropdownMenuItem>

        <Separator />

        <DropdownMenuItem>
          <Button
            onClick={() => logout()}
            className="flex flex-1 font-bold bg-red-500"
          >
            Sign Out
          </Button>
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMenu;