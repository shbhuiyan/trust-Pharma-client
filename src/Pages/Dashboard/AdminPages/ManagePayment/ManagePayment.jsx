import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Components/Hooks/Axios/AxiosSecure/useAxiosSecure";
import usePayments from "../../../../Components/Hooks/Payments/usePayments";

const ManagePayment = () => {
    const {paymentHistory , refetch} = usePayments()
    const axiosSecure = useAxiosSecure()


    const handlePaymentConfirmation = (id) => {
          const updateStatus = {status:"confirmed"}
            axiosSecure.patch(`/payments/${id}` , updateStatus)
            .then(res => {
                if(res.data.modifiedCount){
                    Swal.fire({
                        title:"Order Confirmed",
                        icon: "success",
                        draggable: true
                      });
                  refetch()
                }
            })
        }

    return (
        <section className="my-10">
            <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-blue-500 capitalize">
            Payment Management </h3>
            <p className="font-medium">View and manage all payment details. Update payment status with a single click.</p>
            </div>

            <div className="overflow-x-auto my-20">
        <table className="table">
          {/* head */}
          <thead className="text-base">
            <tr>
              <th>#</th>
              <th>Transaction ID</th>
              <th>Customer Name</th>
              <th>Customer Email</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((payment, i) => {
              return (
                <tr key={payment._id}>
                  <td>{i + 1}</td>
                  <td>{payment.transactionId}</td>
                  <td>{payment.customerName}</td>
                  <td>{payment.customerEmail}</td>
                  <td>$ {payment.amount}</td>
                  <td>
                    <span
                      className={
                        payment.status === "pending"
                          ? "bg-yellow-300 font-semibold capitalize px-2 py-1 rounded-xl"
                          : "bg-green-300/80 font-semibold capitalize px-2 py-1 rounded-xl"
                      }
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => handlePaymentConfirmation(payment._id)} disabled={payment.status === "pending" ? false : true} className="btn btn-info">{payment.status === "pending" ? "Confirm" : "Confirmed"}</button>
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

export default ManagePayment;