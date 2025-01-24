import { FaAd, FaChartPie, FaHome, FaUsersCog } from "react-icons/fa";
import { MdCategory, MdOutlinePayment } from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router-dom";
import './Dashboard.css'
import { IoHomeOutline } from "react-icons/io5";
import { FaShop } from "react-icons/fa6";
import { AiFillMedicineBox } from "react-icons/ai";

const Dashboard = () => {

    const admin = true
    const seller = false
    const user = false

    const adminDashboard = <>
    <li><NavLink to="/dashboard/admin-home" className="flex items-center gap-2 capitalize px-4 py-2 hover:text-white"><FaHome /> Admin Home</NavLink></li>
    <li><NavLink to="/dashboard/manage-users" className="flex items-center gap-2 capitalize px-4 py-2 hover:text-white"><FaUsersCog /> Manage Users</NavLink></li>
    <li><NavLink to="/dashboard/manage-category" className="flex items-center gap-2 capitalize px-4 py-2 hover:text-white"><MdCategory /> Manage Category</NavLink></li>
    <li><NavLink to="/dashboard/manage-payment" className="flex items-center gap-2 capitalize px-4 py-2 hover:text-white"><MdOutlinePayment /> Payment management</NavLink></li>
    <li><NavLink to="/dashboard/sales-report" className="flex items-center gap-2 capitalize px-4 py-2 hover:text-white"><FaChartPie /> Sales Report</NavLink></li>
    <li><NavLink to="/dashboard/banner-advertise" className="flex items-center gap-2 capitalize px-4 py-2 hover:text-white"><FaAd /> Banner Advertise</NavLink></li>
    </>

    const sellerDashboard = <>
    <li><NavLink to="/dashboard/manage-medicine" className="flex items-center gap-2 capitalize px-4 py-2 hover:text-white"><AiFillMedicineBox /> Manage Medicines</NavLink></li>
    <li><NavLink to="/dashboard/payment-history" className="flex items-center gap-2 capitalize px-4 py-2 hover:text-white"><MdOutlinePayment /> Payment History</NavLink></li>
    <li><NavLink to="/dashboard/ask-for-ad" className="flex items-center gap-2 capitalize px-4 py-2 hover:text-white"><FaAd /> Ask For Advertise</NavLink></li>
    </>

    const userDashboard = <>
    <li><NavLink to="/dashboard/user-payment-history" className="flex items-center gap-2 capitalize px-4 py-2 hover:text-white"><MdOutlinePayment /> Payment History</NavLink></li>
    </>

    return (
        <section className="container mx-auto min-h-screen flex gap-10">
            {/* left side */}
            <aside className="w-3/12 bg-blue-400">
            <ul id="dashboard" className="text-xl font-medium py-4">
               {admin && adminDashboard || seller && sellerDashboard || user && userDashboard}
            </ul>
            <div className="divider"></div>
            <ul className="text-xl font-medium py-4">
            <li><Link to="/" className="flex items-center gap-2 capitalize px-4 py-2 hover:text-white"><IoHomeOutline /> Home</Link></li>
            <li><Link to="/shop" className="flex items-center gap-2 capitalize px-4 py-2 hover:text-white"><FaShop /> Shop</Link></li>
            </ul>
            </aside>

            {/* right side */}
            <div className="w-9/12">
            <Outlet />
            </div>
        </section>
    );
};

export default Dashboard;