import React, { use } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthProvider";

const AddCrops = () => {
  let { user } = use(AuthContext);
  const handleAddCrops = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const type = e.target.type.value;
    const price = e.target.price.value;
    const unit = e.target.unit.value;
    const quantity = e.target.quantity.value;
    const description = e.target.description.value;
    const location = e.target.location.value;
    const image = e.target.image.value;
    const email = user.email;
    const nam = user.displayName;
    const newCrop = {
      name,
      type,
      price,
      unit,
      quantity,
      description,
      location,
      image,
      email,
      nam,
    };

    fetch("https://krishi-link-server.vercel.app/crops/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newCrop),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after post crop", data);
        if (data.insertedId) {
          toast("crop added successfully");
          e.target.reset();
        }
      });
  };
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Add Crops!</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleAddCrops}>
                <fieldset className="fieldset">
                  <label className="label">Name</label>
                  <input
                    name="name"
                    type="text"
                    className="input"
                    placeholder="Name"
                  />
                  <label className="label">Type</label>
                  <input
                    name="type"
                    type="text"
                    className="input"
                    placeholder="type"
                  />
                  <label className="label">Price</label>
                  <input
                    name="price"
                    type="text"
                    className="input"
                    placeholder="Price"
                  />
                  <label className="label">Unit</label>
                  <input
                    name="unit"
                    type="text"
                    className="input"
                    placeholder="Unit"
                  />
                  <label className="label">Quantity</label>
                  <input
                    name="quantity"
                    type="text"
                    className="input"
                    placeholder="Quantity"
                  />
                  <label className="label">Description</label>
                  <input
                    name="description"
                    type="text"
                    className="input"
                    placeholder="Description"
                  />
                  <label className="label">Location</label>
                  <input
                    name="location"
                    type="text"
                    className="input"
                    placeholder="location"
                  />
                  <label className="label">Image</label>
                  <input
                    name="image"
                    type="text"
                    className="input"
                    placeholder="Image URL"
                  />
                  <button className="btn btn-neutral mt-4">Submit</button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCrops;
