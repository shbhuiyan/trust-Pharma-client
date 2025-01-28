import { FaEye, FaShoppingCart } from "react-icons/fa";
import useAllMedicines from "../../Components/Hooks/GetAllMedicines/useAllMedicines";
import Lottie from "lottie-react";
import shopBanner from "../../../public/shop-banner.json";
import useAxiosSecure from "../../Components/Hooks/Axios/AxiosSecure/useAxiosSecure";
import useAuth from "../../Components/Hooks/AuthProviderHooks/useAuth";
import Swal from "sweetalert2";
import useCart from "../../Components/Hooks/Cart/useCart";

const Shop = () => {
    const {medicines} = useAllMedicines()
    const {refetch} = useCart()
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()

    const handleAddToCart = (medicine) => {
      const cartItem = {
        cartItemName:medicine.medicineName,
        medicineId:medicine._id,
        cartItemImage:medicine.medicineImage,
        cartItemCompany:medicine.company,
        cartItemCategory:medicine.category,
        perUnitPrice:medicine.price,
        price:medicine.price,
        sellerEmail:medicine.sellerEmail,
        cartItemQuantity:1,
        userEmail: user?.email,
        userName: user?.displayName,
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
        <section className="mb-20 min-h-screen">
            <div className="flex max-md:flex-col-reverse justify-center items-center">
              <Lottie className="max-w-96" animationData={shopBanner} loop={true} autoplay={true} />
              <h3 className="max-w-xl text-center text-3xl font-bold text-blue-500 capitalize">Browse all available medicines, view detailed information, and add items to your cart with ease.</h3>
            </div>
            <div className="overflow-x-auto my-10">
                    <table className="table">
                      {/* head */}
                      <thead className="text-base">
                        <tr>
                          <th>#</th>
                          <th>Medicine Image</th>
                          <th>Medicine Name</th>
                          <th>Generic Name</th>
                          <th>Price</th>
                          <th>View Details</th>
                          <th>Add to Cart</th>
                        </tr>
                      </thead>
                      <tbody>
                        {medicines.map((medicine, i) => {
                          return (
                            <tr key={medicine._id}>
                              <th>{i + 1}</th>
                              <td>
                                <div className="avatar">
                                  <div className="mask mask-squircle h-12 w-12">
                                    <img
                                      className="w-full"
                                      src={medicine.medicineImage}
                                      alt={medicine.medicineName}
                                    />
                                  </div>
                                </div>
                              </td>
                              <td>{medicine.medicineName}</td>
                              <td>
                                {medicine.genericName}
                              </td>
                              <td>
                                $ {medicine.price}
                              </td>
                              <td>
                                <button onClick={() => document.getElementById(medicine._id).showModal()} className="btn btn-outline btn-info mt-4"><FaEye className="text-xl"/></button>
                              </td>
                              <td>
                                <button onClick={()=>handleAddToCart(medicine)} className="btn btn-outline btn-neutral mt-4"><FaShoppingCart className="text-xl"/></button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* View Details Modal */}
                {
                    medicines.map(medicine => <dialog key={medicine._id} id={medicine._id} className="modal">
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
                                src={medicine.medicineImage}
                                alt={medicine.medicineName} />
                            </figure>
                            <div className="card-body space-y-4 border-l-2 border-blue-500">
                              <h2 className="text-2xl font-semibold">{medicine.medicineName}</h2>
                              <p className="text-lg font-medium">{medicine.description}</p>
                              <div className="card-actions grid gap-4 grid-cols-2 items-center py-3 border-y-2 border-dashed">
                          <p>Generic: <span className="font-semibold">{medicine.genericName}</span></p>
                          <p>Discount: <span className="font-semibold">{medicine.discount}%</span></p>
                          <p>Category: <span className="font-semibold">{medicine.category}</span></p>
                          <p>Price: $<span className="font-semibold">{medicine.price}</span></p>
                          <p>Company: <span className="font-semibold">{medicine.company}</span></p>
                          <p>Unit: <span className="font-semibold">{medicine.unit}</span></p>
                        </div>
                              <div className="card-actions justify-between">
                                <button onClick={()=>handleAddToCart(medicine)} className="btn btn-outline btn-neutral">Add to Cart <FaShoppingCart className="text-xl"/></button>
                                <button onClick={()=>document.getElementById(medicine._id).close()} className="btn btn-outline btn-error">Cancel</button>
                              </div>
                            </div>
                          </div>
                          </section>
                        </div>
                      </dialog> )
                }
        </section>
    );
};

export default Shop;