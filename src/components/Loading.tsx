import { Loader2 } from "lucide-react";
import { type FC } from "react";

const Loading: FC = () => {
  return (
    <div className="flex flex-col justify-center items-center mb-22 py-12">
      <Loader2 className="opacity-75 text-primary-medium text-3xl animate-spin" />
      <p className="mt-3 text-gray-600 text-sm">Loading ...</p>
    </div>
  );
}

export default Loading;
