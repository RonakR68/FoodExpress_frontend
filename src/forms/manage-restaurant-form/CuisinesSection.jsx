import React, { useEffect } from "react";
import {
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { cuisineList } from "@/config/restaurant-options-config";
import { useFormContext } from "react-hook-form";
import CuisineCheckbox from "./CuisineCheckbox";

const CuisinesSection = ({ onCuisineChange }) => {
    const { control, watch } = useFormContext();
    const selectedCuisines = watch("cuisines", []);

    useEffect(() => {
        onCuisineChange(selectedCuisines);
    }, [selectedCuisines, onCuisineChange]);

    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold dark:text-white">Cuisines</h2>
                <FormDescription className="text-muted-foreground dark:text-gray-400">
                    Select the cuisines that your restaurant serves
                </FormDescription>
            </div>
            <FormField
                control={control}
                name="cuisines"
                render={({ field }) => (
                    <FormItem>
                        <div className="grid md:grid-cols-5 gap-1">
                            {cuisineList.map((cuisineItem) => (
                                <CuisineCheckbox key={cuisineItem} cuisine={cuisineItem} field={field} />
                            ))}
                        </div>
                        <FormMessage className="text-destructive-foreground dark:text-red-500"/>
                    </FormItem>
                )}
            />
        </div>
    );
};

export default CuisinesSection;
