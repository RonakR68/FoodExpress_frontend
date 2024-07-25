import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const SORT_OPTIONS = [
    //   {
    //     label: "Best match",
    //     value: "bestMatch",
    //   },
    {
        label: "Delivery price",
        value: "deliveryPrice",
    },
    {
        label: "Estimated delivery time",
        value: "estimatedDeliveryTime",
    },
    {
        label: "Rating",
        value: "rating",
    },
];

const SortOptionDropdown = ({ onChange, sortOption }) => {
    const selectedSortLabel =
        SORT_OPTIONS.find((option) => option.value === sortOption)?.label ||
        SORT_OPTIONS[0].label;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
                <Button variant="outline" className="w-full">
                    Sort by: {selectedSortLabel}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {SORT_OPTIONS.map((option) => (
                    <DropdownMenuItem
                        key={option.value}
                        className="cursor-pointer"
                        onClick={() => onChange(option.value)}
                    >
                        {option.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default SortOptionDropdown;
