import React, { useState } from "react";
import { styled } from "styled-components";
import axios from "axios";
import Navbar from "./Navbar";
import FileSaver from "file-saver";

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


const Create = () => {
  const [prompt, setPrompt] = useState(""); // State for prompt input
  const [generating, setGenerating] = useState(false); // State for loading indicator
  const [generatedImage, setGeneratedImage] = useState(null); // State to store the generated image URL

  // Handle prompt input change
  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  // Handle image generation submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt) return;

    setGenerating(true);

    try {
      // Send prompt to backend to generate image
      const response = await axios.get(
        `https://dreamify-backend.vercel.app/generate-image?prompt=${encodeURIComponent(
          prompt
        )}`
      );

      // Backend returns the generated image URL in response
      const imageUrl = response.data.imageUrl;
      setGeneratedImage(imageUrl); // Set the generated image URL to state
      setPrompt(""); // Reset the prompt input
    } catch (err) {
      console.error("Error generating image:", err);
    }

    setGenerating(false);
  };

  return (
    <>
      <Navbar/>
      <Wrapper>
        <MainWrapper>
          <WrapperLeft>
            <div className="title">
              <h2>Generate image with prompt</h2>
              <p>
                Create stunning images from your ideas instantly with
                Dreamify's powerful AI generator.
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
                      src="images/stars.png"
                      alt=""
                      style={{ height: "40px" }}
                    />
                    {generating ? "Generating..." : "Generate Image"}
                  </button>
                  <button
                    type="submit"
                    className="CreatePostBtn"
                  >
                    <img
                      src="images/pen.png"
                      alt=""
                      style={{ height: "40px", rotate: "45deg" }}
                    />Post Image
                  </button>
                </div>
              </div>
            </form>
          </WrapperLeft>

          <WrapperRight>
            <div className="createdImg">
              {generatedImage ? (
                <div className="downladBox">
                  <img
                  src={generatedImage}
                  alt="Generated"
                  style={{ width: "100%", borderRadius: "20px" }}
                />
                <DownloadBtn onClick={() => FileSaver.saveAs(generatedImage, "download.jpg")}>
                <img
                  src="images/download.png"
                  alt=""
                  style={{ height: "25px", width: "auto" , position: "relative", top: "-50px", right: "30px"}}
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
    </>
  );
};

export default Create;
