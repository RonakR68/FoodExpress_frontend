import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "./ui/dialog";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import DeliveryDetails from "@/forms/user-profile-form/DeliveryDetails";
import { useGetMyUser } from "@/api/MyUserApi";
import { useAuth } from "@/auth/AuthContext";

const CheckoutButton = ({ onCheckout, disabled, isLoading, orderSummary }) => {
    const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
    const { pathname } = useLocation();
    const { currentUser, isLoading : isUserLoading } = useGetMyUser();
    const navigate = useNavigate();

    const onLogin = async () => {
        navigate('/api/auth/login', { state: { returnTo: pathname } });
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

    const name = currentUser.name;
    const email = currentUser.email;
    const defaultAddress = currentUser.addresses.find(address => address.isDefault);

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
                <DeliveryDetails
                    name={name}
                    email={email}
                    address={defaultAddress}
                    orderSummary={orderSummary}
                    onConfirm={() => onCheckout({name, email, address: defaultAddress})}
                />
            </DialogContent>
        </Dialog>
    );
};

export default CheckoutButton;
