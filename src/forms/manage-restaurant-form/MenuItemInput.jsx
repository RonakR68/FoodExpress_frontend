import React from "react";
import { Button } from "@/components/ui/button";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const MenuItemInput = ({ index, removeMenuItem, selectedCuisines }) => {
    //console.log(selectedCuisines)
    const { control } = useFormContext();

    return (
        <div className="flex flex-row items-end gap-2">
            <FormField
                control={control}
                name={`menuItems.${index}.name`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="flex items-center gap-1  dark:text-white">
                            Name <FormMessage />
                        </FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                placeholder="Veg Burger"
                                className="bg-white dark:bg-gray-800 dark:text-white"
                            />
                        </FormControl>
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name={`menuItems.${index}.price`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="flex items-center gap-1 dark:text-white">
                            Price (INR) <FormMessage className="text-destructive-foreground dark:text-red-500" />
                        </FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="8.00" className="bg-white dark:bg-gray-800 dark:text-white" />
                        </FormControl>
                    </FormItem>
                )}
            />

            <FormField
                control={control}
                name={`menuItems.${index}.cuisine`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="flex items-center gap-1 dark:text-white">
                            Cuisine
                        </FormLabel>
                        <FormControl>
                            <select
                                {...field}
                                className="bg-white dark:bg-gray-800 dark:text-white border rounded-md p-2"
                                style={{ minWidth: "150px" }}
                            >
                                <option value="">Select cuisine</option>
                                {(selectedCuisines || []).map(cuisine => (
                                    <option key={cuisine} value={cuisine}>
                                        {cuisine}
                                    </option>
                                ))}
                            </select>
                        </FormControl>
                    </FormItem>
                )}
            />

            <div className="flex items-center gap-2 ml-1">
                <FormField
                    control={control}
                    name={`menuItems.${index}.isVeg`}
                    render={({ field }) => (
                        <FormItem>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="veg"
                                    onChange={() => field.onChange('veg')}
                                    checked={field.value === 'veg'}
                                    className="mr-1"
                                />
                                Veg
                            </label>
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name={`menuItems.${index}.isVeg`}
                    render={({ field }) => (
                        <FormItem>
                            <label className="flex items-center mr-2">
                                <input
                                    type="radio"
                                    value="non-veg"
                                    onChange={() => field.onChange('non-veg')}
                                    checked={field.value === 'non-veg'}
                                    className="mr-1"
                                />
                                Non-Veg
                            </label>
                        </FormItem>
                    )}
                />
            </div>

            <Button
                type="button"
                onClick={removeMenuItem}
                className="bg-red-500 dark:bg-red-500 max-h-fit"
            >
                Remove
            </Button>
        </div>
    );
};

export default MenuItemInput;
