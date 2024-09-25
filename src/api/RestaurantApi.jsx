import { useQuery } from "react-query";
import { useAuth } from "@/auth/AuthContext";
import { useGetMyUser } from "./MyUserApi";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetRestaurant = (restaurantId) => {
    const getRestaurantByIdRequest = async () => {
        const response = await fetch(
            `${API_BASE_URL}/api/restaurant/${restaurantId}`
        );
        if (!response.ok) {
            throw new Error("Failed to get restaurant");
        }

        return response.json();
    };

    const { data: restaurant, isLoading } = useQuery(
        "fetchRestaurant",
        getRestaurantByIdRequest,
        {
            enabled: !!restaurantId,
        }
    );

    return { restaurant, isLoading };
};


export const useSearchRestaurants = (
    searchState,
    city
) => {
    const createSearchRequest = async () => {
        //console.log('search restaurants');
        const params = new URLSearchParams();
        params.set("searchQuery", searchState.searchQuery || "");
        params.set("page", searchState.page.toString());
        params.set("selectedCuisines", searchState.selectedCuisines.join(","));
        params.set("sortOption", searchState.sortOption);

        const response = await fetch(
            `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
        );

        if (!response.ok) {
            throw new Error("Failed to get restaurant");
        }
        return response.json();
    };

    const { data: results, isLoading, isError, refetch } = useQuery(
        ["searchRestaurants", searchState, city],
        createSearchRequest,
        {
            enabled: !!city, // Fetch only if `city` is available
            keepPreviousData: true, // Optional: keep previous data while new data is fetched
            refetchOnWindowFocus: false, // Optional: disable refetching on window focus
        }
    );

    return {
        results,
        isLoading,
        isError,
        refetch,
    };
};

export const useTopRatedRestaurants = (limit = 5) => {
    const { isAuthenticated } = useAuth();
    const { currentUser } = useGetMyUser();

    const fetchTopRatedRestaurants = async () => {
        if (isAuthenticated && currentUser) {
            const response = await fetch(`${API_BASE_URL}/api/restaurant/top-rated?limit=${limit}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "user-id": currentUser._id,
                },
                credentials: "include",
            });
            if (!response.ok) {
                throw new Error("Failed to fetch top-rated restaurants");
            }
            return response.json();
        } else {
            const response = await fetch(`${API_BASE_URL}/api/restaurant/top-rated?limit=${limit}`);
            if (!response.ok) {
                throw new Error("Failed to fetch top-rated restaurants");
            }
            return response.json();
        }
    };

    const { data: topRatedRestaurants, isLoading, error } = useQuery(
        ["topRatedRestaurants", limit, isAuthenticated, currentUser],
        fetchTopRatedRestaurants,
        {
            enabled: isAuthenticated ? !!currentUser : true, // Ensure the query only runs when authenticated and currentUser is available, or when not authenticated
        }
    );

    return { topRatedRestaurants, isLoading, error };
};

export const useCuisineFilteredRestaurants = (selectedCuisines, pincode) => {
    const createCuisineSearchRequest = async () => {
        //console.log('Searching restaurants by selected cuisines and pincode');

        const params = new URLSearchParams();
        params.set("selectedCuisines", selectedCuisines.join(","));
        if (pincode) {
            params.set("pincode", pincode);
        }

        // Update the endpoint to the new one
        const response = await fetch(
            `${API_BASE_URL}/api/restaurant/restaurantByCuisines?${params.toString()}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch restaurants by cuisine");
        }

        return response.json();
    };

    const { data: cuisineResults, isLoading, isError } = useQuery(
        ["cuisineFilteredRestaurants", selectedCuisines, pincode],
        createCuisineSearchRequest,
        {
            enabled: selectedCuisines.length > 0, // Only fetch if there are selected cuisines
            keepPreviousData: true,
        }
    );

    return {
        cuisineResults,
        isLoading,
        isError,
    };
};
