import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const formSchema = z.object({
    email: z.string().optional(),
    name: z.string().min(1, "Name is required"),
    addressLine1: z.string().min(1, "Address Line 1 is required"),
    addressLine2: z.string().min(1, "Address Line 2 is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
});


const UserProfileForm = ({
    onSave,
    isLoading,
    currentUser,
    title = "User Profile",
    buttonText = "Submit",
}) => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            name: "",
            addressLine1: "",
            addressLine2: "",
            city: "",
            country: "",
        },
    });


    useEffect(() => {
        if (currentUser) {
            form.reset({
                email: currentUser.email || "",
                name: currentUser.name || "",
                addressLine1: currentUser.addressLine1 || "",
                addressLine2: currentUser.addressLine2 || "",
                city: currentUser.city || "",
                country: currentUser.country || "",
            });
        }
    }, [currentUser, form]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSave)}
                className="space-y-4 bg-gray-50 dark:bg-gray-600 rounded-lg md:p-10 text-gray-900 dark:text-gray-50"
            >
                <div>
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <FormDescription className="text-gray-600 dark:text-gray-400">View and update profile</FormDescription>
                </div>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field}  className="bg-white dark:bg-gray-800 dark:text-white" />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} value={field.value || ""} className="bg-white dark:bg-gray-800 dark:text-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex flex-col md:flex-row gap-4">
                    <FormField
                        control={form.control}
                        name="addressLine1"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Address Line 1</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value || ""} className="bg-white dark:bg-gray-800 dark:text-white" />
                                </FormControl>
                                <FormMessage className="text-red-500 dark:text-red-500"/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="addressLine2"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Address Line 2</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value || ""} className="bg-white dark:bg-gray-800 dark:text-white" />
                                </FormControl>
                                <FormMessage className="text-red-500 dark:text-red-500"/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value || ""} className="bg-white dark:bg-gray-800 dark:text-white" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value || ""} className="bg-white dark:bg-gray-800 dark:text-white" />
                                </FormControl>
                                <FormMessage className="text-red-500 dark:text-red-500"/>
                            </FormItem>
                        )}
                    />
                </div>
                {isLoading ? (
                    <LoadingButton />
                ) : (
                    <Button type="submit" className="bg-red-500 dark:bg-red-500">
                        {buttonText}
                    </Button>
                )}
            </form>
        </Form>
    );
};

export default UserProfileForm;
