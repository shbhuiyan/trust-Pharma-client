import { GoogleAuthProvider } from "firebase/auth";
import useAuth from "../../Hooks/AuthProviderHooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosPublic from "../../Hooks/Axios/AxiosPublic/useAxiosPublic";

const GoogleButton = () => {
  const {loginWithGoogle , setUser} = useAuth()
  const navigate = useNavigate()
  const axiosPublic = useAxiosPublic()

  const googleProvider = new GoogleAuthProvider()
  const handleGoogleLogin = () => {
    loginWithGoogle(googleProvider)
    .then(result => {
      const user = result.user
      console.log(user);
      const userData = {
        name:user?.displayName,
        email:user?.email,
        image:user?.photoURL,
        role:"customer"
      }
      axiosPublic.post('/users' , userData)
      setUser(user);
      navigate("/")
      toast.success("Your'r LogIn Successfully" , {position:"top-center"})
    })
    .catch(err => {
      console.log("ERROR" , err);
    })
  }

  return (
    <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-2 py-3 transition-all border rounded-lg shadow hover:shadow-md border-gray-300 bg-white">
      <img src="https://docs.material-tailwind.com/icons/google.svg" alt="Google Logo" className="w-6 h-6" />
      <span className="text-base text-gray-600 font-semibold ">
        Login with Google
      </span>
    </button>
  );
};

export default GoogleButton;
