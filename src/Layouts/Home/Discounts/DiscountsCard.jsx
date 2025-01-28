import { FaEye, FaShoppingCart } from "react-icons/fa";
import useAuth from "../../../Components/Hooks/AuthProviderHooks/useAuth";
import useAxiosSecure from "../../../Components/Hooks/Axios/AxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";
import useCart from "../../../Components/Hooks/Cart/useCart";

/* eslint-disable react/prop-types */
const DiscountsCard = ({ medicine }) => {
  const{refetch} = useCart()
  const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
  const {
    medicineName,
    medicineImage,
    category,
    company,
    description,
    genericName,
    discount,
    price,
    unit,
    _id,
    sellerEmail
  } = medicine;


  const handleAddToCart = () => {
        const cartItem = {
          cartItemName:medicineName,
          medicineId:_id,
          cartItemCompany:company,
          cartItemCategory:category,
          perUnitPrice:price,
          price:price,
          cartItemQuantity:1,
          userEmail: user?.email,
          userName: user?.displayName,
          sellerEmail
        }
        
        axiosSecure.post('/cart-items', cartItem)
        .then(res => {
          if(res.data.insertedId){
            Swal.fire({
                title: "Added To Cart!",
                text: "You added a item to cart",
                icon: "success",
                draggable: true,
              });
            refetch()
          }
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.response.data.message,
          });
        })
        const modal = document.getElementById(medicine._id)
        modal.close();
      }

  return (
    <section>
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
        <div className="flex justify-between items-center">
        <button onClick={handleAddToCart} className="btn btn-outline btn-neutral mt-4">Add to Cart <FaShoppingCart className="text-xl"/></button>
        <button onClick={() => document.getElementById(_id).showModal()} className="btn btn-outline btn-info mt-4">View <FaEye className="text-xl"/></button>
        </div>
      </div>
    </div>


    {/* View Details Modal */}
    <dialog id={_id} className="modal">
        <div className="modal-box max-w-5xl mx-auto">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="ring ring-red-500 text-red-500 btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <section className="p-6">
          <div className="card lg:card-side gap-4">
            <figure className="lg:w-1/3">
              <img
                className="h-64"
                src={medicineImage}
                alt={medicineName} />
            </figure>
            <div className="card-body space-y-4 border-l-2 border-blue-500">
              <h2 className="text-2xl font-semibold">{medicineName}</h2>
              <p className="text-lg font-medium">{description}</p>
              <div className="card-actions grid gap-4 grid-cols-2 items-center py-3 border-y-2 border-dashed">
          <p>Generic: <span className="font-semibold">{genericName}</span></p>
          <p>Discount: <span className="font-semibold">{discount}%</span></p>
          <p>Category: <span className="font-semibold">{category}</span></p>
          <p>Price: $<span className="font-semibold">{price}</span></p>
          <p>Company: <span className="font-semibold">{company}</span></p>
          <p>Unit: <span className="font-semibold">{unit}</span></p>
        </div>
              <div className="card-actions justify-between">
                <button onClick={handleAddToCart} className="btn btn-outline btn-neutral">Add to Cart <FaShoppingCart className="text-xl"/></button>
                <button onClick={()=>document.getElementById(_id).close()} className="btn btn-outline btn-error">Cancel</button>
              </div>
            </div>
          </div>
          </section>
        </div>
      </dialog>
    </section>
  );
};

export default DiscountsCard;
