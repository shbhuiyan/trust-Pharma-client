import { FaTrashAlt } from "react-icons/fa";
import useBannerSlider from "../../../../Components/Hooks/BannerSlider/useBannerSlider";
import useAxiosSecure from "../../../../Components/Hooks/Axios/AxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";

const Advertise = () => {
    const {bannerSliders , refetch} = useBannerSlider()
    const axiosSecure = useAxiosSecure()

    const handleStatusChange = (statusValue , id) => {
            axiosSecure.patch(`/banner-sliders/${id}` , {status:statusValue})
            .then(res => {
                if(res.data.modifiedCount){
                    if(statusValue === "pending"){
                        Swal.fire({
                            title:"Deactivate",
                            text: "You Deactivate Banner Slider",
                            icon: "success",
                            draggable: true
                          });
                    }else{
                        Swal.fire({
                            title:"Activate",
                            text: "You Activate Banner Slider",
                            icon: "success",
                            draggable: true
                          });
                    }
                      refetch()
                }
            })
        }

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
              <th>Toggle</th>
              <th>Remove</th>
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
                  <td>
                  <input type="checkbox" onClick={(e)=>handleStatusChange(e.target.value , bannerSlide._id)} value={bannerSlide.status === "pending" ? "active" : "pending"} className="toggle toggle-success" defaultChecked={bannerSlide.status === "pending" ? false : true} />
                  </td>
                  <td>
                    <button
                    //   onClick={() => handleDeleteFromCart(cart._id)}
                      className="btn btn-ghost"
                    >
                      <FaTrashAlt className="text-xl text-red-500" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
        </section>
    );
};

export default Advertise;