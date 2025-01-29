import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useAllMedicines from "../../../Components/Hooks/GetAllMedicines/useAllMedicines";
import useAxiosPublic from "../../../Components/Hooks/Axios/AxiosPublic/useAxiosPublic";
import { FaEye, FaShoppingCart } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../../Components/Hooks/AuthProviderHooks/useAuth";
import useAxiosSecure from "../../../Components/Hooks/Axios/AxiosSecure/useAxiosSecure";
import './categories.css'
import { useParams } from "react-router-dom";

const Categories = () => {
    const {user} = useAuth()
  const [categories, setCategories] = useState([]);
  const {category} = useParams()
  
  useEffect(() => {
    if (categories.length > 0) {
      const index = categories.findIndex(cate => cate.categoryName === category);
      setTabIndex(index !== -1 ? index : 0);
    }
  }, [categories, category]);

  const [tabIndex, setTabIndex] = useState(0);
  const { medicines , refetch } = useAllMedicines();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure()

  useEffect(() => {
    axiosPublic.get("/categories").then((res) => setCategories(res.data));
  }, [axiosPublic]);

  const filteredMedicine = medicines.filter(
    (medicine) => medicine.category === categories[tabIndex]?.categoryName
  );


  const handleAddToCart = (medicine) => {
        const cartItem = {
          cartItemName:medicine.medicineName,
          medicineId:medicine._id,
          cartItemImage:medicine.medicineImage,
          cartItemCompany:medicine.company,
          cartItemCategory:medicine.category,
          perUnitPrice:medicine.price,
          price:medicine.price,
          sellerEmail:medicine.sellerEmail,
          cartItemQuantity:1,
          userEmail: user?.email,
          userName: user?.displayName,
        }
        
        axiosSecure.post('/cart-items', cartItem)
        .then(res => {
          if(res.data.insertedId){
            Swal.fire({
                title: "Added To Cart!",
                text: "You added a item to cart",
                icon: "success",
                draggable: true,
              });
            refetch()
          }
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.response.data.message,
          });
        })
  
        const modal = document.getElementById(medicine._id)
        modal.close();
      }

  return (
    <section className="my-10 md:mb-40">
      <div className="max-w-3xl space-y-4 mb-10 mx-auto text-center">
        <h3 className="text-3xl font-bold text-blue-500 capitalize">
          🏷️ Explore Our Wide Range of Categories
        </h3>
        <p className="font-medium">
          Find the perfect products from our diverse selection of categories,
          curated to meet all your needs. Browse, choose, and shop with
          confidence!
        </p>
      </div>

      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList id="tablist" className="text-center font-bold border-b">
          {categories.map((category) => (
            <Tab key={category._id}>{category.categoryName}</Tab>
          ))}
        </TabList>

        {categories.map((category) => {
          return (
            <TabPanel key={category._id}>
              {
                <div className="overflow-x-auto my-10">
                  <table className="table">
                    {/* head */}
                    <thead className="text-base">
                      <tr>
                        <th>#</th>
                        <th>Medicine Image</th>
                        <th>Medicine Name</th>
                        <th>Generic Name</th>
                        <th>Price</th>
                        <th>View Details</th>
                        <th>Add to Cart</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMedicine.map((medicine, i) => {
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
                            <td>{medicine.genericName}</td>
                            <td>$ {medicine.price}</td>
                            <td>
                              <button
                                onClick={() =>
                                  document
                                    .getElementById(medicine._id)
                                    .showModal()
                                }
                                className="btn btn-outline btn-info mt-4"
                              >
                                <FaEye className="text-xl" />
                              </button>
                            </td>
                            <td>
                              <button onClick={()=>handleAddToCart(medicine)} className="btn btn-outline btn-neutral mt-4">
                                <FaShoppingCart className="text-xl" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              }
            </TabPanel>
          );
        })}
      </Tabs>


        {/* View Details Modal */}
        {
                    medicines.map(medicine => <dialog key={medicine._id} id={medicine._id} className="modal">
                        <div className="modal-box max-w-5xl mx-auto">
                          <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="ring ring-red-500 text-red-500 btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                              ✕
                            </button>
                          </form>
                
                          <section className="p-6">
                          <div className="card lg:card-side gap-4">
                            <figure className="lg:w-1/3">
                              <img
                                className="h-64"
                                src={medicine.medicineImage}
                                alt={medicine.medicineName} />
                            </figure>
                            <div className="card-body space-y-4 border-l-2 border-blue-500">
                              <h2 className="text-2xl font-semibold">{medicine.medicineName}</h2>
                              <p className="text-lg font-medium">{medicine.description}</p>
                              <div className="card-actions grid gap-4 grid-cols-2 items-center py-3 border-y-2 border-dashed">
                          <p>Generic: <span className="font-semibold">{medicine.genericName}</span></p>
                          <p>Discount: <span className="font-semibold">{medicine.discount}%</span></p>
                          <p>Category: <span className="font-semibold">{medicine.category}</span></p>
                          <p>Price: $<span className="font-semibold">{medicine.price}</span></p>
                          <p>Company: <span className="font-semibold">{medicine.company}</span></p>
                          <p>Unit: <span className="font-semibold">{medicine.unit}</span></p>
                        </div>
                              <div className="card-actions justify-between">
                                <button onClick={()=>handleAddToCart(medicine)} className="btn btn-outline btn-neutral">Add to Cart <FaShoppingCart className="text-xl"/></button>
                                <button onClick={()=>document.getElementById(medicine._id).close()} className="btn btn-outline btn-error">Cancel</button>
                              </div>
                            </div>
                          </div>
                          </section>
                        </div>
                      </dialog> )
                }
    </section>
  );
};

export default Categories;
