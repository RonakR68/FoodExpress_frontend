import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurant = () => {
    const getMyRestaurantRequest = async () => {
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "GET",
            credentials: 'include', 
        });

        if (!response.ok) {
            throw new Error("Failed to get restaurant");
        }
        return response.json();
    };

    const { data: restaurant, isLoading } = useQuery(
        "fetchMyRestaurant",
        getMyRestaurantRequest
    );

    return { restaurant, isLoading };
};

export const useCreateMyRestaurant = () => {
    const createMyRestaurantRequest = async (restaurantFormData) => {
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "POST",
            body: restaurantFormData,
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error("Error while adding restaurant");
        }

        return response.json();
    };

    const {
        mutate: createRestaurant,
        isLoading,
        isSuccess,
        error,
    } = useMutation(createMyRestaurantRequest);

    if (isSuccess) {
        toast.success("Restaurant created!");
    }

    if (error) {
        toast.error("Error while adding restaurant");
    }

    return { createRestaurant, isLoading };
};

export const useUpdateMyRestaurant = () => {
    const updateRestaurantRequest = async (restaurantFormData) => {
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "PUT",
            body: restaurantFormData,
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error("Failed to update restaurant");
        }

        return response.json();
    };

    const {
        mutate: updateRestaurant,
        isLoading,
        error,
        isSuccess,
    } = useMutation(updateRestaurantRequest);

    if (isSuccess) {
        toast.success("Restaurant Updated");
    }

    if (error) {
        toast.error("Unable to update restaurant");
    }

    return { updateRestaurant, isLoading };
};

export const useGetMyRestaurantOrders = () => {
    const getMyRestaurantOrdersRequest = async () => {
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch orders");
        }
        
        return response.json();
    };

    const { data: orders, isLoading } = useQuery(
        "fetchMyRestaurantOrders",
        getMyRestaurantOrdersRequest,
    );

    return { orders, isLoading };
};

export const useUpdateMyRestaurantOrder = () => {
    const updateMyRestaurantOrder = async (updateStatusOrderRequest) => {
        const response = await fetch(
            `${API_BASE_URL}/api/my/restaurant/order/${updateStatusOrderRequest.orderId}/status`,
            {
                method: "PATCH",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: updateStatusOrderRequest.status }),
            }
        );
        //console.log('my restaurant api update order');
        //console.log(response);
        if (!response.ok) {
            throw new Error("Failed to update status");
        }

        return response.json();
    };

    const {
        mutateAsync: updateRestaurantStatus,
        isLoading,
        isError,
        isSuccess,
        reset,
    } = useMutation(updateMyRestaurantOrder);

    if (isSuccess) {
        toast.success("Order updated");
    }

    if (isError) {
        toast.error("Unable to update order");
        reset();
    }

    return { updateRestaurantStatus, isLoading };
};
