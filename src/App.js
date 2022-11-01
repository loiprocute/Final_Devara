import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./components/Login.js";
import Signup from "./components/Signup";
import AdminLogin from "./components/AdminLogin";
import WelcomePage from "./components/WelcomePage";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/Admin-Dashboard";
import Logo from './components/Logo';
import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route exact path="/admin-login" element={<AdminLogin />} />
          <Route exact path="/admin-dashboard/*" element={<AdminDashboard />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
