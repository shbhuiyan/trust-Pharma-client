import { Link } from "react-router-dom";
import useAllMedicines from "../../../Components/Hooks/GetAllMedicines/useAllMedicines";

/* eslint-disable react/prop-types */
const CategoryCard = ({category}) => {
  const {medicines} = useAllMedicines()
    const {categoryName , categoryImage } = category;
  const numberOfItem = medicines.filter(medicine => medicine.category === categoryName)

  return (
    <Link to={`/shop/categories/${categoryName}`} className="card bg-base-100 image-full h-60 shadow-xl p-4 border group">
      <figure>
        <img
            className="w-full group-hover:scale-110 transition-all duration-300"
          src={categoryImage}
          alt={categoryName}
        />
      </figure>
      <div className="card-body flex justify-center items-center">
        <div className="text-center space-y-4 border p-4 rounded-md backdrop-blur-md">
        <h2 className="text-3xl capitalize font-bold">{categoryName}</h2>
        <p className="text-xl font-medium">Total Items: {numberOfItem.length}</p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
