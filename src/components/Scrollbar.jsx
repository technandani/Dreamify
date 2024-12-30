import React, { useEffect, useRef } from "react";
// import "./HeroSection.css";
import { useSearch } from "../context/SearchContext"; // Use the custom hook for setting search

const data = [
  { img: "images/nature.jpg", text: "Nature" },
  { img: "images/forest.jpg", text: "Forest" },
  { img: "images/technology.jpg", text: "Technology" },
  { img: "images/glaxey.jpg", text: "Galaxy" },
  { img: "images/planet.jpg", text: "planet" },
  { img: "images/girl.jpeg", text: "girl" },
  { img: "images/snow.jpg", text: "snow" },
  { img: "images/deepSpace.jpg", text: "Space" },
  { img: "images/peacock.jpg", text: "peacock " },
  { img: "images/moon.jpg", text: "Moon" },
  { img: "images/boy.jpg", text: "boy" },
  { img: "images/alien.jpg", text: "alien" },
  { img: "images/4.jpg", text: "spaceship" },
  { img: "images/garden.jpg", text: "garden" },
  { img: "images/painting.jpg", text: "painting" },
  { img: "images/fairy.png", text: "Fairy" },
  { img: "images/horror.jpg", text: "Horror" },
  { img: "images/fantasy.jpg", text: "Fantasy" },
  { img: "images/travel.jpeg", text: "Travel" },
  { img: "images/laptop.jpg", text: "Laptop" },
  { img: "images/night.jpg", text: "Night" },
  { img: "images/ocean.jpg", text: "Ocean " },
  { img: "images/fish.jpg", text: "Fish" },
  { img: "images/flower.jpg", text: "Flower" },
  { img: "images/village.jpg", text: "Village" },
  { img: "images/farmer.jpg", text: "Farmer" },
  { img: "images/rain.jpg", text: "Rain" },
  { img: "images/blackHole.jpg", text: "Black Hole" },
];

const Scrollbar = () => {
  const { setSearch } = useSearch(); // Use the setSearch function from context

  const scrollContainer = useRef(null);
  const scrollIntervalRef = useRef(null);

  useEffect(() => {
    const container = scrollContainer.current;
    let scrollSpeed = 1; // Scroll speed

    const startScrolling = () => {
      scrollIntervalRef.current = setInterval(() => {
        if (container) {
          container.scrollLeft += scrollSpeed;
          if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
            container.scrollLeft = 0; // Reset for infinite scrolling
          }
        }
      }, 20); // Adjust time for smoothness
    };

    const stopScrolling = () => {
      clearInterval(scrollIntervalRef.current);
    };

    startScrolling();

    return () => stopScrolling(); // Cleanup on component unmount
  }, []);

  const handleMouseEnter = () => {
    clearInterval(scrollIntervalRef.current); // Stop scrolling
  };

  const handleMouseLeave = () => {
    const container = scrollContainer.current;
    let scrollSpeed = 1; // Scroll speed
    scrollIntervalRef.current = setInterval(() => {
      if (container) {
        container.scrollLeft += scrollSpeed;
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
          container.scrollLeft = 0; // Reset for infinite scrolling
        }
      }
    }, 20); // Resume scrolling
  };

  return (
    <div
      className="scroll-container"
      ref={scrollContainer}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        overflowX: "auto",
        whiteSpace: "nowrap",
        padding: "20px",
        height: "100px",
        borderRadius: "10px",
      }}
    >
      {data.map((item, index) => (
        <div
          key={index}
          className="card"
          onMouseEnter={handleMouseEnter} // Stop scrolling on hover
          onMouseLeave={handleMouseLeave}
          onClick={() => setSearch(item.text)} // Update search state on click
          style={{
            backgroundImage: `url(${item.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "50px",
            minWidth: "150px",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            textShadow: "0 1px 4px rgba(0, 0, 0, 0.7)",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 0 1px #fff",
            backdropFilter: 'blur(8px)',
            backgroundColor: '#253b5070',
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.boxShadow = "0 0 5px rgba(255, 255, 255, 0.2)";
            
          }}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
};

export default Scrollbar;
