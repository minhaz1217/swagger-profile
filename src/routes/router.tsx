import React from "react";
import {Route, Switch} from "react-router-dom";
import AddNewProfile from "../popup/components/CreateUpdateProfile";
import ShowAllProfiles from "../popup/components/ShowAllProfiles";

const routes = [
  {
    path: "/add-new-profile",
    component: AddNewProfile,
  },
  {
    path: "/*",
    component: ShowAllProfiles,
  },
];

const RoutesProvider = () => {
  return (
    <Switch>
      {routes.map((route, i) => (
        <Route key={i} {...route} />
      ))}
    </Switch>

  );
};
export {RoutesProvider};

