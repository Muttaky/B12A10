import React, { use } from "react";
import { useLoaderData } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthProvider";

const Crop = () => {
  let crop = useLoaderData();
  let { user } = use(AuthContext);
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen text-center">
        <div className="hero-content flex-col">
          <img src={crop.image} className="w-fit rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">{crop.name}</h1>
            <h3 className="badge badge-secondary">Price={crop.price}</h3>
            <h3 className="badge badge-info">Stock={crop.quantity}</h3>
            <p className="py-6 text-xl">{crop.description}</p>

            {user.email === crop.email ? (
              <div>
                <h2>manage received interests </h2>
                Received Interests Section (for owner) show this section if the
                logged in user is the owner of that crop Tablet of all interest
                requests for that crops: Buyer Name Quantity Message Status
                (pending / accepted / rejected) Action buttons: Accept / Reject
                If no interest yet show relevant messages.
              </div>
            ) : (
              <div>
                Quantity (number input) Message ( text input) Total Price
                (auto-calculated = quantity × price per unit)
                <form
                  onSubmit={(e) => {
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

                    fetch(
                      `https://krishi-link-server.vercel.app/crops/${crop._id}`,
                      {
                        method: "PATCH",
                        headers: {
                          "content-type": "application/json",
                        },
                        body: JSON.stringify(newCrop),
                      }
                    )
                      .then((res) => res.json())
                      .then((data) => {
                        console.log("after post crop", data);
                        if (data.modifiedCount) {
                          toast("crop added updated");
                          window.location.reload();
                        }
                      });
                  }}
                >
                  <div className="hero bg-base-200 ">
                    <div className="hero-content flex-col">
                      <div className="text-center">
                        <h1 className="text-5xl font-bold">
                          Send interest request
                        </h1>
                      </div>
                      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                          <fieldset className="fieldset">
                            <label className="label">Name</label>
                            <input
                              name="name"
                              type="text"
                              className="input"
                              defaultValue={crop.name}
                            />
                            <label className="label">Type</label>
                            <input
                              name="type"
                              type="text"
                              className="input"
                              defaultValue={crop.type}
                            />
                            <label className="label">Price</label>
                            <input
                              name="price"
                              type="text"
                              className="input"
                              defaultValue={crop.price}
                            />
                            <label className="label">Unit</label>
                            <input
                              name="unit"
                              type="text"
                              className="input"
                              defaultValue={crop.unit}
                            />
                            <label className="label">Quantity</label>
                            <input
                              name="quantity"
                              type="text"
                              className="input"
                              defaultValue={crop.quantity}
                            />
                            <label className="label">Description</label>
                            <input
                              name="description"
                              type="text"
                              className="input"
                              defaultValue={crop.description}
                            />
                            <label className="label">Location</label>
                            <input
                              name="location"
                              type="text"
                              className="input"
                              defaultValue={crop.location}
                            />
                            <label className="label">Image</label>
                            <input
                              name="image"
                              type="text"
                              className="input"
                              defaultValue={crop.image}
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crop;
