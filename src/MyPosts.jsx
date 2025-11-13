import React, { use } from "react";
import { useLoaderData } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthProvider";

const MyPosts = () => {
  let { user } = use(AuthContext);
  let crops = useLoaderData();
  let myCrops = crops.filter((item) => item.email === user.email); // Function to show the modal (for cleaner code)

  const showModal = (id) => {
    const modal = document.getElementById(id);
    if (modal) {
      modal.showModal();
    } else {
      console.error(`Modal with ID ${id} not found.`);
    }
  }; // Function to handle form submission for editing (kept logic same)

  const handleEdit = async (e, app) => {
    e.preventDefault();
    const name = e.target.name.value;
    const type = e.target.type.value;
    const price = e.target.price.value;
    const unit = e.target.unit.value;
    const quantity = e.target.quantity.value;
    const description = e.target.description.value;
    const location = e.target.location.value;
    const image = e.target.image.value;
    const newCrop = {
      name,
      type,
      price,
      unit,
      quantity,
      description,
      location,
      image,
    };

    try {
      let response = await fetch(
        `https://krishi-link-server.vercel.app/crops/${app._id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newCrop),
        }
      );
      let data = await response.json();
      if (data.modifiedCount) {
        toast.success("Crop updated successfully!");
        document.getElementById(`edit_modal_${app._id}`).close();
        window.location.reload();
      }
    } catch (error) {
      toast.error("Failed to update crop.");
      console.error(error);
    }
  }; // Function to handle deletion (kept logic same)

  const handleDelete = async (app) => {
    try {
      toast.success(`${app.name} is being deleted...`);
      let response = await fetch(
        `https://krishi-link-server.vercel.app/crops/${app._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (data.deletedCount === 1) {
        document.getElementById(`delete_modal_${app._id}`).close();
        window.location.reload();
      } else {
        toast.error("Deletion failed. Try again.");
      }
    } catch (error) {
      toast.error("An error occurred during deletion.");
      console.error(error);
    }
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
        📝 My Posted Crops ({myCrops.length})
      </h1>

      {myCrops.length === 0 ? (
        <div className="alert alert-info shadow-lg max-w-xl mx-auto">
          <span>You haven't posted any crops yet.</span>
        </div>
      ) : (
        <div className="space-y-4 max-w-5xl mx-auto">
          \
          {myCrops.map((app) => (
            <div
              key={app._id}
              className="flex flex-col md:flex-row items-center bg-white shadow-xl p-4 rounded-lg border border-gray-200 transition duration-300 hover:shadow-2xl"
            >
              <figure className="w-full md:w-32 h-32 bg-gray-200 rounded-lg mr-0 md:mr-6 mb-4 md:mb-0 flex-shrink-0 overflow-hidden">
                {app.image && (
                  <img
                    src={app.image}
                    alt={app.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </figure>
              <div className="flex-grow w-full md:w-auto text-center md:text-left">
                <h3 className="text-2xl font-bold text-green-700 mb-1">
                  {app.name}
                </h3>

                <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                  {app.description}
                </p>

                <div className="flex flex-col md:flex-row justify-center md:justify-start gap-x-4 gap-y-2 text-sm font-medium">
                  <span className="badge badge-success bg-green-100 text-green-700 p-3 **md:bg-transparent md:p-0**">
                    💰 Price: {app.price} TK / {app.unit}
                  </span>

                  <span className="badge badge-info bg-blue-100 text-blue-700 p-3 **md:bg-transparent md:p-0**">
                    📦 Stock: {app.quantity} {app.unit}
                  </span>

                  <span className="badge badge-warning bg-yellow-100 text-yellow-700 p-3 **md:bg-transparent md:p-0**">
                    🌱 Type: {app.type}
                  </span>

                  <span className="badge badge-neutral bg-gray-200 text-gray-700 p-3 **md:bg-transparent md:p-0**">
                    📍 {app.location}
                  </span>
                </div>
              </div>

              <div className="mt-4 md:mt-0 md:ml-6 flex-shrink-0 flex space-x-2 w-full md:w-auto justify-end">
                <button
                  className="btn btn-sm btn-outline btn-info border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                  onClick={() => showModal(`edit_modal_${app._id}`)}
                >
                  Edit
                </button>
                <dialog
                  id={`edit_modal_${app._id}`}
                  className="modal modal-bottom sm:modal-middle"
                >
                  <div className="modal-box">
                    <form onSubmit={(e) => handleEdit(e, app)}>
                      <div className="p-4 sm:p-0">
                        <h1 className="text-3xl font-bold mb-6 text-center">
                          Edit {app.name}
                        </h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <label className="form-control w-full">
                            <div className="label">
                              <span className="label-text font-semibold">
                                Name
                              </span>
                            </div>

                            <input
                              name="name"
                              type="text"
                              className="input input-bordered w-full"
                              defaultValue={app.name}
                              required
                            />
                          </label>
                          <label className="form-control w-full">
                            <div className="label">
                              <span className="label-text font-semibold">
                                Type
                              </span>
                            </div>
                            <input
                              name="type"
                              type="text"
                              className="input input-bordered w-full"
                              defaultValue={app.type}
                              required
                            />
                                                   
                          </label>
                                                   
                          <label className="form-control w-full">
                                                     
                            <div className="label">
                              <span className="label-text font-semibold">
                                Price (TK)
                              </span>
                            </div>
                                                       
                            <input
                              name="price"
                              type="number"
                              step="0.01"
                              className="input input-bordered w-full"
                              defaultValue={app.price}
                              required
                            />
                                                   
                          </label>
                                                 
                          <label className="form-control w-full">
                                                       
                            <div className="label">
                              <span className="label-text font-semibold">
                                Unit (e.g., kg)
                              </span>
                            </div>
                                                     
                            <input
                              name="unit"
                              type="text"
                              className="input input-bordered w-full"
                              defaultValue={app.unit}
                              required
                            />
                                                   
                          </label>
                                                               
                          <label className="form-control w-full">
                                                     
                            <div className="label">
                              <span className="label-text font-semibold">
                                Quantity
                              </span>
                            </div>
                            <input
                              name="quantity"
                              type="number"
                              className="input input-bordered w-full"
                              defaultValue={app.quantity}
                              required
                            />
                                                     
                          </label>
                                                   
                          <label className="form-control w-full">
                                                   
                            <div className="label">
                              <span className="label-text font-semibold">
                                Location
                              </span>
                            </div>
                                                     
                            <input
                              name="location"
                              type="text"
                              className="input input-bordered w-full"
                              defaultValue={app.location}
                              required
                            />
                                                   
                          </label>
                                                                       
                          <label className="form-control w-full sm:col-span-2">
                                                   
                            <div className="label">
                              <span className="label-text font-semibold">
                                Image URL
                              </span>
                            </div>
                                                   
                            <input
                              name="image"
                              type="text"
                              className="input input-bordered w-full"
                              defaultValue={app.image}
                            />
                                               
                          </label>
                                                                       
                          <label className="form-control w-full sm:col-span-2">
                                                     
                            <div className="label">
                              <span className="label-text font-semibold">
                                Description
                              </span>
                            </div>
                                                     
                            <textarea
                              name="description"
                              className="textarea textarea-bordered h-24"
                              defaultValue={app.description}
                              required
                            />
                                             
                          </label>
                                         
                        </div>
                                                                   
                        <button
                          type="submit"
                          className="btn btn-neutral mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white border-none"
                        >
                                                    Save Changes                
                               
                        </button>
                                       
                      </div>
                                   
                    </form>
                                                       
                    <div className="modal-action mt-4">
                                         
                      <form method="dialog">
                                         <button className="btn">Close</button> 
                                       
                      </form>
                                   
                    </div>
                             
                  </div>
                         
                </dialog>
                             
                <button
                  className="btn btn-sm btn-outline btn-error border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  onClick={() => showModal(`delete_modal_${app._id}`)}
                >
                                    Delete          
                </button>
                 
                <dialog
                  id={`delete_modal_${app._id}`}
                  className="modal modal-bottom sm:modal-middle"
                >
                             
                  <div className="modal-box text-center">
                                 
                    <h3 className="font-bold text-xl text-red-600">
                      Confirm Deletion
                    </h3>
                                   
                    <p className="py-4">
                                            Are you sure you want to permanently
                      delete **{app.name}**?                
                    </p>
                         
                    <div className="flex justify-center space-x-4">
                                   
                      <button
                        onClick={() => handleDelete(app)}
                        className="btn btn-sm btn-error bg-red-500 hover:bg-red-600 text-white border-none"
                      >
                                                Yes, Delete                    
                      </button>
                               
                      <form method="dialog">
                                     
                        <button className="btn btn-sm btn-ghost">Cancel</button>
                                     
                      </form>
                               
                    </div>
                           
                  </div>
                   
                </dialog>
                   
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPosts;
