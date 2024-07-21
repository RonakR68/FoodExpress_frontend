import hero from "../assets/hero.png";

const Hero = () => {
  return (
    <div className="bg-gray-200 dark:bg-gray-900 p-4 flex justify-center">
      <img src={hero} className="rounded-md object-contain w-full h-64 md:h-96" />
    </div>
  );
};

export default Hero;