import Lottie from "lottie-react";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import regAnimation from "../../../../public/register.json";
import GoogleButton from "../../../Components/Buttons/GoogleButton/GoogleButton";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import useAuth from "../../../Components/Hooks/AuthProviderHooks/useAuth";
import { toast } from "react-toastify";
import useAxiosPublic from "../../../Components/Hooks/Axios/AxiosPublic/useAxiosPublic";



const Register = () => {
  const [hide, setHide] = useState(true);
  const {createNewUser , setUser , updateUser , loading} = useAuth()
  const navigate = useNavigate()
  const axiosPublic = useAxiosPublic()

  const imgBBApiKey = import.meta.env.VITE_ImgBB_API_KEY

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formSubmit = async(formData) => {
    const imageFile = {image:formData.imgFile[0]};

    const res = await axios.post(`https://api.imgbb.com/1/upload?key=${imgBBApiKey}`, imageFile , {
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
    const imageUrl = res.data.data.display_url
    const email = formData.email;
    const name = formData.name
    const password = formData.password
    const role = formData.role

    const userData = {email , name , role , image:imageUrl}
    // console.log(userData);

    createNewUser(email , password)
    .then( result => {
      const newUser = result.user
      updateUser(name , imageUrl)
      .then(()=>{
        axiosPublic.post('/users' , userData)
        .then(res => {
          if(res.data.insertedId){
            navigate("/")
            setUser(newUser);
            toast.success("Successfully Created Your Account" , {position:"top-center"})
          }
        })
      })
    })
    .catch(err => {
      err.message && toast.error("This email is already exists", {position:"top-center"})
    })

  };

  return (
    <section className="max-w-4xl mx-auto border p-10 max-lg:py-20 lg:my-32 rounded-lg shadow-lg flex flex-col-reverse md:flex-row items-center gap-4">
      <div className="md:w-1/2">
        <div className="text-center mb-8 space-y-4">
          <Link to="/" className="font-bold font-cinzel text-3xl">
            <span className="text-blue-600">Trust</span>Pharma
          </Link>
          <h2 className="text-3xl font-semibold font-cinzel">
            Register Your Account
          </h2>
        </div>
        <form onSubmit={handleSubmit(formSubmit)} className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              {...register("imgFile", { required: true })}
              type="file"
              className="w-full file-input file-input-bordered focus:outline-none"
            />
          </div>
          {errors.imgFile && (
            <span className="text-red-500 text-sm font-medium">
              Your Image is required
            </span>
          )}
          <div className="flex items-center border border-gray-300 rounded px-3">
            <FaUser />
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Name"
              className="w-full px-2 py-2 focus:outline-none"
            />
          </div>
          {errors.name && (
            <span className="text-red-500 text-sm font-medium">
              Your Name is required
            </span>
          )}
          <div className="flex items-center border border-gray-300 rounded px-3">
            <FaEnvelope />
            <input
              {...register("email", { required: true })}
              type="email"
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
          {errors.password?.type === "required" && (
            <span className="text-red-500 text-sm font-medium">
              Password is required
            </span>
          )}
          {errors.password?.type === "pattern" && (
            <span className="text-red-500 text-sm font-medium">
              Password must have one uppercase & one Lowercase & one number
            </span>
          )}
          {errors.password?.type === "minLength" && (
            <span className="text-red-500 text-sm font-medium">
              Password must be 6 Characters long
            </span>
          )}

          <select
            defaultValue=""
            className="bg-white w-full px-3 py-3 focus:outline-none border rounded-md"
            {...register("role", { required: true })}
          >
            <option disabled value="">
              Select Your Role
            </option>
            <option value="customer">customer</option>
            <option value="seller">seller</option>
          </select>
          {errors.role?.type === "required" && (
            <span className="text-red-500 text-sm font-medium">
              Password is required
            </span>
          )}
          {
            loading ? <button disabled className="w-full py-2 bg-blue-500 transition-all font-semibold text-white rounded">
            <span className="loading loading-spinner loading-sm"></span>
          </button> : <button className="w-full py-2 bg-blue-500 transition-all font-semibold text-white rounded hover:bg-blue-600">
            Register
          </button>
          }
        </form>
        <p className="font-semibold  text-center my-4">
          If you already have an account{" "}
          <Link to="/login" className="text-blue-500">
            Log in
          </Link>
        </p>
        <GoogleButton />
      </div>

      <div className="md:w-1/2">
        <Lottie animationData={regAnimation} loop={true} autoplay={true} />
      </div>
    </section>
  );
};

export default Register;
