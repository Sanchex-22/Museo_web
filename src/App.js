import React, { useState, useEffect } from "react";
import AppRoutes from './routes/AppRoutes';

import AuthService from "./services/auth.service";
import EventBus from "./common/EventBus";

import Navbar from './components/navbar';
import Footer from './components/footer';

import "./App.css";
import "./styles/NoFoundPage.css"


const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div className="bg-support_violet_2 min-h-screen font-poppins">
      <Navbar />
      <AppRoutes />
      <Footer />
    </div>
  );
};

export default App;
