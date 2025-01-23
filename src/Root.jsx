import { Outlet } from "react-router-dom";
import Nav from "./Layouts/Navbar/Nav";
import useAuth from "./Components/Hooks/AuthProviderHooks/useAuth";
import Loading from "./Components/Loading";

const Root = () => {
    const {loading} = useAuth()

    if(loading){
        return <Loading />
    }
    return (
        <div className="container mx-auto">
            <Nav /> 
            <Outlet />
        </div>
    );
};

export default Root;