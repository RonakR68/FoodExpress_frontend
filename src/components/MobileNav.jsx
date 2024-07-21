import React from "react";
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
import { useAuth } from "../auth/AuthContext"; // Import the custom auth hook
import MobileNavLinks from "./MobileNavLinks";

const MobileNav = () => {
    const { isAuthenticated, login, user } = useAuth(); // Use custom auth hook
    //console.log(user?.name);
    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="text-red-500 dark:text-red-500" />
            </SheetTrigger>
            <SheetContent className="space-y-3 bg-white dark:bg-gray-900 text-black dark:text-white">
                <SheetTitle>
                    {isAuthenticated ? (
                        <span className="flex items-center font-bold gap-2">
                            <CircleUserRound className="text-red-500 dark:text-red-500" />
                            {user?.name}
                        </span>
                    ) : (
                        <span className="text-black dark:text-white">Food Express</span>
                    )}
                </SheetTitle>
                <Separator />
                <SheetDescription className="flex flex-col gap-4">
                    {isAuthenticated ? (
                        <MobileNavLinks />
                    ) : (
                        <Button
                            onClick={() => login()}
                            className="flex-1 font-bold bg-red-500 dark:bg-red-500"
                        >
                            Sign In
                        </Button>
                    )}
                </SheetDescription>
            </SheetContent>
        </Sheet>
    );
};

export default MobileNav;
