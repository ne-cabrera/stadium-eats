import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// containers
import App from "./ui/App.jsx";


// pages
import SignupPage from "./ui/pages/SingupPage.jsx";
import LoginPage from "./ui/pages/LoginPage.jsx";
import HomePage from "./ui/pages/HomePage.jsx";
export const AppRoutes = () => (
  <Router>
    <div>
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/Home" component={HomePage} />
      <Route exact={true} path="/" component={App} />
    </div>
  </Router>
);
