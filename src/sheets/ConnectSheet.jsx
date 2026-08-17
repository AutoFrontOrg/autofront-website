import { useState } from 'react'
import {
  Phone, PhoneCall, Mail, MessageSquare, Calendar, CheckCircle, DollarSign,
  Smartphone, Bot, Radio, Gift, ChevronsRight, Wrench,
} from 'lucide-react'
import { getTheme, ACCENTS } from './theme'
import { SheetShell, LogoMark, Eyebrow, GradientText, CapCard, Callout } from './ui'

const TIMELINE = [
  { day: 'MON', time: '12:00', label: 'Email sent', icon: Mail },
  { day: 'MON', time: '12:14', label: 'SMS reply', icon: MessageSquare },
  { day: 'MON', time: '2:17', label: 'Assist booking confirmed', icon: Calendar },
  { day: 'TUE', time: '', label: 'Quote created', icon: Wrench },
  { day: 'THU', time: '', label: 'Job completed', icon: CheckCircle },
  { day: 'FRI', time: '', label: 'Invoice paid', icon: DollarSign },
]

const CAPS = [
  {
    color: ACCENTS.indigo, icon: Smartphone, title: 'One number, private mobile',
    desc: 'A dedicated business number for calls, SMS and voicemail — personal numbers stay private.',
    tags: ['Inbound & outbound', 'Call queues', 'Warm & cold transfer'],
  },
  {
    color: ACCENTS.violet, icon: PhoneCall, title: 'Know who is calling',
    desc: 'Customer, job status and open invoices surface before staff pick up the phone.',
    tags: ['Existing customer', 'Open invoice', 'IVR selection'],
  },
  {
    color: ACCENTS.emerald, icon: Radio, title: 'Intelligent call routing',
    desc: 'Route by staff status, calendar and hours — employee, teammate, voicemail, or AI.',
    tags: ['Availability-aware', 'After-hours greetings', 'Ring groups'],
  },
  {
    color: ACCENTS.amber, icon: Bot, title: 'Adam & Ava',
    desc: 'Adam follows up missed calls by SMS. Ava answers, qualifies and routes by voice. Neither replaces staff — both cover the gaps.',
    tags: ['Missed-call follow-up', 'Voice qualification', 'Never a lost lead'],
  },
  {
    color: ACCENTS.pink, icon: Gift, title: 'Contextual communication',
    desc: 'Make waiting time useful with messages tuned to the customer, queue and campaign.',
    tags: ['Call recording', 'Transcription', 'Seasonal offers'],
  },
]

