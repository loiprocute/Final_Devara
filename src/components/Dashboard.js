import React, { useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Sidebar from "./Sidebar";
import Registration from "./Registration";
import Voting from "./Voting"; 
import Results from "./Results";

export default function Dashboard() {


  return (
    <div className="dashboard" style={{display: "flex"}}>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/voting" element={<Voting />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </div>
  );
}
