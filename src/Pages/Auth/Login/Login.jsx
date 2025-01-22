import Lottie from "lottie-react";
import { FaEnvelope, FaLock, } from "react-icons/fa";
import { Link } from "react-router-dom";
import loginLottie from "../../../../public/loginLottie.json"


const Login = () => {
    return (
      <section className="max-w-4xl mx-auto border p-10 max-lg:py-20 lg:my-32 rounded-lg shadow-lg flex flex-col-reverse md:flex-row items-center gap-4">
      <div className="md:w-1/2">
          <div className="text-center mb-8 space-y-4">
          <Link to="/" className="font-bold font-cinzel text-3xl">
            <span className="text-blue-600">Trust</span>Pharma
          </Link>
          <h2 className="text-3xl font-semibold font-cinzel text-rose-600">Welcome Back</h2>
          </div>
        <form className="space-y-4">
            <div className="flex items-center border border-gray-300 rounded px-3">
              <FaEnvelope />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-2 py-2 focus:outline-none"
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded px-3">
            <FaLock />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-2 py-2 focus:outline-none"
              />
            </div>
            <button className="w-full py-2 bg-rose-500 text-white rounded hover:bg-rose-600">
              Register
            </button>
          </form>
          <p className="font-semibold  text-center my-4">Don&#39;t have an account yet? <Link to="/register" className="text-blue-500">Create One</Link></p>
      </div>
  
      <div className="md:w-1/2">
      <Lottie animationData={loginLottie} loop={true} autoplay={true} />
      </div>
      </section>
    );
  };

export default Login;