import React from "react";
import './loader.css';

const Loader = () => {
  return (
    <>
      <div class="main-div" style={{ width: '100%', display:'flex', alignItems:'center', justifyContent:'center'}} >
        <div class="loader-icon1 loader"></div>
        <div class="loader-icon2 loader"></div>
        <div class="loader-icon3 loader"></div>
        <div class="text">Loading...</div>
      </div>
    </>
  );
};

export default Loader;
