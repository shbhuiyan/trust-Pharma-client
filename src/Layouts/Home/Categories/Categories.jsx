import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/Shared/SectionTitle";
import CategoryCard from "./CategoryCard";


const Categories = () => {
    const [categories , setCategories] = useState([])


    useEffect(() => {
        fetch("/categories.json")
        .then(res => res.json())
        .then(data => setCategories(data))
    },[])

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