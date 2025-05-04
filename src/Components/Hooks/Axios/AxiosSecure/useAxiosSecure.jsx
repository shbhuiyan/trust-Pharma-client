import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://trust-pharma-server.vercel.app",
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
