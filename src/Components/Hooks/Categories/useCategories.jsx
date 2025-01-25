import { QueryClient, useQuery } from "react-query";
import useAxiosSecure from "../Axios/AxiosSecure/useAxiosSecure";



export const queryClient = new QueryClient()

const useCategories = () => {
    const axiosSecure = useAxiosSecure()

    const {data: categories = [] , refetch} = useQuery({
        queryKey:["cart"],
        queryFn:async() => {
            const res = await axiosSecure.get('/categories')
            return res.data
        }
    })

    return {categories , refetch}
};

export default useCategories;