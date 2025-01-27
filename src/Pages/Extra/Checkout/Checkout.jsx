import Lottie from "lottie-react";
import checkoutAnimation from "../../../../public/checkout.json";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import useCart from "../../../Components/Hooks/Cart/useCart";

const stripePromise = loadStripe(import.meta.env.VITE_Stripe_PK);

const Checkout = () => {
    const {carts} = useCart()
    const totalPrice = carts.reduce((prev, item) => prev + item.perUnitPrice, 0);

  return (
    <section className={carts.length || "min-h-screen"}>
      <div className="flex max-md:flex-col-reverse justify-center items-end">
        <Lottie
          className="max-w-64"
          animationData={checkoutAnimation}
          loop={true}
          autoplay={true}
        />
        <h3 className="max-w-2xl text-center text-3xl mb-4 font-bold text-blue-500 capitalize">
          You&#39;re just one step away from receiving your medicine items.
          Review your details and proceed to checkout securely.
        </h3>
      </div>

      <div className="bg-blue-50 rounded-lg max-w-6xl mx-auto py-10 my-10 flex gap-10 px-10 max-md:flex-col ">
        {/* Total price list */}
      <div className="md:w-1/2">
      <h1 className="text-2xl font-bold text-center mb-5">Your Items</h1>
            <div className="overflow-y-auto h-72">
              <table className="table table-xs table-pin-rows">
                {/* head */}
                <thead className="text-base">
                  <tr>
                    <th>#</th>
                    <th>Medicine Image</th>
                    <th>Medicine Name</th>
                    <th>Price</th>
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
                        <td>$ {cart.perUnitPrice}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="text-lg text-black/80">
                  <tr>
                    <th></th>
                    <th></th>
                    <th>Total Price:</th>
                    <th>$ {totalPrice}</th>
                  </tr>
                </tfoot>
              </table>
            </div>
        </div>
        {/* Checkout Form */}
      <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
      </div>
    </section>
  );
};

export default Checkout;
