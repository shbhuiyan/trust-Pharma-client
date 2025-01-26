import useCart from "../../../Components/Hooks/Cart/useCart";
import Lottie from "lottie-react";
import cartPageAnimation from "../../../../public/cart-page.json";
import { FaTrashAlt } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { PiMinusLight } from "react-icons/pi";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Components/Hooks/Axios/AxiosSecure/useAxiosSecure";

const ViewCart = () => {
    const axiosSecure = useAxiosSecure()
    const {carts , refetch} = useCart()

    const handleDeleteFromCart = (id) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be remove this item from cart!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, remove it!",
        }).then((result) => {
          if (result.isConfirmed) {
            axiosSecure.delete(`/delete-from-cart/${id}`).then((res) => {
              if (res.data.deletedCount) {
                Swal.fire({
                  title: "Deleted!",
                  text: "Your category has been deleted.",
                  icon: "success",
                });
                refetch();
              }
            });
          }
        });
      };

    return (
        <section className="min-h-screen">
            <div className="flex max-md:flex-col-reverse justify-center items-end">
              <Lottie className="max-w-64" animationData={cartPageAnimation} loop={true} autoplay={true} />
              <h3 className="max-w-xl text-center text-3xl mb-5 font-bold text-blue-500 capitalize">Your selected items are just a click away from being yours.</h3>
            </div>

            <div className="overflow-x-auto my-20">
                                <table className="table">
                                  {/* head */}
                                  <thead>
                                    <tr>
                                      <th>#</th>
                                      <th>Medicine Image</th>
                                      <th>Medicine Name</th>
                                      <th>Category</th>
                                      <th>Company</th>
                                      <th>Price</th>
                                      <th>Quantity</th>
                                      <th>Remove</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {carts.map((cart, i) => {
                                      return (
                                        <tr key={cart._id}>
                                          <th>{i + 1}</th>
                                          <td>
                                            <div className="avatar">
                                              <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                  className="w-full"
                                                  src={cart.cartItemImage}
                                                  alt={cart.cartItemName}
                                                />
                                              </div>
                                            </div>
                                          </td>
                                          <td>{cart.cartItemName}</td>
                                          <td>
                                            {cart.cartItemCategory}
                                          </td>
                                          <td>
                                            {cart.cartItemCompany}
                                          </td>
                                          <td>
                                            $ {cart.perUnitPrice}
                                          </td>
                                          <td className="flex items-center gap-2">
                                            <button><GoPlus className="text-xl"/></button>
                                            <span className="border-2 py-1 px-2">{cart.cartItemQuantity}</span>
                                            <button><PiMinusLight className="text-xl" /></button>
                                          </td>
                                          <td>
                                            <button
                                              onClick={() => handleDeleteFromCart(cart._id)}
                                              className="btn btn-ghost"
                                            >
                                              <FaTrashAlt className="text-xl text-red-500" />
                                            </button>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
        </section>
    );
};

export default ViewCart;