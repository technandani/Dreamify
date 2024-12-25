import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ImageCard from "./ImageCard";
import Navbar from "./Navbar";
import axios from "axios";

const Container = styled.div``;

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
  const [posts, setPosts] = useState([]);
  const [filterPosts, setFilterPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://dreamify-backend.vercel.app/posts/allPosts");
      setPosts(res.data);
      setFilterPosts(res.data); 
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);
  
  useEffect(() => {
    if (!search) {
      setFilterPosts(posts); 
      return;
    }
  
    const filtered = posts.filter((post) => {
      const promptMatch = post?.prompt?.toLowerCase().includes(search.toLowerCase());
      const authorMatch = post?.user?.name?.toLowerCase().includes(search.toLowerCase());
      return promptMatch || authorMatch;
    });
  
    setFilterPosts(filtered);
  }, [posts, search]); 
  

  return (
    <>
      <Navbar />
      <div className="mainContainer">
        <div className="searchContainer">
          <h2>
            Explore popular posts in this community
            <div>@ created with AI @</div>
          </h2>
          <div className="searchBox">
            <img
              src="images/search.png"
              alt="Search"
              style={{ height: "70%", padding: "20px", rotate: "-45deg" }}
            />
            <input
              type="search"
              placeholder="Search image by keywords....."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <Wrapper>
          <CardWrapper>
            {loading ? (
              <p>Loading...</p>
            ) : filterPosts.length === 0 ? (
              <p>No posts found</p>
            ) : (
              filterPosts.map((post, index) => <ImageCard key={index} post={post} />)
            )}
          </CardWrapper>
        </Wrapper>
      </div>
    </>
  );
};

export default Post;
