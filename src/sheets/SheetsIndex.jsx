import { ArrowRight } from 'lucide-react'
import { FONT } from './theme'

const SHEETS = [
  { href: '/sheets/assist', name: 'Assist', desc: 'Self-service booking, qualification and scheduling.' },
  { href: '/sheets/connect', name: 'Connect', desc: 'Unified calling, messaging and customer context.' },
  { href: '/sheets/assist-connect', name: 'Assist + Connect', desc: 'The combined customer journey, strategic overview.' },
  { href: '/sheets/connect-tiers', name: 'Plans & Pricing', desc: 'Connect tiers, Assist, bolt-ons and add-ons — everything, priced.' },
]

export default function SheetsIndex() {
  return (
    <div style={{ minHeight: '100vh', background: '#0b0f1a', color: '#fff', fontFamily: FONT, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '80px 20px' }}>
      <img src="/autofront-logo.png" alt="Autofront" style={{ height: 40, marginBottom: 32 }} />
      <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8 }}>Partner Product Sheets</h1>
      <p style={{ color: '#9ca3af', marginBottom: 40, fontSize: 14 }}>Each sheet toggles between a dark version for email and a light version for printing.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 480 }}>
        {SHEETS.map(s => (
          <a key={s.href} href={s.href} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none', color: '#fff', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '16px 20px' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{s.name}</div>
              <div style={{ color: '#9ca3af', fontSize: 12.5 }}>{s.desc}</div>
            </div>
            <ArrowRight size={16} color="#a5b4fc" />
          </a>
        ))}
      </div>
    </div>
  )
}
