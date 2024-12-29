import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./Navbar";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import { useGoogleLogin } from "@react-oauth/google";

const Wrapper = styled.div``;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        "https://dreamify-backend.vercel.app/users/loginWithGoogle", 
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

  // normal login handle
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return handleError("Email and password are required.");
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://dreamify-backend.vercel.app/users/login",
        { email, password },
        { withCredentials: true }
      );

      const { success, token, name, message } = response.data;

      if (success) {
        localStorage.setItem("uid", token);
        localStorage.setItem("loggedInUser", name);
        Cookies.set("uid", token, { expires: 5 });
        Cookies.set("loggedInUser", name, { expires: 5 });

        handleSuccess("Login successful!");
        setEmail("");
        setPassword("");
        navigate("/create");
        window.location.reload();
      } else {
        return handleError(message || "Login failed. Please try again.");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Something went wrong. Please try again later.";
      handleError(errorMessage);
      console.log("error: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Wrapper>
        <div className="loginContainer">
          <form onSubmit={handleSubmit}>
            <div className="title">
              <h2>Welcome to Dreamify</h2>
              <p>
                Sign in to Dreamify and turn your imagination into beautiful,
                unique images
              </p>
            </div>
            <div className="inputBox">
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
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <button className="submit" type="submit">
                    SignIn
                  </button>
                )}
              </div>
            </div>
            <div className="forgotBox">
              <p>
                New to Dreamify?{" "}
                <a href="/register">
                  <span>SignUp</span>
                </a>
              </p>
              <div className="googleBox" onClick={() => login()}>
                <div className="googleicon">
                  <img src="images/google.png" alt="google icon" />
                </div>
                <div className="google">SignIn with Google</div>
              </div>
            </div>
          </form>
          <ToastContainer theme="dark" />
        </div>
      </Wrapper>
    </>
  );
};

export default Login;
