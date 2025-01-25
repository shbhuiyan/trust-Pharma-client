import { FaAd, FaChartPie, FaHome, FaSignOutAlt, FaUsersCog } from "react-icons/fa";
import { MdCategory, MdOutlinePayment } from "react-icons/md";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import './Dashboard.css'
import { IoHomeOutline } from "react-icons/io5";
import { FaShop } from "react-icons/fa6";
import { AiFillMedicineBox } from "react-icons/ai";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Components/Hooks/Axios/AxiosSecure/useAxiosSecure";
import useAuth from "../../Components/Hooks/AuthProviderHooks/useAuth";
import Loading from "../../Components/Loading";
import Swal from "sweetalert2";

const Dashboard = () => {
    const {user , loading , userLogOut} = useAuth()
    const axiosSecure = useAxiosSecure()
    const [userRoleCheck , setUserRoleCheck] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        axiosSecure.get(`/users/${user?.email}`)
        .then(res => {
            setUserRoleCheck(res.data)
        })
    },[axiosSecure, user?.email])

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

    const customerDashboard = <>
    <li><NavLink to="/dashboard/customer-payment-history" className="flex items-center gap-2 capitalize px-4 py-2 hover:text-white"><MdOutlinePayment /> Payment History</NavLink></li>
    </>

    const handleLogout = () => {
        userLogOut()
        .then(()=> {
          Swal.fire({
            title: "Logout Successful",
            icon: "success",
            draggable: true
          });
          navigate("/")
        })
      }



    if(loading){
        return <Loading />
    }
    return (
        <section className="container mx-auto min-h-screen flex gap-10">
            {/* left side */}
            <aside className="w-3/12 bg-blue-400">
            <div className="flex items-center p-4 gap-2">
            <div className="w-16">
                <img className="rounded-md" src={userRoleCheck.image} alt={userRoleCheck.name} />
            </div>
            <div className="">
            <h1 className="text-2xl font-semibold">{userRoleCheck.name}</h1>
            <p className="text-lg font-semibold">{userRoleCheck.email}</p>
            </div>
            </div>
            <div className="divider"></div>
            <ul id="dashboard" className="text-xl font-medium py-4">
               {userRoleCheck?.role==="admin" && adminDashboard || userRoleCheck?.role==="seller" && sellerDashboard || userRoleCheck?.role==="customer" && customerDashboard}
            </ul>
            <div className="divider"></div>
            <ul className="text-xl font-medium py-4">
            <li><Link to="/" className="flex items-center gap-2 capitalize px-4 py-2 hover:text-white"><IoHomeOutline /> Home</Link></li>
            <li><Link to="/shop" className="flex items-center gap-2 capitalize px-4 py-2 hover:text-white"><FaShop /> Shop</Link></li>
            <li>
              <Link className="flex items-center gap-2 capitalize px-4 py-2 hover:text-white" onClick={handleLogout}><FaSignOutAlt /> Logout</Link>
            </li>
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