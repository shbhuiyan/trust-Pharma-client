// import { FaDownload } from "react-icons/fa";
import { useQuery } from "react-query";
import useAxiosSecure from "../../../../Components/Hooks/Axios/AxiosSecure/useAxiosSecure";

const SalesReport = () => {
    const axiosSecure = useAxiosSecure()
    
    const { data: salesReport = [] } = useQuery({
        queryKey: ["SalesReport"],
        queryFn: async () => {
          const { data } = await axiosSecure.get("/sales-report");
          return data;
        },
      });

// TODO: report and filter button pore kaj korbo.

    return (
        <section className="my-10 font-cinzel">
            <div className="flex max-md:flex-col justify-evenly items-center">
                <h1 className="text-4xl font-bold text-blue-500 text-center">
                📊 Sales Report Dashboard
                </h1>

                {/* <div className="space-x-4">
                <button
                  className="btn btn-outline btn-info text-base"
                >
                  Report Download <FaDownload />
                </button>

                <button
                  className="btn btn-warning text-base font-inter"
                >
                  Filter Report
                </button>
                </div> */}
            </div>

            <div className="overflow-x-auto my-20 font-inter">
        <table className="table">
          {/* head */}
          <thead className="text-base">
            <tr>
              <th>#</th>
              <th>Medicine Name</th>
              <th>Seller Email</th>
              <th>Customer Email</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Purchase Date</th>
            </tr>
          </thead>
          <tbody>
          {
            salesReport.map((report , i) => <tr key={report._id}>
                <td>{i+1}</td>
                <td>{report.medicineName}</td>
                <td>{report.sellerEmail}</td>
                <td>{report.customerEmail}</td>
                <td>{report.totalSold}</td>
                <td>{report.revenue}</td>
                <td>{report.time}</td>
            </tr> )
          }
          </tbody>
        </table>
      </div>

        </section>
    );
};

export default SalesReport;