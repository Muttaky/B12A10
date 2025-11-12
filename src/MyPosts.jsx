import React, { use } from "react";
import { useLoaderData } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthProvider";

const MyPosts = () => {
  let { user } = use(AuthContext);
  let crops = useLoaderData();
  let myCrops = crops.filter((item) => item.email === user.email);
  return (
    <div>
      <h1>My Posts</h1>
      {myCrops.map((app) => (
        <div
          key={app._id}
          className="flex items-center bg-white shadow-sm p-4 rounded-lg border border-gray-100"
        >
          <figure className="w-12 h-12 bg-gray-200 rounded-lg mr-4 flex-shrink-0">
            {app.image && (
              <img
                src={app.image}
                alt={app.name}
                className="w-full h-full object-cover rounded-lg"
              />
            )}
          </figure>
          <div className="flex-grow">
            <h3 className="text-md font-semibold text-gray-800">{app.name}</h3>
            <div className="text-sm text-gray-500 flex items-center space-x-3 mt-1">
              <span className="flex items-center">
                ⬇️ <span className="ml-1">{app.description}</span>
              </span>
              <span className="flex items-center">
                ⭐️ <span className="ml-1">{app.type}</span>
              </span>
              <span className="ml-1 text-gray-400">{app.price} TK</span>
            </div>
          </div>
          <div className="ml-auto flex-shrink-0">
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button
              className="btn"
              onClick={() =>
                document.getElementById(`my_modal_${app._id}`).showModal()
              }
            >
              Edit
            </button>
            <dialog
              key={`dialog-${app._id}`}
              id={`my_modal_${app._id}`}
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <form
                  key={app._id}
                  onSubmit={async (e) => {
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
                      document.getElementById(`my_modal_${app._id}`).close();
                      window.location.reload();
                    }
                  }}
                >
                  <div className="hero bg-base-200 ">
                    <div className="hero-content flex-col">
                      <div className="text-center">
                        <h1 className="text-5xl font-bold">Edit this crop</h1>
                      </div>
                      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                          <fieldset className="fieldset">
                            <label className="label">Name</label>
                            <input
                              name="name"
                              type="text"
                              className="input"
                              defaultValue={app.name}
                            />
                            <label className="label">Type</label>
                            <input
                              name="type"
                              type="text"
                              className="input"
                              defaultValue={app.type}
                            />
                            <label className="label">Price</label>
                            <input
                              name="price"
                              type="text"
                              className="input"
                              defaultValue={app.price}
                            />
                            <label className="label">Unit</label>
                            <input
                              name="unit"
                              type="text"
                              className="input"
                              defaultValue={app.unit}
                            />
                            <label className="label">Quantity</label>
                            <input
                              name="quantity"
                              type="text"
                              className="input"
                              defaultValue={app.quantity}
                            />
                            <label className="label">Description</label>
                            <input
                              name="description"
                              type="text"
                              className="input"
                              defaultValue={app.description}
                            />
                            <label className="label">Location</label>
                            <input
                              name="location"
                              type="text"
                              className="input"
                              defaultValue={app.location}
                            />
                            <label className="label">Image</label>
                            <input
                              name="image"
                              type="text"
                              className="input"
                              defaultValue={app.image}
                            />
                            <button className="btn btn-neutral mt-4">
                              Submit
                            </button>
                          </fieldset>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>

            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button
              className="btn"
              onClick={() =>
                document.getElementById(`my_modal${app._id}`).showModal()
              }
            >
              Delete
            </button>
            <dialog
              id={`my_modal${app._id}`}
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <h3 className="font-bold text-lg">Sure!</h3>
                <p className="py-4">
                  Press Delete key or click the button below to Delete
                  permanently
                </p>
                <button
                  onClick={async () => {
                    toast.success(`${app.name} has been deleted.`);
                    let response = await fetch(
                      `https://krishi-link-server.vercel.app/crops/${app._id}`,
                      {
                        method: "DELETE",
                      }
                    );
                    const data = await response.json();
                    if (data.deletedCount === 1) {
                      document.getElementById(`my_modal${app._id}`).close();
                      window.location.reload();
                    } else {
                      toast.error("Deletion failed. Try again.");
                    }
                  }}
                  className="btn btn-sm btn-success bg-green-500 hover:bg-green-600 text-white border-none"
                >
                  Delete
                </button>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyPosts;
