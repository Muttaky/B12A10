import React, { use } from "react";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Profile = () => {
  let navigate = useNavigate();
  let { user, updateUser, setUser } = use(AuthContext);
  let update = (e) => {
    e.preventDefault();
    let form = e.target;
    let name = form.name.value;
    let photo = form.photo.value;
    updateUser({ displayName: name, photoURL: photo })
      .then(() => {
        setUser({ ...user, displayName: name, photoURL: photo });
        navigate("/profile");
      })
      .catch((error) => {
        toast.warning(error.message);
        setUser(user);
      });
  };
  return (
    <div>
      <div className="hero bg-base-200">
        <div className="hero-content flex-col text-center">
          <img src={user.photoURL} className="w-fit rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">{user.displayName}</h1>
            <p className="py-6">{user.email}</p>
            <div>
              {" "}
              <form onSubmit={update}>
                <div className="hero bg-base-200">
                  <div className="hero-content flex-col ">
                    <div className="text-center lg:text-left">
                      <h1 className="text-5xl font-bold">Update Profile</h1>
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
                          />
                          <label className="label">Photo</label>
                          <input
                            type="text"
                            className="input"
                            placeholder="Photo"
                            name="photo"
                          />

                          <button
                            type="Submit"
                            className="btn btn-neutral mt-4"
                          >
                            Update
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
    </div>
  );
};

export default Profile;
