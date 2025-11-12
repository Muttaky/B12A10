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
        loader: () => fetch("https://krishi-link-server.vercel.app/crops/"),
        Component: Home,
      },
      {
        path: "/crops",
        loader: () => fetch("https://krishi-link-server.vercel.app/crops/"),
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
        loader: () => fetch("https://krishi-link-server.vercel.app/crops/"),
        element: (
          <Private>
            <MyPosts></MyPosts>
          </Private>
        ),
      },
      {
        path: "/interests",
        loader: () => fetch("https://krishi-link-server.vercel.app/inter/"),
        element: (
          <Private>
            <MyInterests></MyInterests>
          </Private>
        ),
      },
      {
        path: "/crops/:id",
        loader: async ({ params }) =>
          fetch(`https://krishi-link-server.vercel.app/crops/${params.id}`),
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
