import React from "react";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const DetailsSection = () => {
    const { control } = useFormContext();

    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold dark:text-white">Details</h2>
                <FormDescription>
                    Enter the details about your restaurant
                </FormDescription>
            </div>
            <FormField
                control={control}
                name="restaurantName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="dark:text-white">Name</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white dark:bg-gray-800 dark:text-white" />
                        </FormControl>
                        <FormMessage className="text-destructive-foreground dark:text-red-500"/>
                    </FormItem>
                )}
            />
            <div className="flex gap-4">
                <FormField
                    control={control}
                    name="city"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel className=" dark:text-white">City</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white dark:bg-gray-800 dark:text-white" />
                            </FormControl>
                            <FormMessage className="text-destructive-foreground dark:text-red-500"/>
                        </FormItem>
                    )}
                />
                {/* 
        <FormField
          control={control}
          name="country"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        */}
            </div>

            <FormField
                control={control}
                name="deliveryPrice"
                render={({ field }) => (
                    <FormItem className="max-w-[25%]">
                        <FormLabel className=" dark:text-white">Delivery price (INR)</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white dark:bg-gray-800 dark:text-white" placeholder="1.50" />
                        </FormControl>
                        <FormMessage className="text-destructive-foreground dark:text-red-500"/>
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="estimatedDeliveryTime"
                render={({ field }) => (
                    <FormItem className="max-w-[25%]">
                        <FormLabel className=" dark:text-white">Estimated Delivery Time (minutes)</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white dark:bg-gray-800 dark:text-white" placeholder="30" />
                        </FormControl>
                        <FormMessage className="text-destructive-foreground dark:text-red-500"/>
                    </FormItem>
                )}
            />
        </div>
    );
};

export default DetailsSection;
