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
        <div>
            <SectionTitle heading="Discover medicines by categories and find exactly what you need!" subHeading="Explore Categories" />
        {
            categories.map(category => <CategoryCard key={category?.categoryName} category={category} /> )
        }
        </div>
    );
};

export default Categories;