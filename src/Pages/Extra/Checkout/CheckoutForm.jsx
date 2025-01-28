import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Components/Hooks/Axios/AxiosSecure/useAxiosSecure";
import { useEffect, useState } from "react";
import useCart from "../../../Components/Hooks/Cart/useCart";
import moment from "moment";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
    const stripe = useStripe();
    const [clientSecret , setClientSecret] = useState("")
    const [loading , setLoading] = useState(false)
    const navigate = useNavigate()
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const {carts , user} = useCart()
    const totalPrice = carts.reduce((prev, item) => prev + item.price, 0);
    const allCartsInfo = carts.map(cart => {
      return {
        itemId:cart.medicineId ,
        itemName:cart.cartItemName,
        price:cart.price,
        quantity:cart.cartItemQuantity,
        sellerEmail:cart.sellerEmail
      }
    })

    useEffect(() => {
        if(totalPrice > 0){
            axiosSecure.post('/create-payment-intent' , {totalPrice})
            .then(res => {
            setClientSecret(res.data.clientSecret);
        })
        }
    },[axiosSecure, totalPrice])

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true)

        if(!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement)

        if(card === null) {
            return;
        }

        const {error} = await stripe.createPaymentMethod({
            type: 'card',
            card,
          });

          if (error) {
            toast.error(error.message , {position:"top-center"});
    }

    // Confirm Card Payments
    const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      })
      
        const paymentIntent = result.paymentIntent;
        if(paymentIntent.status === "succeeded"){
      
      // handle after payment
      const paymentInfo = {
        customerName: user?.displayName,
        customerEmail: user?.email,
        transactionId:paymentIntent.id,
        amount:parseInt(paymentIntent.amount / 100),
        allCartsInfo,
        time:moment().format('Do MMM YYYY, h:mm a'),
        status:"pending"
      }

      const {data} = await axiosSecure.post('/payments', paymentInfo)
        if(data.insertedId){
          const {data} = await axiosSecure.delete(`/delete-all-from-cart/${user?.email}`)
          if(data.deletedCount){
            Swal.fire({
                  title: "Payment Done",
                  text: "Successful your payment",
                  icon: "success",
                  draggable: true,
                });
            navigate('/')
          }
        }}
        setLoading(false)
    }

  
    return (
        <div className="mx-auto p-4 md:w-1/2">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Complete Your Payment</h2>
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
          {
            loading ? <button className="w-full mt-4 btn btn-info">Processing <span className="loading loading-spinner loading-sm"></span></button> : <button
            disabled={!stripe || !clientSecret}
            type="submit"
            className="w-full mt-4 btn btn-info"
          >
            Pay Now
          </button>
          }
        </form>
      </div>
    );
  };

  export default CheckoutForm;