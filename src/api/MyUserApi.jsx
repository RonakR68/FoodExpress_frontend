import { useAuth } from "@/auth/AuthContext";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

// Get API base URL from Vite env variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyUser = () => {
    const { isAuthenticated } = useAuth();

    // Hook to get user
    const getMyUserRequest = async () => {
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        //console.log(response);
        if (!response.ok) {
            throw new Error("Failed to fetch user");
        }

        return response.json();
    };

    const {
        data: currentUser,
        isLoading,
        error,
    } = useQuery("fetchCurrentUser", getMyUserRequest, {
        enabled: isAuthenticated, // Only run the query if the user is authenticated
    });

    if (error) {
        toast.error(error.toString());
    }

    return { currentUser, isLoading };
};

export const useCreateMyUser = () => {
    const createMyUserRequest = async (user) => {
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", 
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error("Error while creating user");
        }
    };

    const {
        mutateAsync: createUser,
        isLoading,
        isError,
        isSuccess,
    } = useMutation(createMyUserRequest);

    return {
        createUser,
        isLoading,
        isError,
        isSuccess,
    };
};

export const useUpdateMyUser = () => {
    const updateMyUserRequest = async (formData) => {
        //console.log(formData);
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error("Failed to update User Profile");
        }

        return response.json();
    };

    const {
        mutateAsync: updateUser,
        isLoading,
        isSuccess,
        error,
        reset,
    } = useMutation(updateMyUserRequest);

    if (isSuccess) {
        toast.success("User Profile Updated!");
    }

    if (error) {
        toast.error(error.toString());
        reset();
    }

    return { updateUser, isLoading };
};
