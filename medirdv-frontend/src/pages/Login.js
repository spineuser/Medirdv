import { useState } from "react";
import { login, register } from "../api/api";
import styled, { keyframes } from "styled-components";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  font-family: 'Roboto', sans-serif;
  padding: 20px;
`;

const FormWrapper = styled.div`
  position: relative;
  max-width: 460px;
  width: 100%;
  margin: 0 auto 100px;
  animation: ${fadeInUp} 0.8s ease;

  &.active .card-back-1 {
    background: #f2f2f2;
    margin: 0 15px;
  }
  &.active .card-back-2 {
    background: #fafafa;
    margin: 0 10px;
  }

  &.active .card.alt {
    top: 20px;
    right: 0;
    width: 100%;
    min-width: 100%;
    height: auto;
    border-radius: 5px;
    padding: 60px 0 40px;
    overflow: hidden;

    .toggle {
      position: absolute;
      top: 40px;
      right: -70px;
      transform: scale(10);
    }

    .title, .input-container, .button-container {
      left: 0;
      opacity: 1;
      visibility: visible;
      display: block;
    }
    
    .title { transition-delay: 0.3s; }
    .input-container:nth-child(2) { transition-delay: 0.4s; }
    .input-container:nth-child(3) { transition-delay: 0.5s; }
    .input-container:nth-child(4) { transition-delay: 0.6s; }
    .button-container { transition-delay: 0.7s; }
  }
