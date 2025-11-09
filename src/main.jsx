import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from "./Root";
import Home from "./Home";
import Crops from "./Crops";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import MyPosts from "./MyPosts";
import MyInterests from "./MyInterests";
import AddCrops from "./AddCrops";
import Crop from "./Crop";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/crops",
        Component: Crops,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/profile",
        Component: Profile,
      },
      {
        path: "/add",
        Component: AddCrops,
      },
      {
        path: "/posts",
        Component: MyPosts,
      },
      {
        path: "/interests",
        Component: MyInterests,
      },
      {
        path: "/crops/:Id",
        Component: Crop,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
