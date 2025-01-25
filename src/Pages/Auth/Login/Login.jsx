import Lottie from "lottie-react";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import loginLottie from "../../../../public/loginLottie.json";
import GoogleButton from "../../../Components/Buttons/GoogleButton/GoogleButton";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Components/Hooks/AuthProviderHooks/useAuth";
import { toast } from "react-toastify";

const Login = () => {
  const [hide, setHide] = useState(true);
  const {loginUser , setUser , loading} = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const formSubmit = (formData) => {
    const email = formData.email;
    const password = formData.password

    loginUser(email , password)
    .then(result => {
      const oldUser = result.user
      setUser(oldUser);
      navigate("/")
      toast.success(`👋 Welcome Back ${oldUser?.displayName || "Anonymous"}` , {position:"top-center"})
    })
    .catch(err => {
      err.message && toast.error("Please Check Your Email and Password" , {position:"top-center"})
    })

  };

  return (
    <section className="max-w-4xl mx-auto border p-10 max-lg:py-20 lg:my-32 rounded-lg shadow-lg flex flex-col-reverse md:flex-row-reverse items-center gap-4">
      <div className="md:w-1/2">
        <div className="text-center mb-8 space-y-4">
          <Link to="/" className="font-bold font-cinzel text-3xl">
            <span className="text-blue-600">Trust</span>Pharma
          </Link>
          <h2 className="text-3xl font-semibold font-cinzel">Welcome Back</h2>
        </div>
        <form onSubmit={handleSubmit(formSubmit)} className="space-y-4">
          <div className="flex items-center border border-gray-300 rounded px-3">
            <FaEnvelope />
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email"
              className="w-full px-2 py-2 focus:outline-none"
            />
          </div>
          {errors.email && (
            <span className="text-red-500 text-sm font-medium">
              Your Email is required
            </span>
          )}
          <div className="flex items-center border border-gray-300 rounded px-3">
            <FaLock />
            <input
              {...register("password", {
                required: true,
                pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                minLength: 6,
              })}
              type={hide ? "password" : "text"}
              placeholder="Password"
              className="w-full px-2 py-2 focus:outline-none"
            />
            <p className="hover:cursor-pointer" onClick={() => setHide(!hide)}>
              {hide ? <FaEye /> : <FaEyeSlash />}
            </p>
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm font-medium">
              Password is required
            </span>
          )}
          {
            loading ? <button disabled className="w-full py-2 bg-blue-500 transition-all font-semibold text-white rounded">
            <span className="loading loading-spinner loading-sm"></span>
          </button> : <button className="w-full py-2 bg-blue-500 transition-all font-semibold text-white rounded hover:bg-blue-600">
            Login
          </button>
          }
        </form>
        <p className="font-semibold  text-center my-4">
          Don&#39;t have an account yet?{" "}
          <Link to="/register" className="text-blue-500">
            Create One
          </Link>
        </p>
        <GoogleButton />
      </div>

      <div className="md:w-1/2">
        <Lottie animationData={loginLottie} loop={true} autoplay={true} />
      </div>
    </section>
  );
};

export default Login;
