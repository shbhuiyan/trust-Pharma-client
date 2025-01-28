import { QueryClient, useQuery } from "react-query";
import useAxiosSecure from "../Axios/AxiosSecure/useAxiosSecure";



export const queryClient = new QueryClient()

const useBannerSlider = (email) => {
    const axiosSecure = useAxiosSecure()

    const {data: bannerSliders = [] , refetch} = useQuery({
        queryKey:["bannerSliders" , email],
        queryFn:async() => {
            const endpoint = email ? `/banner-sliders?email=${email}` : '/banner-sliders'
            
            const res = await axiosSecure.get(endpoint)
            return res.data
        }
    })

    return {bannerSliders , refetch }
};

export default useBannerSlider;