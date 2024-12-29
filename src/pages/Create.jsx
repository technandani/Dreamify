// src/Create.js
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; 
import axios from "axios";
import Navbar from "./Navbar";
import FileSaver from "file-saver";
import Modal from "../components/Modal";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  margin: auto;
  padding: 30px;
`;

const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  gap: 30px;

  @media (max-width: 699px) {
    flex-direction: column-reverse;
  }
`;

const WrapperLeft = styled.div`
  width: 90vmin;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media (max-width: 699px) {
    width: 92vmin;
    padding: 0px;
  }
`;

const WrapperRight = styled.div`
  width: 75vmin;
  border-radius: 20px;

  @media (max-width: 699px) {
    width: 100%;
  }
`;

const DownloadBtn = styled.div`
  cursor: pointer;
  width: auto;
  float: right;
`;

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const Create = () => {
  const { isLoggedIn } = useAuth(); 
  const [prompt, setPrompt] = useState(""); 
  const [generating, setGenerating] = useState(false); 
  const [generatedImage, setGeneratedImage] = useState(null); 
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt) return;

    setGenerating(true);

    try {
      const response = await axios.get(
        `http://localhost:5000/image/generate-image?prompt=${encodeURIComponent(prompt)}`
      );

      const imageUrl = response.data.imageUrl;
      setGeneratedImage(imageUrl); 
    } catch (err) {
      console.error("Error generating image:", err);
    }

    setGenerating(false);
  };

  const handlePostImage = async () => {
    if (!generatedImage) {
      alert("Please generate an image first before posting.");
      return;
    }
  
    if (isLoggedIn) {
      try {
        const token = getCookie("uid");
        console.log("Token from cookies:", token);

        if (!token) {
          console.error("No token found. User is not authenticated.");
          return;
        }
  
        const response = await axios.post(
          "http://localhost:5000/posts/create-post",
          {
            url: generatedImage,
            prompt: prompt,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,  
            }
          }
        );
        console.log("Image posted successfully:", response.data);
        alert("Post created successfully");
        setPrompt("");
        setGeneratedImage(null);
      } catch (err) {
        console.error("Error posting image:", err);
      }
    } else {
      setShowLoginModal(true); 
    }
  };
  

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  const handleLoginRedirect = () => {
    window.location.href = "/login"; 
  };

  return (
    <>
      <Navbar />
      <Wrapper>
        <MainWrapper>
          <WrapperLeft>
            <div className="title">
              <h2>Generate image with prompt</h2>
              <p>
                Create stunning images from your ideas instantly with Dreamify's powerful AI generator.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <div className="input">
                  <div className="inputTitle">Image Prompt</div>
                  <textarea
                    type="text"
                    value={prompt}
                    onChange={handlePromptChange}
                  ></textarea>
                </div>
                <div className="CreatePostBtns">
                  <button
                    type="submit"
                    className="CreatePostBtn"
                    disabled={generating}
                  >
                    <img
                      src="images/390.png"
                      alt=""
                      style={{ height: "40px" }}
                    />
                    {generating ? "Generating..." : "Generate Image"}
                  </button>
                  <button
                    type="button"
                    className="CreatePostBtn"
                    onClick={handlePostImage}
                  >
                    <img
                      src="images/stars.png"
                      alt=""
                      style={{ height: "40px"}}
                    />
                    Post Image
                  </button>
                </div>
              </div>
            </form>
          </WrapperLeft>

          <WrapperRight>
            <div className="createdImg">
              {generatedImage ? (
                <div className="downloadBox">
                  <img
                    src={generatedImage}
                    alt="Generated"
                    style={{ width: "100%", borderRadius: "20px" }}
                  />
                  <DownloadBtn onClick={() => FileSaver.saveAs(generatedImage, "download.jpg")}>
                    <img
                      src="images/download.png"
                      alt=""
                      style={{ height: "25px", width: "auto", position: "relative", top: "-50px", right: "30px" }}
                    />
                  </DownloadBtn>
                </div>
              ) : (
                <p></p>
              )}
            </div>
          </WrapperRight>
        </MainWrapper>
      </Wrapper>

      {/* Login Modal */}
      {showLoginModal && (
        <Modal
          onClose={handleCloseModal}
          onLoginRedirect={handleLoginRedirect}
        />
      )}
    </>
  );
};

export default Create;
