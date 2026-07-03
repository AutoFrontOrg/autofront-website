import React, { useState, useEffect, useRef } from 'react'
import {
  TrendingUp, MessageSquare, Phone, Mail, Users, Zap, BarChart2,
  Wrench, Bell, Star, ArrowRight, CheckCircle, ChevronDown,
  Smartphone, Target, RefreshCw, MapPin, Building2, Droplets,
  Play, X, Copy, Check, Video, Shield, Map, Bot, Radio,
  PhoneCall, PhoneMissed, PhoneForwarded, Mic, FileText,
  Navigation, Clock, Volume2, Layers, ClipboardList, Camera,
  Ruler, Package, DollarSign, Send, Eye, MessageCircle, Repeat
} from 'lucide-react'

// ─── Global CSS animations ────────────────────────────────────────────────────
const GLOBAL_STYLES = `
  @keyframes floatOrb {
    0%, 100% { transform: translateY(0px) scale(1); }
    33%       { transform: translateY(-28px) scale(1.04); }
    66%       { transform: translateY(-14px) scale(0.97); }
  }
  @keyframes rippleRing {
    0%   { transform: scale(1);   opacity: 0.55; }
    100% { transform: scale(2.8); opacity: 0; }
  }
  @keyframes marqueeTicker {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes pulseDot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.4; transform: scale(0.8); }
  }
  @keyframes blinkCursor {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }
  @keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 24px rgba(99,102,241,0.35); }
    50%       { box-shadow: 0 0 48px rgba(99,102,241,0.65), 0 0 80px rgba(139,92,246,0.25); }
  }
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(56px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes barGrow {
    from { width: 0; }
    to   { width: var(--bar-w); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes barScaleUp {
    from { transform: scaleY(0); }
    to   { transform: scaleY(1); }
  }
  @keyframes drawLine {
    from { stroke-dashoffset: var(--line-len); }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateX(16px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes phoneShake {
    0%,55%,100% { transform: rotate(0deg); }
    10%  { transform: rotate(-16deg); }
    20%  { transform: rotate(15deg); }
    30%  { transform: rotate(-13deg); }
    40%  { transform: rotate(12deg); }
    50%  { transform: rotate(-8deg); }
  }
  @keyframes bubbleIn {
    from { opacity: 0; transform: scale(0.82) translateY(10px); }
    to   { opacity: 1; transform: scale(1)    translateY(0); }
  }
  @keyframes typingBounce {
    0%, 100% { transform: translateY(0);   opacity: 0.4; }
    50%       { transform: translateY(-5px); opacity: 1; }
  }
  @keyframes routeStep {
    from { opacity: 0; transform: translateX(-10px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes ourStoryPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0.55), 0 0 0 0 rgba(139,92,246,0.28); }
    60%       { box-shadow: 0 0 0 9px rgba(99,102,241,0), 0 0 0 17px rgba(139,92,246,0); }
  }
  @keyframes storyFadeIn {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  html { scroll-snap-type: y proximity; }
  .focus-section {
    transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                opacity  0.7s ease,
                filter   0.7s ease;
    will-change: transform, opacity;
    scroll-snap-align: start;
  }
  .focus-section.collapsed {
    transform: scale(0.965);
    opacity: 0.52;
    filter: blur(0.6px);
  }
  .focus-section.in-focus {
    transform: scale(1);
    opacity: 1;
    filter: none;
  }
`

// ─── Demo credentials ─────────────────────────────────────────────────────────
const DEMO_EMAIL = 'demo@autofront.com.au'
const DEMO_PASSWORD = 'AutofrontDemo2024!'

const JMS_OPTIONS = [
  { value: 'simpro', label: 'simPRO' },
  { value: 'tradetrak', label: 'TradeTrak' },
  { value: 'servicem8', label: 'ServiceM8' },
  { value: 'aroflo', label: 'AroFlo' },
  { value: 'other', label: 'Other — please specify' },
]

// ─── Connect feature tiles ────────────────────────────────────────────────────
const CONNECT_FEATURES = [
  { icon: PhoneCall, color: '#6366f1', title: 'Enterprise call routing', desc: 'IVR menus, ring groups, warm and cold transfer, after-hours greetings and holiday schedules. Configure a complete phone system without the hardware.' },
  { icon: PhoneMissed, color: '#ef4444', title: 'Automated missed-call follow-up', desc: 'The moment a call goes unanswered, Connect fires a personalised SMS to the customer automatically. No lead slips through uncontacted.' },
  { icon: Layers, color: '#10b981', title: 'Lifelong customer timeline', desc: 'Every inbound and outbound interaction — calls, texts, images, video — unified in a single chronological record from first lead to latest job. Always searchable.' },
  { icon: FileText, color: '#f59e0b', title: 'Call recording & transcription', desc: 'Every call and video consultation is recorded and transcribed automatically. Sentiment analysis flags tone so managers can coach and customers are never left unhappy.' },
  { icon: Bot, color: '#8b5cf6', title: 'ADAM — AI messaging assistant', desc: 'ADAM reads conversation history, quote details and job status to suggest the perfect reply in seconds. Always on-brand, always in context.' },
  { icon: Navigation, color: '#ec4899', title: 'Smart status messaging', desc: '"Salesman Jane Doe is en route — ETA 28 minutes." Triggered automatically from job status changes, using real-time location to calculate arrival.' },
  { icon: Video, color: '#14b8a6', title: 'Video consultations', desc: 'Send a click-to-join video link via SMS. Conduct remote assessments, walk-throughs or post-job reviews without needing a third-party platform.' },
  { icon: Radio, color: '#f97316', title: 'Internal team comms', desc: 'Group channels for sales and field staff — chat, call, share files and view live staff status (Active / DnD / On a Call / On-site). No WhatsApp needed.' },
  { icon: Map, color: '#06b6d4', title: 'Opt-in location awareness', desc: 'Track field staff through the day with their consent. Smart alerts warn techs when they should be heading off to stay on schedule and notify customers when running late.' },
  { icon: Volume2, color: '#84cc16', title: 'Voicemail everywhere', desc: 'Company voicemail with transcription. Individual staff mailboxes. Missed calls, messages and playback visible across the whole team dashboard.' },
  { icon: Shield, color: '#6366f1', title: 'Full audit & compliance', desc: 'Every call logged with duration, outcome and recording. Perfect for dispute resolution, quality reviews and regulatory requirements.' },
  { icon: Smartphone, color: '#3b82f6', title: 'Works on any device', desc: 'Native mobile app and full browser experience. A sole trader separates personal and business calls on one device. A 50-seat contact centre gets a full wallboard.' },
]

// ─── Platform features ────────────────────────────────────────────────────────
const PLATFORM_FEATURES = [
  { icon: TrendingUp, color: '#6366f1', title: 'Lead Intelligence', desc: 'Capture, score and track every inbound enquiry. Identify which channels convert, where leads drop off, and auto-follow-up with SMS the moment a prospect goes cold.', stats: '+34% avg. conversion lift' },
  { icon: BarChart2, color: '#10b981', title: 'Sales Performance', desc: 'Live revenue dashboards, job pipeline health, quote-to-invoice tracking and technician performance — all in one view.', stats: 'Live P&L per technician' },
  { icon: Target, color: '#f59e0b', title: 'Marketing Intelligence', desc: 'Know precisely which ad spend is working. Track reach, frequency, cost-per-lead and ROAS across Google, Meta and beyond — without leaving the dashboard.', stats: 'Google & Meta connected' },
  { icon: Wrench, color: '#8b5cf6', title: 'Job Management Integration', desc: 'Seamless two-way sync with simPRO, ServiceM8, TradeTrak and AroFlo. See open jobs, scheduled installs and technician locations on a live map.', stats: 'simPRO · ServiceM8 · Trak' },
  { icon: Mail, color: '#ec4899', title: 'Campaigns', desc: 'Send targeted SMS and email campaigns to your existing customer base. Segment by suburb, job type, last service date or lifetime value.', stats: 'SMS + Email, no limits' },
  { icon: Bell, color: '#14b8a6', title: 'Automated Reminders', desc: 'Remind customers when their system is due for a service — personalised, timed and fully automated. Set it and forget it.', stats: 'Automated sequences' },
  { icon: Star, color: '#f97316', title: 'Upsell Engine', desc: 'Identify customers ready for an upgrade based on install date, product age, suburb and climate data. Reach them at the right moment with the right offer.', stats: 'AI-powered targeting' },
]

const DEMO_COMPANIES = [
  { id: 'elec', name: 'APEX Electrical', icon: Zap, color: '#f59e0b', desc: 'Residential & commercial electrical — solar, EV chargers, switchboards' },
  { id: 'plumb', name: 'APEX Plumbing', icon: Droplets, color: '#3b82f6', desc: 'Hot water, drainage, gas fitting and commercial plumbing services' },
]

const INTEGRATIONS = [
  { name: 'simPRO',      logo: '/logos/simpro.png' },
  { name: 'ServiceM8',   logo: '/logos/servicem8.png'  },
  { name: 'TradeTrak',   logo: '/logos/tradetrak.png'  },
  { name: 'AroFlo',      logo: '/logos/aroflo.png'     },
  { name: 'Google Ads',  logo: '/logos/google.png'     },
  { name: 'Meta Ads',    logo: '/logos/meta.png'       },
  { name: 'Twilio',      logo: '/logos/twilio.png'     },
  { name: 'Podium',      logo: '/logos/podium.png'     },
  { name: 'Xero',        logo: '/logos/xero.png'       },
  { name: 'Google Maps', logo: '/logos/google.png'     },
  { name: 'Stripe',      logo: '/logos/stripe.png'     },
]

const TYPEWRITER_WORDS = [
  'business-grade telephony',
  'AI-powered messaging',
  'a single customer timeline',
  'live call routing & IVR',
  'automated follow-up',
  'opt-in location tracking',
]

const HERO_NOTIFS = [
  {
    delay: 500, icon: '📞', iconBg: 'rgba(99,102,241,0.18)',
    label: 'Incoming call', badge: { color: '#6366f1', text: 'Connect' },
    name: 'Sarah Mitchell',
    sub: '3 missed calls · 2 open quotes · $4,200 lifetime value',
  },
  {
    delay: 1400, icon: '⚡', iconBg: 'rgba(139,92,246,0.18)',
    label: 'ADAM suggestion ready', badge: { color: '#8b5cf6', text: 'ADAM AI' },
    name: '“Hi Sarah, your install is Thursday 10AM…”',
    sub: 'Tap to send · based on job JB-4821',
  },
  {
    delay: 2300, icon: '📍', iconBg: 'rgba(16,185,129,0.18)',
    label: 'Tech en route', badge: { color: '#10b981', text: 'Live' },
    name: 'Mark Davis — 4 min away',
    sub: 'SMS sent to customer automatically',
  },
]

// ─── Dashboard carousel data ─────────────────────────────────────────────────
const MARKETING_WEEKS = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8']
const GOOGLE_BARS = [44, 61, 74, 68, 87, 95, 82, 100]
const META_BARS = [29, 37, 43, 40, 55, 50, 64, 60]

const FUNNEL_STAGES = [
  { label: 'Leads In', count: '1,491', pct: 100, color: '#6366f1' },
  { label: 'Qualified', count: '894', pct: 60, color: '#8b5cf6' },
  { label: 'Quote Sent', count: '536', pct: 36, color: '#a78bfa' },
  { label: 'Won', count: '312', pct: 21, color: '#10b981' },
]
const SALESPEOPLE_DATA = [
  { name: 'Sarah Thompson', revenue: '$48.2k', pct: 100, color: '#6366f1' },
  { name: 'Matt Chen', revenue: '$41.5k', pct: 86, color: '#8b5cf6' },
  { name: 'Luke Williams', revenue: '$38.9k', pct: 81, color: '#a78bfa' },
  { name: 'Jessica Roberts', revenue: '$35.1k', pct: 73, color: '#ec4899' },
  { name: 'Alex Parker', revenue: '$29.8k', pct: 62, color: '#f97316' },
]
const DAILY_LEADS = [12, 8, 15, 11, 18, 14, 9, 21, 17, 13, 19, 16, 11, 24, 20, 15, 22, 18, 13, 26, 21, 16, 23, 19, 14, 28, 24, 18, 25, 31]

const DASH_PANELS = [
  { id: 'marketing', label: 'Marketing', icon: Target, color: '#6366f1', kpi: 'ROAS 4.2×', sub: 'Google & Meta ads' },
  { id: 'conversions', label: 'Conversions', icon: TrendingUp, color: '#10b981', kpi: '64% win rate', sub: 'Lead to won' },
  { id: 'salespeople', label: 'Sales Team', icon: Users, color: '#f59e0b', kpi: '$193.5k revenue', sub: 'Current month' },
  { id: 'leads', label: 'Leads', icon: BarChart2, color: '#ec4899', kpi: '46.7% booked', sub: 'Last 30 days' },
]

// ─── SVG chart components ─────────────────────────────────────────────────────
function MarketingChart({ animate }) {
  const W = 380, H = 172, lp = 30, rp = 8, tp = 26, bp = 26
  const chartW = W - lp - rp, chartH = H - tp - bp
  const groupW = chartW / 8, barW = 12
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="gg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#818cf8" /><stop offset="100%" stopColor="#6366f1" /></linearGradient>
        <linearGradient id="mg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f472b6" /><stop offset="100%" stopColor="#ec4899" /></linearGradient>
      </defs>
      {[0, 25, 50, 75, 100].map(v => {
        const y = tp + chartH - (v / 100) * chartH
        return <g key={v}>
          <line x1={lp} y1={y} x2={W - rp} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <text x={lp - 4} y={y + 3} fill="#374151" fontSize="8" textAnchor="end">{v}</text>
        </g>
      })}
      {MARKETING_WEEKS.map((week, i) => {
        const gx = lp + i * groupW
        const gh = (GOOGLE_BARS[i] / 100) * chartH
        const mh = (META_BARS[i] / 100) * chartH
        return <g key={i}>
          <rect x={gx + 4} y={tp + chartH - gh} width={barW} height={gh} fill="url(#gg)" rx="2"
            style={{
              transformOrigin: '50% 100%', transform: 'scaleY(0)',
              animation: animate ? `barScaleUp 0.5s ease ${(i * 0.07).toFixed(2)}s forwards` : 'none'
            }} />
          <rect x={gx + 4 + barW + 3} y={tp + chartH - mh} width={barW} height={mh} fill="url(#mg)" rx="2"
            style={{
              transformOrigin: '50% 100%', transform: 'scaleY(0)',
              animation: animate ? `barScaleUp 0.5s ease ${(i * 0.07 + 0.04).toFixed(2)}s forwards` : 'none'
            }} />
          <text x={gx + groupW / 2} y={H - 5} fill="#374151" fontSize="8" textAnchor="middle">{week}</text>
        </g>
      })}
      <line x1={lp} y1={tp + chartH} x2={W - rp} y2={tp + chartH} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <circle cx={lp + 8} cy={tp - 11} r="4" fill="url(#gg)" />
      <text x={lp + 16} y={tp - 7} fill="#6b7280" fontSize="9">Google Ads</text>
      <circle cx={lp + 88} cy={tp - 11} r="4" fill="url(#mg)" />
      <text x={lp + 96} y={tp - 7} fill="#6b7280" fontSize="9">Meta Ads</text>
    </svg>
  )
}

