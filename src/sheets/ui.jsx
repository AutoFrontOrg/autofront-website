import { useLayoutEffect, useRef, useState, useEffect } from 'react'
import { RADIUS, FONT } from './theme'

// px-per-mm at 96dpi screen preview; print CSS below re-pins the real element to exact mm.
const MM = 3.7795

// Mobile gets a re-flowed single-column layout (not a zoomed-out A4 preview).
export function useIsMobile(breakpoint = 768) {
  const [mobile, setMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(`(max-width: ${breakpoint}px)`).matches
  )
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`)
    const onChange = e => setMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [breakpoint])
  return mobile
}

// ─── Logo ───────────────────────────────────────────────────────────────────
// Two variants of the SAME raster logo: the default has a near-white "Auto"
// wordmark (for dark backgrounds); the ink variant is the same artwork with the
// wordmark recolored to dark ink so it stays legible on white/paper.
export function LogoMark({ t, size = 22 }) {
  const src = t.mode === 'dark' ? '/autofront-logo.png' : '/autofront-logo-ink.png'
  return <img src={src} alt="Autofront" style={{ height: size * 1.7, width: 'auto', display: 'block' }} />
}

// ─── Small pill labels ──────────────────────────────────────────────────────
export function Eyebrow({ t, color, icon: Icon, children }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: t.tint(color, t.mode === 'dark' ? '20' : '12'),
      border: `1px solid ${t.tintBorder(color)}`,
      borderRadius: RADIUS.pill, padding: t.mobile ? '4px 12px' : '3px 11px',
      fontSize: t.mobile ? 11.5 : 9.5, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
      color, whiteSpace: 'nowrap',
    }}>
      {Icon && <Icon size={t.mobile ? 13 : 11} />}
      {children}
    </div>
  )
}

export function Pill({ t, children }) {
  return (
    <span style={{
      display: 'inline-block', background: t.panelAlt, border: `1px solid ${t.border}`,
      borderRadius: RADIUS.pill, padding: t.mobile ? '4px 12px' : '3px 10px', fontSize: t.mobile ? 12 : 9, fontWeight: 600,
      color: t.body, whiteSpace: 'nowrap',
    }}>{children}</span>
  )
}

export function GradientText({ t, children, style }) {
  // Print/PDF rasterisers (Chromium's PDF export in particular) can draw a stray
  // border around background-clip:text gradients. The light theme exists specifically
  // to print reliably, so it uses a flat brand colour instead of the clipped gradient.
  if (t.mode === 'light') {
    return <span style={{ color: '#5b3df0', ...style }}>{children}</span>
  }
  return (
    <span style={{ backgroundImage: t.heroGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', ...style }}>
      {children}
    </span>
  )
}

// ─── Capability card ────────────────────────────────────────────────────────
export function CapCard({ t, color, icon: Icon, title, desc, tags, style }) {
  return (
    <div style={{
      background: t.mode === 'dark' ? 'rgba(255,255,255,0.035)' : '#ffffff',
      border: `1px solid ${t.border}`, borderRadius: RADIUS.lg,
      padding: t.mobile ? '14px 16px' : '11px 13px', display: 'flex', flexDirection: 'column', gap: t.mobile ? 8 : 6,
      boxShadow: t.mode === 'light' ? t.cardShadow : 'none',
      minHeight: 0, ...style,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: t.mobile ? 34 : 26, height: t.mobile ? 34 : 26, flex: '0 0 auto', borderRadius: RADIUS.sm, background: t.tint(color), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={t.mobile ? 18 : 14} color={color} />
        </div>
        <h3 style={{ margin: 0, fontSize: t.mobile ? 15 : 11.5, fontWeight: 700, color: t.heading, letterSpacing: '-0.01em', lineHeight: 1.2 }}>{title}</h3>
      </div>
      <p style={{ margin: 0, fontSize: t.mobile ? 13.5 : 9, lineHeight: t.mobile ? 1.55 : 1.45, color: t.body }}>{desc}</p>
      {tags && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 'auto', paddingTop: 3 }}>
          {tags.map(tag => (
            <span key={tag} style={{ fontSize: t.mobile ? 11 : 7.6, fontWeight: 600, color, background: t.tint(color, '14'), border: `1px solid ${t.tintBorder(color, '2a')}`, borderRadius: RADIUS.pill, padding: t.mobile ? '3px 8px' : '2px 6px' }}>{tag}</span>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Horizontal flow diagram: Step -> Step -> Step ────────────────────────
export function FlowDiagram({ t, steps, color = ACCENTS_DEFAULT, dense }) {
  return (
    <div style={{ display: 'flex', alignItems: 'stretch', flexWrap: 'wrap', gap: dense ? 3 : 6, ...(t.mobile ? { rowGap: 8 } : {}) }}>
      {steps.map((s, i) => (
        <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: dense ? 3 : 6 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: t.tint(s.color || color, t.mode === 'dark' ? '16' : '0e'),
            border: `1px solid ${t.tintBorder(s.color || color)}`,
            borderRadius: RADIUS.pill, padding: t.mobile ? (dense ? '6px 11px' : '8px 14px') : (dense ? '4px 9px' : '6px 12px'),
          }}>
            {s.icon && <s.icon size={t.mobile ? (dense ? 14 : 16) : (dense ? 11 : 13)} color={s.color || color} />}
            <span style={{ fontSize: t.mobile ? (dense ? 11 : 12) : (dense ? 8.5 : 9.5), fontWeight: 700, color: t.heading, whiteSpace: 'nowrap' }}>{s.label}</span>
          </div>
          {i < steps.length - 1 && <ArrowGlyph t={t} />}
        </div>
      ))}
    </div>
  )
}

function ArrowGlyph({ t }) {
  return <span style={{ color: t.faint, fontSize: 11, fontWeight: 700 }}>&rsaquo;</span>
}

const ACCENTS_DEFAULT = '#6366f1'

// ─── Mobile section divider: hairline + small label between mobile sections ────
export function MobileSection({ t, label }) {
  if (!t.mobile) return null
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingTop: 4 }}>
      <div style={{ height: 1, background: t.border, width: '100%' }} />
      {label && (
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: t.faint }}>
          {label}
        </div>
      )}
    </div>
  )
}

// ─── Callout band ───────────────────────────────────────────────────────────
export function Callout({ t, color, children, style }) {
  return (
    <div style={{
      background: t.tint(color, t.mode === 'dark' ? '14' : '0c'),
      border: `1px solid ${t.tintBorder(color)}`,
      borderRadius: RADIUS.lg, padding: t.mobile ? '14px 20px' : '10px 18px',
      display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      ...style,
    }}>
      <span style={{ fontSize: t.mobile ? 16 : 14.5, fontWeight: 800, letterSpacing: '-0.01em', color: t.heading }}>{children}</span>
    </div>
  )
}

// ─── Sheet shell: A4 landscape canvas + screen chrome + print rules ────────
// Scales the fixed-size A4 sheet to fit the viewport: fills wide desktop screens
// (no more manual 150% zoom) and fits mobile widths as a zoomable full-sheet preview.
function ScaledSheet({ t, children }) {
  const wrapRef = useRef(null)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const compute = () => {
      const available = Math.min(window.innerWidth * 0.94, window.innerWidth - 24)
      setScale(Math.min(available / (297 * MM), 1.8))
    }
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [])

  const W = 297 * MM, H = 210 * MM
  return (
    <div className="sheet-sizer" style={{ width: W * scale, height: H * scale, position: 'relative', flex: '0 0 auto', maxWidth: '100%' }}>
      <div className="af-sheet" style={{
        width: W, height: H,
        background: t.page, color: t.ink,
        boxShadow: t.mode === 'dark' ? '0 40px 100px rgba(0,0,0,0.6)' : '0 24px 60px rgba(15,23,42,0.18)',
        position: 'absolute', top: 0, left: 0,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        overflow: 'hidden',
      }}>
        {children}
      </div>
    </div>
  )
}

export function SheetShell({ t, theme, setTheme, children, title }) {
  return (
    <div className="sheet-page-wrap" style={{ minHeight: '100vh', background: t.mode === 'dark' ? '#05070c' : '#e7e9ef', fontFamily: FONT, padding: '20px 0 60px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <style>{PRINT_CSS}</style>

      <div className="sheet-toolbar" style={{ width: '94vw', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: 14, padding: '0 8px' }}>
        <a href="/sheets" style={{ fontSize: 12.5, color: t.mode === 'dark' ? '#9ca3af' : '#4b5566', textDecoration: 'none', fontWeight: 600 }}>&larr; All product sheets</a>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
          <div style={{ display: 'flex', background: t.mode === 'dark' ? 'rgba(255,255,255,0.06)' : '#fff', border: `1px solid ${t.border}`, borderRadius: RADIUS.pill, padding: 3, gap: 2 }}>
            <button onClick={() => setTheme('dark')} style={toggleBtnStyle(theme === 'dark')}>Dark &middot; for email</button>
            <button onClick={() => setTheme('light')} style={toggleBtnStyle(theme === 'light')}>Light &middot; for print</button>
          </div>
          <button onClick={() => window.print()} style={{ padding: '9px 18px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', border: 'none', borderRadius: RADIUS.pill, cursor: 'pointer', fontSize: 12.5, fontWeight: 700 }}>
            Print / Save as PDF
          </button>
        </div>
      </div>

      {t.mobile ? (
        <div className="af-sheet af-sheet-mobile" style={{
          width: '100%', maxWidth: 680, background: t.page, color: t.ink,
          borderRadius: RADIUS.xl, overflow: 'hidden', flex: '0 0 auto',
          boxShadow: t.mode === 'dark' ? '0 40px 100px rgba(0,0,0,0.6)' : '0 24px 60px rgba(15,23,42,0.18)',
        }}>
          {children}
        </div>
      ) : (
        <ScaledSheet t={t}>{children}</ScaledSheet>
      )}
      <div className="sheet-footnote" style={{ marginTop: 10, fontSize: 11, color: t.mode === 'dark' ? '#4b5563' : '#8891a3' }}>{title} &middot; Autofront partner product sheet</div>
    </div>
  )
}

function toggleBtnStyle(active) {
  return {
    padding: '6px 12px', borderRadius: RADIUS.pill, border: 'none', cursor: 'pointer',
    fontSize: 11, fontWeight: 700,
    background: active ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent',
    color: active ? '#fff' : '#8891a3',
  }
}

const PRINT_CSS = `
  @page { size: A4 landscape; margin: 0; }
  @media print {
    html, body { background: #fff !important; margin: 0 !important; }
    .sheet-toolbar, .sheet-footnote { display: none !important; }
    .sheet-sizer { width: auto !important; height: auto !important; }
    .sheet-page-wrap {
      min-height: 0 !important; height: 210mm !important;
      padding: 0 !important; margin: 0 !important; background: #fff !important;
    }
    .af-sheet {
      width: 297mm !important; height: 210mm !important;
      position: static !important; transform: none !important;
      box-shadow: none !important; margin: 0 !important;
      -webkit-print-color-adjust: exact; print-color-adjust: exact;
    }
    .af-sheet-mobile {
      width: 100% !important; max-width: none !important;
      border-radius: 0 !important; box-shadow: none !important;
    }
    * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
`
