import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyOrders = () => {
    const getMyOrdersRequest = async () => {
        const response = await fetch(`${API_BASE_URL}/api/order`, {
            method: "GET",
            credentials: 'include', 
        });

        if (!response.ok) {
            throw new Error("Failed to get orders");
        }

        return response.json();
    };

    const { data: orders, isLoading } = useQuery(
        "fetchMyOrders",
        getMyOrdersRequest,
        {
            refetchInterval: 5000, // 5 seconds
        }
    );

    return { orders, isLoading };
};

export const useCreateCheckoutSession = () => {
    const createCheckoutSessionRequest = async (
        checkoutSessionRequest
    ) => {
        //console.log(checkoutSessionRequest)
        const response = await fetch(
            `${API_BASE_URL}/api/order/checkout/create-checkout-session`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(checkoutSessionRequest),
            }
        );

        if (!response.ok) {
            throw new Error("Error while creating checkout session");
        }

        return response.json();
    };

    const {
        mutateAsync: createCheckoutSession,
        isLoading,
        error,
        reset,
    } = useMutation(createCheckoutSessionRequest);

    if (error) {
        toast.error(error.toString());
        reset();
    }

    return {
        createCheckoutSession,
        isLoading,
    };
};
