import { useEffect, useState } from "react";
import useAuth from "../../../../Components/Hooks/AuthProviderHooks/useAuth";
import useAxiosSecure from "../../../../Components/Hooks/Axios/AxiosSecure/useAxiosSecure";
import usePayments from "../../../../Components/Hooks/Payments/usePayments";

const PayHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const {paymentHistory} = usePayments()
    const [paymentDetails , setPaymentDetails] = useState([])


    useEffect(() => {
        axiosSecure.get(`/payments-details/${user?.email}`)
        .then(res => {
            console.log(res.data.map(data=> data.itemName));
            setPaymentDetails(res.data)
        })
    },[axiosSecure, user?.email])
    
    return (
        <section className="my-10">
      <div className="max-w-xl space-y-4 mx-auto text-center">
        <h3 className="text-3xl font-bold text-blue-500 capitalize">
          Track Your Payments, Stay Informed{" "}
        </h3>
        <p className="font-medium">
          Easily review all your transactions, payment statuses, and details in
          one place. Stay on top of your finances effortlessly!
        </p>
      </div>

      <div className="overflow-x-auto my-20">
        <table className="table">
          {/* head */}
          <thead className="text-base">
            <tr>
              <th>#</th>
              <th>Medicine Name</th>
              <th>Customer Email</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Purchase Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paymentDetails.map((payment, i) => {
              return (
                <tr key={payment._id}>
                  <td>{i + 1}</td>
                  <td>{payment.itemName}</td>
                  <td>{paymentHistory.map(pay => pay.customerEmail)}</td>
                  <td>{payment.quantity}</td>
                  <td>$ {payment.price}</td>
                  <td>{paymentHistory.map(pay => pay.time)}</td>
                  <td>
                    <span
                      className={
                        payment.status === "pending"
                          ? "bg-yellow-300 font-semibold capitalize px-2 py-1 rounded-xl"
                          : "bg-green-300/80 font-semibold capitalize px-2 py-1 rounded-xl"
                      }
                    >
                      {paymentHistory.map(pay => pay.status)}
                    </span>
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

export default PayHistory;