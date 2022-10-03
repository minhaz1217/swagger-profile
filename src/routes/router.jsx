import React from "react";
import { createHashRouter } from "react-router-dom";
import AddNewProfile from "../popup/add-new-profile.jsx";
import Popup from "../popup/popup.jsx";

const Router = createHashRouter([
    {
        path: "/*",
        element: <Popup />,
    },
    {
        path: "/add-new-profile",
        element: <AddNewProfile />,
    },
]);

export default Router;