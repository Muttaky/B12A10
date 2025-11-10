import React from "react";
import { useLoaderData } from "react-router";
import { toast } from "react-toastify";

const Crop = () => {
  let crop = useLoaderData();
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                (e.target.name.value = ""),
                  (e.target.email.value = ""),
                  toast("Submitted Succesfully");
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
                        <button className="btn btn-neutral mt-4">Submit</button>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crop;
