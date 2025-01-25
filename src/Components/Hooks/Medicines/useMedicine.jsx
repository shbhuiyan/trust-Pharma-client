import { QueryClient, useQuery } from "react-query";
import useAxiosSecure from "../Axios/AxiosSecure/useAxiosSecure";
import useAuth from "../AuthProviderHooks/useAuth";



export const queryClient = new QueryClient()

const useMedicine = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()

    const {data: medicines = [] , refetch} = useQuery({
        queryKey:["medicines" , user?.email],
        queryFn:async() => {
            const res = await axiosSecure.get(`/medicines/${user?.email}`)
            return res.data
        }
    })

    return {medicines , refetch}
};


export default useMedicine;