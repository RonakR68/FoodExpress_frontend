import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger, DialogTitle} from "./ui/dialog";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";
import { useGetMyUser } from "@/api/MyUserApi";
import { useAuth } from "@/auth/AuthContext";

const CheckoutButton = ({ onCheckout, disabled, isLoading }) => {
    const { isAuthenticated, isLoading: isAuthLoading, login } = useAuth();
    const { pathname } = useLocation();
    const { currentUser, isLoading: isGetUserLoading } = useGetMyUser();
    const navigate = useNavigate();

    const onLogin = async () => {
        navigate('/api/auth/login',{state: {returnTo: pathname}});
    };

    if (!isAuthenticated) {
        return (
            <Button onClick={onLogin} className="bg-red-500 dark:bg-red-500 flex-1">
                Log in to check out
            </Button>
        );
    }

    if (isAuthLoading || !currentUser || isLoading) {
        return <LoadingButton />;
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button disabled={disabled} className="bg-red-500 dark:bg-red-500 flex-1">
                    Go to checkout
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50 dark:bg-gray-800">
                <VisuallyHidden>
                    <DialogTitle>Confirm Delivery Details</DialogTitle>
                </VisuallyHidden>
                <UserProfileForm
                    currentUser={currentUser}
                    onSave={onCheckout}
                    isLoading={isGetUserLoading}
                    title="Confirm Delivery Details"
                    buttonText="AutoPay and Place Your Order"
                />
            </DialogContent>
        </Dialog>
    );
};

export default CheckoutButton;
