import { Navigate } from "react-router-dom";
import useAuth from "../../Components/Hooks/AuthProviderHooks/useAuth";
import Loading from "../../Components/Loading";

// eslint-disable-next-line react/prop-types
const ProtectFromUser = ({ children }) => {
    const { user, loading } = useAuth();
  
    if (loading) {
      return <Loading />;
    }
    if (!user?.email) {
      return children;
    }
    return <Navigate to="/" />;
  };

export default ProtectFromUser;