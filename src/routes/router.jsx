import React from "react";
import { createHashRouter } from "react-router-dom";
import AddNewProfile from "../popup/CreateUpdateProfile.jsx";
import ShowAllProfiles from "../popup/ShowAllProfiles.jsx";

const Router = createHashRouter([
    {
        path: "/*",
        element: <ShowAllProfiles />,
    },
    {
        path: "/add-new-profile",
        element: <AddNewProfile />,
    },
]);

export default Router;