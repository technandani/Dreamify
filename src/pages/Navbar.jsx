// src/Navbar.js
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; 

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth(); 
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <div className="navLeft">
        <a href="/">
          <h1 className="logo">Dreamify</h1>
        </a>
      </div>
      <div className="navRight">
        <div className="responsiveMenu" onClick={toggleMenu}>
          <img src="images/menu.png" alt="menu" height={"22px"} />
        </div>
        <div className={`btns ${menuOpen ? "active" : ""}`}>
          <a
            href="#"
            id="cutMenu"
            onClick={toggleMenu}
            style={{ display: menuOpen ? "block" : "none" }}
          >
            <img src="images/cut.png" alt="close menu" height={"30px"} />
          </a>
          <button className="btn" id="genBtn">
            <a href="/create" style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'10px'}}>
              {/* <i className="fa-solid fa-palette" style={{ color: "#fff" }}></i>{" "} */}
              {/* <i class="fa-solid fa-palette"></i> */}
              <img src="images/paint5.png" style={{height:'30px', width:'auto', rotate:'315deg'}} alt="" />
              Generate image
            </a>
          </button>
          {isLoggedIn ? (
            <button className="btn" onClick={logout}>
              <i className="fa-solid fa-sign-out" style={{ color: "#fff" }}></i>{" "}
              Logout
            </button>
          ) : (
            <button className="btn">
              <a href="/login">
                <i className="fa-solid fa-user" style={{ color: "#fff" }}></i>{" "}
                SignIn / Login
              </a>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;