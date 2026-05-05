import { useState } from "react";
import { login, register } from "../api/api";
import styled, { css, keyframes } from "styled-components";

// --- Animations ---
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// --- Styled Components ---
const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: transparent;
  perspective: 1000px;
`;

const FormWrapper = styled.div`
  position: relative;
  max-width: 460px;
  width: 100%;
  margin: 0 auto;
  animation: ${fadeInUp} 0.8s ease;
  overflow: hidden;

  &.active .card.alt {
    top: 0;
    right: 0;
    width: 100%;
    min-width: 100%;
    height: 100%;
    border-radius: 4px;
    padding: 60px 0 40px;
    background: ${({ theme }) => theme.colors.primary[500]};
    clip-path: circle(150% at 90% 70px); /* Expand to show everything */
    z-index: 20;

    .toggle {
      opacity: 0;
      visibility: hidden;
    }

    .title, .input-container, .button-container {
      opacity: 1;
      visibility: visible;
      transition: opacity .3s ease .2s;
    }
  }
`;

const Card = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: 4px;
  padding: 60px 0 40px 0;
  box-sizing: border-box;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);
  transition: .3s ease;

  &:first-child {
    background: #EDE7D9;
    height: 10px;
    border-radius: 4px 4px 0 0;
    margin: 0 10px;
    padding: 0;
    box-shadow: none;
  }

  &.alt {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.colors.primary[500]};
    border-radius: 4px;
    padding: 60px 0 40px;
    transition: clip-path 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    clip-path: circle(40px at 90% 70px); /* Initially hidden inside a circle */
    pointer-events: none; /* Only allow interaction when active or on toggle */

    &.active {
      pointer-events: auto;
    }

    .toggle {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 100px;
      height: 100px;
      background: ${({ theme }) => theme.colors.primary[500]};
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: none;
      pointer-events: auto; /* Always interactive */
      z-index: 100;
      transition: transform 0.3s ease;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);

      &::before {
        content: '\f040';
        font-family: 'FontAwesome';
        font-size: 32px;
        color: white;
      }
      
      &:hover {
        transform: scale(1.1);
      }
    }

    .title, .input-container, .button-container {
      opacity: 0;
      visibility: hidden;
    }

    .title {
      border-color: white;
      color: white;
      .close {
        cursor: none;
        position: absolute;
        top: 10px;
        right: 40px;
        display: inline-block;
        color: white;
        font-size: 40px;
        font-weight: 400;
        z-index: 100;
        &::before { content: '\00d7'; }
        &:hover { transform: scale(1.1); }
      }
    }

    .input-container {
      input {
        color: white;
        border-bottom-color: rgba(255,255,255,0.4);
        &:focus ~ label, &:valid ~ label { 
          color: white; 
          transform: translate(-12%, -35px) scale(0.75);
        }
        &:focus ~ .bar::before, &:focus ~ .bar::after { background: white; }
      }
      label { color: rgba(255,255,255,0.8); }
      .bar { background: rgba(255,255,255,0.8); }
    }

    .button-container button {
      width: 100%;
      background: white;
      border-color: white;
      span { color: ${({ theme }) => theme.colors.primary[500]}; }
      &:hover { background: rgba(255,255,255,0.9); }
    }
  }
`;

const Title = styled.h1`
  position: relative;
  z-index: 1;
  border-left: 5px solid ${({ theme }) => theme.colors.primary[500]};
  margin: 0 0 35px;
  padding: 10px 0 10px 50px;
  color: ${({ theme }) => theme.colors.primary[500]};
  font-family: ${({ theme }) => theme.typography.fonts.display};
  font-size: 32px;
  font-weight: 600;
  text-transform: uppercase;
`;

const InputContainer = styled.div`
  position: relative;
  margin: 0 60px 50px;

  input {
    outline: none;
    z-index: 1;
    position: relative;
    background: none;
    width: 100%;
    height: 60px;
    border: 0;
    color: ${({ theme }) => theme.colors.text.primary};
    font-family: ${({ theme }) => theme.typography.fonts.mono};
    font-size: 24px;
    font-weight: 400;
    border-bottom: 1px solid #757575;

    /* Handle browser autofill */
    &:-webkit-autofill,
    &:-webkit-autofill:hover, 
    &:-webkit-autofill:focus {
      -webkit-text-fill-color: ${({ theme }) => theme.colors.text.primary};
      -webkit-box-shadow: 0 0 0px 1000px transparent inset;
      transition: background-color 5000s ease-in-out 0s;
      background: transparent !important;
    }

    &:focus ~ label, &:valid ~ label {
      color: #9d9d9d;
      transform: translate(-12%, -35px) scale(0.75); /* Fixed label overlap */
    }

    &:focus ~ .bar::before, &:focus ~ .bar::after {
      width: 50%;
    }
  }

  label {
    position: absolute;
    top: 0;
    left: 0;
    color: #757575;
    font-family: ${({ theme }) => theme.typography.fonts.mono};
    font-size: 24px;
    font-weight: 300;
    line-height: 60px;
    transition: 0.2s ease;
    pointer-events: none;
  }

  .bar {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;

    &::before, &::after {
      content: '';
      position: absolute;
      background: ${({ theme }) => theme.colors.primary[500]};
      width: 0;
      height: 2px;
      transition: .2s ease;
    }
    &::before { left: 50%; }
    &::after { right: 50%; }
  }
`;

