import { createGlobalStyle } from 'styled-components';
import { animations } from './theme';

export const GlobalStyles = createGlobalStyle`
  /* Inject animations */
  ${animations.marquee}
  ${animations.scrollLine}
  ${animations.pulse}
  ${animations.fadeUp}

  /* Font imports */
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Fraunces:ital,opsz,wght@0,9..144,100;0,9..144,300;0,9..144,400;1,9..144,300&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    background: ${({ theme }) => theme.colors.background.paper};
  }

  body {
    background: linear-gradient(135deg, #F0F1F5 0%, #D1D5E0 100%);
    color: ${({ theme }) => theme.colors.text.primary};
    font-family: ${({ theme }) => theme.typography.fonts.body};
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
    position: relative;
  }

  /* --- ANIMATED CLOUD BACKGROUND --- */
  #Clouds {
    position: fixed;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
    z-index: 1;
    opacity: 0.4;
  }

  @keyframes Float {
    from { transform: translateX(120vw); }
    to { transform: translateX(-50vw); }
  }

  @keyframes FadeFloat {
    0%, 100% { opacity: 0; }
    20%, 80% { opacity: 1; }
  }

  .Cloud { 
    position: absolute;
    width: 140px;
    height: 90px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;
    animation-timing-function: linear;
    animation-name: Float, FadeFloat;
    
    /* Using the exact image provided by the user */
    background-image: url("/cloud.png");
    mix-blend-mode: multiply; /* Removes the white background from the ink drawing */
    filter: sepia(1) saturate(10) hue-rotate(200deg) brightness(0.4) opacity(0.5);
  }

  .Cloud.Foreground {
    width: 240px;
    height: 150px;
    z-index: 3;
    filter: sepia(1) saturate(10) hue-rotate(200deg) brightness(0.4) opacity(0.7);
  }

  .Cloud.Background {
    width: 130px;
    height: 85px;
    opacity: 0.3;
    z-index: 2;
    filter: sepia(1) saturate(10) hue-rotate(200deg) brightness(0.4) opacity(0.3);
  }

  /* Cloud Positions and Delays */
  .Cloud:nth-child(1) { animation-delay: -10s; top: 5%; animation-duration: 40s; }
  .Cloud:nth-child(2) { animation-delay: -20s; top: 15%; animation-duration: 65s; }
  .Cloud:nth-child(3) { animation-delay: -5s; top: 25%; animation-duration: 45s; }
  .Cloud:nth-child(4) { animation-delay: -35s; top: 35%; animation-duration: 70s; }
  .Cloud:nth-child(5) { animation-delay: -15s; top: 45%; animation-duration: 50s; }
  .Cloud:nth-child(6) { animation-delay: -25s; top: 55%; animation-duration: 75s; }
  .Cloud:nth-child(7) { animation-delay: -45s; top: 65%; animation-duration: 80s; }
  .Cloud:nth-child(8) { animation-delay: -30s; top: 75%; animation-duration: 55s; }
  .Cloud:nth-child(9) { animation-delay: -55s; top: 85%; animation-duration: 85s; }
  .Cloud:nth-child(10) { animation-delay: -65s; top: 95%; animation-duration: 90s; }

  /* Universal cursor hide for all elements and scrollbars */
  *, *::before, *::after, html, body, button, input, select, textarea, a, label {
    cursor: none !important;
  }

  ::-webkit-scrollbar,
  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-thumb,
  ::-webkit-scrollbar-button,
  ::-webkit-scrollbar-corner {
    cursor: none !important;
  }

  /* NOISE TEXTURE OVERLAY */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 9999;
    opacity: 0.4;
  }

  /* CUSTOM SYRINGE CURSOR */
  #cursor {
    position: fixed;
    top: 0; left: 0;
    width: 40px; height: 40px;
    pointer-events: none;
    z-index: 99999;
    transform: translate(-10%, -90%); /* Hotspot at the needle tip (bottom-left of SVG) */
    transition: transform 0.08s linear;
  }
  
  #cursor svg {
    width: 100%; height: 100%;
    transition: all 0.2s ease;
    filter: drop-shadow(0 2px 6px rgba(0,71,255,0.4));
  }
  
  #cursor.hover svg {
    transform: scale(1.4) rotate(15deg);
    filter: drop-shadow(0 2px 12px rgba(0,71,255,0.7));
  }
  
  #cursor.click svg {
    transform: scale(0.8) rotate(-10deg);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    body { cursor: auto; }
    #cursor { display: none; }
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.typography.fonts.display};
    font-weight: ${({ theme }) => theme.typography.fontWeights.extraBold};
    line-height: 0.95;
    letter-spacing: -0.03em;
  }

  p {
    font-family: ${({ theme }) => theme.typography.fonts.mono};
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
    line-height: 1.8;
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  /* Selection */
  ::selection {
    background: ${({ theme }) => theme.colors.primary.light};
    color: ${({ theme }) => theme.colors.primary[500]};
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background.ivory};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.background.charcoal};
    border-radius: 10px;
  }

  /* Utility Classes */
  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.9s cubic-bezier(0.33, 1, 0.68, 1);
  }
  
  .reveal.active {
    opacity: 1;
    transform: translateY(0);
  }

  .outline-text {
    -webkit-text-stroke: 1px ${({ theme }) => theme.colors.text.primary};
    color: transparent;
  }

  .serif-word {
    font-family: ${({ theme }) => theme.typography.fonts.serif};
    font-weight: ${({ theme }) => theme.typography.fontWeights.light};
    font-style: italic;
    color: ${({ theme }) => theme.colors.primary[500]};
  }
`;
