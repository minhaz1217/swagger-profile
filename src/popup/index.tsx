import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter as Router} from "react-router-dom";
import {RoutesProvider} from "../routes/router";

export const App = () => {
  return (
    <Router>
      <RoutesProvider />
    </Router>
  );
};
ReactDOM.createRoot(document.getElementById("react-app")).render(
  <App />,
);


// TODO: DONE - in successful save, show success message and the go back to previous screen.
// TODO: save button should be seen disabled unless validation passes.
// TODO: add css minifier for bootstrap to only use css that we used in our files, just like tailwind
// TODO: add tailwind support
// TODO: add in memory router.
// TODO: don't use promised based, because of polyfill.
// TODO: DONE - make the extension fully functional
// TODO: DONE - on submit and successful save, redirect to show all page.
// TODO: DONE - use jslint
// TODO: DONE - add typescript support
// TODO: DONE - rename popup to show all page
// TODO: DONE - BUG - deleting profile now working in chrome if the developer tool isn't open.
// TODO: safety - Show alert message when apply button is clicked on anywhere except the Swagger UI Page.

// Capabilities (for testing purposes)
// 1. When clicking extension button for the first time, it will show that there is no profiles
// 2. Clicking add will redirect to the add new profile page.
// 3. Filling up form will add the profile
// 4. After saving the profile it will redirect to show all profile page.
// 5. Show all profiles will show all the save profiles
// 6. Clicking apply will apply that profile
// 7. Clicking again in another profile will apply that profile removing the old one.
// 8. Clicking edit will let the user edit that profile
// 9. Clicking delete will delete that profile
// 10. While editing if the user changes the display order it will re-order that profile.

