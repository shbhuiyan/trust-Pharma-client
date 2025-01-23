import { FadeLoader } from "react-spinners";

const Loading = () => {
    return (
        <div className="my-40">
            <FadeLoader
        color="#2196F3"
        loading={true}
        cssOverride={{
            display: "block",
            margin: "0 auto",
            borderColor: "red",
          }}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
        </div>
    );
};

export default Loading;