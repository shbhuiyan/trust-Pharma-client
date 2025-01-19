import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import Home from "../Pages/Home/Home";



const router = createBrowserRouter([
    {
        path:"/",
        Element:<Root />,
        children:[
            {
                path:"/",
                element:<Home />
            },
        ]
    },
])

export default router;