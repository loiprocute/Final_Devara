import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import db from "../firebase/firebase";
import "./AdminLogin.css";

const AdminLogin = () => {
  
  const navigate = useNavigate();

  const { signIn } = useAuth();

  const [admin, setAdmin] = useState();
  const [password, setPassword] = useState();

  // const getAdmin = async () => {
  //   const docRef = doc(db, "admin", "admin-creds");
  //   const docSnap = await getDoc(docRef);
    
  //   const t = docSnap.data();

  //   return t.email;
  // }

  const handleLogin = async (e) => {
    e.preventDefault();
    
    console.log(admin);

    //admin@gmail.com
    if(admin === "loi.nguyen31.2001@hcmut.edu.vn") {
      await signIn(admin, password);
      navigate("/admin-dashboard/");
      console.log("Admin Login successful");
    }
    else {
      alert("Not an Admin!");
      navigate("/admin-login");
    }
  }

  return (
    <div className="AdminLogin" id="AdminLogin">
      <div className="adminLoginAside" />
      <div className="adminLoginForm">
        <div className="adminLoginFormCenter">
          <p className="adminLoginFormTitle">Login</p>
          <form className="adminLoginFormFields">
            <div className="adminLoginFormField">
              <label className="adminLoginFormFieldLabel" htmlFor="email">
                E-Mail Address
              </label>
              <input
                type="email"
                id="email"
                className="adminLoginFormFieldInput"
                placeholder="Enter your Email"
                value={admin}
                onChange={(e) => setAdmin(e.target.value)}
              />
            </div>

            <div className="adminLoginFormField">
              <label className="adminLoginFormFieldLabel" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="adminLoginFormFieldInput"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="adminLoginFormField">
              <button className="adminLoginFormFieldButton" onClick={handleLogin}>Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
