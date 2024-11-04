import React, { useState } from "react";
import "../App.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header>
        <div className="navLeft">
          <a href="/">
            <h1 className="logo">Dreamify</h1>
          </a>
        </div>
        <div className="navRight">
          <div className="responsiveMenu" onClick={toggleMenu}>
            <i className="fa-solid fa-bars" style={{ color: "#fff" }}></i>
          </div>
          <div className={`btns ${menuOpen ? "active" : ""}`}>
            <a
              href="#"
              id="cutMenu"
              onClick={toggleMenu}
              style={{ display: menuOpen ? "block" : "none" }}
            >
              <i
                className="fa-solid fa-xmark"
                style={{ color: "#fff", fontSize: "40px" }}
              ></i>
            </a>
            <button className="btn">
              <a href="/create">
                <i className="fa-solid fa-plus" style={{ color: "#fff" }}></i>{" "}
                Generate
              </a>
            </button>
            <button className="btn">
              <a href="#">
                <i className="fa-solid fa-user" style={{ color: "#fff" }}></i>{" "}
                SignIn/Login
              </a>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
