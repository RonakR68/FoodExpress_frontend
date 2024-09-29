import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyOrders = (sort, status) => {
    const getMyOrdersRequest = async () => {
        const query = new URLSearchParams({ sort, status });
        const response = await fetch(`${API_BASE_URL}/api/order?${query}`, {
            method: "GET",
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error("Failed to get orders");
        }

        const orders = await response.json();

        return orders;;
    };

    const { data: orders, isLoading, refetch } = useQuery(
        ["fetchMyOrders", sort, status],
        getMyOrdersRequest,
        {
            keepPreviousData: true,
        }
    );

    return { orders, isLoading, refetch };
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
        toast.error(error.toString(),{ duration: 3000 });
        reset();
    }

    return {
        createCheckoutSession,
        isLoading,
    };
};


export const useSubmitReview = () => {
    const submitReviewRequest = async (reviewData) => {
        //console.log('order review api');
        //console.log(reviewData);
        try {
            const response = await fetch(`${API_BASE_URL}/api/order/review`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(reviewData),
            });

            if (!response.ok) {
                // Attempt to extract the error message from the response
                const errorData = await response.json();
                const errorMessage = errorData.message || 'Error while submitting review';
                throw new Error(errorMessage);
            }

            return response.json();
        } catch (error) {
            throw new Error(error.message || 'An error occurred');
        }
    };

    const {
        mutateAsync: submitReview,
        isLoading,
        error,
        reset,
    } = useMutation(submitReviewRequest);

    if (error) {
        toast.error(error.message,{ duration: 3000 });
        reset();
    }

    return {
        submitReview,
        isLoading,
    };
};