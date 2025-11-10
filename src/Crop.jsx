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
                    <h1 className="text-5xl font-bold">Book Consultation</h1>
                  </div>
                  <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                      <fieldset className="fieldset">
                        <label className="label">Name</label>
                        <input
                          type="text"
                          className="input"
                          placeholder="Name"
                          name="name"
                          required
                        />
                        <label className="label">Email</label>
                        <input
                          type="email"
                          className="input"
                          placeholder="Email"
                          name="email"
                          required
                        />

                        <button type="Submit" className="btn btn-neutral mt-4">
                          Book Now
                        </button>
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
