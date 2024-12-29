import React, { useEffect, useRef } from "react";
import "./HeroSection.css";
import { useSearch } from "../context/SearchContext"; // Use the custom hook for setting search

const data = [
  { img: "images/1.jpg", text: "Nature" },
  { img: "images/2.jpg", text: "Technology" },
  { img: "images/3.jpg", text: "Galaxy" },
  { img: "images/4.jpg", text: "planet" },
  { img: "images/5.jpg", text: "Supernova" },
  { img: "images/6.jpg", text: "girl" },
  { img: "images/8.jpg", text: "Milky Way" },
  { img: "images/10.jpg", text: "snow" },
  { img: "images/9.jpg", text: "Deep Space" },
  { img: "images/1.jpg", text: "peacock " },
  { img: "images/7.jpg", text: "boy" },
  { img: "images/2.jpg", text: "spaceship" },
  { img: "images/3.jpg", text: "alien" },
  { img: "images/4.jpg", text: "colors" },
  { img: "images/5.jpg", text: "garden" },
  { img: "images/6.jpg", text: "painting" },
  { img: "images/7.jpg", text: "Fantasy" },
  { img: "images/8.jpg", text: "Travel" },
  { img: "images/9.jpg", text: "Laptop" },
  { img: "images/10.jpg", text: "Black Hole" },
  { img: "images/1.jpg", text: "Night" },
  { img: "images/2.jpg", text: "Ocean " },
  { img: "images/3.jpg", text: "Galaxy" },
  { img: "images/4.jpg", text: "Star Cluster" },
  { img: "images/5.jpg", text: "Fish" },
  { img: "images/6.jpg", text: "Flower" },
  { img: "images/7.jpg", text: "Village " },
  { img: "images/8.jpg", text: "Farmer" },
  { img: "images/9.jpg", text: "Rain" },
  { img: "images/10.jpg", text: "Black Hole" },
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
