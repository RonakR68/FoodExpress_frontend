import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

const LoadingButton = () => {
  return (
    <Button disabled className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
      <Loader2 className="mr-2 h-4 w-4 animate-spin text-gray-600 dark:text-gray-300" />
      Loading
    </Button>
  );
};

export default LoadingButton;