const ButtonContainer = styled.div`
  margin: 0 60px;
  text-align: center;

  button {
    outline: 0;
    cursor: none;
    position: relative;
    display: inline-block;
    background: 0;
    width: 240px;
    border: 2px solid #e3e3e3;
    padding: 20px 0;
    font-family: ${({ theme }) => theme.typography.fonts.mono};
    font-size: 24px;
    font-weight: 600;
    line-height: 1;
    text-transform: uppercase;
    overflow: hidden;
    transition: .3s ease;
    z-index: 1;

    span {
      position: relative;
      z-index: 2;
      color: ${({ theme }) => theme.colors.primary[500]};
      transition: .3s ease;
    }

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      display: block;
      background: ${({ theme }) => theme.colors.primary[500]};
      width: 30px;
      height: 30px;
      border-radius: 100%;
      margin: -15px 0 0 -15px;
      opacity: 0;
      transition: .3s ease;
      z-index: 1;
    }

    &:hover, &:focus {
      border-color: ${({ theme }) => theme.colors.primary[500]};
    }

    &:active, &:focus {
      span { color: white; }
      &::before {
        opacity: 1;
        transform: scale(10);
      }
    }
  }
`;

const Footer = styled.div`
  margin: 40px 0 0;
  color: #d3d3d3;
  font-family: ${({ theme }) => theme.typography.fonts.mono};
  font-size: 14px;
  font-weight: 300;
  text-align: center;

  a {
    color: inherit;
    text-decoration: none;
    transition: .3s ease;
    &:hover { color: ${({ theme }) => theme.colors.primary[500]}; }
  }
`;

export default function Login({ onLogin }) {
  const [isActive, setIsActive] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Registration state
  const [regUser, setRegUser] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regRepeat, setRegRepeat] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      if (res?.access_token || res?.token) {
        onLogin();
      } else {
        alert("Verification failed. Check your medical credentials.");
      }
    } catch (err) {
      alert("An error occurred during login.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (regPass !== regRepeat) return alert("Passwords do not match.");
    try {
      const res = await register({ 
        email: regUser, 
        password: regPass,
        fullName: regUser.split('@')[0] // Fallback for name
      });
      
      if (res?.id || res?.email) {
        alert("Account created successfully! Please login with your new credentials.");
        setIsActive(false);
      } else {
        alert(res?.message || "Registration failed. Try a different username.");
      }
    } catch (err) {
      alert("Server connection error. Please try again later.");
    }
  };

  return (
    <LoginContainer>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <FormWrapper className={isActive ? 'active' : ''}>
        <Card />
        <Card>
          <Title>Login</Title>
          <form onSubmit={handleSubmit}>
            <InputContainer>
              <input 
                type="text" 
                id="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">Username</label>
              <div className="bar" />
            </InputContainer>
            
            <InputContainer>
              <input 
                type="password" 
                id="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password">Password</label>
              <div className="bar" />
            </InputContainer>

            <ButtonContainer>
              <button type="submit">
                <span>Go</span>
              </button>
            </ButtonContainer>

            <Footer>
              <a href="#">Forgot your password?</a>
            </Footer>
          </form>
        </Card>

        <Card className="alt">
          <div className="toggle" onClick={() => setIsActive(true)} />
          <Title>
            Register
            <div className="close" onClick={(e) => {
              e.stopPropagation();
              setIsActive(false);
            }} />
          </Title>
          <form onSubmit={handleRegister}>
            <InputContainer>
              <input 
                type="text" 
                id="reg-user" 
                required 
                value={regUser}
                onChange={(e) => setRegUser(e.target.value)}
              />
              <label htmlFor="reg-user">Username</label>
              <div className="bar" />
            </InputContainer>
            
            <InputContainer>
              <input 
                type="password" 
                id="reg-pass" 
                required 
                value={regPass}
                onChange={(e) => setRegPass(e.target.value)}
              />
              <label htmlFor="reg-pass">Password</label>
              <div className="bar" />
            </InputContainer>

            <InputContainer>
              <input 
                type="password" 
                id="reg-repeat" 
                required 
                value={regRepeat}
                onChange={(e) => setRegRepeat(e.target.value)}
              />
              <label htmlFor="reg-repeat">Repeat Password</label>
              <div className="bar" />
            </InputContainer>

            <ButtonContainer>
              <button type="submit">
                <span>Next</span>
              </button>
            </ButtonContainer>
          </form>
        </Card>
      </FormWrapper>
    </LoginContainer>
  );
}