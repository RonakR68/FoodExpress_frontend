import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";
import SearchBar from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();
    const handleSearchSubmit = (searchFormValues) => {
        navigate({
            pathname: `/search/${searchFormValues.searchQuery}`,
        });
    };

    return (
        <div className="flex flex-col gap-12">
            <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
                <h1 className="text-5xl font-bold tracking-tight text-red-600">
                    Order Tasty Food Now!
                </h1>
                <span className="text-xl">Food is just a click away!</span>
                <SearchBar placeHolder="Search by City" onSubmit={handleSearchSubmit} />
            </div>
            <div className="grid md:grid-cols-2 gap-5">
                <img src={landingImage} />
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <span className="font-bold text-3xl tracking-tighter">
                        Order food from your favorite restaurants even faster!
                    </span>
                    <span>
                        Download the Food Express App Now!
                    </span>
                    <img src={appDownloadImage} />
                </div>
            </div>
        </div>
    );
};

export default HomePage;