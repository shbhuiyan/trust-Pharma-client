import useAxiosSecure from "../../../../Components/Hooks/Axios/AxiosSecure/useAxiosSecure";
import { FaTrashAlt } from "react-icons/fa";
import useCategories from "../../../../Components/Hooks/Categories/useCategories";
import Swal from "sweetalert2";
import { GrUpdate } from "react-icons/gr";
import axios from "axios";
import { useState } from "react";



const ManageCategory = () => {
    const {categories , refetch} = useCategories()
    const [loading , setLoading] = useState(false)
    const axiosSecure = useAxiosSecure()
    const [category , setCategory] = useState({})

    const imgBBApiKey = import.meta.env.VITE_ImgBB_API_KEY

    const categorySubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        const form = new FormData(e.target)
        const imageFile = form.get("image");
        const categoryName = form.get("categoryName")
        const img = {image:imageFile}
        const res = await axios.post(`https://api.imgbb.com/1/upload?key=${imgBBApiKey}`, img , {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        const categoryImage = res.data.data.display_url
        const newCategory = {categoryName , categoryImage}

        axiosSecure.post('/categories' , newCategory)
        .then(res => {
            if(res.data.insertedId){
                Swal.fire({
                    title: "Added!",
                    text: "Successfully Add Your Category",
                    icon: "success",
                    draggable: true
                  });
                e.target.reset()
                refetch()
            }
        })
    // after submitting modal close
    const modal = document.getElementById("my_modal_add");
    modal.close();
    setLoading(false)
    }

    const handleDeleteCategory = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this Category!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/category-delete/${id}`)
                .then(res => {
                    if(res.data.deletedCount){
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your category has been deleted.",
                            icon: "success"
                          });
                        refetch()
                    }
                })
            }
          });
      }

    const updateModalOpen = (id) => {
        document.getElementById("my_modal_update").showModal()
        axiosSecure.get(`/category/${id}`)
        .then(res => {
            setCategory(res.data)
        })
    }

    const handleCategoryUpdate = async(e) => {
        e.preventDefault()
        setLoading(true)
        const form = new FormData(e.target)
        
        const imageFile = form.get("image");
        const categoryName = form.get("categoryName")
        const img = {image:imageFile}
        const res = await axios.post(`https://api.imgbb.com/1/upload?key=${imgBBApiKey}`, img , {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        const categoryImage = res.data.data.display_url

        const updateCategory = {categoryName , categoryImage}
        axiosSecure.put(`/category-update/${category._id}` , updateCategory )
        .then(res => {
            if(res.data.modifiedCount){
                Swal.fire({
                    title: "Successfully Updated!",
                    text:"You Updated Category Item",
                    icon: "success",
                    draggable: true
                  });
                e.target.reset()
                refetch()
            }
        })

        // after submitting modal close
    const modal = document.getElementById("my_modal_update");
    modal.close();
    setLoading(false)
    }


    return (
        <section className="my-10">
        <div className="flex max-md:flex-col justify-evenly items-center">
        <h1 className="text-4xl font-bold text-blue-500 text-center">Total Number Of Users : {categories.length}</h1>
        <button
            className="btn btn-outline btn-info text-base"
            onClick={() => document.getElementById("my_modal_add").showModal()}
          >
            Add Category
          </button>
        </div>
        <div className="overflow-x-auto my-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Category Image</th>
              <th>Category Name</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category , i) => {
              return (
                <tr key={category._id}>
                  <th>{i + 1}</th>
                  <td>
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                          className="w-full"
                            src={category.categoryImage}
                            alt={category.categoryName}
                          />
                        </div>
                      </div>
                  </td>
                  <td>
                    {category.categoryName}
                  </td>
                  <td>
                  <button onClick={() => updateModalOpen(category._id)} className="btn btn-ghost"><GrUpdate className="text-xl text-blue-500" /></button>
                  </td>
                  <td>
                  <button onClick={() => handleDeleteCategory(category._id)} className="btn btn-ghost"><FaTrashAlt className="text-xl text-red-500" /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>

        {/* Add Category modal */}
            <dialog id="my_modal_add" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="ring ring-red-500 text-red-500 btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>

                {/* Add Category */}
                <section className="py-6 max-w-2xl mx-auto">
                  <h2 className="text-2xl font-bold text-center mb-4">
                    Add a Category
                  </h2>
                  <form onSubmit={categorySubmit} className="space-y-4">
                    <div>
                      <label
                        className="block font-semibold mb-2"
                      >
                        Category Name <span className="text-red-600">*</span>
                      </label>
                      <input
                          name="categoryName"
                          required
                          type="text"
                          placeholder="Category Name"
                          className="w-full py-2 focus:outline-none  border border-gray-300 rounded-md px-3"
                        />
                    </div>
                    <div>
                      <label
                        className="block font-semibold mb-2"
                      >
                        Category Image{" "}
                        <span className="text-red-600">*</span>
                        </label>
                        <input
                        required
                          name="image"
                          type="file"
                          className="w-full file-input file-input-bordered focus:outline-none"
                        />
                    </div>
                    <div className="text-center">
                      {
                        loading ? <button
                        disabled
                        className="px-6 py-2 w-full bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                      >
                        <span className="loading loading-spinner loading-sm"></span>
                      </button> : <button
                        type="submit"
                        className="px-6 py-2 w-full bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                      >
                        Add Category
                      </button>
                      }
                    </div>
                  </form>
                </section>
              </div>
            </dialog>

        {/* Update Category modal */}
            <dialog id="my_modal_update" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="ring ring-red-500 text-red-500 btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>

                {/* Update Category */}
                <section className="py-6 max-w-2xl mx-auto">
                  <h2 className="text-2xl font-bold text-center mb-4">
                    Update <span className="text-blue-500">{category?.categoryName}</span> Category
                  </h2>
                  <form onSubmit={handleCategoryUpdate} className="space-y-4">
                    <div>
                      <label
                        className="block font-semibold mb-2"
                      >
                        Category Name <span className="text-red-600">*</span>
                      </label>
                      <input
                          type="text"
                          defaultValue={category?.categoryName}
                          name="categoryName"
                          placeholder="Category Name"
                          className="w-full py-2 focus:outline-none  border border-gray-300 rounded-md px-3"
                        />
                    </div>
                    <div>
                      <label
                        className="block font-semibold mb-2"
                      >
                        Category Image{" "}
                        <span className="text-red-600">*</span>
                        </label>
                        <input
                          required
                          name="image"
                          type="file"
                          className="w-full file-input file-input-bordered focus:outline-none"
                        />
                    </div>
                    <div className="text-center">
                    {
                        loading ? <button
                        disabled
                        className="px-6 py-2 w-full bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                      >
                        <span className="loading loading-spinner loading-sm"></span>
                      </button> : <button
                        type="submit"
                        className="px-6 py-2 w-full bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                      >
                        Update Category
                      </button>
                      }
                    </div>
                  </form>
                </section>
              </div>
            </dialog>


        </section>
    );
};

export default ManageCategory;