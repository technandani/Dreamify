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
          <button className="btn">
            <a href="/create">
              <i className="fa-solid fa-plus" style={{ color: "#fff" }}></i>{" "}
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
