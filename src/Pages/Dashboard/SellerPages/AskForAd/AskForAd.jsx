import { useState } from "react";
import useAuth from "../../../../Components/Hooks/AuthProviderHooks/useAuth";
import useAxiosSecure from "../../../../Components/Hooks/Axios/AxiosSecure/useAxiosSecure";
import useBannerSlider from "../../../../Components/Hooks/BannerSlider/useBannerSlider";
import Swal from "sweetalert2";
import axios from "axios";
import moment from "moment";

const AskForAd = () => {
    const {user} = useAuth()
    const {bannerSliders , refetch} = useBannerSlider(user?.email)
    const axiosSecure = useAxiosSecure()
    const [loading , setLoading] = useState(false)
    const imgBBApiKey = import.meta.env.VITE_ImgBB_API_KEY;



    const bannerSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = new FormData(e.target);
        const imageFile = form.get("image");
        const medicineName = form.get("medicineName");
        const description = form.get("description");
        const img = { image: imageFile };
        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgBBApiKey}`,
          img,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        );
        const medicineImage = res.data.data.display_url;
        const status = "pending";
        const sellerEmail = user?.email;
        const time = moment().format('Do MMM YYYY, h:mm a');
        const newBannerAdd = { medicineName, medicineImage, description, sellerEmail, status, time };
    
        axiosSecure.post("/banner-sliders", newBannerAdd).then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              title: "Submit!",
              text: "Submit Your Banner Advertise",
              icon: "success",
              draggable: true,
            });
            e.target.reset();
            refetch();
          }
        });
        // after submitting modal close
        const modal = document.getElementById("my_modal_add_banner");
        modal.close();
        setLoading(false);
      };


    return (
        <section className="my-10">
            <div className="max-w-2xl space-y-4 mx-auto text-center">
              <h3 className="text-3xl font-bold text-blue-500 capitalize">
              Manage Your Advertisements with Ease{" "}
              </h3>
              <p className="font-medium">
              Welcome to your dedicated panel for managing advertisement sliders! View and control the visibility of your referred medicines, and ensure the right products are showcased.
              </p>
            </div>

            <div className="overflow-x-auto my-20">
        <table className="table">
          {/* head */}
          <thead className="text-base">
            <tr>
              <th>#</th>
              <th>Medicine Image</th>
              <th>Medicine Name</th>
              <th>Requested Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bannerSliders.map((bannerSlide, i) => {
              return (
                <tr key={bannerSlide._id}>
                  <td>{i + 1}</td>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          className="w-full"
                          src={bannerSlide.medicineImage}
                          alt={bannerSlide.medicineName}
                        />
                      </div>
                    </div>
                  </td>
                  <td>{bannerSlide.medicineName}</td>
                  <td>{bannerSlide.time}</td>
                  <td>
                  <span
                      className={
                        bannerSlide.status === "pending"
                          ? "bg-yellow-300 font-semibold capitalize px-2 py-1 rounded-xl"
                          : "bg-green-300/80 font-semibold capitalize px-2 py-1 rounded-xl"
                      }
                    >
                      {bannerSlide.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className=" mt-6 text-center flex md:flex-col items-center justify-center gap-4">
                <p className="text-2xl font-medium capitalize bg-blue-100/50 p-4 rounded-xl">Are You want to feature a product in the Banner slider?</p>
                <button onClick={() => document.getElementById("my_modal_add_banner").showModal()} className="btn btn-info">Add New Advertisement</button>
            </div>


            <dialog id="my_modal_add_banner" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="ring ring-red-500 text-red-500 btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          {/* Add banner slider */}
          <section className="py-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-4">
              Add New Banner Advertise
            </h2>
            <form onSubmit={bannerSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold mb-2">
                  Medicine Name <span className="text-red-600">*</span>
                </label>
                <input
                  name="medicineName"
                  required
                  type="text"
                  placeholder="Medicine Name"
                  className="w-full py-2 focus:outline-none  border border-gray-300 rounded-md px-3"
                />
              </div>

              <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="shortDescription">
                    Description<span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="description"
                      required
                      name="description"
                      placeholder="Description"
                      className="w-full py-2 focus:outline-none  border border-gray-300 rounded-md px-3"
                    ></textarea>
                </div>

              <div>
                <label className="block font-semibold mb-2">
                  Medicine Image <span className="text-red-600">*</span>
                </label>
                <input
                  required
                  name="image"
                  type="file"
                  className="w-full file-input file-input-bordered focus:outline-none"
                />
              </div>
              <div className="text-center">
                {loading ? (
                  <button
                    disabled
                    className="px-6 py-2 w-full bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                  >
                    <span className="loading loading-spinner loading-sm"></span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-2 w-full bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                  >
                    Submit Banner Advertise
                  </button>
                )}
              </div>
            </form>
          </section>
        </div>
      </dialog>
        </section>
    );
};

export default AskForAd;