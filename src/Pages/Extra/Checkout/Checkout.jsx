import Lottie from "lottie-react";
import checkoutAnimation from "../../../../public/checkout.json";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";


const stripePromise = loadStripe(import.meta.env.VITE_Stripe_PK);
const Checkout = () => {
  return (
    <section className="min-h-screen">
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

      <div className="bg-blue-50 py-10 my-10 flex max-md:flex-col ">
        {/* Total price list */}
      <div className="md:w-1/2">
            cart
        </div>
        {/* Checkout Form */}
      <Elements className="md:w-1/2" stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
      </div>
    </section>
  );
};

export default Checkout;
