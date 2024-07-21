import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect } from "react";

const formSchema = z.object({
    searchQuery: z.string({
        required_error: "Restaurant name is required",
    }),
});

const SearchBar = ({ onSubmit, onReset, placeHolder, searchQuery }) => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            searchQuery,
        },
    });

    useEffect(() => {
        form.reset({ searchQuery });
    }, [form, searchQuery]);

    const handleReset = () => {
        form.reset({
            searchQuery: "",
        });

        if (onReset) {
            onReset();
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={`flex items-center gap-3 justify-between flex-row border-2 rounded-full p-3 ${form.formState.errors.searchQuery ? "border-red-500" : "border-gray-300 dark:border-gray-700"
                    } bg-white dark:bg-gray-800`}
            >
                <Search
                    strokeWidth={2.5}
                    size={30}
                    className="ml-1 text-red-500 dark:text-red-500 hidden md:block"
                />
                <FormField
                    control={form.control}
                    name="searchQuery"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormControl>
                                <Input
                                    {...field}
                                    value={field.value || ""}
                                    className="border-none shadow-none text-xl focus-visible:ring-0 bg-transparent dark:text-white"
                                    placeholder={placeHolder}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button
                    onClick={handleReset}
                    type="button"
                    variant="outline"
                    className="rounded-full bg-gray-200 dark:bg-gray-700 dark:text-white"
                >
                    Reset
                </Button>
                <Button type="submit" className="rounded-full bg-red-500 dark:bg-red-500 dark:text-white">
                    Search
                </Button>
            </form>
        </Form>
    );
};

export default SearchBar;
