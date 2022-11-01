import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import "./WelcomePage.css";
import logoIcon from "./logo/logoIcon.png";
import logoDevera from "./logo/logoDevera.jpg";
const WelcomePage = () => {
  return (
    <>
      <div className="welcome-page">
        <div className="iconLise">
          <img src={logoIcon} style={{ width: "200px", height: "90px" }} />
          <img src={logoDevera} style={{ width: "100px", height: "100px" }} />
        </div>

        <h1>Voting Dapp</h1>
        <h3>Secure Voting Application</h3>
        <Link to="/login">
          <button>Voter Login</button>
        </Link>
        <Link to="/admin-login">
          <button>Admin Login</button>
        </Link>
      </div>
    </>
  );
};

export default WelcomePage;
