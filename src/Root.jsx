import { Outlet } from "react-router-dom";
import Nav from "./Layouts/Navbar/Nav";
import useAuth from "./Components/Hooks/AuthProviderHooks/useAuth";
import Loading from "./Components/Loading";
import Footer from "./Layouts/Footer/Footer";

const Root = () => {
    const {loading} = useAuth()

    if(loading){
        return <Loading />
    }
    return (
        <div>
            <Nav /> 
            <div className="container mx-auto">
            <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Root;