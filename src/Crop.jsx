import React, { use, useState } from "react";
import { useLoaderData } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthProvider";

const Crop = () => {
  let crop = useLoaderData();
  let { user } = use(AuthContext);

  let [data, setData] = useState([]);
  fetch("https://krishi-link-server.vercel.app/inter")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setData(data);
    });

  let myCrops = data.filter((item) => item.cropId === crop._id);

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
                <h2 className="text-5xl font-bold">
                  manage received interests{" "}
                </h2>

                {myCrops.map((app) => (
                  <div
                    key={app._id}
                    className="flex items-center bg-white shadow-sm p-4 rounded-lg border border-gray-100"
                  >
                    <div className="flex-grow">
                      <div className="text-sm text-gray-500 flex items-center space-x-3 mt-1">
                        <h3 className="text-md font-semibold text-gray-800">
                          Buyer Name=
                          {app.buyerName}
                        </h3>
                        <span className="flex items-center">
                          {" "}
                          <span className="ml-1">Quantity={app.quantity}</span>
                        </span>
                        <span className="flex items-center">
                          {" "}
                          <span className="ml-1">Message={app.message}</span>
                        </span>
                        <span className="ml-1 text-gray-400">
                          Status=
                          {app.status}
                        </span>
                      </div>
                    </div>
                    <div className="ml-auto flex-shrink-0">
                      <button
                        onClick={async () => {
                          const status = "Accepted";
                          const newInter = {
                            status,
                          };

                          let response = await fetch(
                            `https://krishi-link-server.vercel.app/inter/${app._id}`,
                            {
                              method: "PATCH",
                              headers: {
                                "content-type": "application/json",
                              },
                              body: JSON.stringify(newInter),
                            }
                          );
                          let data = await response.json();
                          if (data.modifiedCount) {
                            toast.success("Interest accepted successfully!");

                            window.location.reload();
                          }
                        }}
                        className="btn btn-sm btn-success bg-green-500 hover:bg-green-600 text-white border-none"
                      >
                        Accept
                      </button>
                      <button
                        onClick={async () => {
                          const status = "Rejected";
                          const newInter = {
                            status,
                          };

                          let response = await fetch(
                            `https://krishi-link-server.vercel.app/inter/${app._id}`,
                            {
                              method: "PATCH",
                              headers: {
                                "content-type": "application/json",
                              },
                              body: JSON.stringify(newInter),
                            }
                          );
                          let data = await response.json();
                          if (data.modifiedCount) {
                            toast.success("Interest rejected successfully!");
                            window.location.reload();
                          }
                        }}
                        className="btn btn-sm btn-success bg-red-500 hover:bg-red-600 text-white border-none"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <form
                  key={crop._id}
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const buyerName = user.displayName;
                    const buyerEmail = user.email;
                    const quantity = e.target.quantity.value;
                    const message = e.target.message.value;
                    const status = "pending";
                    const ownerName = crop.nam;
                    const ownerEmail = crop.email;
                    const cropId = crop._id;
                    const cropName = crop.name;
                    const newInterest = {
                      buyerName,
                      buyerEmail,
                      quantity,
                      message,
                      status,
                      ownerName,
                      ownerEmail,
                      cropId,
                      cropName,
                    };

                    fetch("https://krishi-link-server.vercel.app/inter/", {
                      method: "POST",
                      headers: {
                        "content-type": "application/json",
                      },
                      body: JSON.stringify(newInterest),
                    })
                      .then((res) => res.json())
                      .then((data) => {
                        if (data.insertedId) {
                          toast("interest added successfully");
                          e.target.reset();
                        }
                      });
                  }}
                >
                  <div className="hero bg-base-200 ">
                    <div className="hero-content flex-col">
                      <div className="text-center">
                        <h1 className="text-5xl font-bold">
                          send interest request{" "}
                        </h1>
                      </div>
                      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                          <fieldset className="fieldset">
                            <label className="label">Quantity</label>
                            <input
                              name="quantity"
                              type="number"
                              className="input"
                            />
                            <label className="label">Message</label>
                            <input
                              name="message"
                              type="text"
                              className="input"
                            />
                            <p>Total</p>
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
