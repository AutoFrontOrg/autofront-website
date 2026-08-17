// Shared design tokens for the partner product sheets.
// Two palettes sharing one shape/spacing scale — 'dark' for on-screen/email PDFs,
// 'light' for cheap, clean paper printing. Same brand, same layout, different ink.

export const RADIUS = { sm: 6, md: 10, lg: 14, xl: 18, pill: 99 }

export const ACCENTS = {
  indigo: '#6366f1',
  violet: '#8b5cf6',
  pink: '#ec4899',
  emerald: '#10b981',
  amber: '#f59e0b',
  cyan: '#06b6d4',
}

export function getTheme(mode, mobile = false) {
  if (mode === 'light') {
    return {
      mode,
      mobile,
      page: '#ffffff',
      panel: '#f8f9fc',
      panelAlt: '#f1f2f8',
      border: 'rgba(15,23,42,0.10)',
      borderStrong: 'rgba(15,23,42,0.16)',
      ink: '#0f1424',
      heading: '#0f1424',
      body: '#4b5566',
      muted: '#8891a3',
      faint: '#aab1c0',
      heroGradient: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #db2777 100%)',
      logoAuto: '#0f1424',
      logoFront: '#1c95a1',
      cardShadow: '0 8px 24px rgba(15,23,42,0.06)',
      tint: (hex, alpha = '14') => hex + alpha,
      tintBorder: (hex, alpha = '35') => hex + alpha,
    }
  }
  return {
    mode: 'dark',
    mobile,
    page: '#0b0f1a',
    panel: '#131828',
    panelAlt: '#0e1320',
    border: 'rgba(255,255,255,0.09)',
    borderStrong: 'rgba(255,255,255,0.16)',
    ink: '#ffffff',
    heading: '#f9fafb',
    body: '#9ca3af',
    muted: '#6b7280',
    faint: '#4b5563',
    heroGradient: 'linear-gradient(135deg, #6366f1 0%, #a78bfa 50%, #ec4899 100%)',
    logoAuto: '#ffffff',
    logoFront: '#29a7b9',
    cardShadow: '0 20px 44px rgba(0,0,0,0.4)',
    tint: (hex, alpha = '1f') => hex + alpha,
    tintBorder: (hex, alpha = '3d') => hex + alpha,
  }
}

export const FONT = "'Inter', system-ui, -apple-system, sans-serif"
