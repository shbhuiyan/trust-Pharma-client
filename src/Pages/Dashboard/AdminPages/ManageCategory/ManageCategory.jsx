import useAxiosSecure from "../../../../Components/Hooks/Axios/AxiosSecure/useAxiosSecure";
import { FaTrashAlt } from "react-icons/fa";
import useCategories from "../../../../Components/Hooks/Categories/useCategories";
import Swal from "sweetalert2";



const ManageCategory = () => {
    // const [categories , setCategories] = useState([])
    const {categories , refetch} = useCategories()
    const axiosSecure = useAxiosSecure()


    const handleDelete = id => {
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
                axiosSecure.delete(`/category/${id}`)
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


    return (
        <section className="my-10">
        <h1 className="text-4xl font-bold text-blue-500 text-center">Total Number Of Users : {categories.length}</h1>
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
                    U
                  </td>
                  <th>
                  <button onClick={() => handleDelete(category._id)} className="btn btn-ghost"><FaTrashAlt className="text-xl text-red-500" /></button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
        </section>
    );
};

export default ManageCategory;