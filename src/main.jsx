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
import AuthProvider from "./AuthProvider";
import Private from "./Private";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        loader: () => fetch("http://localhost:3000/crops"),
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
        element: (
          <Private>
            <Profile></Profile>
          </Private>
        ),
      },
      {
        path: "/add",
        element: (
          <Private>
            <AddCrops></AddCrops>
          </Private>
        ),
      },
      {
        path: "/posts",
        element: (
          <Private>
            <MyPosts></MyPosts>
          </Private>
        ),
      },
      {
        path: "/interests",
        element: (
          <Private>
            <MyInterests></MyInterests>
          </Private>
        ),
      },
      {
        path: "/crops/:Id",
        element: (
          <Private>
            <Crop></Crop>
          </Private>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
