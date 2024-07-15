import { CircleUserRound, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import MobileNavLinks from "./MobileNavLinks";

const MobileNav = () => {

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-red-500" />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle>
    
            <span className="flex items-center font-bold gap-2">
              <CircleUserRound className="text-orange-500" />
              {user?.email}
            </span>
          
            <span> Food Express </span>
         
        </SheetTitle>
        <Separator />
        <SheetDescription className="flex flex-col gap-4">
          
            <MobileNavLinks />
          
            <Button
              onClick={() => loginWithRedirect()}
              className="flex-1 font-bold bg-red-500"
            >
              Sign In
            </Button>
         
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;