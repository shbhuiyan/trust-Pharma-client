import { Navigate, useLocation } from "react-router-dom";
import Loading from "../../Components/Loading";
import useAuth from "../../Components/Hooks/AuthProviderHooks/useAuth";

// eslint-disable-next-line react/prop-types
const ProtectNonUser = ({ children }) => {
    const location = useLocation();
    const { user, loading } = useAuth;
  
    if (loading) {
      return <Loading/>;
    }
    if (user && user?.email) {
      return children;
    }
    return <Navigate state={location.pathname} to="/login" />;
  };

export default ProtectNonUser;