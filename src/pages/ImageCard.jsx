import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Card = styled.div`
  position: relative;
  display: flex;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 15px;
  &:hover {
    /* scale: 1.05; */
  }

  &:nth-child(7n + 1) {
    grid-column: auto/span 2;
    grid-row: auto/span 2;
  }
`;

const HoverOverlay = styled.div`
  display: none;
  &:hover {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: start;
    border-radius: 20px;
    padding: 30px;
    gap: 2%px;
    backdrop-filter: blur(8px);
  }
`;

const Prompt = styled.div`
  font-size: 15px;
`;

const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 20px;
`;
const DownloadBtn = styled.div``;

const ImageCard = () => {
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState([]);
  const [Loading, setLoading] = useState("true");

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://dreamify-backend.vercel.app/images");
      setImages(res.data);
    } catch (err) {
      console.error("Error fetching images:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <>
      {images.length === 0 ? (
        <p></p>
      ) : (
        images.map((image, index) => (
          <Card>
            <LazyLoadImage
              src={image.url}
              alt={`Generated image ${index}`}
              width={"100%"}
              style={{ borderRadius: "15px" }}
            />
            <HoverOverlay>
              <Prompt>{image.prompt}</Prompt>
              <BottomWrapper>
                <Author>
                  <img
                    src="images/user.png"
                    alt=""
                    style={{ height: "25px" }}
                  />
                  Nandani
                </Author>
                <DownloadBtn>
                  <img
                    src="images/download.png"
                    alt=""
                    style={{ height: "40px" }}
                  />
                </DownloadBtn>
              </BottomWrapper>
            </HoverOverlay>
          </Card>
        ))
      )}
    </>
  );
};

export default ImageCard;
