import React, { use, useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthProvider";

const Crop = () => {
  let crop = useLoaderData();
  let { user } = use(AuthContext);

  // 1. State for fetched interests
  const [interests, setInterests] = useState([]);

  // 2. State for the quantity input
  const [quantity, setQuantity] = useState(1);

  // 🛑 State to manage the crop's dynamic data (especially quantity/stock)
  const [currentCrop, setCurrentCrop] = useState(crop);

  // Use useEffect to run the fetch only once when the component loads
  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const response = await fetch(
          "https://krishi-link-server.vercel.app/inter"
        );
        const data = await response.json();
        setInterests(data);
      } catch (error) {
        console.error("Error fetching interests:", error);
      }
    };

    fetchInterests();
  }, []);

  // Filter the interests based on the current crop ID
  let myInterests = interests.filter((item) => item.cropId === currentCrop._id);

  // Calculate Total Price dynamically
  const totalPrice = (
    parseFloat(currentCrop.price || 0) * parseFloat(quantity || 0)
  ).toFixed(2);

  // Check if user is owner
  const isOwner = user?.email === currentCrop.email;

  // Check if buyer already sent interest (using myInterests)
  const userAlreadySentInterest = myInterests.some(
    (item) => item.buyerEmail === user?.email
  );

  // Interest Submission Handler (Kept mostly the same)
  const handleInterestSubmit = async (e) => {
    e.preventDefault();

    // ... (submission logic remains the same) ...

    const newInterest = {
      buyerName: user.displayName,
      buyerEmail: user.email,
      quantity: quantity,
      message: e.target.message.value,
      status: "pending",
      ownerEmail: currentCrop.email,
      cropId: currentCrop._id,
      cropName: currentCrop.name,
    };

    const response = await fetch(
      "https://krishi-link-server.vercel.app/inter/",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newInterest),
      }
    );

    const data = await response.json();

    if (data.insertedId) {
      toast.success("Interest added successfully!");
      e.target.reset();
      setQuantity(1);
      document.getElementById(`my_modal${currentCrop._id}`).close();

      // Update local state to hide the form immediately
      setInterests((prevInterests) => [
        ...prevInterests,
        { ...newInterest, _id: data.insertedId },
      ]);
    }
  };

  // 🛑 CORE CHANGE: Handler for updating status and reducing crop quantity
  const handleStatusUpdate = async (
    interestId,
    acceptedQuantity,
    newStatus
  ) => {
    // Ensure quantity is a number
    const quantityToSubtract = parseInt(acceptedQuantity);

    // 1. Check for sufficient stock before proceeding
    if (newStatus === "Accepted" && currentCrop.quantity < quantityToSubtract) {
      toast.error("Insufficient stock! Cannot accept this interest.");
      return;
    }

    try {
      // --- STEP 1: Update the Interest Status ---
      const interestResponse = await fetch(
        `https://krishi-link-server.vercel.app/inter/${interestId}`,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!interestResponse.ok) {
        throw new Error("Failed to update interest status.");
      }

      // --- STEP 2: If accepted, reduce the Crop Quantity ---
      if (newStatus === "Accepted") {
        const newStock = currentCrop.quantity - quantityToSubtract;
        const name = crop.name;
        const type = crop.type;
        const price = crop.price;
        const unit = crop.unit;
        const quantity = newStock;
        const description = crop.description;
        const location = crop.location;
        const image = crop.image;

        const cropUpdate = {
          quantity,
          name,
          type,
          price,
          unit,

          description,
          location,
          image,
        };

        const cropResponse = await fetch(
          `https://krishi-link-server.vercel.app/crops/${currentCrop._id}`,
          {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(cropUpdate),
          }
        );

        if (cropResponse.ok) {
          toast.success(
            "Interest accepted and crop quantity reduced successfully!"
          );

          // 🛑 Update local crop state to reflect new quantity in the UI
          setCurrentCrop((prevCrop) => ({
            ...prevCrop,
            quantity: newStock,
          }));
        } else {
          toast.error("Failed to update crop quantity on the server.");
          // NOTE: In a production app, you would attempt to revert the interest status here.
          return;
        }
      } else if (newStatus === "Rejected") {
        toast.success("Interest rejected successfully!");
      }

      // --- STEP 3: Update local state for immediate UI refresh (Interest status) ---
      setInterests((prevInterests) =>
        prevInterests.map((item) =>
          item._id === interestId ? { ...item, status: newStatus } : item
        )
      );
    } catch (error) {
      console.error("Error during transaction:", error);
      toast.error("An error occurred. Check console for details.");
    }
  };
  // ----------------------------------------------------------------------------------

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen text-center">
        <div className="hero-content flex-col">
          <img
            src={currentCrop.image}
            className="w-fit rounded-lg shadow-2xl"
            alt={currentCrop.name}
          />
          <div>
            <h1 className="text-5xl font-bold">{currentCrop.name}</h1>

            <p className="py-6 text-xl">{currentCrop.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-left">
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
                <p className="text-sm text-gray-500">💰 Price / Unit</p>
                <p className="text-xl font-bold text-gray-800">
                  {currentCrop.price} TK
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
                <p className="text-sm text-gray-500">📦 Available Stock</p>
                {currentCrop.quantity} {currentCrop.unit}
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500">
                <p className="text-sm text-gray-500">🌱 Crop Type</p>

                <p className="text-xl font-semibold text-gray-800">
                  {currentCrop.type}
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500">
                <p className="text-sm text-gray-500">📍 Location</p>

                <p className="text-xl font-semibold text-gray-800">
                  {currentCrop.location}
                </p>
              </div>
            </div>
            <hr className="my-6" />
            {isOwner ? (
              // Owner Section: Manage received interests
              <div>
                <h2 className="text-5xl font-bold mb-4">
                  Manage Received Interests ({myInterests.length})
                </h2>

                {/* ... (list logic remains the same) ... */}
                {myInterests.length === 0 ? (
                  <div className="alert alert-info">
                    No interests received yet for this crop.
                  </div>
                ) : (
                  myInterests.map((app) => (
                    <div
                      key={app._id}
                      className="flex items-center justify-between bg-white shadow-sm p-4 rounded-lg border border-gray-100 mb-2"
                    >
                      <div className="text-left flex-grow">
                        <h3 className="text-md font-semibold text-gray-800">
                          Buyer: {app.buyerName}
                        </h3>
                        <div className="text-sm text-gray-500 space-x-3 mt-1">
                          <span>Quantity: {app.quantity}</span>
                          <span>Message: {app.message}</span>
                          <span
                            className={`badge ${
                              app.status === "Accepted"
                                ? "badge-success"
                                : app.status === "Rejected"
                                ? "badge-error"
                                : "badge-warning"
                            }`}
                          >
                            Status: {app.status}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0 space-x-2">
                        {app.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleStatusUpdate(
                                  app._id,
                                  app.quantity,
                                  "Accepted"
                                )
                              }
                              // 🛑 Disable if required quantity exceeds current stock
                              disabled={currentCrop.quantity < app.quantity}
                              className={`btn btn-sm text-white border-none ${
                                currentCrop.quantity < app.quantity
                                  ? "btn-disabled opacity-50"
                                  : "btn-success bg-green-500 hover:bg-green-600"
                              }`}
                            >
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                handleStatusUpdate(app._id, 0, "Rejected")
                              }
                              className="btn btn-sm btn-error bg-red-500 hover:bg-red-600 text-white border-none"
                            >
                              Reject
                            </button>
                            {currentCrop.quantity < app.quantity && (
                              <span className="text-xs text-red-500 block mt-1 font-semibold">
                                Stock too low!
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              // Buyer Section: Interest Form (using currentCrop in modal ID)
              <div>
                {userAlreadySentInterest ? (
                  <div className="alert alert-success mt-8 flex justify-center text-lg font-semibold">
                    ✅ You've already sent an interest request for this crop!
                  </div>
                ) : (
                  <form key={crop._id} onSubmit={handleInterestSubmit}>
                    <div className="hero bg-base-200 ">
                      <div className="hero-content flex-col">
                        <div className="text-center">
                          <h1 className="text-5xl font-bold">
                            Send Interest Request
                          </h1>
                        </div>
                        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                          <div className="card-body">
                            <fieldset className="fieldset">
                              <label className="label">Quantity</label>
                              <input
                                name="quantity"
                                type="number"
                                // 🛑 Controlled Input
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="input input-bordered w-full mb-2"
                                min="1"
                                required
                              />
                              <label className="label">Message</label>
                              <input
                                name="message"
                                type="text"
                                className="input input-bordered w-full mb-4"
                                required
                              />
                              {/* 🛑 Dynamic Total Price */}
                              <p className="text-xl font-bold mb-4">
                                Total: {totalPrice} TK
                              </p>

                              <button
                                type="button"
                                className="btn btn-neutral mt-4 "
                                onClick={() =>
                                  document
                                    .getElementById(`my_modal${crop._id}`)
                                    .showModal()
                                }
                                // Disable if quantity is invalid
                                disabled={parseFloat(quantity) < 1}
                              >
                                Submit Interest
                              </button>
                              <dialog
                                id={`my_modal${crop._id}`}
                                className="modal modal-bottom sm:modal-middle"
                              >
                                <div className="modal-box">
                                  <h3 className="font-bold text-lg">
                                    Confirm Submission
                                  </h3>
                                  <p className="py-4">
                                    Are you sure you want to submit this
                                    interest request for **{totalPrice} TK**?
                                  </p>
                                  <div className="modal-action flex justify-center">
                                    <button
                                      type="submit"
                                      className="btn btn-primary mt-4"
                                      disabled={parseFloat(quantity) < 1}
                                    >
                                      Confirm Submission
                                    </button>
                                    <form method="dialog">
                                      <button className="btn btn-error mt-4">
                                        Cancel
                                      </button>
                                    </form>
                                  </div>
                                </div>
                              </dialog>
                            </fieldset>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crop;
