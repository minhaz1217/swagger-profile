import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Router from "../routes/router.jsx";


ReactDOM.createRoot(document.getElementById("react-app")).render(
    <React.StrictMode>
        <RouterProvider router={Router} />
    </React.StrictMode>
);

// TODO: DONE - make the extension fully functional
// TODO: in successful save, show success message and the go back to previous screen.
// TODO: DONE - on submit and successful save, redirect to show all page.
// TODO: add css minifier for bootstrap to only use css that we used in our files, just like tailwind
// TODO: use jslint
// TODO: add tailwind support
// TODO: add typescript support
// TODO: DONE - rename popup to show all page
// TODO: add in memory router.