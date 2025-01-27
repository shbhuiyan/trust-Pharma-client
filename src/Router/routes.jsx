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
import SellerHome from "../Pages/Dashboard/SellerPages/SellerHome/SellerHome";
import ViewCart from "../Pages/Extra/ViewCart/ViewCart";
import Checkout from "../Pages/Extra/Checkout/Checkout";
import ProtectNonUser from "./ProtectRoute/ProtectNonUser";
import ErrorPage from "../Pages/Error/ErrorPage";



const router = createBrowserRouter([
    {
        path:"/",
        element:<Root />,
        errorElement:<ErrorPage />,
        children:[
            {
                path:"/",
                element:<Home />
            },
            {
                path:"/shop",
                element:<Shop />
            },
            {
                path:"/view-cart",
                element:<ProtectNonUser><ViewCart /></ProtectNonUser>
            },
            {
                path:"/view-cart/checkout",
                element:<ProtectNonUser><Checkout /></ProtectNonUser>
            },
        ]
    },
    {
        path:"/dashboard",
        element:<ProtectNonUser><Dashboard /></ProtectNonUser>,
        children:[
            // for admin routes
            {
                path:"/dashboard/admin-home",
                element:<ProtectNonUser><AdminHome /></ProtectNonUser>
            },
            {
                path:"/dashboard/manage-users",
                element:<ProtectNonUser><ManageUsers /></ProtectNonUser>
            },
            {
                path:"/dashboard/manage-category",
                element:<ProtectNonUser><ManageCategory /></ProtectNonUser>
            },
            {
                path:"/dashboard/manage-payment",
                element:<ProtectNonUser><ManagePayment /></ProtectNonUser>
            },
            {
                path:"/dashboard/sales-report",
                element:<ProtectNonUser><SalesReport /></ProtectNonUser>
            },
            {
                path:"/dashboard/banner-advertise",
                element:<ProtectNonUser><Advertise /></ProtectNonUser>
            },
            // for seller routes
            {
                path:"/dashboard/seller-home",
                element:<ProtectNonUser><SellerHome /></ProtectNonUser>
            },
            {
                path:"/dashboard/manage-medicine",
                element:<ProtectNonUser><ManageMedicine /></ProtectNonUser>
            },
            {
                path:"/dashboard/payment-history",
                element:<ProtectNonUser><PayHistory /></ProtectNonUser>
            },
            {
                path:"/dashboard/ask-for-ad",
                element:<ProtectNonUser><AskForAd /></ProtectNonUser>
            },
            // for customer routes
            {
                path:"/dashboard/customer-payment-history",
                element:<ProtectNonUser><PaymentHistory /></ProtectNonUser>
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