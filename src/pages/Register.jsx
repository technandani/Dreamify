import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  
import styled from "styled-components";
import Navbar from "./Navbar";
import axios from "axios";

const Wrapper = styled.div``;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null); 
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    if (profilePic) {
      formData.append("profilePic", profilePic);
    }

    try {
      const response = await axios.post("http://localhost:5000/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });

      console.log("User registered successfully:", response.data);
      setName("");
      setEmail("");
      setPassword("");
      setProfilePic(null);
      navigate("/login");
    } catch (err) {
      console.error("Error registering user:", err);
      setError(err.response ? err.response.data.message : "Network Error");
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
                Sign up to Dreamify and turn your imagination into beautiful, unique images
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
                <button className="submit" type="submit">SignUp</button>
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
        </div>
      </Wrapper>
    </>
  );
};

export default Register;
