import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import { toast } from "react-toastify";

const MyPosts = () => {
  let navigate = useNavigate();
  let crops = useLoaderData();
  return (
    <div>
      <h1>My Posts</h1>
      {crops.map((app) => (
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
            <h3 className="text-md font-semibold text-gray-800">{app.title}</h3>
            <div className="text-sm text-gray-500 flex items-center space-x-3 mt-1">
              <span className="flex items-center">
                ⬇️{" "}
                <span className="ml-1">
                  {Math.round(app.downloads / 100000) / 10}M
                </span>
              </span>
              <span className="flex items-center">
                ⭐️ <span className="ml-1">{app.ratingAvg}</span>
              </span>
              <span className="ml-1 text-gray-400">{app.size} MB</span>
            </div>
          </div>
          <div className="ml-auto flex-shrink-0">
            <button
              onClick={() => {
                navigate(`/crops/${app._id}`);
              }}
              className="btn btn-sm btn-success bg-green-500 hover:bg-green-600 text-white border-none mx-3"
            >
              Edit
            </button>
            <button
              onClick={() => {
                toast.success(`${app.name} has been deleted.`);
                fetch(`http://localhost:3000/crops/${app._id}`, {
                  method: "DELETE",
                })
                  .then((res) => res.json())
                  .then((data) => console.log("after delete", data));
                window.location.reload();
              }}
              className="btn btn-sm btn-success bg-green-500 hover:bg-green-600 text-white border-none"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyPosts;
