import { useState } from 'react'
import {
  PhoneMissed, MessageSquare, CheckCircle, Calendar, Clock, ClipboardList,
  Wrench, Video, Target, ChevronsRight,
} from 'lucide-react'
import { getTheme, ACCENTS } from './theme'
import { SheetShell, LogoMark, Eyebrow, Pill, GradientText, CapCard, FlowDiagram, Callout, MobileSection, useIsMobile } from './ui'

const MISSED_CALL_STEPS = [
  { label: 'Missed Call', icon: PhoneMissed, color: ACCENTS.pink },
  { label: 'Auto SMS', icon: MessageSquare, color: ACCENTS.amber },
  { label: 'Assist', icon: Calendar, color: ACCENTS.indigo },
  { label: 'Qualified', icon: Target, color: ACCENTS.violet },
  { label: 'Booked', icon: CheckCircle, color: ACCENTS.emerald },
]

const ATTRIBUTION_STEPS = [
  { label: 'Ad Click' }, { label: 'Lead' }, { label: 'Assist Session' }, { label: 'Booking' },
  { label: 'Quote' }, { label: 'Job' }, { label: 'Invoice' }, { label: 'Revenue' },
].map(s => ({ ...s, color: ACCENTS.indigo }))

const CAPS = [
  {
    color: ACCENTS.indigo, icon: Calendar, title: 'Self-service booking',
    desc: 'Customers book, reschedule and cancel themselves — no staff back-and-forth required.',
    tags: ['Staff schedules', 'Job system calendar', 'Duration-aware'],
  },
  {
    color: ACCENTS.violet, icon: Clock, title: 'Book around your business',
    desc: 'Availability follows your rules, not a generic calendar grid.',
    tags: ['No same-day', 'After 3pm blocks tomorrow', 'Suburb allocation', 'AM/PM windows'],
  },
  {
    color: ACCENTS.pink, icon: ClipboardList, title: 'Qualify before you quote',
    desc: 'Capture service, property and photo detail before the booking is confirmed.',
    tags: ['Custom questions', 'Photos & docs', 'Measurements'],
  },
  {
    color: ACCENTS.amber, icon: Wrench, title: 'Straight into your job system',
    desc: 'Confirmed bookings create or update the customer, quote or job automatically.',
    tags: ['Real-time availability', 'SMS confirmation', 'Reminders'],
  },
  {
    color: ACCENTS.emerald, icon: Video, title: 'Every appointment type',
    desc: 'Video consult, on-site visit, quote, assessment, service or install — each with its own rules.',
    tags: ['Video', 'On-site', 'Quote', 'Service', 'Install'],
  },
]