function FunnelChart({ animate }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '14px 24px 10px' }}>
      {FUNNEL_STAGES.map((s, i) => (
        <div key={i} style={{ animation: animate ? `fadeSlideIn 0.4s ease ${(i * 0.1).toFixed(2)}s both` : 'none' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
            <span style={{ color: '#9ca3af', fontSize: '0.8rem', fontWeight: 500 }}>{s.label}</span>
            <div style={{ display: 'flex', gap: 14 }}>
              <span style={{ color: '#e0e7ff', fontSize: '0.8rem', fontWeight: 700 }}>{s.count}</span>
              <span style={{ color: s.color, fontSize: '0.8rem', fontWeight: 700, minWidth: 38, textAlign: 'right' }}>{s.pct}%</span>
            </div>
          </div>
          <div style={{ height: 9, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 99,
              background: `linear-gradient(90deg, ${s.color}, ${s.color}bb)`,
              '--bar-w': `${s.pct}%`, width: 0,
              animation: animate ? `barGrow 0.65s ease ${(i * 0.12).toFixed(2)}s forwards` : 'none'
            }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function SalespeopleChart({ animate }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '10px 24px' }}>
      {SALESPEOPLE_DATA.map((s, i) => (
        <div key={i} style={{ animation: animate ? `fadeSlideIn 0.4s ease ${(i * 0.08).toFixed(2)}s both` : 'none' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ color: '#9ca3af', fontSize: '0.77rem', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 170 }}>{s.name}</span>
            <span style={{ color: '#e0e7ff', fontSize: '0.77rem', fontWeight: 700, flexShrink: 0, marginLeft: 8 }}>{s.revenue}</span>
          </div>
          <div style={{ height: 7, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 99,
              background: `linear-gradient(90deg, ${s.color}, ${s.color}99)`,
              '--bar-w': `${s.pct}%`, width: 0,
              animation: animate ? `barGrow 0.6s ease ${(i * 0.1).toFixed(2)}s forwards` : 'none'
            }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function LeadsChart({ animate }) {
  const W = 380, H = 164, lp = 30, rp = 10, tp = 14, bp = 26
  const chartW = W - lp - rp, chartH = H - tp - bp
  const max = 31
  const pts = DAILY_LEADS.map((v, i) => [
    lp + (i / (DAILY_LEADS.length - 1)) * chartW,
    tp + chartH - (v / max) * chartH
  ])
  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ')
  const areaPath = `${linePath} L${pts[pts.length - 1][0].toFixed(1)} ${(tp + chartH).toFixed(1)} L${pts[0][0].toFixed(1)} ${(tp + chartH).toFixed(1)}Z`
  const lineLen = 720
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="af" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ec4899" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 0.33, 0.67, 1].map((f, i) => {
        const y = tp + chartH - f * chartH
        return <g key={i}>
          <line x1={lp} y1={y} x2={W - rp} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <text x={lp - 4} y={y + 3} fill="#374151" fontSize="8" textAnchor="end">{Math.round(f * max)}</text>
        </g>
      })}
      <path d={areaPath} fill="url(#af)" />
      <path d={linePath} fill="none" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        style={{
          strokeDasharray: lineLen, '--line-len': lineLen,
          strokeDashoffset: animate ? lineLen : 0,
          animation: animate ? 'drawLine 1.3s ease forwards' : 'none'
        }} />
      {[0, 5, 11, 17, 23, 29].map((idx, i) => (
        <text key={i} x={lp + (idx / (DAILY_LEADS.length - 1)) * chartW} y={H - 5} fill="#374151" fontSize="8" textAnchor="middle">D{idx + 1}</text>
      ))}
      <line x1={lp} y1={tp + chartH} x2={W - rp} y2={tp + chartH} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
    </svg>
  )
}

// ─── Dashboard carousel ───────────────────────────────────────────────────────
function DashboardCarousel() {
  const [active, setActive] = useState(0)
  const [animKey, setAnimKey] = useState(0)

  const go = (idx) => { setActive(idx); setAnimKey(k => k + 1) }

  useEffect(() => {
    const t = setInterval(() => {
      setActive(a => { const next = (a + 1) % DASH_PANELS.length; setAnimKey(k => k + 1); return next })
    }, 5000)
    return () => clearInterval(t)
  }, [])

  const panel = DASH_PANELS[active]

  const chartMap = {
    marketing: <MarketingChart key={animKey} animate={true} />,
    conversions: <FunnelChart key={animKey} animate={true} />,
    salespeople: <SalespeopleChart key={animKey} animate={true} />,
    leads: <LeadsChart key={animKey} animate={true} />,
  }

  const kpiMap = {
    marketing: [{ label: 'Total Spend', value: '$48.2k', color: '#818cf8' }, { label: 'ROAS', value: '4.2×', color: '#a78bfa' }, { label: 'Leads Generated', value: '312', color: '#10b981' }],
    conversions: [{ label: 'Leads In', value: '1,491', color: '#6366f1' }, { label: 'Deals Won', value: '312', color: '#10b981' }, { label: 'Win Rate', value: '64%', color: '#f59e0b' }],
    salespeople: [{ label: 'Top Earner', value: 'Sarah T.', color: '#6366f1' }, { label: 'Team Revenue', value: '$193.5k', color: '#10b981' }, { label: 'Avg Deal Value', value: '$618', color: '#f59e0b' }],
    leads: [{ label: 'Total Leads', value: '1,491', color: '#6366f1' }, { label: 'Booked Rate', value: '46.7%', color: '#10b981' }, { label: 'Daily Average', value: '49.7', color: '#ec4899' }],
  }

  return (
    <div style={{
      maxWidth: 900, margin: '0 auto',
      background: 'linear-gradient(135deg, rgba(15,20,35,0.95), rgba(10,14,26,0.98))',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 20, overflow: 'hidden',
      boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.12), inset 0 1px 0 rgba(255,255,255,0.05)',
    }}>
      {/* Browser chrome */}
      <div style={{ padding: '11px 16px', background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          {['#ef4444', '#f59e0b', '#10b981'].map((col, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: col, opacity: 0.65 }} />
          ))}
        </div>
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: 6, padding: '4px 10px', fontSize: '0.7rem', color: '#4b5563', textAlign: 'center' }}>
          dashboard.autofront.com.au
        </div>
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', animation: 'pulseDot 2s ease-in-out infinite' }} />
          <span style={{ fontSize: '0.67rem', color: '#6b7280' }}>Live</span>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}>
        {DASH_PANELS.map((p, i) => {
          const isActive = i === active
          return (
            <button key={p.id} onClick={() => go(i)} style={{
              flex: 1, padding: '10px 6px', background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              position: 'relative', transition: 'all .2s',
            }}>
              <p.icon size={13} color={isActive ? p.color : '#4b5563'} style={{ transition: 'color .2s' }} />
              <span style={{ fontSize: '0.66rem', fontWeight: isActive ? 700 : 400, color: isActive ? p.color : '#6b7280', transition: 'all .2s', whiteSpace: 'nowrap' }}>{p.label}</span>
              {isActive && (
                <div style={{ position: 'absolute', bottom: 0, left: '8%', right: '8%', height: 2, background: p.color, borderRadius: '2px 2px 0 0' }} />
              )}
            </button>
          )
        })}
      </div>

      {/* Chart */}
      <div style={{ height: 196, overflow: 'hidden', position: 'relative' }}>
        {chartMap[panel.id]}
      </div>

      {/* KPI strip */}
      <div style={{ display: 'flex', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}>
        {kpiMap[panel.id].map((k, i) => (
          <div key={`${panel.id}-${i}`} style={{
            flex: 1, padding: '10px 14px', textAlign: 'center',
            borderRight: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            animation: `fadeSlideIn 0.4s ease ${(i * 0.08).toFixed(2)}s both`,
          }}>
            <div style={{ fontSize: '0.65rem', color: '#6b7280', marginBottom: 3, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{k.label}</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: k.color, whiteSpace: 'nowrap' }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 7, padding: '10px 0 12px', background: 'rgba(0,0,0,0.15)' }}>
        {DASH_PANELS.map((_, i) => (
          <button key={i} onClick={() => go(i)} style={{
            width: i === active ? 22 : 7, height: 7, borderRadius: 99,
            background: i === active ? DASH_PANELS[active].color : 'rgba(255,255,255,0.15)',
            border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease',
          }} />
        ))}
      </div>
    </div>
  )
}

// ─── Section focus (scroll-driven hero/collapse) ─────────────────────────────
function useSectionFocus() {
  const ref = useRef(null)
  const [focused, setFocused] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    // "in-focus" zone = middle 50% of viewport (25% margins top & bottom)
    const obs = new IntersectionObserver(
      ([entry]) => setFocused(entry.isIntersecting),
      { rootMargin: '-25% 0px -25% 0px', threshold: 0 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, focused]
}

function FocusSection({ id, children, sectionStyle = {} }) {
  const [ref, focused] = useSectionFocus()
  return (
    <section
      ref={ref}
      id={id}
      className={`focus-section ${focused ? 'in-focus' : 'collapsed'}`}
      style={sectionStyle}
    >
      {children}
    </section>
  )
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ to, suffix = '', duration = 1800 }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1)
          const ease = 1 - Math.pow(1 - progress, 3)
          setVal(Math.round(ease * to))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [to, duration])
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>
}

// ─── Scroll reveal ────────────────────────────────────────────────────────────
function useScrollReveal(threshold = 0.12) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect() }
    }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, vis]
}

function Reveal({ children, delay = 0, direction = 'up', style: extraStyle = {} }) {
  const [ref, vis] = useScrollReveal()
  const init = direction === 'left' ? 'translateX(-32px)' : direction === 'right' ? 'translateX(32px)' : 'translateY(36px)'
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'none' : init,
      transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      ...extraStyle,
    }}>
      {children}
    </div>
  )
}

// ─── 3-D tilt card ────────────────────────────────────────────────────────────
function TiltCard({ children, style: extraStyle = {} }) {
  const ref = useRef(null)
  const canHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches
  const onMove = (e) => {
    if (!canHover || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    ref.current.style.transform = `perspective(700px) rotateY(${x * 9}deg) rotateX(${-y * 9}deg) scale(1.03)`
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'perspective(700px) rotateY(0deg) rotateX(0deg) scale(1)'
  }
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ transition: 'transform 0.18s ease', transformStyle: 'preserve-3d', ...extraStyle }}
    >
      {children}
    </div>
  )
}

// ─── Typewriter ───────────────────────────────────────────────────────────────
function Typewriter() {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) {
      const t = setTimeout(() => { setPaused(false); setDeleting(true) }, 1800)
      return () => clearTimeout(t)
    }
    const word = TYPEWRITER_WORDS[idx]
    if (!deleting) {
      if (text.length < word.length) {
        const t = setTimeout(() => setText(word.slice(0, text.length + 1)), 55)
        return () => clearTimeout(t)
      }
      setPaused(true)
    } else {
      if (text.length > 0) {
        const t = setTimeout(() => setText(text.slice(0, -1)), 28)
        return () => clearTimeout(t)
      }
      setDeleting(false)
      setIdx(i => (i + 1) % TYPEWRITER_WORDS.length)
    }
  }, [text, deleting, paused, idx])

  const longestLen = Math.max(...TYPEWRITER_WORDS.map(w => w.length))
  return (
    <span style={{
      color: '#a5b4fc',
      display: 'inline-block',
      verticalAlign: 'bottom',
      minWidth: `${longestLen * 0.58}em`,
      whiteSpace: 'nowrap',
    }}>
      {text}
      <span style={{ animation: 'blinkCursor 1s step-end infinite', color: '#6366f1', marginLeft: 1 }}>|</span>
    </span>
  )
}

// ─── Infinite marquee ─────────────────────────────────────────────────────────
function InfiniteMarquee() {
  const items = [...INTEGRATIONS, ...INTEGRATIONS]
  return (
    <div style={{
      overflow: 'hidden', width: '100%',
      maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
    }}>
      <div style={{
        display: 'flex', gap: 12, width: 'max-content',
        animation: 'marqueeTicker 28s linear infinite',
      }}>
        {items.map((item, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: 10, padding: '10px 18px', whiteSpace: 'nowrap', flexShrink: 0,
            display: 'flex', alignItems: 'center', gap: 9,
            transition: 'border-color .2s, background .2s',
            cursor: 'default',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.35)'; e.currentTarget.style.background = 'rgba(99,102,241,0.08)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
          >
            <img
              src={item.logo}
              alt={item.name}
              style={{ width: 20, height: 20, objectFit: 'contain', borderRadius: 4, flexShrink: 0 }}
              onError={e => { e.currentTarget.style.display = 'none' }}
            />
            <span style={{ fontSize: '0.87rem', color: '#9ca3af', fontWeight: 500 }}>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Hero notification cards ──────────────────────────────────────────────────
function HeroNotifications() {
  const [vis, setVis] = useState([])
  useEffect(() => {
    HERO_NOTIFS.forEach((n, i) => {
      const t = setTimeout(() => setVis(v => [...v, i]), n.delay)
      return () => clearTimeout(t)
    })
  }, [])
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {HERO_NOTIFS.map((n, i) => (
        <div key={i} style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 16, padding: '14px 16px',
          backdropFilter: 'blur(12px)',
          opacity: vis.includes(i) ? 1 : 0,
          transform: vis.includes(i) ? 'translateX(0)' : 'translateX(52px)',
          transition: 'opacity 0.55s ease, transform 0.55s ease',
          boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 11,
              background: n.iconBg, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.15rem',
            }}>
              {n.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3, gap: 8 }}>
                <span style={{ color: '#9ca3af', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                  {n.label}
                </span>
                <span style={{
                  background: n.badge.color + '22', color: n.badge.color, border: `1px solid ${n.badge.color}44`,
                  fontSize: '0.67rem', fontWeight: 700, borderRadius: 99, padding: '2px 8px', letterSpacing: '0.04em', flexShrink: 0,
                }}>
                  {n.badge.text}
                </span>
              </div>
              <div style={{ color: '#fff', fontSize: '0.84rem', fontWeight: 600, marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {n.name}
              </div>
              <div style={{ color: '#6b7280', fontSize: '0.74rem', lineHeight: 1.4 }}>{n.sub}</div>
            </div>
          </div>
        </div>
      ))}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 6, marginTop: 4 }}>
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', animation: 'pulseDot 2s ease-in-out infinite', flexShrink: 0 }} />
        <span style={{ color: '#6b7280', fontSize: '0.72rem' }}>Live — updating in real time</span>
      </div>
    </div>
  )
}

// ─── Connect ripple visual ────────────────────────────────────────────────────
// ─── Connect carousel data ───────────────────────────────────────────────────
const CONNECT_PANELS = [
  { id: 'incoming', label: 'Incoming Call', icon: PhoneCall, color: '#6366f1', sub: 'Live call routing' },
  { id: 'teamchat', label: 'Team Chat', icon: MessageSquare, color: '#8b5cf6', sub: 'Internal messaging' },
  { id: 'customersms', label: 'Customer SMS', icon: Smartphone, color: '#ec4899', sub: 'ADAM suggestions' },
  { id: 'teamboard', label: 'Team Board', icon: Users, color: '#10b981', sub: 'Live availability' },
]
const TEAM_MESSAGES = [
  { initials: 'MC', color: '#6366f1', name: 'Matt Chen', side: 'left', text: "Can someone cover the 2pm Northcote quote? Stuck at Kew job." },
  { initials: 'ST', color: '#10b981', name: 'Sarah Thompson', side: 'right', text: "On it — heading over now. I can do the 4pm Fitzroy one too." },
  { initials: 'LW', color: '#f59e0b', name: 'Luke Williams', side: 'left', text: "Nice work Sarah. Matt, I sent the Kew customer your ETA." },
]
const SMS_EXCHANGE = [
  { side: 'in', name: 'Sarah Chen', text: "Hi, wondering when my hot water install is happening? I booked last week.", ts: '9:14 AM' },
  { side: 'adam', name: 'ADAM', text: "Hi Sarah! Your install is this Thursday 10\u201311 AM with tech Mark Davis. You\u2019ll get a live SMS when he\u2019s en route.", ts: '' },
  { side: 'out', name: 'You', text: "Hi Sarah! Your install is this Thursday 10\u201311 AM with tech Mark Davis. You\u2019ll get an SMS when he\u2019s en route \uD83D\uDE0A", ts: '9:14 AM' },
]
const TEAM_STATUS = [
  { initials: 'ST', color: '#10b981', name: 'Sarah Thompson', status: 'On Call', duration: '2:34', dotColor: '#10b981' },
  { initials: 'MC', color: '#6366f1', name: 'Matt Chen', status: 'Available', duration: null, dotColor: '#10b981' },
  { initials: 'LW', color: '#f59e0b', name: 'Luke Williams', status: 'On Call', duration: '0:48', dotColor: '#10b981' },
  { initials: 'JR', color: '#ec4899', name: 'Jessica Roberts', status: 'Away', duration: null, dotColor: '#f59e0b' },
  { initials: 'AP', color: '#8b5cf6', name: 'Alex Parker', status: 'Available', duration: null, dotColor: '#10b981' },
]

// Small avatar
function Av({ initials, color, size = 28 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: `${color}30`, border: `1.5px solid ${color}55`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.36, fontWeight: 700, color, flexShrink: 0,
    }}>{initials}</div>
  )
}

