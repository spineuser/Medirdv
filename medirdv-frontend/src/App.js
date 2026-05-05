import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { GlobalStyles } from './GlobalStyles';
import Landing from './pages/Landing';

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);

    const onMouseEnterLink = () => setIsHovering(true);
    const onMouseLeaveLink = () => setIsHovering(false);

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    const interactiveElements = document.querySelectorAll("a, button, input, select, textarea, .interactive");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterLink);
      el.addEventListener("mouseleave", onMouseLeaveLink);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterLink);
        el.removeEventListener("mouseleave", onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <div 
      id="cursor" 
      className={`${isHovering ? 'hover' : ''} ${isClicked ? 'click' : ''}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2l4 4" stroke="#0047FF"/>
        <path d="m17 7 3-3" stroke="#0047FF"/>
        <path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5" fill="#1A1814" stroke="#0047FF"/>
        <path d="m9 11 4 4" stroke="#0047FF"/>
        <path d="m5 19-3 3" stroke="#0047FF"/>
        <path d="m14 4 6 6" stroke="#0047FF"/>
      </svg>
    </div>
  );
};

function App() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    if (page === "home") return <Home goLogin={() => setPage("login")} goLanding={() => setPage("landing")} />;
    if (page === "landing") return <Landing onLogin={() => setPage("login")} />;
    if (page === "login") return <Login onLogin={() => setPage("dashboard")} onBack={() => setPage("home")} />;
    if (page === "dashboard") return <Dashboard onLogout={() => setPage("home")} />;
    return null;
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Cursor />
      <div id="Clouds">
        <div className="Cloud Foreground"></div>
        <div className="Cloud Background"></div>
        <div className="Cloud Foreground"></div>
        <div className="Cloud Background"></div>
        <div className="Cloud Foreground"></div>
        <div className="Cloud Background"></div>
        <div className="Cloud Background"></div>
        <div className="Cloud Foreground"></div>
        <div className="Cloud Background"></div>
        <div className="Cloud Background"></div>
      </div>
      <div style={{ position: 'relative', zIndex: 2 }}>
        {renderPage()}
      </div>
    </ThemeProvider>
  );
}

export default App;