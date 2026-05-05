// Premium Mono/Serif Design System - Theme Configuration
export const theme = {
  colors: {
    // Core Palette
    primary: {
      500: '#0047FF', // Accent Blue
      600: '#0037CC',
      light: '#E8EEFF',
      warm: '#FF4D00', // Accent Warm
    },
    
    background: {
      paper: '#FAF7F2',
      ivory: '#F5F0E8',
      cream: '#EDE7D9',
      charcoal: '#1A1814',
      ink: '#2D2A26',
    },

    text: {
      primary: '#1A1814', // Charcoal
      secondary: '#6B6560', // Muted
      inverse: '#F5F0E8', // Ivory
      accent: '#0047FF',
    },
    
    border: {
      line: 'rgba(26, 24, 20, 0.12)',
      medium: 'rgba(26, 24, 20, 0.25)',
    },

    status: {
      success: '#22c55e',
      error: '#FF4D00',
    }
  },
  
  typography: {
    fonts: {
      display: '"Syne", sans-serif',
      body: '"Syne", sans-serif',
      serif: '"Fraunces", serif',
      mono: '"DM Mono", monospace',
    },
    
    fontSizes: {
      xs: '0.6875rem',    // 11px
      sm: '0.75rem',       // 12px
      base: '0.8125rem',   // 13px
      md: '0.875rem',      // 14px
      lg: '1rem',          // 16px
      xl: '1.25rem',       // 20px
      '2xl': '1.5rem',     // 24px
      '3xl': '2rem',       // 32px
      '4xl': '3.25rem',    // 52px
      '5xl': '5.625rem',   // 90px
      '6xl': '8.75rem',    // 140px
    },
    
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extraBold: 800,
    },
  },
  
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
    '3xl': '6rem',
    '4xl': '8rem',
  },
  
  radii: {
    none: '0',
    sm: '2px',
    md: '4px',
    lg: '8px',
    full: '9999px',
  },
  
  shadows: {
    sm: '0 2px 6px rgba(0, 71, 255, 0.2)',
    md: '0 4px 12px rgba(0, 71, 255, 0.3)',
    lg: '0 8px 24px rgba(0, 71, 255, 0.4)',
  },
  
  transitions: {
    fast: '0.2s ease',
    base: '0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
    slow: '0.6s cubic-bezier(0.645, 0.045, 0.355, 1)',
  },

  breakpoints: {
    md: '768px',
    lg: '1024px',
  },
};

// Advanced animations keyframes
export const animations = {
  marquee: `
    @keyframes marquee {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }
  `,
  scrollLine: `
    @keyframes scrollLine {
      0%, 100% { transform: scaleY(1); opacity: 1; }
      50% { transform: scaleY(0.5); opacity: 0.4; }
    }
  `,
  pulse: `
    @keyframes pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); }
      50% { box-shadow: 0 0 0 6px rgba(34,197,94,0); }
    }
  `,
  fadeUp: `
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `
};
