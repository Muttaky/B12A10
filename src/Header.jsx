import React, { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "./AuthProvider";
import { toast } from "react-toastify";

const Header = () => {
  let { user, logOut } = use(AuthContext);
  let handleLogOut = () => {
    logOut()
      .then(() => {
        toast("logged Out successfully");
      })
      .catch((error) => {
        toast.warning(error.message);
      });
  };
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/crops">All Crops</NavLink>
              </li>
              {user ? (
                <div>
                  <li>
                    <NavLink to="/profile">Profile</NavLink>
                  </li>
                  <li>
                    <NavLink to="/add">Add Crops</NavLink>
                  </li>
                  <li>
                    <NavLink to="/posts">My Posts</NavLink>
                  </li>
                  <li>
                    <NavLink to="/interests">My Interests</NavLink>
                  </li>
                </div>
              ) : (
                <div></div>
              )}
            </ul>
          </div>
          <Link to={"/"} className=" btn btn-ghost text-xl py-8">
            <img className="w-12" src="/logo.jpg" alt="" /> krishiLink
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/crops">All Crops</NavLink>
            </li>
            {user ? (
              <div className=" navbar-center hidden lg:flex">
                <li>
                  <NavLink to="/profile">Profile</NavLink>
                </li>
                <li>
                  <NavLink to="/add">Add Crops</NavLink>
                </li>
                <li>
                  <NavLink to="/posts">My Posts</NavLink>
                </li>
                <li>
                  <NavLink to="/interests">My Interests</NavLink>
                </li>
              </div>
            ) : (
              <div></div>
            )}
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div>
              <Link to="/login" className="btn" onClick={handleLogOut}>
                Logout
              </Link>
            </div>
          ) : (
            <div>
              <button className="btn">
                <NavLink to="/login">Login</NavLink>
              </button>
              <button className="btn">
                <NavLink to="/register">Register</NavLink>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
