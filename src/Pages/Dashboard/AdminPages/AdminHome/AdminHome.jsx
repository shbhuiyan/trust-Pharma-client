/* eslint-disable react/prop-types */
import { FaTruckFast, FaUsers } from "react-icons/fa6";
import usePayments from "../../../../Components/Hooks/Payments/usePayments";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../Components/Hooks/Axios/AxiosSecure/useAxiosSecure";
import { useQuery } from "react-query";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#9C27B0', 'red', '#FF5733', '#33FF57', '#F33A6A', '#000000' , 'pink'];


const AdminHome = () => {
    const {paymentHistory} = usePayments()
    const totalRevenue = paymentHistory.reduce((prev, item) => prev + item.amount, 0);
    const confirm = paymentHistory.filter(confirmPayment => confirmPayment.status === "confirmed")
    const confirmTotal = confirm.reduce((prev, item) => prev + item.amount, 0);
    const pending = paymentHistory.filter(pendingPayment => pendingPayment.status === "pending")
    const pendingTotal = pending.reduce((prev, item) => prev + item.amount, 0);
    const [users , setUsers] = useState([])
    const axiosSecure = useAxiosSecure()
    const customers = users.filter(customer => customer.role === "customer")
    const sellers = users.filter(seller => seller.role === "seller")
    

    useEffect(() => {
            axiosSecure.get('/users')
            .then(res => {
                setUsers(res.data)
            })
        },[axiosSecure])

    const {data:chartData = []} = useQuery({
        queryKey:["order-stats"],
        queryFn:async() => {
            const {data} = await axiosSecure.get('/order-stats')
            return data
        }
    })


    // custom shape for bar chart
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
      };
      
      const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;
      
        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
      };



    return (
        <section className="my-10 space-y-20 font-cinzel">
            {/* stats admin */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <div className="p-6 rounded-xl shadow-2xl text-center bg-gradient-to-r from-blue-500">
                    <h1 className="text-3xl font-bold pb-2 border-b-2">Total Revenue</h1>
                    <p className="mt-4 text-3xl font-bold flex items-center gap-4 justify-center"><FaMoneyCheckAlt /> {totalRevenue}</p>
                </div>
                
                <div className="p-6 rounded-xl shadow-2xl text-center bg-gradient-to-r from-green-500">
                    <h1 className="text-3xl font-bold pb-2 border-b-2">Confirm Total</h1>
                    <p className="mt-4 text-3xl font-bold flex items-center gap-4 justify-center"><FaMoneyCheckAlt /> {confirmTotal}</p>
                </div>

                <div className="p-6 rounded-xl shadow-2xl text-center bg-gradient-to-r from-orange-500">
                    <h1 className="text-3xl font-bold pb-2 border-b-2">Pending Total</h1>
                    <p className="mt-4 text-3xl font-bold flex items-center gap-4 justify-center"><FaMoneyCheckAlt /> {pendingTotal}</p>
                </div>
                <div className="p-6 rounded-xl shadow-2xl text-center bg-gradient-to-r from-rose-500">
                    <h1 className="text-3xl font-bold pb-2 border-b-2">Total Customers</h1>
                    <p className="mt-4 text-3xl font-bold flex items-center gap-4 justify-center"><FaUsers/> {customers.length}</p>
                </div>
                <div className="p-6 rounded-xl shadow-2xl text-center bg-gradient-to-r from-violet-500">
                    <h1 className="text-3xl font-bold pb-2 border-b-2"> Total Seller</h1>
                    <p className="mt-4 text-3xl font-bold flex items-center gap-4 justify-center"><FaUsers/> {sellers.length}</p>
                </div>
                <div className="p-6 rounded-xl shadow-2xl text-center bg-gradient-to-r from-teal-500">
                    <h1 className="text-3xl font-bold pb-2 border-b-2">Total Orders</h1>
                    <p className="mt-4 text-3xl font-bold flex items-center gap-4 justify-center"><FaTruckFast /> {paymentHistory.length}</p>
                </div>
            </div>

            {/* bar chart for category*/}
            <div className="font-bold">
            <BarChart
                className="mx-auto"
              width={1000}
              height={400}
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Bar dataKey="totalSold" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                ))}
              </Bar>
            </BarChart>
            </div>

        </section>
    );
};

export default AdminHome;