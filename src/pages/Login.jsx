import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./Navbar";
import axios from "axios";

const Wrapper = styled.div``;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://dreamify-backend.vercel.app/users/login", 
        { email, password },
        { withCredentials: true } 
      );

      useEffect(() => {
        console.log(document.cookie);  
      }, []);

      if (response.status === 200) {
        setEmail("");
        setPassword("");
        // navigate("/create"); 
        window.location.reload();
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      setError("Invalid email or password.");
      console.error("Login error", error);
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
                <button className="submit" type="submit">
                  SignIn
                </button>
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
        </div>
      </Wrapper>
    </>
  );
};

export default Login;