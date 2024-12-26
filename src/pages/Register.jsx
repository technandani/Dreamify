import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";

const Wrapper = styled.div``;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
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
        "https://dreamify-backend.vercel.app/users/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Success handling
      toast.success(response.data.message);
      setName("");
      setEmail("");
      setPassword("");
      setProfilePic(null);
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message); 
      } else if (error.response && error.response.status === 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <Wrapper>
        <div className="loginContainer">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="title">
              <h2>Welcome to Dreamify</h2>
              <p>
                Sign up to Dreamify and turn your imagination into beautiful,
                unique images
              </p>
            </div>
            <div className="inputBox">
              <div className="authInput">
                <div className="inputTitle">Name</div>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="authInput">
                <div className="inputTitle">Email</div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="authInput">
                <div className="inputTitle">Password</div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="authInput">
                <div className="inputTitle">Profile Picture</div>
                <input
                  type="file"
                  onChange={(e) => setProfilePic(e.target.files[0])}
                />
              </div>
              <div className="authInput">
                <button className="submit" type="submit">
                  Register
                </button>
              </div>
              <div className="forgotBox">
                <p>
                  Already have an account?{" "}
                  <a href="/login">
                    <span>SignIn</span>
                  </a>
                </p>
                <button className="googleBox">
                  <div className="googleicon">
                    <img src="images/google.png" alt="google icon" />
                  </div>
                  <div className="google">SignIn with Google</div>
                </button>
              </div>
            </div>
          </form>
          <ToastContainer  theme="dark" />
        </div>
      </Wrapper>
    </>
  );
};

export default Register;
