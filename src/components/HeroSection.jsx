import React, { useState, useEffect } from "react";
import "./HeroSection.css";
import Scrollbar from "./Scrollbar";

const content = [
  {
    title: "Unleash Your Creativity",
    paragraph:
      "Transform your ideas into stunning visuals with Dreamify. Whether you're crafting landscapes or abstract art, the possibilities are endless when your imagination meets AI.",
    image: "images/1.jpeg",
  },
  {
    title: "Art in Every Pixel",
    paragraph:
      "With Dreamify, every image is a masterpiece. Our AI-driven platform takes your prompts and turns them into vivid, captivating visuals that are uniquely yours.",
    image: "images/2.jpg",
  },
  {
    title: "Explore Infinite Realms",
    paragraph:
      "Let Dreamify take you on a journey through endless creative possibilities. Generate images from your words and watch them come to life in ways you’ve never imagined.",
    image: "images/3.jpg",
  },
  {
    title: "From Thought to Image",
    paragraph:
      "Dreamify is where your ideas evolve into beautiful works of art. No matter the concept, our AI transforms your thoughts into high-quality visuals instantly.",
    image: "images/4.png",
  },
  {
    title: "Imagination Meets Innovation",
    paragraph:
      "Dreamify blends cutting-edge AI technology with your creativity. See your wildest ideas take shape through art, powered by the latest in artificial intelligence.",
    image: "images/5.jpg",
  },
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % content.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="hero-section">
        {content.map((item, index) => (
          <div
            key={index}
            className={`hero-image ${
              index === currentIndex ? "active" : "inactive"
            }`}
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div className="hero-overlay">
              <h1 className="hero-title">{item.title}</h1>
              <p className="hero-subtitle">{item.paragraph}</p>
            </div>
          </div>
        ))}
      </div>
      <Scrollbar />
    </>
  );
};

export default HeroSection;
