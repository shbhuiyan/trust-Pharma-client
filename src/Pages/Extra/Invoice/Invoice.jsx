import { useQuery } from "react-query";
import useAxiosSecure from "../../../Components/Hooks/Axios/AxiosSecure/useAxiosSecure";
import usePayments from "../../../Components/Hooks/Payments/usePayments";
import useAuth from "../../../Components/Hooks/AuthProviderHooks/useAuth";
import moment from "moment";
import { FaPrint } from "react-icons/fa6";

const Invoice = () => {
    const {paymentHistory} = usePayments()
    const {user , transactionId} = useAuth()
    const axiosSecure = useAxiosSecure()
    const time = moment().format('Do MMMM YYYY')

    const { data: invoiceReport = [] } = useQuery({
        queryKey: ["SalesReport" , user?.email],
        queryFn: async () => {
          const { data } = await axiosSecure.get(`/invoice-report/${transactionId}`);
          return data;
        },
      });
    const subTotalPrice = invoiceReport.reduce((prev, item) => prev + item.totalPrice, 0);

    return (
        <section className="my-10 border p-10 rounded-lg font-inter space-y-16">
            <div className="flex justify-between items-center">
            <h1 className="font-bold font-cinzel text-4xl">
            <span className="text-blue-500">Trust</span>Pharma
            </h1>
                <h1 className="uppercase font-bold font-cinzel text-4xl">Invoice</h1>
            </div>
            <div className="flex justify-between items-center">
                <div className="">
                    <h3 className="text-2xl font-semibold">Billing Information:</h3>
                    <p className="text-lg font-medium"><span className="font-bold">Name: </span>{user?.displayName}</p>
                    <p className="text-lg font-medium"><span className="font-bold">Email: </span>{user?.email}</p>
                </div>
            <div className="">
                <h3 className="text-lg font-medium"><span className="font-bold">Invoice No:</span> #TP-{paymentHistory.length <10 ? `0${paymentHistory.length}` : paymentHistory.length}</h3>
                <p className="text-lg font-medium"><span className="font-bold">Date:</span> {time} </p>
            </div>
            </div>

            <div className="overflow-x-auto my-20 font-inter">
                <h1 className="text-3xl font-semibold mb-6">Purchase Details:</h1>
        <table className="table">
          {/* head */}
          <thead className="text-base">
            <tr>
              <th>#</th>
              <th>Medicine Name</th>
              <th>Quantity</th>
              <th>Per Unit Price</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
          {
            invoiceReport.map((report , i) => <tr key={report._id}>
                <td>{i+1}</td>
                <td>{report.medicineName}</td>
                <td>{report.totalBuy}</td>
                <td>{report.perUnitPrice}</td>
                <td>{report.totalPrice}</td>
            </tr> )
          }
          </tbody>
          <tfoot className="text-lg text-black/80">
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>Total Amount:</th>
                    <th>$ {subTotalPrice}</th>
                  </tr>
                </tfoot>
        </table>
      </div>
          <hr />
          <div className="flex justify-between items-center">
          <p className="text-lg font-medium">Thank you for your purchase!</p>
          <button className="btn btn-info">Print Invoice <FaPrint/> </button>
          </div>
        </section>
    );
};

export default Invoice;