// ── Panel 1: Incoming call ────────────────────────────────────────────────────
const ROUTE_STEPS = [
  { label: 'IVR Menu', icon: Volume2, color: '#6366f1' },
  { label: 'Sales Queue', icon: Users, color: '#8b5cf6' },
  { label: 'Sarah Thompson', icon: PhoneCall, color: '#10b981' },
]
function IncomingCallPanel({ animate }) {
  return (
    <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Ringing card */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 14,
        background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.22)',
        borderRadius: 14, padding: '14px 18px',
        animation: animate ? 'bubbleIn 0.38s ease both' : 'none',
      }}>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <div style={{
            width: 46, height: 46, borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: animate ? 'phoneShake 0.9s ease 0.6s infinite' : 'none',
          }}>
            <Phone size={20} color="white" />
          </div>
          <div style={{ position: 'absolute', inset: -7, borderRadius: '50%', border: '1.5px solid rgba(99,102,241,0.4)', animation: 'rippleRing 1.8s ease-out 0.3s infinite', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', inset: -14, borderRadius: '50%', border: '1px solid rgba(99,102,241,0.2)', animation: 'rippleRing 1.8s ease-out 0.9s infinite', pointerEvents: 'none' }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '0.68rem', color: '#818cf8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 3 }}>Incoming Call</div>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: '#e0e7ff' }}>John Chapman</div>
          <div style={{ fontSize: '0.77rem', color: '#6b7280' }}>0412 345 678 · <span style={{ color: '#f59e0b' }}>2 open jobs</span></div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(16,185,129,0.4)' }}>
            <Phone size={15} color="white" />
          </div>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(239,68,68,0.4)' }}>
            <X size={15} color="white" />
          </div>
        </div>
      </div>

      {/* Routing steps */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.69rem', color: '#6b7280', fontWeight: 500 }}>Routing:</span>
        {ROUTE_STEPS.map((step, i) => (
          <React.Fragment key={i}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 5,
              background: `${step.color}15`, border: `1px solid ${step.color}35`,
              borderRadius: 8, padding: '4px 10px',
              animation: animate ? `routeStep 0.3s ease ${0.55 + i * 0.22}s both` : 'none',
            }}>
              <step.icon size={11} color={step.color} />
              <span style={{ fontSize: '0.71rem', color: step.color, fontWeight: 600 }}>{step.label}</span>
            </div>
            {i < ROUTE_STEPS.length - 1 && (
              <div style={{ animation: animate ? `routeStep 0.25s ease ${0.62 + i * 0.22}s both` : 'none' }}>
                <ArrowRight size={11} color="#374151" />
              </div>
            )}
          </React.Fragment>
        ))}
        <div style={{
          width: 16, height: 16, borderRadius: '50%', background: '#10b981',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: animate ? 'routeStep 0.25s ease 1.25s both' : 'none',
        }}>
          <Check size={10} color="white" />
        </div>
      </div>

      {/* Customer context */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8,
        animation: animate ? 'bubbleIn 0.35s ease 1.35s both' : 'none',
      }}>
        {[
          { label: 'Last job', value: '12 Apr', color: '#818cf8' },
          { label: 'Open quotes', value: '1 pending', color: '#f59e0b' },
          { label: 'Call attempt', value: '2nd today', color: '#ef4444' },
        ].map((k, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: '7px 10px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.62rem', color: '#6b7280', marginBottom: 2 }}>{k.label}</div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: k.color }}>{k.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Panel 2: Team chat ────────────────────────────────────────────────────────
function TeamChatPanel({ animate }) {
  return (
    <div style={{ padding: '14px 20px' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12,
        paddingBottom: 11, borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <MessageSquare size={13} color="#8b5cf6" />
        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#e0e7ff' }}># sales-team</span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', animation: 'pulseDot 1.5s ease-in-out infinite' }} />
          <span style={{ fontSize: '0.67rem', color: '#6b7280' }}>3 online</span>
        </div>
      </div>
      {/* Messages */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        {TEAM_MESSAGES.map((msg, i) => (
          <div key={i} style={{
            display: 'flex', gap: 9,
            flexDirection: msg.side === 'right' ? 'row-reverse' : 'row',
            animation: animate ? `bubbleIn 0.38s ease ${i * 0.38}s both` : 'none',
          }}>
            <Av initials={msg.initials} color={msg.color} size={26} />
            <div style={{ maxWidth: '76%' }}>
              <div style={{ fontSize: '0.65rem', color: msg.color, fontWeight: 600, marginBottom: 3, textAlign: msg.side === 'right' ? 'right' : 'left' }}>{msg.name}</div>
              <div style={{
                background: msg.side === 'right' ? `${msg.color}1e` : 'rgba(255,255,255,0.05)',
                border: `1px solid ${msg.side === 'right' ? msg.color + '38' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: msg.side === 'right' ? '14px 4px 14px 14px' : '4px 14px 14px 14px',
                padding: '8px 12px', fontSize: '0.77rem', color: '#d1d5db', lineHeight: 1.5,
              }}>{msg.text}</div>
            </div>
          </div>
        ))}
        {/* Typing indicator */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          animation: animate ? `bubbleIn 0.38s ease ${TEAM_MESSAGES.length * 0.38 + 0.2}s both` : 'none',
        }}>
          <Av initials="JR" color="#ec4899" size={26} />
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px 14px 14px 14px', padding: '9px 14px', display: 'flex', gap: 4, alignItems: 'center' }}>
            {[0, 1, 2].map(j => (
              <div key={j} style={{ width: 5, height: 5, borderRadius: '50%', background: '#6b7280', animation: `typingBounce 1s ease ${j * 0.18}s infinite` }} />
            ))}
          </div>
          <span style={{ fontSize: '0.66rem', color: '#4b5563' }}>Jessica is typing…</span>
        </div>
      </div>
    </div>
  )
}

// ── Panel 3: Customer SMS ─────────────────────────────────────────────────────
function CustomerSMSPanel({ animate }) {
  return (
    <div style={{ padding: '14px 20px' }}>
      {/* Contact header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12,
        paddingBottom: 11, borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <Av initials="SC" color="#ec4899" size={30} />
        <div>
          <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#e0e7ff' }}>Sarah Chen</div>
          <div style={{ fontSize: '0.67rem', color: '#6b7280' }}>Customer · 0407 812 943 · <span style={{ color: '#f59e0b' }}>1 open quote</span></div>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(99,102,241,0.14)', border: '1px solid rgba(99,102,241,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Phone size={13} color="#818cf8" />
          </div>
        </div>
      </div>
      {/* Message thread */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {SMS_EXCHANGE.map((msg, i) => (
          <div key={i} style={{
            animation: animate ? `bubbleIn 0.38s ease ${i * 0.42}s both` : 'none',
          }}>
            {msg.side === 'adam' ? (
              <div style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: 12, padding: '9px 12px', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <Zap size={12} color="#a78bfa" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div style={{ fontSize: '0.63rem', color: '#a78bfa', fontWeight: 700, marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.07em' }}>ADAM Suggestion — tap to send</div>
                  <p style={{ fontSize: '0.77rem', color: '#e9d5ff', margin: 0, lineHeight: 1.5 }}>{msg.text}</p>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: msg.side === 'out' ? 'row-reverse' : 'row', gap: 8 }}>
                <div style={{
                  maxWidth: '84%',
                  background: msg.side === 'out' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'rgba(255,255,255,0.05)',
                  border: msg.side === 'out' ? 'none' : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: msg.side === 'out' ? '14px 4px 14px 14px' : '4px 14px 14px 14px',
                  padding: '9px 13px',
                }}>
                  <p style={{ fontSize: '0.77rem', color: '#e0e7ff', margin: 0, lineHeight: 1.5 }}>{msg.text}</p>
                  {msg.ts && <div style={{ fontSize: '0.6rem', color: msg.side === 'out' ? 'rgba(255,255,255,0.5)' : '#4b5563', marginTop: 3, textAlign: msg.side === 'out' ? 'right' : 'left' }}>{msg.ts}</div>}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Panel 4: Team board ───────────────────────────────────────────────────────
function TeamBoardPanel({ animate }) {
  return (
    <div style={{ padding: '14px 22px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, paddingBottom: 11, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Radio size={13} color="#10b981" />
        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#e0e7ff' }}>Live Team Activity</span>
        <div style={{ marginLeft: 'auto', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.22)', borderRadius: 99, padding: '3px 9px', fontSize: '0.64rem', color: '#6ee7b7', fontWeight: 600 }}>
          2 active calls
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {TEAM_STATUS.map((t, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '7px 10px', borderRadius: 10,
            background: t.status === 'On Call' ? 'rgba(16,185,129,0.06)' : 'rgba(255,255,255,0.01)',
            border: `1px solid ${t.status === 'On Call' ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.04)'}`,
            animation: animate ? `fadeSlideIn 0.32s ease ${i * 0.1}s both` : 'none',
          }}>
            <div style={{ position: 'relative' }}>
              <Av initials={t.initials} color={t.color} size={28} />
              <div style={{
                position: 'absolute', bottom: -1, right: -1,
                width: 9, height: 9, borderRadius: '50%',
                background: t.dotColor, border: '1.5px solid #0f1423',
                animation: t.status === 'On Call' ? 'pulseDot 1.4s ease-in-out infinite' : 'none',
              }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.79rem', fontWeight: 600, color: '#e0e7ff' }}>{t.name}</div>
              <div style={{ fontSize: '0.67rem', color: t.status === 'On Call' ? '#6ee7b7' : t.status === 'Away' ? '#fbbf24' : '#6b7280', fontWeight: t.status === 'On Call' ? 600 : 400 }}>{t.status}</div>
            </div>
            {t.duration ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(16,185,129,0.1)', borderRadius: 8, padding: '3px 9px' }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#10b981', animation: 'pulseDot 1s ease-in-out infinite' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6ee7b7', fontVariantNumeric: 'tabular-nums' }}>{t.duration}</span>
              </div>
            ) : (
              t.status === 'Available' && <PhoneCall size={13} color="#374151" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Connect carousel ─────────────────────────────────────────────────────────
function ConnectCarousel() {
  const [active, setActive] = useState(0)
  const [animKey, setAnimKey] = useState(0)

  const go = (idx) => { setActive(idx); setAnimKey(k => k + 1) }

  useEffect(() => {
    const t = setInterval(() => {
      setActive(a => { const next = (a + 1) % CONNECT_PANELS.length; setAnimKey(k => k + 1); return next })
    }, 5500)
    return () => clearInterval(t)
  }, [])

  const panel = CONNECT_PANELS[active]

  const panelMap = {
    incoming: <IncomingCallPanel key={animKey} animate={true} />,
    teamchat: <TeamChatPanel key={animKey} animate={true} />,
    customersms: <CustomerSMSPanel key={animKey} animate={true} />,
    teamboard: <TeamBoardPanel key={animKey} animate={true} />,
  }

  const kpiMap = {
    incoming: [{ label: 'Avg Answer Time', value: '8s', color: '#818cf8' }, { label: 'Calls Today', value: '47', color: '#6366f1' }, { label: 'Call Score', value: '94%', color: '#10b981' }],
    teamchat: [{ label: 'Team Channels', value: '12', color: '#8b5cf6' }, { label: 'Messages Today', value: '284', color: '#a78bfa' }, { label: 'Avg Reply Time', value: '< 2m', color: '#10b981' }],
    customersms: [{ label: 'Conversations', value: '1,491', color: '#ec4899' }, { label: 'ADAM Assists', value: '89%', color: '#8b5cf6' }, { label: 'Reply Rate', value: '94%', color: '#10b981' }],
    teamboard: [{ label: 'Active Calls', value: '2', color: '#10b981' }, { label: 'Available Now', value: '2 / 5', color: '#6ee7b7' }, { label: 'Missed Today', value: '0', color: '#f59e0b' }],
  }

  return (
    <div style={{
      maxWidth: 900, margin: '0 auto',
      background: 'linear-gradient(135deg, rgba(15,20,35,0.95), rgba(10,14,26,0.98))',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 20, overflow: 'hidden',
      boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.12), inset 0 1px 0 rgba(255,255,255,0.05)',
    }}>
      {/* Browser chrome */}
      <div style={{ padding: '11px 16px', background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          {['#ef4444', '#f59e0b', '#10b981'].map((col, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: col, opacity: 0.65 }} />
          ))}
        </div>
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: 6, padding: '4px 10px', fontSize: '0.7rem', color: '#4b5563', textAlign: 'center' }}>
          connect.autofront.com.au
        </div>
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1', animation: 'pulseDot 2s ease-in-out infinite' }} />
          <span style={{ fontSize: '0.67rem', color: '#6b7280' }}>Connected</span>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}>
        {CONNECT_PANELS.map((p, i) => {
          const isActive = i === active
          return (
            <button key={p.id} onClick={() => go(i)} style={{
              flex: 1, padding: '10px 6px', background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              position: 'relative', transition: 'all .2s',
            }}>
              <p.icon size={13} color={isActive ? p.color : '#4b5563'} style={{ transition: 'color .2s' }} />
              <span style={{ fontSize: '0.66rem', fontWeight: isActive ? 700 : 400, color: isActive ? p.color : '#6b7280', transition: 'all .2s', whiteSpace: 'nowrap' }}>{p.label}</span>
              {isActive && (
                <div style={{ position: 'absolute', bottom: 0, left: '8%', right: '8%', height: 2, background: p.color, borderRadius: '2px 2px 0 0' }} />
              )}
            </button>
          )
        })}
      </div>

      {/* Panel content */}
      <div style={{ minHeight: 228, overflow: 'hidden', position: 'relative' }}>
        {panelMap[panel.id]}
      </div>

      {/* KPI strip */}
      <div style={{ display: 'flex', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}>
        {kpiMap[panel.id].map((k, i) => (
          <div key={`${panel.id}-${i}`} style={{
            flex: 1, padding: '10px 14px', textAlign: 'center',
            borderRight: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            animation: `fadeSlideIn 0.4s ease ${(i * 0.08).toFixed(2)}s both`,
          }}>
            <div style={{ fontSize: '0.65rem', color: '#6b7280', marginBottom: 3, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{k.label}</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: k.color, whiteSpace: 'nowrap' }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 7, padding: '10px 0 12px', background: 'rgba(0,0,0,0.15)' }}>
        {CONNECT_PANELS.map((_, i) => (
          <button key={i} onClick={() => go(i)} style={{
            width: i === active ? 22 : 7, height: 7, borderRadius: 99,
            background: i === active ? CONNECT_PANELS[active].color : 'rgba(255,255,255,0.15)',
            border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease',
          }} />
        ))}
      </div>
    </div>
  )
}

function ConnectRipple() {
  return (
    <div style={{ position: 'relative', width: 140, height: 140, flexShrink: 0 }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          position: 'absolute', inset: '10%', borderRadius: '50%',
          border: '1px solid rgba(99,102,241,0.35)',
          animation: `rippleRing 2.6s ease-out ${i * 0.87}s infinite`,
          pointerEvents: 'none',
        }} />
      ))}
      <div style={{
        position: 'absolute', inset: '28%',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'glowPulse 3s ease-in-out infinite',
      }}>
        <Phone size={26} color="white" />
      </div>
    </div>
  )
}

// ─── Copy button ──────────────────────────────────────────────────────────────
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
  }
  return (
    <button onClick={copy} style={{
      background: 'none', border: 'none', cursor: 'pointer',
      color: copied ? '#10b981' : '#9ca3af', padding: '2px 4px',
      display: 'inline-flex', alignItems: 'center', gap: 4, transition: 'color .2s',
    }}>
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  )
}

// ─── Quote carousel data ─────────────────────────────────────────────────────
const QUOTE_PANELS = [
  { id: 'capture',  label: 'Site Capture',    icon: Camera,        color: '#f59e0b', sub: 'Photos & measurements' },
  { id: 'build',    label: 'Build Quote',      icon: ClipboardList, color: '#8b5cf6', sub: 'Catalog & pricing'     },
  { id: 'proposal', label: 'Live Proposal',    icon: FileText,      color: '#10b981', sub: 'Options & rebates'     },
  { id: 'tracking', label: 'Open Tracking',    icon: Eye,           color: '#ec4899', sub: 'Read & respond'        },
]

// ── Panel 1: Site capture ─────────────────────────────────────────────────────
function QuoteCapturePanel({ animate }) {
  const photos = [
    { label: 'Bathroom',     src: '/site-photos/living-room.jpg'  },
    { label: 'Switchboard',  src: '/site-photos/switchboard.jpg'  },
    { label: 'Controller',   src: '/site-photos/roof-space.jpg'   },
    { label: 'Main Living',  src: '/site-photos/main-living.jpg'  },
  ]
  return (
    <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: 9, background: 'rgba(245,158,11,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <MapPin size={16} color="#fbbf24" />
        </div>
        <div>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#e0e7ff' }}>47 Merriwa St, Kew</div>
          <div style={{ fontSize: '0.69rem', color: '#6b7280' }}>Site visit · Sarah Thompson · 2:14 PM</div>
        </div>
        <div style={{ marginLeft: 'auto', background: 'rgba(245,158,11,0.14)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 99, padding: '3px 10px', fontSize: '0.67rem', color: '#fcd34d', fontWeight: 600 }}>In Progress</div>
      </div>
      {/* Photo grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 7 }}>
        {photos.map((photo, i) => (
          <div key={i} style={{
            borderRadius: 8, overflow: 'hidden',
            border: '1px solid rgba(245,158,11,0.25)',
            aspectRatio: '1',
            position: 'relative',
            animation: animate ? `bubbleIn 0.35s ease ${i * 0.12}s both` : 'none',
          }}>
            <img
              src={photo.src}
              alt={photo.label}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              loading="lazy"
            />
            {/* dark overlay + label */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 55%)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end',
              padding: '0 3px 4px',
            }}>
              <span style={{ fontSize: '0.55rem', color: '#fcd34d', textAlign: 'center', fontWeight: 600, lineHeight: 1.2 }}>{photo.label}</span>
            </div>
            {/* amber corner badge */}
            <div style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(245,158,11,0.85)', borderRadius: 4, padding: '1px 4px' }}>
              <Camera size={8} color="#fff" />
            </div>
          </div>
        ))}
      </div>
      {/* Measurements */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, animation: animate ? 'fadeSlideIn 0.4s ease 0.5s both' : 'none' }}>
        {[{ label: 'Floor area', value: '220 m²', icon: Ruler }, { label: 'Ceiling ht', value: '2.7 m', icon: Ruler }, { label: 'Phases', value: '3-phase', icon: Zap }].map((m, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: '8px 10px', textAlign: 'center' }}>
            <m.icon size={11} color="#f59e0b" style={{ marginBottom: 3 }} />
            <div style={{ fontSize: '0.67rem', color: '#6b7280', marginBottom: 2 }}>{m.label}</div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fcd34d' }}>{m.value}</div>
          </div>
        ))}
      </div>
      {/* Notes */}
      <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 8, padding: '9px 12px', fontSize: '0.78rem', color: '#9ca3af', lineHeight: 1.5, animation: animate ? 'fadeSlideIn 0.4s ease 0.7s both' : 'none' }}>
        📝 <span style={{ color: '#fcd34d' }}>Site notes:</span> Existing ducted system — needs full replacement. Switchboard is 3-phase, ceiling vents in good condition. Customer keen on solar-ready inverter. Budget flexible.
      </div>
    </div>
  )
}

