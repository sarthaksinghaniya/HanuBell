const colors = {
  primary: '#B197FC',
  primarySoft: '#A7C7E7',
  primaryDeep: '#6C5AE0',
  accent: '#FADADD',
  accentGlow: '#F9A8D4',
  background: '#0F172A',
  surface: 'rgba(15, 23, 42, 0.6)',
  surfaceLight: 'rgba(255, 255, 255, 0.18)',
  text: '#F8FAFC',
  textMuted: 'rgba(248, 250, 252, 0.72)',
  border: 'rgba(148, 163, 184, 0.3)',
  success: '#22C55E',
  danger: '#EF4444',
}

const gradients = {
  brand: 'linear-gradient(135deg, #A7C7E7 0%, #B197FC 45%, #FADADD 100%)',
  hero:
    'linear-gradient(180deg, rgba(161, 196, 237, 0.38) 0%, rgba(137, 171, 248, 0.2) 40%, rgba(250, 218, 221, 0.18) 100%)',
  button: 'linear-gradient(135deg, #B197FC 0%, #FADADD 100%)',
  success: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
}

const fonts = {
  primary:
    '"Poppins", "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  body:
    '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
}

const shadows = {
  glow: '0 15px 35px rgba(177, 151, 252, 0.35)',
  soft: '0 8px 20px rgba(15, 23, 42, 0.25)',
  glass: 'inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 20px 45px rgba(15, 23, 42, 0.35)',
}

const spacing = {
  xs: '0.5rem',
  sm: '0.75rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  xxl: '3rem',
}

const radii = {
  xs: '10px',
  sm: '16px',
  md: '24px',
  lg: '32px',
  full: '999px',
}

const animations = {
  fadeIn: 'fade-in 400ms ease-out both',
  float: 'float 5s ease-in-out infinite',
}

const tokens = {
  colors,
  gradients,
  fonts,
  shadows,
  spacing,
  radii,
  animations,
}

export default tokens
