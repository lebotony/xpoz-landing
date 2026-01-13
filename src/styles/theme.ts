export const theme = {
  colors: {
    primary: '#FF4458',
    primaryDark: '#E63946',
    primaryLight: '#FF6B7A',
    secondary: '#10b981',
    secondaryDark: '#059669',
    accent: '#f59e0b',
    dark: '#1f2937',
    darker: '#111827',
    light: '#f9fafb',
    white: '#ffffff',
    text: '#ffffff',
    textSecondary: '#9ca3af',
    textTertiary: '#6b7280',
    border: 'rgba(255, 255, 255, 0.1)',
    surface: '#1f2937',
    surfaceLight: '#374151',
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    gradient: {
      primary: 'linear-gradient(135deg, #FF4458 0%, #7c3aed 100%)',
      secondary: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      warm: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
      cool: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
      hero: 'linear-gradient(135deg, #FF4458 0%, #7c3aed 50%, #10b981 100%)',
      glass: 'rgba(17, 24, 39, 0.4)',
      green: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      red: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    }
  },
  fonts: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    heading: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    md: '1rem',       // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    xxl: '1.5rem',    // 24px
    xxxl: '3rem',     // 48px
    hero: '4rem',     // 64px
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    black: '900',
  },
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    xxl: '3rem',      // 48px
    xxxl: '4rem',     // 64px
  },
  borderRadius: {
    sm: '0.25rem',    // 4px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
    xxl: '1.5rem',    // 24px
    full: '9999px',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    glow: '0 0 30px rgba(255, 68, 88, 0.5)',
    neon: '0 0 40px rgba(255, 68, 88, 0.8), 0 0 80px rgba(124, 58, 237, 0.6)',
  },
  transitions: {
    fast: '150ms ease-in-out',
    normal: '300ms ease-in-out',
    slow: '500ms ease-in-out',
  },
};

export type Theme = typeof theme;
