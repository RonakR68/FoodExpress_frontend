import { cuisineList } from "@/config/restaurant-options-config";

const CuisinesSelector = ({ selectedCuisines, onCuisineSelect }) => {
    const handleCuisinesChange = (cuisine) => {
        const isSelected = selectedCuisines.includes(cuisine);
        const newCuisinesList = isSelected
            ? selectedCuisines.filter((c) => c !== cuisine)
            : [...selectedCuisines, cuisine];

        onCuisineSelect(newCuisinesList);
    };

    const formattedCuisineName = (cuisine) => {
        return encodeURIComponent(cuisine).replace(/%20/g, '_');
    };

    return (
        <div className="relative w-full max-w-screen-lg mx-auto mt-10"> {/* Restrict the width */}
            <h2 className="text-left text-xl font-semibold dark:text-white ml-4 mb-4">
                Craving Something Special? Choose Your Cuisine!
            </h2>
            <div className="cuisine-slider flex overflow-x-scroll space-x-6 p-4" style={{
                scrollbarWidth: 'none',
            }}>
                {cuisineList.map((cuisine) => {
                    const isSelected = selectedCuisines.includes(cuisine);
                    const imageName = formattedCuisineName(cuisine);
                    return (
                        <div
                            key={cuisine}
                            className={`min-w-[90px] flex flex-col items-center cursor-pointer`} // Adjusted min-width
                            onClick={() => handleCuisinesChange(cuisine)}
                        >
                            <div
                                className={`w-24 h-24 bg-cover rounded-full border-4 ${isSelected ? 'border-red-500' : 'border-gray-200'
                                    }`}
                                style={{ backgroundImage: `url(../assets/Cuisines/${imageName}.jpeg)` }}
                            />
                            <div className="mt-2 text-center text-sm font-semibold">
                                {cuisine}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CuisinesSelector;
