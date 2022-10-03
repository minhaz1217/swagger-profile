import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Router from "../routes/router.jsx";


ReactDOM.createRoot(document.getElementById("react-app")).render(
    <React.StrictMode>
        <RouterProvider router={Router} />
    </React.StrictMode>
); 