// ── Panel 2: Build quote ──────────────────────────────────────────────────────
const QUOTE_LINES = [
  { sku: 'DKIN-14kW', name: 'Daikin 14kW Ducted System', qty: 1, unit: '$4,850', total: '$4,850', color: '#8b5cf6' },
  { sku: 'INST-DUC',  name: 'Installation — ducted',     qty: 1, unit: '$2,200', total: '$2,200', color: '#6366f1' },
  { sku: 'VEEC-STC',  name: 'VEEC / STC Rebate',         qty: 1, unit: '−$680',  total: '−$680',  color: '#10b981' },
]
function QuoteBuildPanel({ animate }) {
  return (
    <div style={{ padding: '16px 22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Catalog search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.22)', borderRadius: 9, padding: '9px 12px', animation: animate ? 'bubbleIn 0.35s ease both' : 'none' }}>
        <Package size={14} color="#a78bfa" />
        <span style={{ fontSize: '0.79rem', color: '#c4b5fd' }}>simPRO catalog — 2,847 items</span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', animation: 'pulseDot 2s ease-in-out infinite' }} />
          <span style={{ fontSize: '0.66rem', color: '#6b7280' }}>Live</span>
        </div>
      </div>
      {/* Line items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {QUOTE_LINES.map((line, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: `${line.color}0d`, border: `1px solid ${line.color}28`,
            borderRadius: 9, padding: '9px 12px',
            animation: animate ? `fadeSlideIn 0.35s ease ${0.15 + i * 0.15}s both` : 'none',
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.72rem', color: '#6b7280', marginBottom: 1 }}>{line.sku}</div>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e0e7ff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{line.name}</div>
            </div>
            <div style={{ fontSize: '0.78rem', color: '#9ca3af', flexShrink: 0 }}>×{line.qty}</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: line.color, flexShrink: 0, minWidth: 52, textAlign: 'right' }}>{line.total}</div>
          </div>
        ))}
      </div>
      {/* Totals */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 10, display: 'flex', flexDirection: 'column', gap: 5, animation: animate ? 'fadeSlideIn 0.4s ease 0.65s both' : 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.78rem', color: '#6b7280' }}>Subtotal</span>
          <span style={{ fontSize: '0.78rem', color: '#9ca3af' }}>$7,050</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.78rem', color: '#10b981' }}>VEEC / STC Rebate</span>
          <span style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 600 }}>−$680</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 6, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#e0e7ff' }}>Total</span>
          <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fbbf24' }}>$6,370</span>
        </div>
      </div>
    </div>
  )
}

// ── Panel 3: Live proposal ────────────────────────────────────────────────────
const PROPOSAL_OPTIONS = [
  { tier: 'Good',   brand: 'Mitsubishi 12kW', price: '$4,990', badge: null,          color: '#6b7280' },
  { tier: 'Better', brand: 'Daikin 14kW',     price: '$6,370', badge: 'Most Popular', color: '#8b5cf6' },
  { tier: 'Best',   brand: 'Daikin 18kW',     price: '$7,890', badge: 'Best Value',   color: '#f59e0b' },
]
function QuoteProposalPanel({ animate }) {
  return (
    <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.06)', animation: animate ? 'bubbleIn 0.35s ease both' : 'none' }}>
        <FileText size={13} color="#10b981" />
        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#e0e7ff' }}>Your Personalised Quote</span>
        <div style={{ marginLeft: 'auto', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 99, padding: '3px 10px', fontSize: '0.65rem', color: '#6ee7b7', fontWeight: 600 }}>Sent ✓</div>
      </div>
      {/* Option cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {PROPOSAL_OPTIONS.map((opt, i) => (
          <div key={i} style={{
            background: opt.tier === 'Better' ? 'rgba(139,92,246,0.12)' : 'rgba(255,255,255,0.03)',
            border: `1px solid ${opt.tier === 'Better' ? 'rgba(139,92,246,0.35)' : 'rgba(255,255,255,0.07)'}`,
            borderRadius: 10, padding: '10px 10px', textAlign: 'center', position: 'relative',
            animation: animate ? `bubbleIn 0.35s ease ${0.1 + i * 0.15}s both` : 'none',
          }}>
            {opt.badge && (
              <div style={{ position: 'absolute', top: -9, left: '50%', transform: 'translateX(-50%)', background: opt.tier === 'Better' ? '#8b5cf6' : '#f59e0b', color: '#fff', fontSize: '0.56rem', fontWeight: 700, borderRadius: 99, padding: '2px 7px', whiteSpace: 'nowrap' }}>{opt.badge}</div>
            )}
            <div style={{ fontSize: '0.62rem', color: opt.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>{opt.tier}</div>
            <div style={{ fontSize: '0.73rem', color: '#d1d5db', fontWeight: 600, marginBottom: 6 }}>{opt.brand}</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: opt.tier === 'Better' ? '#c4b5fd' : '#e0e7ff' }}>{opt.price}</div>
          </div>
        ))}
      </div>
      {/* Rebate callout */}
      <div style={{ background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8, padding: '9px 12px', display: 'flex', alignItems: 'center', gap: 9, animation: animate ? 'fadeSlideIn 0.4s ease 0.6s both' : 'none' }}>
        <DollarSign size={14} color="#34d399" style={{ flexShrink: 0 }} />
        <span style={{ fontSize: '0.77rem', color: '#6ee7b7' }}><strong>$680 VEEC rebate</strong> applied automatically to all options</span>
      </div>
      {/* Send status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.18)', borderRadius: 8, padding: '9px 12px', animation: animate ? 'fadeSlideIn 0.4s ease 0.75s both' : 'none' }}>
        <Send size={13} color="#818cf8" style={{ flexShrink: 0 }} />
        <span style={{ fontSize: '0.77rem', color: '#a5b4fc' }}>Proposal emailed to <strong>john.chapman@gmail.com</strong> · 2:31 PM</span>
      </div>
    </div>
  )
}

// ── Panel 4: Open tracking ────────────────────────────────────────────────────
const PROPOSAL_EVENTS = [
  { icon: Send,          color: '#6366f1', label: 'Proposal sent',           time: '2:31 PM',   detail: 'Delivered to john.chapman@gmail.com' },
  { icon: Eye,           color: '#f59e0b', label: 'Proposal opened',         time: '3:47 PM',   detail: 'Opened on iPhone · spent 4m 12s reading' },
  { icon: Target,        color: '#ec4899', label: '"Better" option selected', time: '3:49 PM',   detail: 'Customer compared Daikin 14kW vs 18kW' },
  { icon: MessageCircle, color: '#10b981', label: 'Question added',           time: '4:02 PM',   detail: '"Does this include the 10 yr warranty?"' },
]
function QuoteTrackingPanel({ animate }) {
  return (
    <div style={{ padding: '16px 22px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Eye size={13} color="#ec4899" />
        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#e0e7ff' }}>Proposal Activity</span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ec4899', animation: 'pulseDot 1.6s ease-in-out infinite' }} />
          <span style={{ fontSize: '0.66rem', color: '#6b7280' }}>Live</span>
        </div>
      </div>
      {PROPOSAL_EVENTS.map((ev, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'flex-start', gap: 11,
          animation: animate ? `fadeSlideIn 0.35s ease ${i * 0.15}s both` : 'none',
        }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: `${ev.color}1a`, border: `1px solid ${ev.color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
            <ev.icon size={13} color={ev.color} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#e0e7ff' }}>{ev.label}</span>
              <span style={{ fontSize: '0.67rem', color: '#4b5563', flexShrink: 0, marginLeft: 8 }}>{ev.time}</span>
            </div>
            <div style={{ fontSize: '0.73rem', color: '#6b7280' }}>{ev.detail}</div>
          </div>
        </div>
      ))}
      {/* Reply CTA */}
      <div style={{ marginTop: 4, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 9, padding: '9px 12px', display: 'flex', alignItems: 'center', gap: 9, animation: animate ? 'fadeSlideIn 0.4s ease 0.65s both' : 'none' }}>
        <MessageCircle size={13} color="#34d399" style={{ flexShrink: 0 }} />
        <span style={{ fontSize: '0.77rem', color: '#6ee7b7' }}>Reply in-thread · customer is waiting for your response</span>
      </div>
    </div>
  )
}

