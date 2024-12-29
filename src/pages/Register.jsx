import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
    const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

   // Google Login Handler
   const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Google token received:", tokenResponse);
  
      // Send token to backend
      loginWithGoogle(tokenResponse.access_token);
    },
    onError: (error) => {
      console.error("Google login failed:", error);
      toast.error("Google login failed. Please try again.");
    },
  });
  

  const loginWithGoogle = async (accessToken) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/loginWithGoogle`, 
        { rowtoken: accessToken }, 
        {
          headers: {
            "Content-Type": "application/json", 
          },
          withCredentials: true,
        }
      );

      const { success, token, name, message } = response.data;

      if (success) {
        localStorage.setItem("uid", token);
        localStorage.setItem("loggedInUser", name);
        Cookies.set("uid", token, { expires: 5 });
        Cookies.set("loggedInUser", name, { expires: 5 });
        navigate("/create");
        window.location.reload();
      } else {
        return handleError(message || "Login failed. Please try again.");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong. Please try again later.";
      toast.error(errorMessage);
    }
  };
  

  // Normal form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("All fields are required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    if (profilePic) formData.append("profilePic", profilePic);

    try {
      const response = await axios.post(
        "http://localhost:5000/users/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.message);
      setName("");
      setEmail("");
      setPassword("");
      setProfilePic(null);
      navigate("/login");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Something went wrong. Please try again later.";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Navbar />
      <div className="loginContainer">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="title">
            <h2>Welcome to Dreamify</h2>
            <p>Sign up to Dreamify and turn your imagination into beautiful, unique images</p>
          </div>
          <div className="inputBox">
            <div className="authInput">
              <input
                type="text"
                placeholder="Enter name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="authInput">
              <input
                type="email"
                placeholder="Enter email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="authInput">
              <input
                type="password"
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="authInput">
              <input
                type="file"
                onChange={(e) => setProfilePic(e.target.files[0])}
              />
            </div>
            <div className="authInput">
              {loading ? (
                  <p>Loading...</p>
                ) : (
                  <button className="submit" type="submit">Sign Up</button>
                )}
            </div>
            <div className="forgotBox">
              <p>
                Already have an account?{" "}
                <a href="/login"><span>SignIn</span></a>
              </p>
              <div className="googleBox" onClick={() => login()}>
                <div className="googleicon">
                  <img src="images/google.png" alt="google icon" />
                </div>
                <div className="google">SignIn with Google</div>
              </div>
            </div>
          </div>
        </form>
        <ToastContainer theme="dark" />
      </div>
    </>
  );
};

export default Register;
