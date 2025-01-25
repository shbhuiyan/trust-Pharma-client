
/* eslint-disable react/prop-types */
const DiscountsCard = ({ medicine }) => {
  const {
    medicineName,
    medicineImage,
    category,
    company,
    discount,
    price,
    unit,
  } = medicine;

  return (
    <div className="card bg-base-100 border shadow-xl">
      <figure>
        <img
        className="h-64"
          src={medicineImage}
          alt={medicineName}
        />
      </figure>
      <span className="bg-blue-500 text-white py-1 px-2 font-semibold text-center absolute right-5 top-5">- {discount}%</span>
      <div className="card-body">
        <h2 className="card-title">{medicineName}</h2>
        <div className="card-actions grid grid-cols-2 items-center py-3 border-y-2 border-dashed">
          <p>Category: <span className="font-semibold">{category}</span></p>
          <p>Price: $<span className="font-semibold">{price}</span></p>
          <p>Company: <span className="font-semibold">{company}</span></p>
          <p>Unit: <span className="font-semibold">{unit}</span></p>
        </div>
      </div>
    </div>
  );
};

export default DiscountsCard;