// ─── Quote carousel ───────────────────────────────────────────────────────────
function QuoteCarousel() {
  const [active, setActive] = useState(0)
  const [animKey, setAnimKey] = useState(0)

  const go = (idx) => { setActive(idx); setAnimKey(k => k + 1) }

  useEffect(() => {
    const t = setInterval(() => {
      setActive(a => { const next = (a + 1) % QUOTE_PANELS.length; setAnimKey(k => k + 1); return next })
    }, 5500)
    return () => clearInterval(t)
  }, [])

  const panel = QUOTE_PANELS[active]

  const panelMap = {
    capture:  <QuoteCapturePanel  key={animKey} animate={true} />,
    build:    <QuoteBuildPanel    key={animKey} animate={true} />,
    proposal: <QuoteProposalPanel key={animKey} animate={true} />,
    tracking: <QuoteTrackingPanel key={animKey} animate={true} />,
  }

  const kpiMap = {
    capture:  [{ label: 'Photos captured', value: '4',        color: '#f59e0b' }, { label: 'Floor area',  value: '220 m²',  color: '#fbbf24' }, { label: 'Site notes',    value: '1 added',  color: '#10b981' }],
    build:    [{ label: 'Items in catalog', value: '2,847',   color: '#8b5cf6' }, { label: 'Quote total', value: '$6,370',  color: '#fbbf24' }, { label: 'Rebate saved',  value: '$680',     color: '#10b981' }],
    proposal: [{ label: 'Options shown',   value: '3 tiers',  color: '#10b981' }, { label: 'Sent in',    value: '< 2 min', color: '#fbbf24' }, { label: 'Rebate shown',  value: 'Auto',     color: '#6366f1' }],
    tracking: [{ label: 'Time to open',    value: '76 min',   color: '#ec4899' }, { label: 'Read time',  value: '4m 12s',  color: '#f59e0b' }, { label: 'Questions',     value: '1 pending',color: '#10b981' }],
  }

  return (
    <div style={{
      maxWidth: 900, margin: '0 auto',
      background: 'linear-gradient(135deg, rgba(15,20,35,0.95), rgba(10,14,26,0.98))',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 20, overflow: 'hidden',
      boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(245,158,11,0.1), inset 0 1px 0 rgba(255,255,255,0.05)',
    }}>
      {/* Browser chrome */}
      <div style={{ padding: '11px 16px', background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          {['#ef4444','#f59e0b','#10b981'].map((col, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: col, opacity: 0.65 }}/>
          ))}
        </div>
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: 6, padding: '4px 10px', fontSize: '0.7rem', color: '#4b5563', textAlign: 'center' }}>
          quote.autofront.com.au
        </div>
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#f59e0b', animation: 'pulseDot 2s ease-in-out infinite' }}/>
          <span style={{ fontSize: '0.67rem', color: '#6b7280' }}>On-site</span>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}>
        {QUOTE_PANELS.map((p, i) => {
          const isActive = i === active
          return (
            <button key={p.id} onClick={() => go(i)} style={{
              flex: 1, padding: '10px 6px', background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              position: 'relative', transition: 'all .2s',
            }}>
              <p.icon size={13} color={isActive ? p.color : '#4b5563'} style={{ transition: 'color .2s' }} />
              <span style={{ fontSize: '0.66rem', fontWeight: isActive ? 700 : 400, color: isActive ? p.color : '#6b7280', transition: 'all .2s', whiteSpace: 'nowrap' }}>{p.label}</span>
              {isActive && (
                <div style={{ position: 'absolute', bottom: 0, left: '8%', right: '8%', height: 2, background: p.color, borderRadius: '2px 2px 0 0' }}/>
              )}
            </button>
          )
        })}
      </div>

      {/* Panel content */}
      <div style={{ minHeight: 228, overflow: 'hidden', position: 'relative' }}>
        {panelMap[panel.id]}
      </div>

      {/* KPI strip */}
      <div style={{ display: 'flex', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}>
        {kpiMap[panel.id].map((k, i) => (
          <div key={`${panel.id}-${i}`} style={{
            flex: 1, padding: '10px 14px', textAlign: 'center',
            borderRight: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            animation: `fadeSlideIn 0.4s ease ${(i * 0.08).toFixed(2)}s both`,
          }}>
            <div style={{ fontSize: '0.65rem', color: '#6b7280', marginBottom: 3, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{k.label}</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: k.color, whiteSpace: 'nowrap' }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 7, padding: '10px 0 12px', background: 'rgba(0,0,0,0.15)' }}>
        {QUOTE_PANELS.map((_, i) => (
          <button key={i} onClick={() => go(i)} style={{
            width: i === active ? 22 : 7, height: 7, borderRadius: 99,
            background: i === active ? QUOTE_PANELS[active].color : 'rgba(255,255,255,0.15)',
            border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease',
          }}/>
        ))}
      </div>
    </div>
  )
}

// ─── Self Service Portal carousel ────────────────────────────────────────────
const SS_PANELS = [
  { id: 'book',    label: 'Book',         icon: ClipboardList, color: '#6366f1', sub: 'Choose type'     },
  { id: 'slots',   label: 'Availability', icon: Clock,         color: '#8b5cf6', sub: 'JMS timeslots'   },
  { id: 'qualify', label: 'Qualify Lead', icon: CheckCircle,   color: '#10b981', sub: 'Auto-criteria'   },
  { id: 'confirm', label: 'Confirmed',    icon: Bell,          color: '#ec4899', sub: 'SMS + reminders' },
]

function SSBookingPanel({ animate }) {
  const types = [
    { icon: Phone,  color: '#6366f1', label: 'Phone Consultation', duration: '30 min', selected: true  },
    { icon: Video,  color: '#8b5cf6', label: 'Video Walkthrough',  duration: '45 min', selected: false },
    { icon: MapPin, color: '#ec4899', label: 'Onsite Sales Visit', duration: '60 min', selected: false },
  ]
  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ fontSize: '0.72rem', color: '#6b7280', marginBottom: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Select consultation type</div>
      {types.map((t, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '12px 16px', borderRadius: 12,
          background: t.selected ? `${t.color}1a` : 'rgba(255,255,255,0.03)',
          border: `1px solid ${t.selected ? t.color + '55' : 'rgba(255,255,255,0.07)'}`,
          animation: animate ? `fadeSlideIn 0.35s ease ${(i * 0.1).toFixed(2)}s both` : 'none',
        }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `${t.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <t.icon size={16} color={t.color} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.87rem', fontWeight: 700, color: t.selected ? '#f9fafb' : '#9ca3af' }}>{t.label}</div>
            <div style={{ fontSize: '0.72rem', color: '#6b7280', marginTop: 2 }}>{t.duration} session</div>
          </div>
          <div style={{ width: 16, height: 16, borderRadius: '50%', border: `2px solid ${t.selected ? t.color : '#374151'}`, background: t.selected ? t.color : 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {t.selected && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />}
          </div>
        </div>
      ))}
    </div>
  )
}

function SSAvailabilityPanel({ animate }) {
  const days = [
    { label: 'Mon', date: '30', open: true  },
    { label: 'Tue', date: '1',  open: true, active: true },
    { label: 'Wed', date: '2',  open: false },
    { label: 'Thu', date: '3',  open: true  },
    { label: 'Fri', date: '4',  open: true  },
  ]
  const times  = ['9:00 AM', '10:30 AM', '12:00 PM', '2:00 PM', '3:30 PM']
  const taken  = [false, false, true, false, true]
  const chosen = 1
  return (
    <div style={{ padding: '16px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between' }}>
        {days.map((d, i) => (
          <div key={i} style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            padding: '9px 4px', borderRadius: 10,
            background: d.active ? 'rgba(139,92,246,0.2)' : d.open ? 'rgba(255,255,255,0.04)' : 'transparent',
            border: `1px solid ${d.active ? '#8b5cf655' : d.open ? 'rgba(255,255,255,0.08)' : 'transparent'}`,
            opacity: d.open ? 1 : 0.3,
            animation: animate ? `fadeSlideIn 0.3s ease ${(i * 0.07).toFixed(2)}s both` : 'none',
          }}>
            <span style={{ fontSize: '0.64rem', color: '#6b7280', fontWeight: 500 }}>{d.label}</span>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: d.active ? '#c4b5fd' : '#d1d5db' }}>{d.date}</span>
            {d.open && <div style={{ width: 5, height: 5, borderRadius: '50%', background: d.active ? '#8b5cf6' : '#374151' }} />}
          </div>
        ))}
      </div>
      <div>
        <div style={{ fontSize: '0.68rem', color: '#6b7280', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Available times — Tue 1 Jul</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {times.map((t, i) => (
            <div key={i} style={{
              padding: '7px 12px', borderRadius: 8, fontSize: '0.77rem', fontWeight: 600,
              background: taken[i] ? 'rgba(255,255,255,0.03)' : i === chosen ? 'rgba(139,92,246,0.2)' : 'rgba(139,92,246,0.08)',
              border: `1px solid ${taken[i] ? 'rgba(255,255,255,0.06)' : i === chosen ? '#8b5cf688' : 'rgba(139,92,246,0.25)'}`,
              color: taken[i] ? '#4b5563' : i === chosen ? '#c4b5fd' : '#a78bfa',
              textDecoration: taken[i] ? 'line-through' : 'none',
              animation: animate ? `fadeSlideIn 0.3s ease ${(0.35 + i * 0.08).toFixed(2)}s both` : 'none',
            }}>{t}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SSQualifyPanel({ animate }) {
  const criteria = [
    { label: 'Service area confirmed', status: 'pass', detail: 'North Brisbane — covered'    },
    { label: 'Property type eligible',  status: 'pass', detail: 'Residential — eligible'      },
    { label: 'Job scope within range',  status: 'pass', detail: 'Est. $4,200 — qualifies'     },
    { label: 'Existing customer check', status: 'warn', detail: 'New customer — welcome!'     },
    { label: 'Rebate eligibility',      status: 'pass', detail: 'STC eligible — auto-applied' },
  ]
  return (
    <div style={{ padding: '18px 24px', display: 'flex', flexDirection: 'column', gap: 9 }}>
      <div style={{ fontSize: '0.72rem', color: '#6b7280', marginBottom: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Lead qualification check</div>
      {criteria.map((c, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '9px 12px', borderRadius: 9,
          background: c.status === 'pass' ? 'rgba(16,185,129,0.06)' : 'rgba(245,158,11,0.07)',
          border: `1px solid ${c.status === 'pass' ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.2)'}`,
          animation: animate ? `fadeSlideIn 0.35s ease ${(i * 0.09).toFixed(2)}s both` : 'none',
        }}>
          <div style={{ width: 20, height: 20, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: c.status === 'pass' ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)', flexShrink: 0 }}>
            {c.status === 'pass' ? <Check size={11} color="#10b981" /> : <span style={{ fontSize: '0.65rem', color: '#f59e0b', fontWeight: 700 }}>!</span>}
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, minWidth: 0 }}>
            <span style={{ fontSize: '0.82rem', color: '#d1d5db', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.label}</span>
            <span style={{ fontSize: '0.72rem', color: c.status === 'pass' ? '#6ee7b7' : '#fcd34d', flexShrink: 0 }}>{c.detail}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function SSConfirmPanel({ animate }) {
  return (
    <div style={{ padding: '18px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.08))',
        border: '1px solid rgba(99,102,241,0.25)', borderRadius: 14, padding: '16px 18px',
        animation: animate ? 'fadeSlideIn 0.4s ease 0s both' : 'none',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#6b7280', marginBottom: 3, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Booking Confirmed</div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#f9fafb' }}>Phone Consultation</div>
          </div>
          <div style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 99, padding: '4px 10px' }}>
            <span style={{ fontSize: '0.7rem', color: '#6ee7b7', fontWeight: 700 }}>✓ Confirmed</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {[['Customer', 'Michael H.'], ['Date', 'Tue 1 Jul'], ['Time', '10:30 AM'], ['With', 'Sarah T.']].map(([lbl, val]) => (
            <div key={lbl}>
              <div style={{ fontSize: '0.66rem', color: '#6b7280', marginBottom: 2 }}>{lbl}</div>
              <div style={{ fontSize: '0.83rem', fontWeight: 700, color: '#e5e7eb' }}>{val}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {[
          { icon: Send,          color: '#10b981', label: 'Confirmation SMS sent',    detail: 'Delivered to Michael instantly',    bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.2)'  },
          { icon: Bell,          color: '#6366f1', label: 'Reminder scheduled',       detail: '24 hrs before appointment',         bg: 'rgba(99,102,241,0.08)',  border: 'rgba(99,102,241,0.2)'  },
          { icon: ClipboardList, color: '#f59e0b', label: 'Lead created in CRM',      detail: 'Assigned to Sarah T. pipeline',     bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.2)'  },
        ].map((b, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 9,
            background: b.bg, border: `1px solid ${b.border}`,
            animation: animate ? `fadeSlideIn 0.35s ease ${(0.2 + i * 0.1).toFixed(2)}s both` : 'none',
          }}>
            <b.icon size={14} color={b.color} />
            <span style={{ fontSize: '0.82rem', color: '#d1d5db', fontWeight: 600 }}>{b.label}</span>
            <span style={{ fontSize: '0.73rem', color: '#6b7280', marginLeft: 'auto' }}>{b.detail}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SelfServiceCarousel() {
  const [active, setActive] = useState(0)
  const [animKey, setAnimKey] = useState(0)

  const go = (idx) => { setActive(idx); setAnimKey(k => k + 1) }

  useEffect(() => {
    const t = setInterval(() => {
      setActive(a => { const next = (a + 1) % SS_PANELS.length; setAnimKey(k => k + 1); return next })
    }, 5000)
    return () => clearInterval(t)
  }, [])

  const panel = SS_PANELS[active]

  const panelMap = {
    book:    <SSBookingPanel      key={animKey} animate={true} />,
    slots:   <SSAvailabilityPanel key={animKey} animate={true} />,
    qualify: <SSQualifyPanel      key={animKey} animate={true} />,
    confirm: <SSConfirmPanel      key={animKey} animate={true} />,
  }

  const kpiMap = {
    book:    [{ label: 'Consultation types', value: '3',       color: '#6366f1' }, { label: 'Avg session',  value: '38 min',  color: '#8b5cf6' }, { label: 'Show rate',   value: '91%',     color: '#10b981' }],
    slots:   [{ label: 'Available today',    value: '5 slots', color: '#8b5cf6' }, { label: 'Booked today', value: '7',       color: '#6366f1' }, { label: 'Next open',   value: '10:30 AM',color: '#10b981' }],
    qualify: [{ label: 'Criteria checked',   value: '5 / 5',   color: '#10b981' }, { label: 'Pass rate',    value: '78%',     color: '#6366f1' }, { label: 'Auto-filtered',value: '22%',    color: '#f59e0b' }],
    confirm: [{ label: 'SMS sent',           value: 'Instant', color: '#10b981' }, { label: 'Reminders',    value: '2 auto',  color: '#6366f1' }, { label: 'No-shows',    value: '↓ 64%',   color: '#ec4899' }],
  }

  return (
    <div style={{
      maxWidth: 900, margin: '0 auto',
      background: 'linear-gradient(135deg, rgba(15,20,35,0.95), rgba(10,14,26,0.98))',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 20, overflow: 'hidden',
      boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.12), inset 0 1px 0 rgba(255,255,255,0.05)',
    }}>
      {/* Browser chrome */}
      <div style={{ padding: '11px 16px', background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          {['#ef4444','#f59e0b','#10b981'].map((col, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: col, opacity: 0.65 }} />
          ))}
        </div>
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: 6, padding: '4px 10px', fontSize: '0.7rem', color: '#4b5563', textAlign: 'center' }}>
          book.autofront.com.au
        </div>
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1', animation: 'pulseDot 2s ease-in-out infinite' }} />
          <span style={{ fontSize: '0.67rem', color: '#6b7280' }}>Live</span>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}>
        {SS_PANELS.map((p, i) => {
          const isActive = i === active
          return (
            <button key={p.id} onClick={() => go(i)} style={{
              flex: 1, padding: '10px 6px', background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              position: 'relative', transition: 'all .2s',
            }}>
              <p.icon size={13} color={isActive ? p.color : '#4b5563'} style={{ transition: 'color .2s' }} />
              <span style={{ fontSize: '0.66rem', fontWeight: isActive ? 700 : 400, color: isActive ? p.color : '#6b7280', transition: 'all .2s', whiteSpace: 'nowrap' }}>{p.label}</span>
              {isActive && (
                <div style={{ position: 'absolute', bottom: 0, left: '8%', right: '8%', height: 2, background: p.color, borderRadius: '2px 2px 0 0' }} />
              )}
            </button>
          )
        })}
      </div>

      {/* Panel content */}
      <div style={{ minHeight: 220, overflow: 'hidden', position: 'relative' }}>
        {panelMap[panel.id]}
      </div>

      {/* KPI strip */}
      <div style={{ display: 'flex', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}>
        {kpiMap[panel.id].map((k, i) => (
          <div key={`${panel.id}-${i}`} style={{
            flex: 1, padding: '10px 14px', textAlign: 'center',
            borderRight: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            animation: `fadeSlideIn 0.4s ease ${(i * 0.08).toFixed(2)}s both`,
          }}>
            <div style={{ fontSize: '0.65rem', color: '#6b7280', marginBottom: 3, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{k.label}</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: k.color, whiteSpace: 'nowrap' }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 7, padding: '10px 0 12px', background: 'rgba(0,0,0,0.15)' }}>
        {SS_PANELS.map((_, i) => (
          <button key={i} onClick={() => go(i)} style={{
            width: i === active ? 22 : 7, height: 7, borderRadius: 99,
            background: i === active ? SS_PANELS[active].color : 'rgba(255,255,255,0.15)',
            border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease',
          }} />
        ))}
      </div>
    </div>
  )
}

// ─── Who Are We modal ───────────────────────────────────────────────────────
function WhoAreWeModal({ onClose }) {
  const MILESTONES = [
    { color: '#6366f1', label: 'Lead Acquisition', desc: 'Capture, score and route every inbound enquiry from every channel — calls, ads, web, referrals — into a single live pipeline.' },
    { color: '#8b5cf6', label: 'Sales Engagement', desc: 'Qualification workflows, quote tracking, automated follow-up and full pipeline visibility for every salesperson on your team.' },
    { color: '#ec4899', label: 'Communications Platform', desc: 'Autofront Connect — enterprise-grade telephony, SMS, video and team messaging, purpose-built for trade and service operations.' },
    { color: '#10b981', label: 'Job Management', desc: 'Deep two-way sync with simPRO, TradeTrak, ServiceM8 and AroFlo. Live job status, scheduling and technician location — all on one screen.' },
    { color: '#f59e0b', label: 'Customer Intelligence', desc: 'A lifelong record of every call, message, job and transaction per customer. Always searchable. Always surfaced at the right moment.' },
    { color: '#14b8a6', label: 'Intelligent Automation', desc: 'ADAM AI, triggered SMS, status-based messaging and workflow rules that act the moment something changes — without anyone lifting a finger.' },
  ]

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1100,
      background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px 16px', overflowY: 'auto',
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'linear-gradient(160deg, #131828 0%, #0e1320 100%)',
        border: '1px solid rgba(255,255,255,0.09)',
        borderRadius: 22, maxWidth: 720, width: '100%',
        boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(99,102,241,0.1)',
        position: 'relative', overflowY: 'auto', maxHeight: '90vh',
        animation: 'storyFadeIn 0.45s ease both',
      }}>
        {/* Close */}
        <button onClick={onClose} style={{
          position: 'sticky', top: 16, float: 'right', marginRight: 16, zIndex: 10,
          background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '50%', width: 34, height: 34, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          color: '#9ca3af', cursor: 'pointer', transition: 'all .2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.13)'; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = '#9ca3af' }}
        >
          <X size={16} />
        </button>

        <div style={{ padding: '48px 48px 40px', clear: 'both' }}>
          {/* Header */}
          <div style={{ marginBottom: 36 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)',
              borderRadius: 99, padding: '6px 16px', marginBottom: 20,
              fontSize: '0.78rem', color: '#a5b4fc', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1', display: 'inline-block', animation: 'pulseDot 2s ease-in-out infinite' }} />
              Autofront
            </div>
            <h2 style={{ fontSize: 'clamp(1.7rem, 4vw, 2.4rem)', fontWeight: 800, margin: '0 0 16px', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
              Who are we?<br />
              <span style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a78bfa 50%, #ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                What do we do?
              </span>
            </h2>
          </div>

          {/* At our core */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.05))',
            border: '1px solid rgba(99,102,241,0.18)',
            borderRadius: 16, padding: '28px 30px', marginBottom: 32,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <BarChart2 size={18} color="#818cf8" />
              </div>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#a5b4fc', letterSpacing: '-0.01em' }}>At our core</h3>
            </div>
            <p style={{ color: '#c7d2fe', fontSize: '1rem', lineHeight: 1.75, margin: 0 }}>
              Data is everything. At Autofront, we obsess over capturing it, making sense of it, and putting it
              to work — surfacing the insights that matter on your screen and triggering automation so nothing
              ever falls through the cracks. If data is the raw material, Autofront is the engine that turns
              it into decisions, actions, and growth.
            </p>
          </div>

          {/* Our story */}
          <div style={{ marginBottom: 36 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(236,72,153,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Zap size={18} color="#f472b6" />
              </div>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#f9a8d4', letterSpacing: '-0.01em' }}>Our story</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ color: '#d1d5db', fontSize: '0.96rem', lineHeight: 1.78, margin: 0 }}>
                We started with a single conviction: trade and service businesses deserved far better than
                patchwork software, manual follow-up, and tools built for industries nothing like theirs.
              </p>
              <p style={{ color: '#d1d5db', fontSize: '0.96rem', lineHeight: 1.78, margin: 0 }}>
                Every business follows the same fundamental arc — attract a customer, qualify them, quote,
                schedule, deliver, invoice, retain. The milestones differ and the tools differ, but the
                human friction in between is identical everywhere we looked. Calls missed. Leads gone cold.
                Jobs confirmed in spreadsheets. Customers left waiting for updates nobody remembered to send.
              </p>
              <p style={{ color: '#d1d5db', fontSize: '0.96rem', lineHeight: 1.78, margin: 0 }}>
                We stress-tested every off-the-shelf platform on the market. None of them could do what we
                needed, at the depth we demanded — so we built it ourselves, from the ground up, with no
                shortcuts and no compromises.
              </p>
              <p style={{ color: '#d1d5db', fontSize: '0.96rem', lineHeight: 1.78, margin: 0 }}>
                We started with lead acquisition and qualification, then built out sales pipeline management
                and engagement. From there we layered in communications, job management integrations,
                real-time scheduling, customer intelligence, and intelligent automation. Every module
                purpose-built. Every layer tightly integrated. One platform that thinks about your business
                the way you do — and handles the repetitive work so your team can focus on what actually matters.
              </p>
            </div>
          </div>

          {/* How we built it — milestones */}
          <div style={{ marginBottom: 36 }}>
            <h3 style={{ margin: '0 0 18px', fontSize: '0.88rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.09em' }}>Built layer by layer</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
              {MILESTONES.map((m, i) => (
                <div key={i} style={{
                  background: `${m.color}0d`,
                  border: `1px solid ${m.color}30`,
                  borderRadius: 12, padding: '14px 16px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 7 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: m.color, flexShrink: 0 }} />
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: m.color }}>{m.label}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: '#9ca3af', lineHeight: 1.55 }}>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Philosophy */}
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 14, padding: '24px 28px',
            display: 'flex', gap: 16, alignItems: 'flex-start',
          }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
              <Shield size={16} color="#34d399" />
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Our philosophy</div>
              <p style={{ margin: 0, color: '#9ca3af', fontSize: '0.9rem', lineHeight: 1.7 }}>
                We don't do half-measures. We don't sell a generic SaaS platform and call it a solution.
                We build specifically for trade and service businesses — because they're not like any other
                industry, and they deserve software that understands the difference.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Lead capture modal ───────────────────────────────────────────────────────
function LeadCaptureModal({ onClose, onSuccess }) {
  const [step, setStep] = useState('form')
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const sessionStart = useRef(Date.now())

  const [form, setForm] = useState({ name: '', phone: '', company: '', jms: '', jmsOther: '', website: '' })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const validate = () => {
    const e = {}
    if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Please enter your full name'
    const ph = form.phone.replace(/[\s\-().+]/g, '')
    if (!ph || !/^(61|0)[2-9]\d{8}$|^(61|0)4\d{8}$|^1[38]00\d{6}$/.test(ph)) e.phone = 'Please enter a valid Australian phone number'
    if (!form.company.trim() || form.company.trim().length < 2) e.company = 'Please enter your company name'
    if (!form.jms) e.jms = 'Please select your job management system'
    if (form.jms === 'other' && !form.jmsOther.trim()) e.jmsOther = 'Please specify your system'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.website) { setStep('credentials'); return }
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setSubmitting(true)

    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      company: form.company.trim(),
      jms: form.jms === 'other' ? form.jmsOther.trim() : (JMS_OPTIONS.find(o => o.value === form.jms)?.label || form.jms),
      browser: navigator.userAgent,
      sessionDurationS: Math.round((Date.now() - sessionStart.current) / 1000),
      referrer: document.referrer || null,
      url: window.location.href,
      submittedAt: new Date().toISOString(),
    }

    try {
      const ipRes = await fetch('https://api.ipify.org?format=json').catch(() => null)
      if (ipRes?.ok) { const { ip } = await ipRes.json(); payload.ip = ip }
    } catch { /* ignore */ }

    try {
      await fetch('https://api.autofront.com.au/api/demo-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(5000),
      })
    } catch { /* proceed regardless */ }

    setSubmitting(false)
    setStep('credentials')
  }

  const inp = (err) => ({
    width: '100%', background: 'rgba(255,255,255,0.06)',
    border: `1px solid ${err ? '#ef4444' : 'rgba(255,255,255,0.12)'}`,
    borderRadius: 8, padding: '11px 14px', color: '#fff',
    fontSize: '0.93rem', outline: 'none', boxSizing: 'border-box', transition: 'border-color .2s',
  })
  const lbl = { display: 'block', color: '#9ca3af', fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }
  const err = (msg) => msg ? <div style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: 4 }}>{msg}</div> : null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, overflowY: 'auto',
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#1a1f2e', borderRadius: 18, padding: '40px 36px',
        maxWidth: 500, width: '100%',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 30px 80px rgba(0,0,0,0.6)', position: 'relative',
      }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', padding: 4 }}>
          <X size={20} />
        </button>

        {step === 'form' ? (
          <>
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 52, height: 52, borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', marginBottom: 16,
              }}>
                <Play size={22} color="white" />
              </div>
              <h2 style={{ color: '#fff', fontSize: '1.45rem', fontWeight: 700, margin: '0 0 8px' }}>Request Demo Access</h2>
              <p style={{ color: '#9ca3af', fontSize: '0.92rem', margin: 0, lineHeight: 1.5 }}>
                Tell us a little about your business and we'll open the live dashboard for you.
              </p>
            </div>
            <form onSubmit={handleSubmit} noValidate>
              <input type="text" name="website" value={form.website} onChange={e => set('website', e.target.value)}
                tabIndex={-1} autoComplete="off" aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={lbl}>Your name *</label>
                  <input type="text" placeholder="Jane Smith" value={form.name} onChange={e => set('name', e.target.value)}
                    style={inp(errors.name)}
                    onFocus={e => e.target.style.borderColor = '#6366f1'}
                    onBlur={e => e.target.style.borderColor = errors.name ? '#ef4444' : 'rgba(255,255,255,0.12)'} />
                  {err(errors.name)}
                </div>
                <div>
                  <label style={lbl}>Mobile / phone *</label>
                  <input type="tel" placeholder="0412 345 678" value={form.phone} onChange={e => set('phone', e.target.value)}
                    style={inp(errors.phone)}
                    onFocus={e => e.target.style.borderColor = '#6366f1'}
                    onBlur={e => e.target.style.borderColor = errors.phone ? '#ef4444' : 'rgba(255,255,255,0.12)'} />
                  {err(errors.phone)}
                </div>
                <div>
                  <label style={lbl}>Company name *</label>
                  <input type="text" placeholder="APEX Electrical Pty Ltd" value={form.company} onChange={e => set('company', e.target.value)}
                    style={inp(errors.company)}
                    onFocus={e => e.target.style.borderColor = '#6366f1'}
                    onBlur={e => e.target.style.borderColor = errors.company ? '#ef4444' : 'rgba(255,255,255,0.12)'} />
                  {err(errors.company)}
                </div>
                <div>
                  <label style={lbl}>Job management system *</label>
                  <select value={form.jms} onChange={e => set('jms', e.target.value)}
                    style={{
                      ...inp(errors.jms), appearance: 'none', cursor: 'pointer', paddingRight: 36,
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center',
                    }}>
                    <option value="" disabled style={{ background: '#1a1f2e' }}>Select your system…</option>
                    {JMS_OPTIONS.map(o => <option key={o.value} value={o.value} style={{ background: '#1a1f2e' }}>{o.label}</option>)}
                  </select>
                  {err(errors.jms)}
                </div>
                {form.jms === 'other' && (
                  <div>
                    <label style={lbl}>Please specify *</label>
                    <input type="text" placeholder="e.g. Fergus, Jobber, ServiceTitan…" value={form.jmsOther} onChange={e => set('jmsOther', e.target.value)}
                      style={inp(errors.jmsOther)}
                      onFocus={e => e.target.style.borderColor = '#6366f1'}
                      onBlur={e => e.target.style.borderColor = errors.jmsOther ? '#ef4444' : 'rgba(255,255,255,0.12)'} />
                    {err(errors.jmsOther)}
                  </div>
                )}
                <button type="submit" disabled={submitting}
                  style={{
                    width: '100%', marginTop: 8, padding: '14px',
                    background: submitting ? 'rgba(99,102,241,0.5)' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    color: '#fff', border: 'none', borderRadius: 10,
                    cursor: submitting ? 'not-allowed' : 'pointer', fontSize: '1rem', fontWeight: 700,
                    boxShadow: '0 8px 24px rgba(99,102,241,0.35)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    transition: 'opacity .2s',
                  }}
                  onMouseEnter={e => { if (!submitting) e.currentTarget.style.opacity = '0.88' }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
                >
                  {submitting ? 'Submitting…' : <><span>Get Demo Access</span> <ArrowRight size={16} /></>}
                </button>
                <p style={{ color: '#4b5563', fontSize: '0.75rem', textAlign: 'center', margin: 0 }}>
                  Your details are used only to personalise your demo experience.
                </p>
              </div>
            </form>
          </>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 52, height: 52, borderRadius: '50%',
                background: 'linear-gradient(135deg, #10b981, #059669)', marginBottom: 16,
              }}>
                <CheckCircle size={24} color="white" />
              </div>
              <h2 style={{ color: '#fff', fontSize: '1.45rem', fontWeight: 700, margin: '0 0 8px' }}>You’re all set — let’s go</h2>
              <p style={{ color: '#9ca3af', fontSize: '0.92rem', margin: 0, lineHeight: 1.5 }}>
                Switch between APEX Electrical and APEX Plumbing to see multi-tenant in action.
              </p>
            </div>
            <div style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 10, padding: '20px 24px', marginBottom: 20 }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Email</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <code style={{ color: '#e0e7ff', fontSize: '0.93rem', fontWeight: 500 }}>{DEMO_EMAIL}</code>
                  <CopyButton text={DEMO_EMAIL} />
                </div>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 16 }}>
                <div style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Password</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <code style={{ color: '#e0e7ff', fontSize: '0.93rem', fontWeight: 500 }}>{DEMO_PASSWORD}</code>
                  <CopyButton text={DEMO_PASSWORD} />
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
              {DEMO_COMPANIES.map(co => (
                <div key={co.id} style={{ flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '12px 14px', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <co.icon size={18} color={co.color} style={{ marginBottom: 6 }} />
                  <div style={{ color: '#fff', fontSize: '0.82rem', fontWeight: 600 }}>{co.name}</div>
                  <div style={{ color: '#6b7280', fontSize: '0.72rem', marginTop: 2 }}>{co.desc}</div>
                </div>
              ))}
            </div>
            <button onClick={onSuccess}
              style={{
                width: '100%', padding: '14px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer',
                fontSize: '1rem', fontWeight: 700, boxShadow: '0 8px 24px rgba(99,102,241,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Open Demo Dashboard <ArrowRight size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  )
}

// ─── Main Landing Page ────────────────────────────────────────────────────────
const DEMO_URL = 'https://demo.autofront.com.au'

export default function LandingPage() {
  const [showCapture, setShowCapture] = useState(false)
  const [showWhoAreWe, setShowWhoAreWe] = useState(false)
  const [activePlatformFeature, setActivePlatformFeature] = useState(0)

  const handleLogin = () => { window.location.href = DEMO_URL }
  const openDemo = () => setShowCapture(true)

  useEffect(() => {
    const t = setInterval(() => setActivePlatformFeature(f => (f + 1) % PLATFORM_FEATURES.length), 3500)
    return () => clearInterval(t)
  }, [])

  const af = PLATFORM_FEATURES[activePlatformFeature]

  const primaryBtn = {
    padding: '16px 36px',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: '#fff', border: 'none', borderRadius: 12,
    cursor: 'pointer', fontSize: '1.05rem', fontWeight: 700,
    boxShadow: '0 12px 32px rgba(99,102,241,0.4)',
    display: 'inline-flex', alignItems: 'center', gap: 8,
    transition: 'transform .2s, box-shadow .2s',
  }
  const ghostBtn = {
    padding: '16px 36px',
    background: 'rgba(255,255,255,0.06)',
    color: '#d1d5db', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 12, cursor: 'pointer', fontSize: '1.05rem', fontWeight: 600,
    display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'background .2s',
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0b0f1a', color: '#fff', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{GLOBAL_STYLES}</style>

      {showCapture && <LeadCaptureModal onClose={() => setShowCapture(false)} onSuccess={() => { window.location.href = DEMO_URL }} />}
      {showWhoAreWe && <WhoAreWeModal onClose={() => setShowWhoAreWe(false)} />}

      {/* ── NAV ── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(11,15,26,0.88)', backdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 5vw', height: 64,
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/autofront-logo.png" alt="Autofront" style={{ height: 50, width: 'auto' }} />
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {[['Self Service', 'self-service-section'], ['Dashboard', 'dashboard-section'], ['Connect', 'connect-section'], ['Quote', 'quote-section'], ['Platform', 'platform-section']].map(([label, id]) => (
            <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
              style={{ padding: '8px 18px', background: 'transparent', color: '#9ca3af', border: 'none', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 500, transition: 'color .2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
            >{label}</button>
          ))}
          <button onClick={() => setShowWhoAreWe(true)}
            style={{ padding: '8px 18px', background: 'rgba(99,102,241,0.12)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 8, cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600, transition: 'all .2s', animation: 'ourStoryPulse 2.6s ease-in-out infinite' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.24)'; e.currentTarget.style.animationPlayState = 'paused' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.12)'; e.currentTarget.style.animationPlayState = 'running' }}
          >Who are we?</button>
          <button onClick={openDemo}
            style={{ padding: '8px 18px', background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 8, cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600, transition: 'all .2s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.28)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(99,102,241,0.15)'}
          >Live Demo</button>
          <button onClick={handleLogin}
            style={{ padding: '8px 18px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600, boxShadow: '0 4px 12px rgba(99,102,241,0.3)', transition: 'opacity .2s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >Log In</button>
        </div>
      </nav>

      <div style={{ overflowX: 'hidden' }}>
      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* ── HERO ── */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '88px 5vw 80px', position: 'relative', overflow: 'hidden' }}>
        {/* Floating orb backgrounds */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <div style={{ position: 'absolute', width: 700, height: 700, borderRadius: '50%', top: '-250px', left: '-150px', background: 'radial-gradient(circle, rgba(99,102,241,0.13) 0%, transparent 68%)', animation: 'floatOrb 9s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', top: '5%', right: '-120px', background: 'radial-gradient(circle, rgba(139,92,246,0.11) 0%, transparent 68%)', animation: 'floatOrb 11s ease-in-out 2s infinite reverse' }} />
          <div style={{ position: 'absolute', width: 350, height: 350, borderRadius: '50%', bottom: '-80px', left: '35%', background: 'radial-gradient(circle, rgba(236,72,153,0.07) 0%, transparent 68%)', animation: 'floatOrb 7s ease-in-out 1s infinite' }} />
          {/* Dot grid */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
        </div>

        {/* 2-col layout */}
        <div style={{
          maxWidth: 1180, margin: '0 auto', position: 'relative', zIndex: 1,
          display: 'flex', flexWrap: 'wrap', gap: '56px', alignItems: 'center',
        }}>
          {/* Left: text */}
          <div style={{ flex: '1 1 420px' }}>
            <Reveal>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)',
                borderRadius: 99, padding: '6px 16px', marginBottom: 28,
                fontSize: '0.82rem', color: '#a5b4fc', fontWeight: 500,
              }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#6366f1', display: 'inline-block', animation: 'pulseDot 2s ease-in-out infinite' }} />
                Built for trade &amp; service businesses
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 22px' }}>
                Every customer<br />interaction,{' '}
                <span style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a78bfa 50%, #ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  one intelligent platform
                </span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p style={{ fontSize: 'clamp(0.98rem, 1.8vw, 1.15rem)', color: '#9ca3af', marginBottom: 36, lineHeight: 1.7, maxWidth: 540, minHeight: '4em' }}>
                One platform delivering <Typewriter /> — integrated across your leads, jobs, quotes, campaigns and team in a single live screen.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 40 }}>
                <button onClick={openDemo} style={primaryBtn}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 18px 40px rgba(99,102,241,0.55)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(99,102,241,0.4)' }}
                >
                  <Play size={18} /> Try Live Demo
                </button>
                <button onClick={() => document.getElementById('connect-section')?.scrollIntoView({ behavior: 'smooth' })} style={ghostBtn}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                >
                  Explore Connect <ChevronDown size={16} />
                </button>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {DEMO_COMPANIES.map(co => (
                  <div key={co.id} style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 99, padding: '8px 16px', fontSize: '0.85rem', color: '#9ca3af',
                  }}>
                    <co.icon size={15} color={co.color} />
                    <span style={{ color: '#fff', fontWeight: 500 }}>{co.name}</span>
                    <span>&mdash; live demo</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right: animated notifications */}
          <div style={{ flex: '1 1 320px', maxWidth: 400 }}>
            <HeroNotifications />
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section style={{ padding: '48px 5vw', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 32, maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
            {[
              { n: 34, suffix: '%', label: 'avg. lift in lead conversion', bar: 34 },
              { n: 2400, suffix: '+', label: 'customer interactions / month', bar: 80 },
              { n: 8, suffix: '+', label: 'field service integrations', bar: 60 },
              { n: 100, suffix: '%', label: 'AU-hosted, GDPR-ready', bar: 100 },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 800, color: '#fff', lineHeight: 1, marginBottom: 6 }}>
                  <Counter to={s.n} suffix={s.suffix} />
                </div>
                <div style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: 10 }}>{s.label}</div>
                <div style={{ height: 3, background: 'rgba(255,255,255,0.07)', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', background: 'linear-gradient(90deg, #6366f1, #a78bfa)',
                    borderRadius: 99,
                    '--bar-w': `${s.bar}%`,
                    animation: 'barGrow 1.2s ease forwards',
                    animationDelay: `${i * 150}ms`,
                    width: 0,
                  }} />
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>


      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* ── SELF SERVICE PORTAL ── */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <FocusSection id="self-service-section" sectionStyle={{ padding: '96px 5vw 80px', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.07) 0%, transparent 70%)' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)',
              borderRadius: 99, padding: '6px 16px', marginBottom: 20,
              fontSize: '0.8rem', color: '#a5b4fc', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>
              <Smartphone size={13} />
              Self Service Portal
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 18px', lineHeight: 1.1 }}>
              Let customers do the work.<br />
              <span style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a78bfa 60%, #ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>You just show up.</span>
            </h2>
            <p style={{ color: '#9ca3af', fontSize: 'clamp(1rem, 1.8vw, 1.15rem)', maxWidth: 640, margin: '0 auto', lineHeight: 1.7 }}>
              Replace the static contact form on your website with an intelligent booking workflow.
              Prospects qualify themselves, pick a time that suits you, and convert — without a single manual step.
            </p>
          </div>
        </Reveal>

        {/* Booking portal carousel */}
        <Reveal delay={80}>
          <SelfServiceCarousel />
        </Reveal>

        {/* Feature grid */}
        <Reveal delay={180}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 20, maxWidth: 1180, margin: '52px auto 52px' }}>
            {[
              {
                icon: Video,
                color: '#6366f1',
                title: 'Phone, Video & Onsite Consultations',
                desc: 'Let prospective customers self-book the consultation type that suits them — phone call, video walkthrough, or in-person sales visit — matched directly against your real availability.',
              },
              {
                icon: Clock,
                color: '#8b5cf6',
                title: 'Availability from your Job Management System',
                desc: 'Bookings slot in around your existing jobs and schedules. No double-ups, no manual calendar management — your JMS drives availability in real time.',
              },
              {
                icon: Target,
                color: '#ec4899',
                title: 'Qualify Leads Automatically',
                desc: 'Set criteria that every prospective customer must meet before they can book. Only the right people get through — reducing wasted time and improving your conversion rate.',
              },
              {
                icon: ClipboardList,
                color: '#f59e0b',
                title: 'Replace Your Leads Form',
                desc: 'Swap the dead-end contact form on your website for an actionable booking flow. Every inquiry becomes a qualified lead with a confirmed appointment and real intent.',
              },
              {
                icon: Shield,
                color: '#10b981',
                title: 'Warranty Claims & Service Requests',
                desc: 'Customers can lodge warranty claims or request service against their completed jobs. The portal validates the customer and job against live data — no emails sitting in inboxes.',
              },
              {
                icon: Bell,
                color: '#06b6d4',
                title: 'Automated Confirmations & Reminders',
                desc: 'Customers receive instant booking confirmation and automated reminders as the appointment approaches. No-shows drop. Your diary stays full.',
              },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div key={title} style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 16, padding: '28px 24px', transition: 'border-color .2s, background .2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}44`; e.currentTarget.style.background = 'rgba(255,255,255,0.055)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${color}1a`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <Icon size={20} color={color} />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 8, color: '#f9fafb', lineHeight: 1.3 }}>{title}</h3>
                <p style={{ color: '#9ca3af', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div style={{ textAlign: 'center' }}>
            <button onClick={openDemo}
              style={{
                padding: '15px 34px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: '#fff', border: 'none', borderRadius: 12,
                cursor: 'pointer', fontSize: '1rem', fontWeight: 700,
                boxShadow: '0 12px 32px rgba(99,102,241,0.4)',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                transition: 'transform .2s, box-shadow .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 18px 40px rgba(99,102,241,0.55)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(99,102,241,0.4)' }}
            >
              <Play size={17} /> See the Self Service Portal <ArrowRight size={15} />
            </button>
          </div>
        </Reveal>
      </FocusSection>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* ── DASHBOARD SHOWCASE ── */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <FocusSection id="dashboard-section" sectionStyle={{ padding: '96px 5vw', background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16,185,129,0.06) 0%, transparent 70%)' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
              borderRadius: 99, padding: '6px 16px', marginBottom: 20,
              fontSize: '0.8rem', color: '#6ee7b7', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>
              <BarChart2 size={13} />
              The Dashboard
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 18px', lineHeight: 1.1 }}>
              Your data. Beautifully live.
            </h2>
            <p style={{ color: '#9ca3af', fontSize: 'clamp(1rem, 1.8vw, 1.15rem)', maxWidth: 640, margin: '0 auto', lineHeight: 1.7 }}>
              Marketing ROAS, sales conversions, salesperson performance and lead analytics
              — all updating in real time, cycling through what matters most to your business.
            </p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <DashboardCarousel />
        </Reveal>
        <Reveal delay={200}>
          <div style={{ textAlign: 'center', marginTop: 44 }}>
            <button onClick={openDemo}
              style={{
                padding: '15px 34px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: '#fff', border: 'none', borderRadius: 12,
                cursor: 'pointer', fontSize: '1rem', fontWeight: 700,
                boxShadow: '0 12px 32px rgba(16,185,129,0.35)',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                transition: 'transform .2s, box-shadow .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 18px 40px rgba(16,185,129,0.5)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(16,185,129,0.35)' }}
            >
              <Play size={17} /> Explore the Dashboard <ArrowRight size={15} />
            </button>
          </div>
        </Reveal>
      </FocusSection>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* ── CONNECT SECTION ── */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <FocusSection id="connect-section" sectionStyle={{ padding: '96px 5vw 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <Reveal>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
              borderRadius: 99, padding: '6px 16px', marginBottom: 20,
              fontSize: '0.8rem', color: '#a5b4fc', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>
              <Phone size={13} />
              Autofront Connect
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
              <ConnectRipple />
            </div>
          </Reveal>

          <Reveal delay={160}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 20px', lineHeight: 1.1 }}>
              Your business on the line.<br />
              <span style={{ background: 'linear-gradient(135deg, #6366f1, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Always.</span>
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p style={{ color: '#9ca3af', fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', maxWidth: 700, margin: '0 auto', lineHeight: 1.7 }}>
              Connect is a business-grade communications platform purpose-built for trade and service operators.
              Whether you&rsquo;re a sole trader keeping your personal mobile private or a 50-seat operation
              demanding full enterprise telephony &mdash; Connect scales with you.
            </p>
          </Reveal>
        </div>

        {/* Connect carousel */}
        <Reveal delay={240}>
          <ConnectCarousel />
        </Reveal>
        <div style={{ height: 64 }} />

        {/* Hero value props */}
        <div style={{ maxWidth: 1100, margin: '0 auto 64px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {[
            { icon: Smartphone, color: '#6366f1', headline: 'One number. Any device.', body: 'A dedicated business number that rings on your mobile, desktop browser or team wallboard — without mixing your personal calls. Full softphone functionality with no hardware required.' },
            { icon: PhoneCall, color: '#10b981', headline: 'Answer every call informed.', body: 'Before you say hello, Connect shows you who’s calling, their open quotes, active jobs, conversation history — and whether they’ve already tried calling three times with no answer.' },
            { icon: Clock, color: '#f59e0b', headline: 'No missed lead goes cold.', body: 'Every unanswered call triggers an automatic, personalised SMS. The customer knows you’ll be in touch. Your business never loses a lead to silence again.' },
          ].map((c, i) => (
            <Reveal key={i} delay={i * 100}>
              <TiltCard>
                <div style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.07), rgba(139,92,246,0.04))', border: '1px solid rgba(99,102,241,0.15)', borderRadius: 16, padding: '32px 28px', height: '100%' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 11, background: `${c.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                    <c.icon size={22} color={c.color} />
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: '1.1rem', margin: '0 0 10px', letterSpacing: '-0.01em' }}>{c.headline}</h3>
                  <p style={{ color: '#9ca3af', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>{c.body}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* Connect features grid */}
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(256px, 1fr))', gap: 14 }}>
          {CONNECT_FEATURES.map((f, i) => (
            <Reveal key={i} delay={(i % 4) * 80}>
              <TiltCard>
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '22px 20px', height: '100%', transition: 'border-color .2s, background .2s', cursor: 'default' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = f.color + '45'; e.currentTarget.style.background = `${f.color}09` }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}
                >
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: `${f.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                    <f.icon size={19} color={f.color} />
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: '0.93rem', margin: '0 0 7px' }}>{f.title}</h3>
                  <p style={{ color: '#6b7280', fontSize: '0.83rem', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* ADAM AI spotlight */}
        <Reveal delay={100}>
          <div style={{
            maxWidth: 1100, margin: '56px auto 0',
            background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(99,102,241,0.06))',
            border: '1px solid rgba(139,92,246,0.2)', borderRadius: 20, padding: '48px',
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 52, alignItems: 'center',
          }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: 99, padding: '5px 14px', marginBottom: 20, fontSize: '0.78rem', color: '#a78bfa', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                <Bot size={12} />
                ADAM — AI Automation
              </div>
              <h3 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 800, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
                Always the right reply.<br />Every time.
              </h3>
              <p style={{ color: '#9ca3af', lineHeight: 1.7, fontSize: '0.95rem', margin: '0 0 20px' }}>
                ADAM reads the full conversation history, open quote details, job status and customer profile to construct the perfect reply — instantly. No copy-pasting. No generic responses. Always on-brand, always in context.
              </p>
              <p style={{ color: '#9ca3af', lineHeight: 1.7, fontSize: '0.95rem', margin: '0 0 28px' }}>
                Connect ADAM to automated triggers: a job status change fires a personalised SMS —
                <span style={{ color: '#c4b5fd', fontStyle: 'italic' }}>{' '}“Salesman John Doe is en route for your on-site quote — ETA 28 minutes based on current location.”</span>
                {' '}Your customer is always informed, without anyone on your team lifting a finger.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['Smart reply suggestions', 'Quote & job context', 'Tone-matched responses', 'Status change automation', 'Triggered messaging', 'Full conversation history'].map(tag => (
                  <div key={tag} style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 99, padding: '5px 12px', fontSize: '0.76rem', color: '#c4b5fd', fontWeight: 500 }}>{tag}</div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { from: 'customer', text: 'Hi, just wondering when my hot water install is scheduled? I booked last Tuesday.', ts: '9:14 AM' },
                { from: 'adam', text: '💡 ADAM suggestion: “Hi Sarah! Your hot water system install is scheduled for this Thursday 10–11 AM with our tech Mark Davis. You’ll receive an SMS when he’s en route. Let us know if you need to reschedule!”', ts: '' },
              ].map((msg, i) => (
                <div key={i} style={{
                  background: msg.from === 'customer' ? 'rgba(255,255,255,0.05)' : 'rgba(139,92,246,0.12)',
                  border: `1px solid ${msg.from === 'customer' ? 'rgba(255,255,255,0.08)' : 'rgba(139,92,246,0.25)'}`,
                  borderRadius: 12, padding: '14px 16px',
                  animation: `slideInRight 0.5s ease ${i * 0.3 + 0.4}s both`,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 600, color: msg.from === 'customer' ? '#9ca3af' : '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {msg.from === 'customer' ? '← Customer' : '⚡ ADAM'}
                    </span>
                    {msg.ts && <span style={{ fontSize: '0.72rem', color: '#4b5563' }}>{msg.ts}</span>}
                  </div>
                  <p style={{ color: msg.from === 'customer' ? '#d1d5db' : '#e9d5ff', fontSize: '0.87rem', margin: 0, lineHeight: 1.5 }}>{msg.text}</p>
                </div>
              ))}
              <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckCircle size={14} color="#10b981" />
                <span style={{ color: '#6ee7b7', fontSize: '0.8rem' }}>Sent by team member in 4 seconds</span>
              </div>
            </div>
          </div>
        </Reveal>

        <div style={{ textAlign: 'center', marginTop: 52 }}>
          <Reveal>
            <button onClick={openDemo} style={primaryBtn}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 18px 40px rgba(99,102,241,0.55)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(99,102,241,0.4)' }}
            >
              <Play size={18} /> See Connect in Action <ArrowRight size={16} />
            </button>
          </Reveal>
        </div>
      </FocusSection>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* ── QUOTE ONSITE SECTION ── */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <FocusSection id="quote-section" sectionStyle={{ padding: '96px 5vw 80px', background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(245,158,11,0.07) 0%, transparent 70%)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <Reveal>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.22)',
              borderRadius: 99, padding: '6px 16px', marginBottom: 20,
              fontSize: '0.8rem', color: '#fcd34d', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>
              <ClipboardList size={13} />
              Quote Onsite
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 20px', lineHeight: 1.1 }}>
              Close the deal<br />
              <span style={{ background: 'linear-gradient(135deg, #f59e0b, #fbbf24, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>before you leave the site.</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p style={{ color: '#9ca3af', fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', maxWidth: 700, margin: '0 auto', lineHeight: 1.7 }}>
              Empower your sales staff to capture everything on the spot — photos, measurements, floor area and product selections —
              and walk away leaving a polished, interactive proposal in the customer&rsquo;s inbox. No more returning to the office to draft quotes from memory.
            </p>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <QuoteCarousel />
        </Reveal>
        <div style={{ height: 64 }} />

        {/* Value prop cards */}
        <div style={{ maxWidth: 1100, margin: '0 auto 64px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {[
            { icon: Camera,       color: '#f59e0b', headline: 'Capture everything on site.', body: 'Take photos, record measurements and floor area directly in the app. All evidence is attached to the quote automatically — no emails, no lost notes, no memory required.' },
            { icon: ClipboardList,color: '#10b981', headline: 'Pull from your catalog live.', body: 'Connect to your job management system or import your own pricing catalog. Select products, configure options and apply discounts in seconds while standing in the customer’s home.' },
            { icon: Eye,          color: '#6366f1', headline: 'Know the moment they open it.', body: 'Get notified the instant the customer opens your proposal. See exactly what they read, respond to their questions in-thread, and send automated follow-up reminders so no warm lead goes cold.' },
          ].map((c, i) => (
            <Reveal key={i} delay={i * 100}>
              <TiltCard>
                <div style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.06), rgba(249,115,22,0.03))', border: '1px solid rgba(245,158,11,0.14)', borderRadius: 16, padding: '32px 28px', height: '100%' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 11, background: `${c.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                    <c.icon size={22} color={c.color} />
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: '1.1rem', margin: '0 0 10px', letterSpacing: '-0.01em' }}>{c.headline}</h3>
                  <p style={{ color: '#9ca3af', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>{c.body}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* Feature grid */}
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(256px, 1fr))', gap: 14 }}>
          {[
            { icon: Ruler,         color: '#f59e0b', title: 'On-site measurements & photos',   desc: 'Capture floor area, dimensions and job photos in-app. Every detail is pinned to the quote — no clipboard, no follow-up email.' },
            { icon: Package,       color: '#8b5cf6', title: 'Live catalog & pricing',           desc: 'Pull directly from simPRO, TradeTrak or your own imported price book. Products, labour rates and options — always up to date.' },
            { icon: DollarSign,    color: '#10b981', title: 'VEEC rebates & discounts',         desc: 'Automatically apply government rebates, energy efficiency incentives and tiered discounts to every applicable line item. No manual calculations.' },
            { icon: ClipboardList, color: '#f97316', title: 'Multi-option interactive proposal',desc: 'Present Good / Better / Best tiers side by side. Let customers compare brands, sizes and specifications — not just price.' },
            { icon: Send,          color: '#6366f1', title: 'Proposal in their inbox on the spot',desc: 'Send a branded, mobile-optimised proposal before you back out of the driveway. The customer receives it while the conversation is still fresh.' },
            { icon: Eye,           color: '#ec4899', title: 'Real-time open & read tracking',   desc: 'Know the second a prospect opens your proposal. See which sections they lingered on and trigger the right follow-up at exactly the right moment.' },
            { icon: MessageCircle, color: '#14b8a6', title: 'In-proposal Q&A thread',           desc: 'Customers leave comments or questions directly on the proposal. You respond in-thread — no back-and-forth email chains, no lost context.' },
            { icon: Repeat,        color: '#84cc16', title: 'Automated follow-up reminders',    desc: 'Set a follow-up schedule once. The platform nudges the customer at the right intervals — and alerts your salesperson when a proposal goes quiet.' },
          ].map((f, i) => (
            <Reveal key={i} delay={(i % 4) * 80}>
              <TiltCard>
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '22px 20px', height: '100%', transition: 'border-color .2s, background .2s', cursor: 'default' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = f.color + '45'; e.currentTarget.style.background = `${f.color}09` }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}
                >
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: `${f.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                    <f.icon size={19} color={f.color} />
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: '0.93rem', margin: '0 0 7px' }}>{f.title}</h3>
                  <p style={{ color: '#6b7280', fontSize: '0.83rem', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 52 }}>
          <Reveal>
            <button onClick={openDemo} style={{ ...primaryBtn, background: 'linear-gradient(135deg, #f59e0b, #f97316)', boxShadow: '0 12px 32px rgba(245,158,11,0.35)' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 18px 40px rgba(245,158,11,0.55)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)';    e.currentTarget.style.boxShadow = '0 12px 32px rgba(245,158,11,0.35)' }}
            >
              <Play size={18} /> See Quote Onsite in Action <ArrowRight size={16} />
            </button>
          </Reveal>
        </div>
      </FocusSection>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* ── PLATFORM SECTION ── */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <FocusSection id="platform-section" sectionStyle={{ padding: '96px 5vw', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 99, padding: '6px 16px', marginBottom: 20, fontSize: '0.8rem', color: '#6ee7b7', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              <BarChart2 size={13} /> The Platform
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 16px' }}>Everything your business needs</h2>
            <p style={{ color: '#9ca3af', fontSize: '1.05rem', maxWidth: 520, margin: '0 auto' }}>One login. All your data. No juggling between apps.</p>
          </div>
        </Reveal>

        {/* Featured spotlight */}
        <Reveal delay={80}>
          <div style={{ maxWidth: 1100, margin: '0 auto 64px', background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.05))', border: '1px solid rgba(99,102,241,0.15)', borderRadius: 20, padding: '40px 48px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 48, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, borderRadius: 14, background: `${af.color}22`, marginBottom: 20 }}>
                <af.icon size={28} color={af.color} />
              </div>
              <h3 style={{ fontSize: '1.7rem', fontWeight: 800, margin: '0 0 12px', letterSpacing: '-0.02em' }}>{af.title}</h3>
              <p style={{ color: '#9ca3af', lineHeight: 1.7, fontSize: '1rem', margin: '0 0 20px' }}>{af.desc}</p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${af.color}18`, color: af.color, borderRadius: 99, padding: '6px 14px', fontSize: '0.82rem', fontWeight: 600 }}>
                <CheckCircle size={14} /> {af.stats}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {PLATFORM_FEATURES.map((f, i) => (
                <button key={i} onClick={() => setActivePlatformFeature(i)}
                  style={{ background: i === activePlatformFeature ? `${f.color}18` : 'rgba(255,255,255,0.03)', border: `1px solid ${i === activePlatformFeature ? f.color + '40' : 'rgba(255,255,255,0.06)'}`, borderRadius: 10, padding: '12px 14px', cursor: 'pointer', textAlign: 'left', transition: 'all .2s' }}
                >
                  <f.icon size={16} color={i === activePlatformFeature ? f.color : '#6b7280'} />
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, marginTop: 6, color: i === activePlatformFeature ? '#fff' : '#9ca3af' }}>{f.title}</div>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Feature cards grid */}
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 18 }}>
          {PLATFORM_FEATURES.map((f, i) => (
            <Reveal key={i} delay={(i % 3) * 100}>
              <TiltCard>
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '28px 24px', height: '100%', transition: 'border-color .2s, background .2s', cursor: 'default' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = f.color + '40'; e.currentTarget.style.background = `${f.color}08` }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}
                >
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: `${f.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                    <f.icon size={20} color={f.color} />
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: '1rem', margin: '0 0 8px' }}>{f.title}</h3>
                  <p style={{ color: '#6b7280', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </FocusSection>

      {/* ── HOW THE DEMO WORKS ── */}
      <section style={{ padding: '80px 5vw', background: 'rgba(99,102,241,0.04)', borderTop: '1px solid rgba(99,102,241,0.1)', borderBottom: '1px solid rgba(99,102,241,0.1)' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, margin: '0 0 12px', letterSpacing: '-0.02em' }}>How the live demo works</h2>
            <p style={{ color: '#9ca3af', maxWidth: 480, margin: '0 auto' }}>No credit card. No long sales call. Tell us about your business and explore a fully live dashboard.</p>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 22, maxWidth: 960, margin: '0 auto 48px', alignItems: 'stretch' }}>
          {[
            { step: '01', icon: Users, color: '#6366f1', title: 'Quick intro', desc: 'Tell us your name, number and what job system you\'re using. Takes 30 seconds.' },
            { step: '02', icon: Building2, color: '#8b5cf6', title: 'Pick a company', desc: 'Switch between APEX Electrical and APEX Plumbing to see multi-tenant in action.' },
            { step: '03', icon: Smartphone, color: '#ec4899', title: 'Explore freely', desc: 'Leads, calls, campaigns, analytics, Connect — all live with real data.' },
            { step: '04', icon: RefreshCw, color: '#10b981', title: 'Data resets daily', desc: 'Test data refreshes every 24 hours so it’s always clean for the next visitor.' },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 100} style={{ height: '100%' }}>
              <TiltCard style={{ height: '100%' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '28px 22px', height: '100%', boxSizing: 'border-box' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: s.color, letterSpacing: '0.1em', marginBottom: 14 }}>STEP {s.step}</div>
                  <s.icon size={24} color={s.color} style={{ marginBottom: 12 }} />
                  <h3 style={{ fontWeight: 700, fontSize: '0.95rem', margin: '0 0 8px' }}>{s.title}</h3>
                  <p style={{ color: '#6b7280', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <Reveal>
            <button onClick={openDemo} style={primaryBtn}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 18px 40px rgba(99,102,241,0.55)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(99,102,241,0.4)' }}
            >
              <Play size={18} /> Launch Live Demo <ArrowRight size={16} />
            </button>
          </Reveal>
        </div>
      </section>

      {/* ── INTEGRATIONS (infinite marquee) ── */}
      <section style={{ padding: '64px 0', textAlign: 'center' }}>
        <Reveal>
          <p style={{ color: '#6b7280', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 28 }}>
            Connects with your existing tools
          </p>
        </Reveal>
        <InfiniteMarquee />
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: '96px 5vw', textAlign: 'center', background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(99,102,241,0.16) 0%, transparent 70%)', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
        {/* Shimmer headline */}
        <Reveal>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, margin: '0 auto 16px', maxWidth: 680, letterSpacing: '-0.02em' }}>
            Ready to see it for yourself?
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p style={{ color: '#9ca3af', fontSize: '1.05rem', maxWidth: 480, margin: '0 auto 40px' }}>
            Explore every feature with live data &mdash; no commitment, no sales pitch, no card required.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <button onClick={openDemo}
            style={{ ...primaryBtn, padding: '18px 48px', fontSize: '1.1rem', borderRadius: 14, boxShadow: '0 16px 40px rgba(99,102,241,0.4)' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 22px 52px rgba(99,102,241,0.6)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(99,102,241,0.4)' }}
          >
            <Play size={20} /> Try the Live Demo
          </button>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: '48px 5vw 36px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <img src="/autofront-logo.png" alt="Autofront" style={{ height: 32, width: 'auto', opacity: 0.65 }} />
        <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ color: '#4b5563', fontSize: '0.82rem' }}>AU-hosted · SOC 2 ready</span>
          <span style={{ color: '#374151' }}>·</span>
          <button onClick={handleLogin} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', fontSize: '0.82rem', padding: 0, transition: 'color .2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#9ca3af'}
            onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
          >Staff login</button>
        </div>
      </footer>
      </div>
    </div>
  )
}
