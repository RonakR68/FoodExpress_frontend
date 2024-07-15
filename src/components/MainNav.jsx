
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";


const MainNav = () => {

  return (
    <span className="flex space-x-2 items-center">
       <UsernameMenu />
        <Button
          variant="ghost"
          className="font-bold hover:text-red-500 hover:bg-white"
          onClick={async () => await loginWithRedirect()}
        >
          Sign In
        </Button>
    </span>
  );
};

export default MainNav;
