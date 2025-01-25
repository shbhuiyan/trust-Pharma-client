import { toast } from "react-toastify";
import useMedicine from "../../../../Components/Hooks/Medicines/useMedicine";
import { useState } from "react";
import axios from "axios";
import useAxiosSecure from "../../../../Components/Hooks/Axios/AxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";

const ManageMedicine = () => {
    const {medicines , refetch , user} = useMedicine()
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure()
    const imgBBApiKey = import.meta.env.VITE_ImgBB_API_KEY;

    const handleAddMedicine = async(e) => {
        e.preventDefault()
        setLoading(true)
        const form = new FormData(e.target)

        const medicineName = form.get("medicineName");
        const drugImage = form.get("medicineImage");
        const genericName = form.get("genericName");
        const description = form.get("description");
        const category = form.get("category");
        const company = form.get("company");
        const unit = form.get("unit");
        const discount = form.get("discount");
        const price = form.get("price");
        const email = user?.email;

        if(price < 1 || discount < 0){
                const modal = document.getElementById("my_modal_add_medicine")
                modal.close();
                toast.error("Sorry! Price & Discount Allow Only Positive Value",{position:"top-center"})
                setLoading(false);
                return
        }
        const img = { image: drugImage };
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

        const newMedicine = {medicineName , medicineImage , genericName , description , category , company , unit , discount , price , email};

        const {data} = await axiosSecure.post('/medicines' , newMedicine)
            if(data.insertedId){
                Swal.fire({
                    title: "Successfully Added!",
                    text: "You Added A New Medicine",
                    icon: "success",
                    draggable: true,
                  });
                  e.target.reset();
                  refetch();
            }
        const modal = document.getElementById("my_modal_add_medicine")
        modal.close();
        setLoading(false);
    }

    return (
        <section className="my-10">
            <div className="flex max-md:flex-col justify-evenly items-center">
            <h1 className="text-4xl font-bold text-blue-500 text-center">Total Number Of Medicine : {medicines.length} </h1>
            <button
                className="btn btn-outline btn-info text-base"
                onClick={() => document.getElementById("my_modal_add_medicine").showModal()}
              >
                Add Medicine
              </button>
            </div>

            <div className="overflow-x-auto my-10">
                    <table className="table">
                      {/* head */}
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Medicine Image</th>
                          <th>Medicine Name</th>
                          <th>Generic Name</th>
                          <th>Company</th>
                          <th>Category</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {medicines.map((medicine, i) => {
                          return (
                            <tr key={medicine._id}>
                              <th>{i + 1}</th>
                              <td>
                                <div className="avatar">
                                  <div className="mask mask-squircle h-12 w-12">
                                    <img
                                      className="w-full"
                                      src={medicine.medicineImage}
                                      alt={medicine.medicineName}
                                    />
                                  </div>
                                </div>
                              </td>
                              <td>{medicine.medicineName}</td>
                              <td>
                                {medicine.genericName}
                              </td>
                              <td>
                                {medicine.company}
                              </td>
                              <td>
                                {medicine.category}
                              </td>
                              <td>
                                $ {medicine.price}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

        {/* Add Medicine Modal */}
        <dialog id="my_modal_add_medicine" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="ring ring-red-500 text-red-500 btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>

                <section className="py-6 max-w-2xl mx-auto">
                  <h2 className="text-2xl font-bold text-center mb-4">
                    Add New Medicine
                  </h2>
                <form onSubmit={handleAddMedicine} className="max-w-lg mx-auto p-6 rounded-2xl">
                  {/* Medicine Name */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="itemName">
                      Medicine Name<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      id="medicineName"
                      name="medicineName"
                      placeholder="Medicine Name"
                      className="w-full py-2 focus:outline-none  border border-gray-300 rounded-md px-3"
                    />
                  </div>

                  {/* Generic Name */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="itemGenericName">
                      Generic Name<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="genericName"
                      required
                      name="genericName"
                      placeholder="Generic name"
                      className="w-full py-2 focus:outline-none  border border-gray-300 rounded-md px-3"
                    />
                  </div>

                  {/* Short Description */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="shortDescription">
                      Short Description<span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="description"
                      required
                      name="description"
                      placeholder="Short Description"
                      className="w-full py-2 focus:outline-none  border border-gray-300 rounded-md px-3"
                    ></textarea>
                  </div>

                  {/* Image Upload */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="imageUpload">
                      Image Upload<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="file"
                      required
                      id="medicineImage"
                      name="medicineImage"
                      className="w-full file-input file-input-bordered focus:outline-none"
                    />
                  </div>

                  {/* Category Dropdown */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="category">
                      Category<span className="text-red-600">*</span>
                    </label>
                    <select
                      id="category"
                      required
                      name="category"
                      defaultValue=""
                      className="w-full py-2 focus:outline-none  border border-gray-300 rounded-md px-3"
                    >
                      <option disabled value="">Select a category</option>
                      <option value="category1">Category 1</option>
                      <option value="category2">Category 2</option>
                      <option value="category3">Category 3</option>
                    </select>
                  </div>

                  {/* Company Dropdown */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="company">
                      Company<span className="text-red-600">*</span>
                    </label>
                    <select
                      id="company"
                      required
                      name="company"
                      defaultValue=""
                      className="w-full py-2 focus:outline-none  border border-gray-300 rounded-md px-3"
                    >
                      <option disabled value="">Select a company</option>
                      <option value="company1">Company 1</option>
                      <option value="company2">Company 2</option>
                      <option value="company3">Company 3</option>
                    </select>
                  </div>

                  {/* Mass Unit */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="massUnit">
                      Item Mass Unit (Mg or ML)<span className="text-red-600">*</span>
                    </label>
                    <select
                      id="unit"
                      required
                      defaultValue=""
                      name="unit"
                      className="w-full py-2 focus:outline-none  border border-gray-300 rounded-md px-3"
                    >
                      <option disabled value="">Select unit</option>
                      <option value="mg">Mg</option>
                      <option value="ml">ML</option>
                    </select>
                  </div>

                  {/* Per Unit Price */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="unitPrice">
                      Per Unit Price<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      id="price"
                      required
                      name="price"
                      placeholder="Allow Only Positive Value"
                      className="w-full py-2 focus:outline-none  border border-gray-300 rounded-md px-3"
                    />
                  </div>

                  {/* Discount Percentage */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="discount">
                      Discount Percentage
                    </label>
                    <input
                      type="number"
                      required
                      id="discount"
                      name="discount"
                      placeholder="Allow Only Positive Value"
                      defaultValue={0}
                      className="w-full py-2 focus:outline-none  border border-gray-300 rounded-md px-3"
                    />
                  </div>

                  {/* Submit Button */}
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
                    Update Category
                  </button>
                )}
                </form>
                </section>
              </div>
            </dialog>
        </section>
    );
};

export default ManageMedicine;