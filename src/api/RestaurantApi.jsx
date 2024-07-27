import { useQuery } from "react-query";

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

export const useTopRatedRestaurants = (limit = 3) => {
    const fetchTopRatedRestaurants = async () => {
      const response = await fetch(`${API_BASE_URL}/api/restaurant/top-rated?limit=${limit}`);
      //console.log(response);
      if (!response.ok) {
        throw new Error("Failed to fetch top-rated restaurants");
      }
      return response.json();
    };
  
    const { data: topRatedRestaurants, isLoading, error } = useQuery(
      ["topRatedRestaurants", limit],
      fetchTopRatedRestaurants
    );
  
    return { topRatedRestaurants, isLoading, error };
  };