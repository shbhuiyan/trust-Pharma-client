import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import Home from "../Pages/Home/Home";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Shop from "../Pages/Shop/Shop";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import ManageUsers from "../Pages/Dashboard/AdminPages/ManageUsers/ManageUsers";
import AdminHome from "../Pages/Dashboard/AdminPages/AdminHome/AdminHome";
import ManageCategory from "../Pages/Dashboard/AdminPages/ManageCategory/ManageCategory";
import ManagePayment from "../Pages/Dashboard/AdminPages/ManagePayment/ManagePayment";
import SalesReport from "../Pages/Dashboard/AdminPages/SalesReport/SalesReport";
import Advertise from "../Pages/Dashboard/AdminPages/Advertise/Advertise";
import AskForAd from "../Pages/Dashboard/SellerPages/AskForAd/AskForAd";
import PayHistory from "../Pages/Dashboard/SellerPages/PayHistory/PayHistory";
import ManageMedicine from "../Pages/Dashboard/SellerPages/ManageMedicine/ManageMedicine";
import PaymentHistory from "../Pages/Dashboard/UserPages/PaymentHistory/PaymentHistory";



const router = createBrowserRouter([
    {
        path:"/",
        element:<Root />,
        children:[
            {
                path:"/",
                element:<Home />
            },
            {
                path:"/shop",
                element:<Shop />
            },
        ]
    },
    {
        path:"/dashboard",
        element:<Dashboard />,
        children:[
            // for admin routes
            {
                path:"/dashboard/admin-home",
                element:<AdminHome />
            },
            {
                path:"/dashboard/manage-users",
                element:<ManageUsers />
            },
            {
                path:"/dashboard/manage-category",
                element:<ManageCategory />
            },
            {
                path:"/dashboard/manage-payment",
                element:<ManagePayment />
            },
            {
                path:"/dashboard/sales-report",
                element:<SalesReport />
            },
            {
                path:"/dashboard/banner-advertise",
                element:<Advertise />
            },
            // for seller routes
            {
                path:"/dashboard/manage-medicine",
                element:<ManageMedicine />
            },
            {
                path:"/dashboard/payment-history",
                element:<PayHistory />
            },
            {
                path:"/dashboard/ask-for-ad",
                element:<AskForAd />
            },
            // for user routes
            {
                path:"/dashboard/user-payment-history",
                element:<PaymentHistory />
            },
        ]
    },
    {
        path:"/login",
        element:<Login />
    },
    {
        path:"/register",
        element:<Register />
    },
])

export default router;