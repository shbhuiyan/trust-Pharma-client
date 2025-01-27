import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../Components/Hooks/Axios/AxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const [users , setUsers] = useState([])
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        axiosSecure.get('/users')
        .then(res => {
            setUsers(res.data)
        })
    },[axiosSecure])


    const handleRoleChange = (role , id) => {
        axiosSecure.patch(`/user/${id}` , {role})
        .then(res => {
            if(res.data.modifiedCount){
                Swal.fire({
                    title:"Successfully Updated",
                    text: "You Updated User Role",
                    icon: "success",
                    draggable: true
                  });
            }
        })
    }

    return (
        <section className="my-10">
        <h1 className="text-4xl font-bold text-blue-500 text-center">Total Number Of Users : {users.length}</h1>
        <div className="overflow-x-auto my-10">
        <table className="table">
          {/* head */}
          <thead className="text-base">
            <tr>
              <th>#</th>
              <th>User Image</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user , i) => {
              return (
                <tr key={user._id}>
                  <th>{i + 1}</th>
                  <td>
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={user.image}
                            alt={user.name}
                          />
                        </div>
                      </div>
                  </td>
                  <td>
                    {user.name}
                  </td>
                  <td>
                    {user.email}
                  </td>
                  <th>
                    <select onChange={(e) => handleRoleChange(e.target.value, user._id)} defaultValue={user?.role === "seller" && "seller" || user?.role === "customer" && "customer" || user?.role === "admin" && "admin"} className="focus:outline-none bg-blue-50 rounded-xl select w-full">
                      <option value="admin">Admin</option>
                      <option value="seller">Seller</option>
                      <option value="customer">Customer</option>
                    </select>
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

export default ManageUsers;