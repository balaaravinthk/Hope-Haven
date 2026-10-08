import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";


// Temporary pages (we'll create them next)

import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OrphanageDashboard from "./pages/OrphanageDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/orphanage/dashboard" element={<OrphanageDashboard />} />
    </Routes>
  );
}

export default App;