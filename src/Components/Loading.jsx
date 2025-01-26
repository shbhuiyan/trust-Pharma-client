import Lottie from "lottie-react";
import loadingAnimation from "../../public/Pharma-Loading.json";

const Loading = () => {
    return (
        <div className="my-40">
            <Lottie className="max-w-5xl mx-auto" animationData={loadingAnimation} loop={true} autoplay={true} />
        </div>
    );
};

export default Loading;