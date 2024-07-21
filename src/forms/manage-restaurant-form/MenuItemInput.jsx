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

const MenuItemInput = ({ index, removeMenuItem }) => {
    const { control } = useFormContext();

    return (
        <div className="flex flex-row items-end gap-2">
            <FormField
                control={control}
                name={`menuItems.${index}.name`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="flex items-center gap-1 text-primary-foreground dark:text-white">
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
                        <FormLabel className="flex items-center gap-1 text-primary-foreground dark:text-white">
                            Price (INR) <FormMessage className="text-destructive-foreground dark:text-red-500" />
                        </FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="8.00" className="bg-white dark:bg-gray-800 dark:text-white" />
                        </FormControl>
                    </FormItem>
                )}
            />
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
