import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import Home from "../Pages/Home/Home";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Shop from "../Pages/Shop/Shop";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";



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
        element:<Dashboard />
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