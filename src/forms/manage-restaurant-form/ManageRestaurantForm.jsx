import React, { useEffect } from "react";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";

const formSchema = z
    .object({
        restaurantName: z.string({
            required_error: "Restuarant name is required",
        }),
        city: z.string({
            required_error: "City is required",
        }),
        addressLine1: z.string({
            required_error: "Address Line 1 is required",
        }),
        state: z.string({
            required_error: "State is required",
        }),
        pincode: z.string().regex(/^\d{6}$/, "Pincode must be exactly 6 digits"),
        deliveryPrice: z.coerce.number({
            required_error: "Delivery price is required",
            invalid_type_error: "Must be a valid number",
        }),
        estimatedDeliveryTime: z.coerce.number({
            required_error: "Estimated delivery time is required",
            invalid_type_error: "Must be a valid number",
        }),
        cuisines: z.array(z.string()).nonempty({
            message: "Please select at least one item",
        }),
        menuItems: z.array(
            z.object({
                name: z.string().min(1, "name is required"),
                price: z.coerce.number().min(1, "price is required"),
            })
        ),
        imageUrl: z.string().optional(),
        imageFile: z.instanceof(File, { message: "Image is required" }).optional(),
    })
    .refine((data) => data.imageUrl || data.imageFile, {
        message: "Either image URL or image File must be provided",
        path: ["imageFile"],
    });

const ManageRestaurantForm = ({ onSave, isLoading, restaurant }) => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            restaurantName: "",
            city: "",
            addressLine1: "",
            state: "",
            pincode: "",
            deliveryPrice: 0,
            estimatedDeliveryTime: 0,
            cuisines: [],
            menuItems: [{ name: "", price: 0 }],
            //imageUrl: "", 
            //imageFile: null, 
        },
    });

    useEffect(() => {
        if (!restaurant) {
            // Clear form values if no restaurant data
            form.reset({
                restaurantName: "",
                city: "",
                addressLine1: "",
                state: "",
                pincode: "",
                deliveryPrice: 0,
                estimatedDeliveryTime: 0,
                cuisines: [],
                menuItems: [{ name: "", price: 0 }],
                //imageUrl: "",
                imageFile: null,
            });
            return;
        }

        // price lowest denomination of 100
        const deliveryPriceFormatted = parseInt(
            (restaurant.deliveryPrice / 100).toFixed(2)
        );

        const menuItemsFormatted = restaurant.menuItems.map((item) => ({
            ...item,
            price: parseInt((item.price / 100).toFixed(2)),
        }));

        form.reset({
            restaurantName: restaurant.restaurantName || "",
            city: restaurant.city || "",
            addressLine1: restaurant.addressLine1 || "",
            state: restaurant.state || "",
            pincode: restaurant.pincode || "",
            deliveryPrice: deliveryPriceFormatted || 0,
            estimatedDeliveryTime: restaurant.estimatedDeliveryTime || 0,
            cuisines: restaurant.cuisines || [],
            menuItems: menuItemsFormatted.length ? menuItemsFormatted : [{ name: "", price: 0 }],
            imageUrl: restaurant.imageUrl || "",
            //imageFile: null,
        });
    }, [form, restaurant]);

    const onSubmit = (formDataJson) => {
        const formData = new FormData();

        formData.append("restaurantName", formDataJson.restaurantName);
        formData.append("city", formDataJson.city);
        formData.append("addressLine1", formDataJson.addressLine1);
        formData.append("state", formDataJson.state);
        formData.append("pincode", formDataJson.pincode);
        //formData.append("country", formDataJson.country);

        formData.append(
            "deliveryPrice",
            (formDataJson.deliveryPrice * 100).toString()
        );
        formData.append(
            "estimatedDeliveryTime",
            formDataJson.estimatedDeliveryTime.toString()
        );
        formDataJson.cuisines.forEach((cuisine, index) => {
            formData.append(`cuisines[${index}]`, cuisine);
        });
        formDataJson.menuItems.forEach((menuItem, index) => {
            formData.append(`menuItems[${index}][name]`, menuItem.name);
            formData.append(
                `menuItems[${index}][price]`,
                (menuItem.price * 100).toString()
            );
        });

        if (formDataJson.imageFile) {
            formData.append(`imageFile`, formDataJson.imageFile);
        }

        onSave(formData);
        window.location.reload();
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 bg-background p-10 rounded-lg text-foreground dark:bg-gray-700"
            >
                <DetailsSection />
                <Separator className="border-border" />
                <CuisinesSection />
                <Separator className="border-border" />
                <MenuSection />
                <Separator className="border-border" />
                <ImageSection />
                {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
            </form>
        </Form>
    );
};

export default ManageRestaurantForm;
