import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OrphanageDashboard from "./pages/OrphanageDashboard";
import UserDashboard from "./pages/UserDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/orphanage/dashboard" element={<OrphanageDashboard />} />
      <Route path="/dashboard" element={<UserDashboard />} />
    </Routes>
  );
}

export default App;