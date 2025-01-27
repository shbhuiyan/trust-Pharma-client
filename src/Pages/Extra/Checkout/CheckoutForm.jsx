import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Components/Hooks/Axios/AxiosSecure/useAxiosSecure";
import { useEffect, useState } from "react";
import useCart from "../../../Components/Hooks/Cart/useCart";

const CheckoutForm = () => {
    const stripe = useStripe();
    const [clientSecret , setClientSecret] = useState("")
    const [transactionId , setTransactionId] = useState("")
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const {carts , user} = useCart()
    const totalPrice = carts.reduce((prev, item) => prev + item.perUnitPrice, 0);

    useEffect(() => {
        axiosSecure.post('/create-payment-intent' , {totalPrice})
        .then(res => {
            console.log(res.data);
            setClientSecret(res.data.clientSecret);
        })
    },[axiosSecure, totalPrice])

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement)

        if(card === null) {
            return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
          });

          if (error) {
            toast.error(error.message , {position:"top-center"});
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }

    // Confirm Card Payments
    stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      })
      .then(result => {
        const err = result.error;
        const paymentIntent = result.paymentIntent;
        console.log("ERROR" , err);
        if(paymentIntent.status === "succeeded"){
            setTransactionId(paymentIntent.id)
            // console.log("transaction Id:", paymentIntent.id , parseInt(paymentIntent.amount / 100));
          }
      })
      

    }
  
    return (
        <div className="mx-auto p-4 w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Complete Your Payment</h2>
        <form onSubmit={handleSubmit}>
          <div className="p-4 bg-white border border-gray-300 rounded-md">
            <CardElement
              options={{
                layout: "tabs",
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#1a202c",
                    fontFamily: "Inter, Arial, sans-serif",
                    backgroundColor: "#f9fafb",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.375rem",
                    padding: "10px",
                    "::placeholder": {
                      color: "#9ca3af",
                    },
                  },
                  invalid: {
                    color: "#ef4444",
                    iconColor: "#ef4444",
                  },
                  complete: {
                    color: "#10b981",
                    iconColor: "#10b981",
                  },
                  focus: {
                    borderColor: "#3b82f6",
                    boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.25)",
                  },
                },
              }}
            />
          </div>
          <button
            disabled={!stripe || !clientSecret}
            type="submit"
            className="w-full mt-4 btn btn-info"
          >
            Pay Now
          </button>
        </form>
      </div>
    );
  };

  export default CheckoutForm;
  