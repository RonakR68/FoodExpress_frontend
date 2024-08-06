import { useForm, useFieldArray } from "react-hook-form";
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
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { AiOutlineEdit } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';

const addressSchema = z.object({
    name: z.string().optional(),
    addressLine1: z.string().min(1, "Address Line 1 is required"),
    addressLine2: z.string().optional(),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    pincode: z.string().regex(/^\d{6}$/, "Pincode must be exactly 6 digits"),
    isDefault: z.boolean().optional(),
});

const formSchema = z.object({
    email: z.string().optional(),
    name: z.string().min(1, "Name is required"),
    addresses: z.array(addressSchema).min(1, "At least one address is required"),
    defaultAddress: z.string().optional(),
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
            addresses: [],
            defaultAddress: "",
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "addresses",
    });

    const [expanded, setExpanded] = useState(fields.map(() => false));
    const [placeholder, setPlaceholder] = useState("Select Address");

    useEffect(() => {
        if (currentUser) {
            const addresses = currentUser.addresses || [];
            const defaultAddress = addresses.find(address => address.isDefault)?.name || addresses[0]?.name || "";

            form.reset({
                email: currentUser.email || "",
                name: currentUser.name || "",
                addresses: addresses,
                defaultAddress: defaultAddress,
            });

            if (defaultAddress) {
                setPlaceholder(defaultAddress);
            } else {
                setPlaceholder("Select Address");
            }

            setExpanded(addresses.map(() => false));
        }
    }, [currentUser, form]);

    const handleAddAddress = () => {
        const newAddress = { addressLine1: "", addressLine2: "", city: "", state: "", pincode: "", name: "", isDefault: fields.length === 0 };
        append(newAddress);
        setExpanded([...expanded, true]);
    };

    const handleToggleExpand = (index) => {
        setExpanded(expanded.map((exp, idx) => idx === index ? !exp : exp));
    };

    const handleDefaultAddressChange = (value) => {
        form.setValue('defaultAddress', value);
    };

    const transformData = (data) => {
        const addresses = data.addresses || [];
        const hasDefault = addresses.some(address => address.isDefault);

        // Ensure at least one address is marked as default
        if (!hasDefault && addresses.length === 1) {
            //console.log("setting isDefault as true");
            addresses[0].isDefault = true;
        }
        return {
            ...data,
            addresses: addresses.map(address => ({
                ...address,
                isDefault: (addresses.length === 1) || (address.name === data.defaultAddress),
            })),
        };
    };

    const handleSubmit = async (formData) => {
        //console.log('formdata');
        //console.log(formData);
        const transformedData = transformData(formData);
        //console.log('transform data');
        //console.log(transformedData);
        await onSave(transformedData);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
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
                                <Input {...field} className="bg-white dark:bg-gray-800 dark:text-white" />
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
                                <Input {...field} className="bg-white dark:bg-gray-800 dark:text-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {fields.length > 0 && (<FormField
                    control={form.control}
                    name="defaultAddress"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Default Address</FormLabel>
                            <FormControl>
                                <Select value={field.value} onValueChange={handleDefaultAddressChange} className="bg-white dark:bg-gray-800 dark:text-white">
                                    <SelectTrigger>
                                        <SelectValue placeholder={placeholder} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {fields.map((address, index) => (
                                            <SelectItem key={index} value={address.name || `Address ${index + 1}`}>
                                                {address.name || `Address ${index + 1}`}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>
                    )}
                />
                )}

                <div>
                    <h3 className="text-xl font-semibold">Manage Addresses</h3>
                    {fields.length === 0 && (
                        <Button type="button" onClick={handleAddAddress} className="bg-green-500 dark:bg-green-500">
                            Add Address
                        </Button>
                    )}
                    {fields.map((address, index) => (
                        <div key={index} className={`border p-4 rounded-lg mb-4`}>
                            <div className="flex justify-between items-center">
                                <h4 className="font-semibold">{address.name || `Address ${index + 1}`}</h4>
                                <div className="flex items-center space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => handleToggleExpand(index)}
                                        className="text-blue-500"
                                    >
                                        {expanded[index] ? (
                                            <FaChevronUp className="h-4 w-4" />
                                        ) : (
                                            <FaChevronDown className="h-4 w-4" />
                                        )}
                                    </button>
                                    <Button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className={`bg-red-500 dark:bg-red-500 ${fields.length <= 1 || address.isDefault ? 'cursor-not-allowed opacity-50' : ''}`}
                                        disabled={fields.length <= 1 || address.isDefault}
                                    >
                                        <FaTrash className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            {expanded[index] && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name={`addresses.${index}.name`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Address Name
                                                    <AiOutlineEdit className="h-4 w-4 inline ml-2 cursor-pointer" />
                                                </FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="bg-white dark:bg-gray-800 dark:text-white" />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name={`addresses.${index}.addressLine1`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Address Line 1</FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="bg-white dark:bg-gray-800 dark:text-white" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`addresses.${index}.addressLine2`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Address Line 2</FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="bg-white dark:bg-gray-800 dark:text-white" />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`addresses.${index}.city`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>City</FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="bg-white dark:bg-gray-800 dark:text-white" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`addresses.${index}.state`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>State</FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="bg-white dark:bg-gray-800 dark:text-white" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`addresses.${index}.pincode`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Pincode</FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="bg-white dark:bg-gray-800 dark:text-white" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>
                            )}
                        </div>
                    ))}
                    {fields.length > 0 && (
                        <Button type="button" onClick={handleAddAddress} className="bg-green-500 dark:bg-green-500">
                            Add Address
                        </Button>
                    )}
                </div>
                <FormMessage className="text-red-500">{form.formState.errors.addresses && form.formState.errors.addresses.message}</FormMessage>
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
