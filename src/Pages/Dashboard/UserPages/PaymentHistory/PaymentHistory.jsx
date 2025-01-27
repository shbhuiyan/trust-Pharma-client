import useAuth from "../../../../Components/Hooks/AuthProviderHooks/useAuth";
import usePayments from "../../../../Components/Hooks/Payments/usePayments";

const PaymentHistory = () => {
    const {user} = useAuth()
    const {paymentHistory} = usePayments(user?.email)

    return (
        <section className="my-10">
            <div className="max-w-xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-blue-500 capitalize">
            Track Your Payments, Stay Informed </h3>
            <p className="font-medium">Easily review all your transactions, payment statuses, and details in one place. Stay on top of your finances effortlessly!</p>
            </div>

            <div className="overflow-x-auto my-20">
                    <table className="table">
                      {/* head */}
                      <thead className="text-base">
                        <tr>
                          <th>#</th>
                          <th>Transaction ID</th>
                          <th>Amount</th>
                          <th>Date & Time</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paymentHistory.map((payment, i) => {
                          return (
                            <tr key={payment._id}>
                              <td>{i + 1}</td>
                              <td>
                                {payment.transactionId}
                              </td>
                              <td>
                                $ {payment.amount}
                              </td>
                              <td>
                                {payment.time}
                              </td>
                              <td>
                                <span className={payment.status === "pending" ? "bg-yellow-300 font-semibold capitalize px-2 py-1 rounded-xl" : "bg-green-300/80 font-semibold capitalize px-2 py-1 rounded-xl" }>{payment.status}</span>
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

export default PaymentHistory;