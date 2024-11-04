import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import "./App.css";
import Post from "./pages/Post";
import Create from "./pages/Create";

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Post />} />
        <Route path="/create" element={<Create />} />
        <Route path="/cheak" element={<Create />} />
      </Routes>
    </Router>
    </>
  );
};

export default App;

















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const App = () => {
//   const [prompt, setPrompt] = useState('');
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [generating, setGenerating] = useState(false);

//   // Fetch images from the backend
//   const fetchImages = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get('http://localhost:5000/images');
//       setImages(res.data);
//     } catch (err) {
//       console.error("Error fetching images:", err);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchImages();
//   }, []);

//   // Handle prompt input change
//   const handlePromptChange = (e) => {
//     setPrompt(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!prompt) return;

//     setGenerating(true);

//     try {
//       // Send prompt to backend to generate image
//       await axios.get(`http://localhost:5000/generate-image?prompt=${encodeURIComponent(prompt)}`);
//       setPrompt('');
//       fetchImages(); // Fetch the updated list of images
//     } catch (err) {
//       console.error("Error generating image:", err);
//     }

//     setGenerating(false);
//   };

//   return (
//     <div className="container">
//       <h1>Generate Image</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={prompt}
//           onChange={handlePromptChange}
//           placeholder="Enter prompt for image generation"
//         />
//         <button type="submit" disabled={generating}>
//           {generating ? 'Generating...' : 'Generate'}
//         </button>
//       </form>

//       {loading ? <p>Loading images...</p> : null}

//       <div className='images'>
//         {images.length === 0 ? (
//           <p>No images found</p>
//         ) : (
//           images.map((image, index) => (
//             <div key={index} className='image'>
//               <img
//                 src={image.url}
//                 alt={`Generated image ${index}`}
//               />
//               <p>Prompt: {image.prompt}</p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;
