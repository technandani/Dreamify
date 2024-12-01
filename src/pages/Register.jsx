import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./Navbar";
import axios from "axios";
import { handleSuccess, handleError } from "../utils";
import { ToastContainer } from "react-toastify";

const Wrapper = styled.div``;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !name) {
      return handleError("All fields are required.");
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return handleError("Please enter a valid email.");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    if (profilePic) {
      formData.append("profilePic", profilePic);
    }

    try {
      const response = await axios.post(
        "https://dreamify-backend-nk.vercel.app/users/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { success, message } = response.data;

      if (success) {
        handleSuccess(message);
        setName("");
        setEmail("");
        setPassword("");
        setProfilePic(null);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (err) {
      return handleError(err);
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="authInput">
                <div className="inputTitle">Email</div>
                <input
                  type="text"
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
                <div className="inputTitle">Profile picture</div>
                <input
                  type="file"
                  onChange={(e) => setProfilePic(e.target.files[0])}
                />
              </div>
              <div className="authInput">
                <button className="submit" type="submit">
                  SignUp
                </button>
              </div>
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
          </form>
          <ToastContainer theme="dark" />
        </div>
      </Wrapper>
    </>
  );
};

export default Register;
