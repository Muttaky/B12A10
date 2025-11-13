import React, { use, useState } from "react";
import { useLoaderData } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthProvider";

const MyInterests = () => {
  let { user } = use(AuthContext);
  // 'crops' is actually the array of all interests fetched by the loader.
  let allInterests = useLoaderData();

  // 1. State for controlling the sorting order
  // Defaulting to sorting by Status
  const [sortBy, setSortBy] = useState("status");

  // Filter interests to show only the current user's interests
  let myCrops = allInterests.filter((item) => item.buyerEmail === user.email);

  // 2. Sorting Logic
  const sortedInterests = [...myCrops].sort((a, b) => {
    if (sortBy === "status") {
      // Define a custom order: Pending > Accepted > Rejected (or any order you prefer)
      const statusOrder = { pending: 1, accepted: 2, rejected: 3 };
      const statusA = a.status.toLowerCase();
      const statusB = b.status.toLowerCase();

      // Fallback for missing/unknown statuses
      const orderA = statusOrder[statusA] || 99;
      const orderB = statusOrder[statusB] || 99;

      return orderA - orderB;
    }

    // Add sorting by crop name as a secondary option
    if (sortBy === "name") {
      return a.cropName.localeCompare(b.cropName);
    }

    // Default: no change
    return 0;
  });

  // --- Sort Status Order Explanation ---
  // The sorting logic above prioritizes 'pending' status.
  // The `statusOrder` map assigns a lower number (higher priority) to the statuses you want to appear first.

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">My Interests</h1>

      <hr className="my-4" />

      {/* Sorting Controls */}
      <div className="mb-6 flex items-center space-x-4">
        <label className="text-lg font-medium text-gray-700">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="status">Status (Pending First)</option>
          <option value="name">Crop Name (A-Z)</option>
        </select>
      </div>

      <hr className="my-4" />

      {/* Displaying Sorted Interests */}
      {sortedInterests.length === 0 ? (
        <div className="alert alert-info">
          You haven't sent any interest requests yet.
        </div>
      ) : (
        <div className="space-y-3">
          {sortedInterests.map((app) => (
            <div
              key={app._id}
              className="flex flex-col md:flex-row items-start md:items-center bg-white shadow-lg p-4 rounded-lg border border-gray-200"
            >
              {/* Main Details */}
              <div className="flex-grow w-full">
                <h3 className="text-xl font-bold text-green-700 mb-1">
                  {app.cropName}
                </h3>

                <div className="text-sm text-gray-600 flex flex-wrap gap-x-6 gap-y-2 mt-2">
                  <span className="flex items-center">
                    👨‍🌾 Owner:{" "}
                    <strong className="ml-1">
                      {app.ownerName || app.ownerEmail}
                    </strong>
                  </span>
                  <span className="flex items-center">
                    📦 Quantity:{" "}
                    <strong className="ml-1">{app.quantity}</strong>
                  </span>
                  <span className="flex items-center">
                    💬 Message:{" "}
                    <strong className="ml-1 italic">{app.message}</strong>
                  </span>
                </div>
              </div>

              {/* Status Badge (Right aligned) */}
              <div className="mt-3 md:mt-0 md:ml-4 flex-shrink-0">
                <span
                  className={`badge p-3 text-white font-semibold ${
                    app.status.toLowerCase() === "pending"
                      ? "badge-warning bg-yellow-500"
                      : app.status.toLowerCase() === "accepted"
                      ? "badge-success bg-green-500"
                      : "badge-error bg-red-500"
                  }`}
                >
                  Status: {app.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyInterests;
