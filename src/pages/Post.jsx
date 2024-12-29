import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ImageCard from "./ImageCard";
import Navbar from "./Navbar";
import axios from "axios";
import Loader from "../components/Loader";
import HeroSection from "../components/HeroSection";
import { useSearch } from "../context/SearchContext"; // Use the custom hook for search

const Container = styled.div``;
const Wrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 32px 0px;
  display: flex;
  justify-content: center;
  margin: auto;
  overflow: hidden;
`;

const CardWrapper = styled.div`
  display: grid;
  gap: 20px;
  width: 100%;
  padding: 20px;

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 640) and (max-width: 1199px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 639px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const DivLoader = styled.div`
  @media (max-width: 639px) {
    padding-top: 25%;
  }
`;

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [filterPosts, setFilterPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get the search value from context
  const { search, setSearch } = useSearch();

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://dreamify-backend.vercel.app/posts/allPosts");
      const data = Array.isArray(res.data) ? res.data : [];
      setPosts(data);
      setFilterPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setPosts([]);
      setFilterPosts([]);
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
      const promptMatch = post?.prompt
        ?.toLowerCase()
        .includes(search.toLowerCase());
      const authorMatch = post?.user?.name
        ?.toLowerCase()
        .includes(search.toLowerCase());
      return promptMatch || authorMatch;
    });

    setFilterPosts(filtered);
  }, [posts, search]);

  return (
    <>
      <Navbar />
      <HeroSection />
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
              onChange={(e) => setSearch(e.target.value)} // Update search using setSearch
            />
          </div>
        </div>
        <Wrapper>
          <CardWrapper>
            {loading ? (
              <DivLoader className="divLoader" style={{ width: "98vw" }}>
                <Loader />
              </DivLoader>
            ) : Array.isArray(filterPosts) && filterPosts.length > 0 ? (
              filterPosts.map((post, index) => (
                <ImageCard key={index} post={post} />
              ))
            ) : (
              <div className="notFoundCon" style={{ width: "98vw" }}>
                <div
                  className="notFoundImage"
                  style={{ width: "40vw", height: "auto", margin: "auto" }}
                >
                  <img
                    src="images/notFound.png"
                    style={{ width: "100%", height: "100%" }}
                    alt=""
                  />
                </div>
              </div>
            )}
          </CardWrapper>
        </Wrapper>
      </div>
    </>
  );
};

export default Post;
