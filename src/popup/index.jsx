import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Popup from "./popup.jsx";
import AddNewProfile from "./add-new-profile.jsx";

const router = createBrowserRouter([
    {
        path: "/*",
        element: <Popup />,
    },

    {
        path: "/add-new-profile",
        element: <AddNewProfile />,
    },
]);

ReactDOM.createRoot(document.getElementById("react-app")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);