`;

const Card = styled.div`
  position: relative;
  background: #ffffff;
  border-radius: 5px;
  padding: 60px 0 40px 0;
  box-sizing: border-box;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: 0.3s ease;

  &.card-back-1 {
    background: #fafafa;
    height: 10px;
    border-radius: 5px 5px 0 0;
    margin: 0 10px;
    padding: 0;
  }

  .title {
    position: relative;
    z-index: 1;
    border-left: 5px solid #0047FF;
    margin: 0 0 35px;
    padding: 10px 0 10px 50px;
    color: #0047FF;
    font-size: 32px;
    font-weight: 600;
    text-transform: uppercase;
  }

  .input-container {
    position: relative;
    margin: 0 60px 50px;
    transition: 0.3s ease;

    label {
      position: absolute;
      top: 0; left: 0;
      color: #757575;
      font-size: 24px;
      font-weight: 300;
      line-height: 60px;
      transition: 0.2s ease;
      z-index: 2;
      pointer-events: none;
    }

    input {
      outline: none;
      z-index: 1;
      position: relative;
      background: none;
      width: 100%;
      height: 60px;
      border: 0;
      color: #212121;
      font-size: 24px;
      font-weight: 400;
      border-bottom: 1px solid #757575;

      &:-webkit-autofill,
      &:-webkit-autofill:hover, 
      &:-webkit-autofill:focus {
        -webkit-box-shadow: 0 0 0px 1000px white inset !important;
        -webkit-text-fill-color: #212121 !important;
        transition: background-color 5000s ease-in-out 0s;
      }

      &:focus ~ label, &:valid ~ label {
        color: #9d9d9d;
        transform: translate(-12%, -50%) scale(0.75);
      }
      &:focus ~ .bar::before, &:focus ~ .bar::after { width: 50%; }
    }

    .bar {
      position: absolute;
      left: 0; bottom: 0;
      background: #757575;
      width: 100%; height: 1px;
      &::before, &::after {
        content: '';
        position: absolute;
        background: #0047FF;
        width: 0; height: 2px;
        transition: 0.2s ease;
      }
      &::before { left: 50%; }
      &::after { right: 50%; }
    }
  }

  .button-container {
    margin: 0 60px;
    text-align: center;
    transition: 0.3s ease;

    button {
      outline: 0;
      cursor: pointer;
      position: relative;
      display: inline-block;
      background: 0;
      width: 240px;
      border: 2px solid #e3e3e3;
      padding: 20px 0;
      font-size: 24px;
      font-weight: 600;
      line-height: 1;
      text-transform: uppercase;
      overflow: hidden;
      transition: 0.3s ease;

      span { position: relative; z-index: 1; color: #ddd; transition: 0.3s ease; }

      &::before {
        content: '';
        position: absolute;
        top: 50%; left: 50%;
        display: block;
        background: #0047FF;
        width: 30px; height: 30px;
        border-radius: 100%;
        margin: -15px 0 0 -15px;
        opacity: 0;
        transition: 0.3s ease;
      }

      &:hover, &:active, &:focus {
        border-color: #0047FF;
        span { color: #0047FF; }
      }

      &:active, &:focus {
        span { color: #ffffff; }
        &::before { opacity: 1; transform: scale(10); }
      }
    }
  }

  .footer {
    margin: 40px 0 0;
    color: #d3d3d3;
    font-size: 24px;
    font-weight: 300;
    text-align: center;
    a { color: inherit; text-decoration: none; transition: 0.3s ease; &:hover { color: #b7b7b7; } }
  }

  &.alt {
    position: absolute;
    top: 40px; right: -70px;
    z-index: 10;
    width: 140px; height: 140px;
    background: none;
    border-radius: 100%;
    box-shadow: none;
    padding: 0;
    transition: 0.3s ease;

    .toggle {
      position: relative;
      background: #0047FF;
      width: 140px; height: 140px;
      border-radius: 100%;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
      color: #ffffff;
      font-size: 58px;
      line-height: 140px;
      text-align: center;
      cursor: pointer;
      transition: transform 0.3s ease;
      &::before { content: '\\f040'; font-family: 'FontAwesome'; transition: opacity 0.2s ease; }
    }

    &.active .toggle::before { opacity: 0; }

    .title, .input-container, .button-container {
      left: 100px;
      opacity: 0;
      visibility: hidden;
      display: none;
    }

    .title {
      border-color: #ffffff;
      color: #ffffff;
      transition: 0.3s ease;
      .close {
        cursor: pointer;
        position: absolute;
        top: 0; right: 20px;
        display: inline-block;
        color: #ffffff;
        font-size: 58px;
        font-weight: 400;
        z-index: 100;
        &::before { content: '\\00d7'; }
        &:hover { transform: scale(1.1); }
      }
    }

    .input-container {
      input {
        color: #ffffff;
        border-bottom-color: rgba(255,255,255,0.8);
        &:focus ~ label, &:valid ~ label { color: #ffffff; }
        &:focus ~ .bar::before, &:focus ~ .bar::after { background: #ffffff; }
      }
      label { color: rgba(255,255,255,0.8); }
      .bar { background: rgba(255,255,255,0.8); }
    }

    .button-container button {
      width: 100%;
      background: #ffffff;
      border-color: #ffffff;
      span { color: #0047FF; }
      &:hover { background: rgba(255,255,255,0.9); }
      &::before { display: none; }
    }
  }
`;

const BackButton = styled.div`
  position: fixed;
  top: 40px;
  left: 40px;
  color: #1A1814;
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 1000;
  transition: all 0.3s ease;

  &:hover {
    color: #0047FF;
    transform: translateX(-5px);
  }

  &::before {
    content: '\\f177';
    font-family: 'FontAwesome';
  }
`;

export default function Login({ onLogin, onBack }) {
  const [isActive, setIsActive] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [regUser, setRegUser] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regRepeat, setRegRepeat] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      if (res?.access_token || res?.token) {
        // Save role if provided by API, otherwise default to doctor for now
        // In a real app, the API should return { token, user: { role, ... } }
        const userRole = res.user?.role || (email.includes('admin') ? 'admin' : 'doctor');
        const userName = res.user?.fullName || (email.includes('admin') ? 'Administrator' : 'Medical Professional');
        localStorage.setItem('role', userRole);
        localStorage.setItem('userName', userName);
        onLogin();
      } else { alert("Verification failed."); }
    } catch (err) { alert("An error occurred."); }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (regPass !== regRepeat) return alert("Passwords do not match.");
    try {
      const res = await register({ email: regUser, password: regPass, fullName: regUser.split('@')[0] });
      if (res?.id || res?.email) {
        alert("Registered! Please login.");
        setIsActive(false);
      } else { alert("Registration failed."); }
    } catch (err) { alert("Error."); }
  };

  return (
    <LoginContainer>
      <BackButton onClick={onBack}>Back to Home</BackButton>
      <FormWrapper className={isActive ? 'active' : ''}>
        <Card className="card-back-1" />
        <Card className="card">
          <h1 className="title">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <input type="text" id="Username" required value={email} onChange={e => setEmail(e.target.value)} />
              <label htmlFor="Username">Username</label>
              <div className="bar" />
            </div>
            <div className="input-container">
              <input type="password" id="Password" required value={password} onChange={e => setPassword(e.target.value)} />
              <label htmlFor="Password">Password</label>
              <div className="bar" />
            </div>
            <div className="button-container">
              <button type="submit"><span>Go</span></button>
            </div>
            <div className="footer">
              <a href="#">Forgot your password?</a>
            </div>
          </form>
        </Card>

        <Card className={`card alt ${isActive ? 'active' : ''}`}>
          <div className="toggle" onClick={() => setIsActive(true)} />
          <h1 className="title">
            Register
            <div className="close" onClick={(e) => { e.stopPropagation(); setIsActive(false); }} />
          </h1>
          <form onSubmit={handleRegister}>
            <div className="input-container">
              <input type="text" id="RegUsername" required value={regUser} onChange={e => setRegUser(e.target.value)} />
              <label htmlFor="RegUsername">Username</label>
              <div className="bar" />
            </div>
            <div className="input-container">
              <input type="password" id="RegPassword" required value={regPass} onChange={e => setRegPass(e.target.value)} />
              <label htmlFor="RegPassword">Password</label>
              <div className="bar" />
            </div>
            <div className="input-container">
              <input type="password" id="RepeatPassword" required value={regRepeat} onChange={e => setRegRepeat(e.target.value)} />
              <label htmlFor="RepeatPassword">Repeat Password</label>
              <div className="bar" />
            </div>
            <div className="button-container">
              <button type="submit"><span>Next</span></button>
            </div>
          </form>
        </Card>
      </FormWrapper>
    </LoginContainer>
  );
}