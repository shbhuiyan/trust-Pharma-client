/* eslint-disable react/prop-types */
const CategoryCard = ({category}) => {

    const {categoryName , categoryImage , numberOfMedicines} = category;


  return (
    <div className="card bg-base-100 image-full h-96 w-96 shadow-xl">
      <figure>
        <img
          src={categoryImage}
          alt={categoryName}
        />
      </figure>
      <div className="card-body flex justify-center items-center">
        <div className="text-center space-y-4 border p-4 rounded-md backdrop-blur-md">
        <h2 className="text-3xl capitalize font-bold">{categoryName}</h2>
        <p className="text-xl font-medium">Total Items: {numberOfMedicines}</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
