import React from "react";
import { createHashRouter } from "react-router-dom";
import AddNewProfile from "../popup/add-new-profile.jsx";
import ShowAllProfiles from "../popup/show-all-profiles.jsx";

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