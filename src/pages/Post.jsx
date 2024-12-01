import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ImageCard from "./ImageCard";
import Navbar from "./Navbar";
import axios from "axios";

const Container = styled.div`
  /* width: 100%; */
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 32px 0px;
  display: flex;
  justify-content: center;
  margin: auto;
`;

const CardWrapper = styled.div`
  display: grid;
  gap: 20px;
  width: 100%;
  padding: 20px;

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 640px) and (max-width: 1199px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 639px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    padding: 10px;
  }
`;

const Post = () => {
  const [images, setImages] = useState([]);
  const [postImages, setpostImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://dreamify-backend-nk.vercel.app/posts/allPosts");
      const postRes = await axios.get("https://dreamify-backend-nk.vercel.app/image/allImages");
      setImages(res.data);
      setpostImages(postRes.data);
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
      <Navbar />
      <div className="mainContainer">
        <div className="searchContainer">
          <h2>
            Explore popular post in this community
            <div>@ created with AI @</div>
          </h2>
          {/* <div className="searchBox">
            <img
              src="images/search.png"
              alt=""
              style={{ height: "70%", padding: "20px", rotate: "-45deg" }}
            />
            <input
              type="search"
              placeholder="Search image by keywords....."
            />
          </div> */}
        </div>
        <Wrapper>
          <CardWrapper>
            <ImageCard images={images} postImages={postImages} />
          </CardWrapper>
        </Wrapper>
      </div>
    </>
  );
};

export default Post;