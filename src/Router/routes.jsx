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
import ErrorPage from "../Pages/Error/ErrorPage";
import ProtectFromNonUser from "./ProtectRoute/ProtectFromNonUser";
import ProtectFromUser from "./ProtectRoute/ProtectFromUser";
import Invoice from "../Pages/Extra/Invoice/Invoice";
import Categories from "../Pages/Shop/Categories/Categories";



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
                path:"/shop/categories/:category",
                element:<Categories />
            },
            {
                path:"/view-cart",
                element:<ProtectFromNonUser><ViewCart /></ProtectFromNonUser>
            },
            {
                path:"/view-cart/checkout",
                element:<ProtectFromNonUser><Checkout /></ProtectFromNonUser>
            },
            {
                path:"/view-cart/checkout/invoice",
                element:<ProtectFromNonUser><Invoice /></ProtectFromNonUser>
            },
        ]
    },
    {
        path:"/dashboard",
        element:<ProtectFromNonUser><Dashboard /></ProtectFromNonUser>,
        children:[
            // for admin routes
            {
                path:"/dashboard/admin-home",
                element:<ProtectFromNonUser><AdminHome /></ProtectFromNonUser>
            },
            {
                path:"/dashboard/manage-users",
                element:<ProtectFromNonUser><ManageUsers /></ProtectFromNonUser>
            },
            {
                path:"/dashboard/manage-category",
                element:<ProtectFromNonUser><ManageCategory /></ProtectFromNonUser>
            },
            {
                path:"/dashboard/manage-payment",
                element:<ProtectFromNonUser><ManagePayment /></ProtectFromNonUser>
            },
            {
                path:"/dashboard/sales-report",
                element:<ProtectFromNonUser><SalesReport /></ProtectFromNonUser>
            },
            {
                path:"/dashboard/banner-advertise",
                element:<ProtectFromNonUser><Advertise /></ProtectFromNonUser>
            },
            // for seller routes
            {
                path:"/dashboard/seller-home",
                element:<ProtectFromNonUser><SellerHome /></ProtectFromNonUser>
            },
            {
                path:"/dashboard/manage-medicine",
                element:<ProtectFromNonUser><ManageMedicine /></ProtectFromNonUser>
            },
            {
                path:"/dashboard/payment-history",
                element:<ProtectFromNonUser><PayHistory /></ProtectFromNonUser>
            },
            {
                path:"/dashboard/ask-for-ad",
                element:<ProtectFromNonUser><AskForAd /></ProtectFromNonUser>
            },
            // for customer routes
            {
                path:"/dashboard/customer-payment-history",
                element:<ProtectFromNonUser><PaymentHistory /></ProtectFromNonUser>
            },
        ]
    },
    {
        path:"/login",
        element:<ProtectFromUser><Login /></ProtectFromUser>
    },
    {
        path:"/register",
        element:<ProtectFromUser><Register /></ProtectFromUser>
    },
])

export default router;