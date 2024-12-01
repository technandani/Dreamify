import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./Navbar";
import axios from "axios";
import Cookies from "js-cookie"; 
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from '../utils';

const Wrapper = styled.div``;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return handleError("Email and password are required.");
    }

    setLoading(true);
    try {
      // Send login request to backend
      const response = await axios.post(
        "https://dreamify-backend.vercel.app/users/login", 
        { email, password },
        { withCredentials: true } 
      );

      const { success, token, name, message } = response.data;

      if (success) {
        localStorage.setItem("uid", token);
        localStorage.setItem("loggedInUser", name);
        Cookies.set("uid", token, { expires: 1 });
        Cookies.set("loggedInUser", name, { expires: 1 });

        handleSuccess('Login successful!');
        setEmail("");
        setPassword("");
        navigate("/create");
        window.location.reload();
      } else {
        return handleError('Login failed. Please try again.');
      }
    } catch (err) {
      console.log("error: ", err);
      handleError('Something went wrong. Please try again later.');
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
                Sign in to Dreamify and turn your imagination into beautiful, unique images
              </p>
            </div>
            <div className="inputBox">
              <div className="authInput">
                <div className="inputTitle">Email</div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="authInput">
                <div className="inputTitle">Password</div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="authInput">
                {loading ? <p>Loading...</p> : <button className="submit" type="submit">SignIn</button>}
              </div>
            </div>
            <div className="forgotBox">
              <p>
                New to Dreamify?{" "}
                <a href="/register">
                  <span>SignUp</span>
                </a>
              </p>
            </div>
          </form>
          <ToastContainer theme="dark" />
        </div>
      </Wrapper>
    </>
  );
};

export default Login;
