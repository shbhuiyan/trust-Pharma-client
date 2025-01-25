import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/Shared/SectionTitle";
import CategoryCard from "./CategoryCard";
import useAxiosPublic from "../../../Components/Hooks/Axios/AxiosPublic/useAxiosPublic";


const Categories = () => {
    const [categories , setCategories] = useState([])
    const axiosPublic = useAxiosPublic()

    useEffect(() => {
        axiosPublic.get('/categories')
        .then(res => setCategories(res.data))

    },[axiosPublic])

    return (
        <div className="px-4">
            <SectionTitle heading="Exactly what you need discover by categories." subHeading="Explore Categories" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
            categories.map(category =><CategoryCard key={category?.categoryName} category={category} />)
        }
        </div>
        </div>
    );
};

export default Categories;