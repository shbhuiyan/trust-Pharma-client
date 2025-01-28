import { QueryClient, useQuery } from "react-query";
import useAxiosSecure from "../Axios/AxiosSecure/useAxiosSecure";



export const queryClient = new QueryClient()

const usePayments = (email) => {
    const axiosSecure = useAxiosSecure()

    const {data: paymentHistory = [] , refetch} = useQuery({
        queryKey:["paymentHistory" , email],
        queryFn:async() => {
            const endpoint = email ? `/payments?email=${email}` : '/payments'
            
            const res = await axiosSecure.get(endpoint)
            return res.data
        }
    })

    return {paymentHistory , refetch }
};

export default usePayments;