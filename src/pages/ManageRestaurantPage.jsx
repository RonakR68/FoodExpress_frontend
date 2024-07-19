import React from "react";
import {
    useCreateMyRestaurant,
    useGetMyRestaurant,
    useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
    const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant();
    const { restaurant } = useGetMyRestaurant();
    const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateMyRestaurant();

    const isEditing = !!restaurant; // true if restaurant exists for user

    return (
        <ManageRestaurantForm
            restaurant={restaurant}
            onSave={isEditing ? updateRestaurant : createRestaurant}
            isLoading={isCreateLoading || isUpdateLoading}
        />
    );
};

export default ManageRestaurantPage;
