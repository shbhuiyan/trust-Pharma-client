import { QueryClient, useQuery } from "react-query";
import useAxiosSecure from "../Axios/AxiosSecure/useAxiosSecure";
import useAuth from "../AuthProviderHooks/useAuth";



export const queryClient = new QueryClient()

const useCart = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()

    const {data: carts = [] , refetch} = useQuery({
        queryKey:["carts" , user?.email],
        queryFn:async() => {
            const res = await axiosSecure.get(`/cart-items/${user?.email}`)
            return res.data
        }
    })

    return {carts , refetch , user}
};

export default useCart;