import { useEffect, useState } from "react";
import useAuth from "../../../../Components/Hooks/AuthProviderHooks/useAuth";
import useAxiosSecure from "../../../../Components/Hooks/Axios/AxiosSecure/useAxiosSecure";

const PayHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const [orders, setOrders] = useState([]);

    useEffect(() => {
      const fetchOrders = async () => {
              const res = await axiosSecure.get(`payments-details?sellerEmail=${user.email}`);
              setOrders(res.data);
      };

      if (user?.email) {
          fetchOrders();
      }
  }, [axiosSecure, user.email]);
    
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
          {orders.map((order, index) =>
            order.allCartsInfo
                .filter(cart => cart.sellerEmail === user.email)
                .map((cart, cartIndex) => (
                <tr key={`${order._id}-${cartIndex}`}>
                  <td>{index + 1}</td>
                  <td>{cart.itemName}</td>
                  <td>{order.customerEmail}</td>
                  <td>{cart.quantity}</td>
                  <td>$ {cart.price}</td>
                  <td>{order.time}</td>
                  <td>
                    <span
                      className={
                        order.status === "pending"
                          ? "bg-yellow-300 font-semibold capitalize px-2 py-1 rounded-xl"
                          : "bg-green-300/80 font-semibold capitalize px-2 py-1 rounded-xl"
                      }
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </section>
    );
};

export default PayHistory;