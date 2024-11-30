import React from "react";
import { styled } from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.5s ease-in-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContent = styled.div`
  background: #0c1821;
  box-shadow: #fff 0 0 2px;
  color: #fff;
  padding: 50px;
  border-radius: 10px;
  text-align: center;
  position: relative;
  width: 300px;

  h3 {
    margin: 20px 5px;
    padding-top: 50px;
    font-size: 18px;
    font-weight: 400;
  }

  .cut {
    height: 30px;
    width: 30px;
    font-size: 30px;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
  }

  .loginBtn{
    padding: 10px 20px;
    background-color: transparent;
    font-size: 18px;
    box-shadow: #fff 0 0 2px;
    border-radius: 10px;
    margin-top: 10px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  color: #333;
  cursor: pointer;
  font-weight: bold;
`;

const Modal = ({ onClose, onLoginRedirect }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose} className="cut">×</CloseButton>
        <img src="images/rocket.png" alt="" height={"150px"} style={{position: "absolute", top: "-50px", left: "30%"}} />
        <h3>Sign in to start posting your stunning creations and showcase your imagination to the world!</h3>
        <button onClick={onLoginRedirect} className="loginBtn"><i className="fa-solid fa-paper-plane"></i>  Go to Login</button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;