import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext"; 
import { SearchProvider } from "./context/SearchContext"; 
import "./App.css";
import Post from "./pages/Post";
import Create from "./pages/Create";
import Login from "./pages/Login";
import Register from "./pages/Register";

const ProtectedRoute = ({ element, ...rest }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Navigate to="/create" /> : element; 
};

const App = () => {
  return (
    <AuthProvider>
      <SearchProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Post />} />
          <Route path="/create" element={<Create />} />
          <Route path="/login" element={<ProtectedRoute element={<Login />} />} />
          <Route path="/register" element={<ProtectedRoute element={<Register />} />} />
        </Routes>
      </Router>
      </SearchProvider>
    </AuthProvider>
  );
};

export default App;