export default function ConnectSheet() {
  const [theme, setTheme] = useState('dark')
  const t = getTheme(theme)
  return (
    <SheetShell t={t} theme={theme} setTheme={setTheme} title="Connect">
      <div style={{ height: '100%', boxSizing: 'border-box', padding: '8mm 12mm', display: 'flex', flexDirection: 'column', gap: '6mm' }}>

        {/* Header */}
        <div style={{ height: '12mm', flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <LogoMark t={t} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Eyebrow t={t} color={ACCENTS.indigo}>Connect</Eyebrow>
            <span style={{ fontSize: 10, color: t.muted, fontWeight: 600 }}>Partner Product Sheet</span>
          </div>
        </div>

        {/* Hero */}
        <div style={{ height: '46mm', flex: '0 0 auto', display: 'flex', gap: '10mm', alignItems: 'center' }}>
          <div style={{ flex: '1 1 58%' }}>
            <h1 style={{ margin: '0 0 6px', fontSize: 30, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.06, color: t.heading }}>
              Every customer <GradientText t={t}>conversation.</GradientText><br />One place.
            </h1>
            <p style={{ margin: '0 0 8px', fontSize: 12.5, fontWeight: 600, color: t.mode === 'dark' ? '#c7d2fe' : '#4f46e5' }}>
              Calls. Messages. Email. Voicemail. Bookings. Jobs. One chronological timeline.
            </p>
            <p style={{ margin: 0, fontSize: 10.5, lineHeight: 1.55, color: t.body, maxWidth: '95%' }}>
              Connect is the communications layer between the business and its customers — not a phone
              system on its own. The difference is context: communication, customer and job, together.
            </p>
          </div>
          <IncomingCallCard t={t} />
        </div>

        {/* Timeline */}
        <div style={{ height: '26mm', flex: '0 0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 6 }}>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.muted }}>One customer. One timeline.</div>
          <div style={{ display: 'flex', alignItems: 'stretch' }}>
            {TIMELINE.map((e, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                {i > 0 && <div style={{ position: 'absolute', top: 8, right: '50%', width: '100%', height: 1, background: t.border, zIndex: 0 }} />}
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: t.tint(ACCENTS.indigo, t.mode === 'dark' ? '25' : '14'), border: `1px solid ${t.tintBorder(ACCENTS.indigo)}`, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, position: 'relative' }}>
                  <e.icon size={9} color={t.mode === 'dark' ? '#a5b4fc' : '#4f46e5'} />
                </div>
                <div style={{ marginTop: 5, textAlign: 'center' }}>
                  <div style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: '0.05em', color: t.faint }}>{e.day}{e.time ? ` · ${e.time}` : ''}</div>
                  <div style={{ fontSize: 8.6, fontWeight: 600, color: t.heading, maxWidth: 80 }}>{e.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Capability grid */}
        <div style={{ height: '48mm', flex: '0 0 auto', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gridTemplateRows: '1fr', gap: '3mm' }}>
          {CAPS.map(c => <CapCard key={c.title} t={t} {...c} />)}
        </div>

        {/* Closing */}
        <div style={{ height: '34mm', flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: '8mm' }}>
          <Callout t={t} color={ACCENTS.indigo} style={{ flex: '1 1 auto', height: '100%' }}>
            One number. One timeline. Full customer context.
          </Callout>
          <div style={{ flex: '0 0 auto', maxWidth: '70mm', fontSize: 9, lineHeight: 1.5, color: t.muted, display: 'flex', alignItems: 'center', gap: 6 }}>
            <ChevronsRight size={14} color={t.mode === 'dark' ? '#6366f1' : '#4f46e5'} style={{ flex: '0 0 auto' }} />
            Connect layers onto the job management system already in place — it never replaces it.
          </div>
        </div>

      </div>
    </SheetShell>
  )
}

function IncomingCallCard({ t }) {
  return (
    <div style={{
      flex: '1 1 42%', background: t.mode === 'dark' ? '#0e1320' : '#f8f9fc',
      border: `1px solid ${t.border}`, borderRadius: 14, padding: '12px 14px',
      boxShadow: t.mode === 'light' ? t.cardShadow : 'none',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <div style={{ width: 30, height: 30, borderRadius: '50%', background: t.tint(ACCENTS.indigo), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Phone size={14} color={t.mode === 'dark' ? '#a5b4fc' : '#4f46e5'} />
        </div>
        <div>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: t.heading }}>John Doe is calling</div>
          <div style={{ fontSize: 8.5, color: ACCENTS.emerald, fontWeight: 600 }}>Existing Customer</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        <MiniField t={t} label="Current Job" value="Completed" />
        <MiniField t={t} label="Outstanding Invoice" value="INV768 — $800" accent={ACCENTS.amber} />
        <MiniField t={t} label="IVR Selection" value="2 — Service" />
        <MiniField t={t} label="Prior Attempts" value="3, no answer" accent={ACCENTS.pink} />
      </div>
      <div style={{ marginTop: 8, fontSize: 8.6, color: t.muted, lineHeight: 1.4 }}>Know who you're speaking to before you answer.</div>
    </div>
  )
}

function MiniField({ t, label, value, accent }) {
  return (
    <div style={{ background: t.panelAlt, border: `1px solid ${t.border}`, borderRadius: 8, padding: '5px 8px' }}>
      <div style={{ fontSize: 7, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: t.faint }}>{label}</div>
      <div style={{ fontSize: 9, fontWeight: 700, color: accent || t.heading }}>{value}</div>
    </div>
  )
}
