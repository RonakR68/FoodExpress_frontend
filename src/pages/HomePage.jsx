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
        <div className="flex flex-col gap-12 mt-12">
            <div className="md:px-32 bg-card text-card-foreground  rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
                <h1 className="text-2xl font-bold tracking-tight text-primary">
                    Tasty Food is just a click away! Order Now!
                </h1>
                <SearchBar placeHolder="Search Restaurant's by City or Pincode" onSubmit={handleSearchSubmit} />
            </div>
            <div className="grid md:grid-cols-2 gap-5">
                <img src={landingImage} />
                <div className="flex flex-col items-center justify-center gap-4 text-center text-foreground">
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