function AssistA4({ t }) {
  return (
    <div style={{ height: '100%', boxSizing: 'border-box', padding: '8mm 12mm', display: 'flex', flexDirection: 'column', gap: '6mm' }}>

      {/* Header */}
      <div style={{ height: '12mm', flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <LogoMark t={t} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Eyebrow t={t} color={ACCENTS.indigo}>Assist</Eyebrow>
          <span style={{ fontSize: 10, color: t.muted, fontWeight: 600 }}>Partner Product Sheet</span>
        </div>
      </div>

      {/* Hero */}
      <div style={{ height: '46mm', flex: '0 0 auto', display: 'flex', gap: '10mm', alignItems: 'center' }}>
        <div style={{ flex: '1 1 60%' }}>
          <h1 style={{ margin: '0 0 6px', fontSize: 30, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.06, color: t.heading }}>
            Turn enquiries into <GradientText t={t}>booked work.</GradientText><br />Automatically.
          </h1>
          <p style={{ margin: '0 0 8px', fontSize: 12.5, fontWeight: 600, color: t.mode === 'dark' ? '#c7d2fe' : '#4f46e5' }}>
            Your rules. Your availability. Your customer books themselves.
          </p>
          <p style={{ margin: 0, fontSize: 10.5, lineHeight: 1.55, color: t.body, maxWidth: '95%' }}>
            Assist isn't just an online calendar. It's a self-service qualification, conversion and
            scheduling layer connected to the operational systems the business already runs.
          </p>
        </div>
        <div style={{ flex: '1 1 40%', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.muted }}>Missed calls become booked work</div>
          <FlowDiagram t={t} steps={MISSED_CALL_STEPS} dense />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
            {['Video Consultation', 'On-Site', 'Quote', 'Assessment', 'Service', 'Installation'].map(p => <Pill key={p} t={t}>{p}</Pill>)}
          </div>
        </div>
      </div>

      {/* Capability grid */}
      <div style={{ height: '48mm', flex: '0 0 auto', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gridTemplateRows: '1fr', gap: '3mm' }}>
        {CAPS.map(c => <CapCard key={c.title} t={t} {...c} />)}
      </div>

      {/* Attribution */}
      <div style={{ height: '26mm', flex: '0 0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 5 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: t.heading, letterSpacing: '-0.01em' }}>Know which marketing actually makes you money.</span>
          <span style={{ fontSize: 9.5, color: t.body }}>Entry source tracked all the way through to invoiced revenue — real ROAS, not just clicks.</span>
        </div>
        <FlowDiagram t={t} steps={ATTRIBUTION_STEPS} dense />
      </div>

      {/* Closing */}
      <div style={{ height: '34mm', flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: '8mm' }}>
        <Callout t={t} color={ACCENTS.indigo} style={{ flex: '1 1 auto', height: '100%' }}>
          Capture. Qualify. Schedule. Convert. — Less admin. Better data. More booked work.
        </Callout>
        <div style={{ flex: '0 0 auto', maxWidth: '70mm', fontSize: 9, lineHeight: 1.5, color: t.muted, display: 'flex', alignItems: 'center', gap: 6 }}>
          <ChevronsRight size={14} color={t.mode === 'dark' ? '#6366f1' : '#4f46e5'} style={{ flex: '0 0 auto' }} />
          Assist extends the job management system already in place — it never replaces it.
        </div>
      </div>

    </div>
  )
}

function AssistMobile({ t }) {
  return (
    <div style={{ boxSizing: 'border-box', padding: '26px 20px 34px', display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <LogoMark t={t} size={24} />
        <Eyebrow t={t} color={ACCENTS.indigo}>Assist</Eyebrow>
      </div>

      <div>
        <h1 style={{ margin: '0 0 8px', fontSize: 27, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.12, color: t.heading }}>
          Turn enquiries into <GradientText t={t}>booked work.</GradientText> Automatically.
        </h1>
        <p style={{ margin: '0 0 8px', fontSize: 14.5, fontWeight: 600, color: t.mode === 'dark' ? '#c7d2fe' : '#4f46e5' }}>
          Your rules. Your availability. Your customer books themselves.
        </p>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: t.body }}>
          Assist isn't just an online calendar. It's a self-service qualification, conversion and
          scheduling layer connected to the operational systems the business already runs.
        </p>
      </div>

      <MobileSection t={t} label="Missed calls become booked work" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <FlowDiagram t={t} steps={MISSED_CALL_STEPS} dense />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {['Video Consultation', 'On-Site', 'Quote', 'Assessment', 'Service', 'Installation'].map(p => <Pill key={p} t={t}>{p}</Pill>)}
        </div>
      </div>

      <MobileSection t={t} label="What Assist does" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {CAPS.map(c => <CapCard key={c.title} t={t} {...c} />)}
      </div>

      <MobileSection t={t} label="Marketing attribution" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ fontSize: 17, fontWeight: 800, color: t.heading, letterSpacing: '-0.01em' }}>Know which marketing actually makes you money.</div>
        <div style={{ fontSize: 13.5, color: t.body, lineHeight: 1.55 }}>Entry source tracked all the way through to invoiced revenue — real ROAS, not just clicks.</div>
        <FlowDiagram t={t} steps={ATTRIBUTION_STEPS} dense />
      </div>

      <MobileSection t={t} />
      <Callout t={t} color={ACCENTS.indigo}>Capture. Qualify. Schedule. Convert. — Less admin. Better data. More booked work.</Callout>
      <div style={{ fontSize: 13, lineHeight: 1.55, color: t.muted, display: 'flex', gap: 8 }}>
        <ChevronsRight size={16} color={t.mode === 'dark' ? '#6366f1' : '#4f46e5'} style={{ flex: '0 0 auto', marginTop: 2 }} />
        Assist extends the job management system already in place — it never replaces it.
      </div>
    </div>
  )
}

export default function AssistSheet() {
  const [theme, setTheme] = useState('dark')
  const mobile = useIsMobile()
  const t = getTheme(theme, mobile)
  return (
    <SheetShell t={t} theme={theme} setTheme={setTheme} title="Assist">
      {mobile ? <AssistMobile t={t} /> : <AssistA4 t={t} />}
    </SheetShell>
  )
}
