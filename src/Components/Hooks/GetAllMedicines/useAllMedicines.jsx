import { QueryClient, useQuery } from "react-query";
import useAxiosPublic from "../Axios/AxiosPublic/useAxiosPublic";



export const queryClient = new QueryClient()

const useAllMedicines = () => {
    const axiosPublic = useAxiosPublic()

    const {data: medicines = [] , refetch} = useQuery({
        queryKey:["medicines"],
        queryFn:async() => {
            const res = await axiosPublic.get(`/medicines`)
            return res.data
        }
    })

    return {medicines , refetch}
};

export default useAllMedicines;