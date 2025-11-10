import React, { use, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

const validatePassword = (pwd) => {
  // Regex: must have at least one lowercase, one uppercase, and be at least 6 characters long
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  return passwordRegex.test(pwd);
};
const Register = () => {
  let navigate = useNavigate();
  let { createUser, setUser, updateUser, popIn } = use(AuthContext);
  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);
  // Toggle function to switch password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  let handlePop = (e) => {
    e.preventDefault();
    popIn()
      .then((result) => {
        setUser(result.user);
        navigate("/");
      })
      .catch((error) => {
        toast.warning(error.message);
      });
  };
  let handleRegister = (e) => {
    e.preventDefault();
    let form = e.target;
    let name = form.name.value;
    let photo = form.photo.value;
    let email = form.email.value;
    let password = form.password.value;

    if (validatePassword(password)) {
      // Password is valid
      createUser(email, password)
        .then((result) => {
          let user = result.user;
          updateUser({ displayName: name, photoURL: photo })
            .then(() => {
              setUser({ ...user, displayName: name, photoURL: photo });
              navigate("/");
            })
            .catch((error) => {
              toast.warning(error.message);
              setUser(user);
            });
        })
        .catch((error) => {
          toast.warning(error.message);
        });
      createUser(email, password)
        .then((result) => {
          let user = result.user;
          updateUser({ displayName: name, photoURL: photo })
            .then(() => {
              setUser({ ...user, displayName: name, photoURL: photo });
              navigate("/");
            })
            .catch((error) => {
              toast.warning(error.message);
              setUser(user);
            });
        })
        .catch((error) => {
          toast.warning(error.message);
        });
    } else {
      // Password is not valid
      toast(
        "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
      );
    }
  };
  return (
    <div>
      <form onSubmit={handleRegister}>
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col">
            <div className="text-center">
              <h1 className="text-5xl font-bold">Register now!</h1>
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
                  <label className="label">Photo</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Photo"
                    name="photo"
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
                  <label className="label">Password</label>
                  {/* Password Input with Toggle */}
                  <div style={{ position: "relative" }}>
                    <input
                      // Change type based on showPassword state
                      type={showPassword ? "text" : "password"}
                      className="input w-full pr-10" // Added padding-right for the icon
                      placeholder="Password"
                      name="password"
                      required
                    />
                    {/* Toggle Button/Icon */}
                    <button
                      type="button" // Important: use type="button" to prevent form submission
                      onClick={togglePasswordVisibility}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "0",
                        // Adjust color and size as needed, using your component's styling
                        color: "gray",
                        fontSize: "1.2rem",
                      }}
                      // Add an appropriate ARIA label for accessibility
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {/* Change icon based on showPassword state */}
                      {showPassword ? "👁️" : "🔒"}
                      {/* You can use "👁️" for open eye, and "👁️‍🗨️" or a lock "🔒" for closed. 
                         For a more authentic UI, you'd use a library like 'react-icons' or SVG.
                         E.g., for Tailwind/DaisyUI, you might use an SVG icon for an open/closed eye. */}
                    </button>
                  </div>
                  {/* End of Password Input with Toggle */}

                  <button type="Submit" className="btn btn-neutral mt-4">
                    Signup
                  </button>
                  <button onClick={handlePop} className="btn btn-active mt-4">
                    Google Sign-In
                  </button>
                  <div>
                    <Link to="/login">Already Registered? go Login</Link>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
