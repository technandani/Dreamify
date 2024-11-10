import React from 'react'
import styled from 'styled-components'
import Navbar from './Navbar'

const Wrapper = styled.div``;
const CardWrapper = styled.div``;

const Register = () => {
  return (
    <>
       <Navbar />
      <Wrapper>
        <div className="loginContainer">
          <form action="">
            <div className="title">
              <h2>Welcome to Dreamify</h2>
              <p>
                Sign in to Dreamify and turn your imagination into beautiful,
                unique images
              </p>
            </div>
            <div className="inputBox">
              <div className="authInput">
                <div className="inputTitle">Name</div>
                <input type="text" />
              </div>
              <div className="authInput">
                <div className="inputTitle">Email</div>
                <input type="text" />
              </div>
              <div className="authInput">
                <div className="inputTitle">Password</div>
                <input type="text" />
              </div>
              <div className="authInput">
                <button className="submit">SignUp</button>
              </div>
            </div>
            <div className="forgotBox">
              <p>
              Already have account? <a href="/login"><span>SignIn</span></a>
              </p>
              <button className="googleBox">
                <div className="googleicon">
                    <img src="images/google.png" alt="" />
                </div>
                <div className="google">SignIn with Google</div>
              </button>
            </div>
          </form>
        </div>
      </Wrapper>
    </>
  )
}

export default Register