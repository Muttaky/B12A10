import React, { use } from "react";
import { useLoaderData } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthProvider";

const MyInterests = () => {
  let { user } = use(AuthContext);
  let crops = useLoaderData();
  let myCrops = crops.filter((item) => item.buyerEmail === user.email);
  return (
    <div>
      <h1>My Interests</h1>
      {myCrops.map((app) => (
        <div
          key={app._id}
          className="flex items-center bg-white shadow-sm p-4 rounded-lg border border-gray-100"
        >
          <div className="flex-grow">
            <div className="text-sm text-gray-500 flex items-center space-x-3 mt-1">
              <span>
                {" "}
                <h3 className="text-md font-semibold text-gray-800">
                  Name
                  {app.cropName}
                </h3>
              </span>
              <span>
                {" "}
                <h3 className="text-md font-semibold text-gray-800">
                  ownerName
                  {app.ownerName}
                </h3>
              </span>
              <span className="flex items-center">
                ⬇️ <span className="ml-1">{app.quantity}</span>
              </span>
              <span className="flex items-center">
                ⭐️ <span className="ml-1">{app.message}</span>
              </span>
              <span className="ml-1 text-gray-400">{app.status}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyInterests;
