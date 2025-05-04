import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://trust-pharma-server.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
