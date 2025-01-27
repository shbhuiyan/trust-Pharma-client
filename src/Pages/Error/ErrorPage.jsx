import Lottie from "lottie-react";
import Error from "../../../public/Error.json";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="text-center">
      <Lottie
        className="max-w-7xl mx-auto mb-8"
        animationData={Error}
        loop={true}
      />
      <Link
        to="/"
        className="px-8 py-4 bg-blue-500 rounded-xl text-white text-xl font-bold hover:bg-blue-700 duration-500"
      >
        Back to Pharmacy
      </Link>
    </div>
  );
};

export default ErrorPage;