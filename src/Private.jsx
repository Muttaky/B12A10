import React, { use } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router";

const Private = ({ children }) => {
  let { user, loading } = use(AuthContext);
  if (loading) {
    return (
      <div className="flex justify-center my-80">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login"></Navigate>;
};

export default Private;
