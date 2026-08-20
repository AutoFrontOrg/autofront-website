import { useState } from 'react'
import {
    Phone, MessageSquare, Voicemail as VoicemailIcon, ListChecks, Mic, FileText,
    Smartphone, Monitor, Sparkles, Calendar, Video, Link2, PhoneMissed,
    PhoneCall, Users, UserCog, RefreshCcw, Check, ChevronRight, MapPin,
} from 'lucide-react'
import { getTheme, ACCENTS } from './theme'
import { LogoMark, Eyebrow, useIsMobile } from './ui'
import TradetrakStack from './TradetrakStack'

// Feature lists validated against the AFConnect_backend repo — every line maps to
// shipped functionality (controllers/services listed inline for traceability).
const CORE_FEATURES = [
    { icon: Phone, text: 'Dedicated business number — inbound & outbound calling, personal numbers stay private' },
    { icon: MessageSquare, text: 'Business SMS messaging — one thread per customer' },
    { icon: VoicemailIcon, text: 'Business voicemail with custom greetings' },
    { icon: ListChecks, text: 'Realtime usage view — itemised list of every call in and out, live' },
    { icon: Mic, text: 'Call recordings, stored against the conversation' },
    { icon: FileText, text: 'Call transcriptions — read the call without replaying it' },
    { icon: Smartphone, text: 'Mobile app for calling on the road' },
    { icon: Monitor, text: 'Full web app access — live dashboard for call records and usage' },
    { icon: Users, text: 'Unlimited users — no per-seat tax, ever' },
]

const PLUS_FEATURES = [
    { icon: Link2, text: 'TradeTrak integration — calls, transcripts and messages logged straight to the matching TradeTrak contact and job' },
    { icon: Video, text: 'Video calling with automatic transcription, plus a direct link back to the recording from TradeTrak' },
    { icon: Sparkles, text: 'Ava — AI voice answering, qualification and smart forwarding. Never a lost call.' },
    { icon: PhoneMissed, text: 'Adam — automated SMS follow-up on every missed call' },
]

const PREMIUM_FEATURES = [
    { icon: RefreshCcw, text: 'Booking drop-off recovery included free (for Assist customers)' },
    { icon: PhoneCall, text: 'Full IVR — menus, options, after-hours and holiday handling' },
    { icon: UserCog, text: 'Staff-based routing — ring groups, availability-aware and business-hours scheduling' },
    { icon: Users, text: 'Team messaging — staff-to-staff internal comms, groups and direct' },
    { icon: Phone, text: 'Internal calling — call any teammate directly, VoIP with automatic mobile fallback' },
    { icon: FileText, text: 'Internal notes on every conversation — text or voice, pinned for the team, notified in real time' },
    { icon: MapPin, text: 'Live staff presence & location — see who\'s available and where your field team is right now' },
    { icon: PhoneMissed, text: 'Auto call recovery — detects carrier drop-outs and re-dials automatically' },
]

const TIERS = [
    {
        id: 'core', name: 'Core', color: ACCENTS.indigo,
        tagline: 'One business number. Every conversation.',
        best: 'Sole traders & small teams getting a business number',
        features: CORE_FEATURES,
        price: 79,
    },
    {
        id: 'plus', name: 'Plus', color: ACCENTS.violet,
        tagline: 'Built for trade businesses running TradeTrak.',
        best: 'Teams on TradeTrak ready to stop missing calls and leads',
        features: PLUS_FEATURES,
        includes: 'core',
        highlighted: true,
        price: 300,
    },
    {
        id: 'premium', name: 'Premium', color: ACCENTS.emerald,
        tagline: 'A complete business phone system.',
        best: 'Multi-staff businesses that live on the phone',
        features: PREMIUM_FEATURES,
        includes: 'plus',
        price: 800,
    },
]

function TierCard({ t, tier, mobile }) {
    return (
        <div style={{
            flex: mobile ? '0 0 auto' : '1 1 0',
            width: '100%',
            background: tier.highlighted
                ? (t.mode === 'dark' ? 'rgba(139,92,246,0.07)' : '#ffffff')
                : (t.mode === 'dark' ? 'rgba(255,255,255,0.035)' : '#ffffff'),
            border: `1px solid ${tier.highlighted ? t.tintBorder(tier.color, '55') : t.border}`,
            borderRadius: 18,
            padding: mobile ? '22px 20px' : '24px 22px',
            display: 'flex', flexDirection: 'column', gap: mobile ? 16 : 14,
            boxShadow: t.mode === 'light' ? t.cardShadow : 'none',
            position: 'relative',
            ...(tier.highlighted && !mobile ? { transform: 'translateY(-10px)' } : {}),
        }}>
            {tier.highlighted && (
                <div style={{
                    position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff',
                    fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase',
                    borderRadius: 99, padding: '4px 14px', whiteSpace: 'nowrap',
                }}>Most popular</div>
            )}

            <div>
                <div style={{ fontSize: mobile ? 22 : 20, fontWeight: 800, color: tier.color, letterSpacing: '-0.01em' }}>
                    Connect {tier.name}
                </div>
                <div style={{ fontSize: mobile ? 14 : 12, color: t.heading, fontWeight: 600, marginTop: 4 }}>{tier.tagline}</div>
                <div style={{ fontSize: mobile ? 12 : 10.5, color: t.muted, marginTop: 6 }}>Best for: {tier.best}</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontSize: mobile ? 30 : 26, fontWeight: 800, color: t.heading, letterSpacing: '-0.02em' }}>${tier.price}</span>
                <span style={{ fontSize: mobile ? 13 : 11.5, color: t.muted, fontWeight: 600 }}>/month</span>
            </div>
            <div style={{ fontSize: mobile ? 11.5 : 10, color: t.muted, marginTop: -8 }}>+ metered calls & SMS — watch it live in the usage view, no surprises</div>

            <div style={{ height: 1, background: t.border }} />

            {tier.includes && (
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    fontSize: mobile ? 12.5 : 11, fontWeight: 700, color: t.body,
                    background: t.tint(tier.color, t.mode === 'dark' ? '14' : '0a'),
                    border: `1px solid ${t.tintBorder(tier.color, '22')}`,
                    borderRadius: 8, padding: mobile ? '8px 10px' : '6px 9px',
                }}>
                    <Check size={mobile ? 14 : 12} color={tier.color} />
                    Everything in Connect {tier.includes.includes('core') ? 'Core' : 'Plus'}, plus:
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: mobile ? 12 : 10 }}>
                {tier.features.map(f => (
                    <div key={f.text} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <div style={{
                            width: mobile ? 30 : 26, height: mobile ? 30 : 26, flex: '0 0 auto',
                            borderRadius: 7, background: t.tint(tier.color),
                            display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1,
                        }}>
                            <f.icon size={mobile ? 15 : 13} color={tier.color} />
                        </div>
                        <div style={{ fontSize: mobile ? 13.5 : 11.5, lineHeight: 1.5, color: t.body, fontWeight: 500 }}>
                            {f.text}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const COMPARE = [
    { label: 'Business number, calling & SMS', core: true, plus: true, premium: true },
    { label: 'Realtime itemised usage — every call in and out', core: true, plus: true, premium: true },
    { label: 'Voicemail, recordings & transcriptions', core: true, plus: true, premium: true },
    { label: 'Unlimited users — no per-seat pricing', core: true, plus: true, premium: true },
    { label: 'TradeTrak integration — calls, transcripts & messages logged to contact + job', core: false, plus: true, premium: true },
    { label: 'Video calling with transcription + link to recording in TradeTrak', core: false, plus: true, premium: true },
    { label: 'Ava — AI answering & forwarding', core: false, plus: true, premium: true },
    { label: 'Adam — missed-call SMS follow-up', core: false, plus: true, premium: true },
    { label: 'Booking drop-off recovery (for Assist customers)', core: false, plus: false, premium: true },
    { label: 'Full IVR (menus, after-hours, holidays)', core: false, plus: false, premium: true },
    { label: 'Staff-based routing & ring groups', core: false, plus: false, premium: true },
    { label: 'Team messaging', core: false, plus: false, premium: true },
    { label: 'Internal staff-to-staff calling (VoIP + mobile fallback)', core: false, plus: false, premium: true },
    { label: 'Internal notes on conversations (text & voice)', core: false, plus: false, premium: true },
    { label: 'Live staff presence & field location', core: false, plus: false, premium: true },
    { label: 'Auto call recovery on drop-out', core: false, plus: false, premium: true },
]

function CompareTable({ t, mobile }) {
    const [selectedTier, setSelectedTier] = useState('core')
    const cell = (val) => val
        ? <Check size={14} color={ACCENTS.emerald} />
        : <span style={{ color: t.faint, fontSize: 11 }}>&mdash;</span>

    // Mobile: pick a plan, see a clean checklist for just that plan. A 4-column
    // grid can't fit a phone, and per-feature pill rows read noisy — one plan at
    // a time directly answers "what do I get in Plus?".
    if (mobile) {
        const tiers = [
            { id: 'core', label: 'Core' },
            { id: 'plus', label: 'Plus' },
            { id: 'premium', label: 'Premium' },
        ]
        const value = (row) => row[selectedTier]
        return (
            <div style={{
                background: t.mode === 'dark' ? 'rgba(255,255,255,0.035)' : '#ffffff',
                border: `1px solid ${t.border}`, borderRadius: 18,
                padding: '16px 14px',
                boxShadow: t.mode === 'light' ? t.cardShadow : 'none',
                display: 'flex', flexDirection: 'column', gap: 12,
            }}>
                <div style={{
                    display: 'flex', gap: 2,
                    background: t.mode === 'dark' ? 'rgba(255,255,255,0.05)' : t.panelAlt,
                    border: `1px solid ${t.border}`, borderRadius: 99, padding: 3,
                }}>
                    {tiers.map(tier => (
                        <button key={tier.id} onClick={() => setSelectedTier(tier.id)} style={{
                            flex: 1, padding: '8px 0', borderRadius: 99, border: 'none', cursor: 'pointer',
                            fontSize: 12.5, fontWeight: 700,
                            background: selectedTier === tier.id ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent',
                            color: selectedTier === tier.id ? '#fff' : t.muted,
                        }}>{tier.label}</button>
                    ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {COMPARE.map((row, i) => (
                        <div key={row.label} style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                            padding: '11px 2px',
                            borderBottom: i < COMPARE.length - 1 ? `1px solid ${t.border}` : 'none',
                        }}>
                            <span style={{ fontSize: 13, color: value(row) ? t.heading : t.muted, fontWeight: 500, lineHeight: 1.4 }}>
                                {row.label}
                            </span>
                            <span style={{ flex: '0 0 auto' }}>
                                {value(row)
                                    ? <Check size={17} color={ACCENTS.emerald} />
                                    : <span style={{ color: t.faint, fontSize: 13 }}>&mdash;</span>}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div style={{
            background: t.mode === 'dark' ? 'rgba(255,255,255,0.035)' : '#ffffff',
            border: `1px solid ${t.border}`, borderRadius: 18,
            padding: '20px 24px',
            boxShadow: t.mode === 'light' ? t.cardShadow : 'none',
        }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        {['', 'Core', 'Plus', 'Premium'].map((h, i) => (
                            <th key={h || 'f'} style={{
                                textAlign: i === 0 ? 'left' : 'center',
                                fontSize: 11, fontWeight: 800, letterSpacing: '0.04em',
                                textTransform: 'uppercase', color: t.heading,
                                padding: '8px 10px',
                                borderBottom: `1px solid ${t.borderStrong}`,
                            }}>{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {COMPARE.map(row => (
                        <tr key={row.label}>
                            <td style={{
                                fontSize: 11, color: t.body, fontWeight: 500,
                                padding: '8px 10px',
                                borderBottom: `1px solid ${t.border}`, minWidth: 160,
                            }}>{row.label}</td>
                            {[row.core, row.plus, row.premium].map((v, i) => (
                                <td key={i} style={{
                                    textAlign: 'center', padding: '8px 10px',
                                    borderBottom: `1px solid ${t.border}`,
                                }}>{cell(v)}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default function ConnectTiers() {
    const [theme, setTheme] = useState('dark')
    const mobile = useIsMobile()
    const t = getTheme(theme, mobile)

    return (
        <div style={{ minHeight: '100vh', background: t.mode === 'dark' ? '#05070c' : '#e7e9ef', fontFamily: "'Inter', system-ui, -apple-system, sans-serif", padding: mobile ? '18px 14px 40px' : '28px 0 60px' }}>
            <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: mobile ? 26 : 34 }}>

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, padding: mobile ? '0 4px' : 0 }}>
                    <a href="/sheets" style={{ fontSize: 12.5, color: t.mode === 'dark' ? '#9ca3af' : '#4b5566', textDecoration: 'none', fontWeight: 600 }}>&larr; All product sheets</a>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <div style={{ display: 'flex', background: t.mode === 'dark' ? 'rgba(255,255,255,0.06)' : '#fff', border: `1px solid ${t.border}`, borderRadius: 99, padding: 3, gap: 2 }}>
                            <button onClick={() => setTheme('dark')} style={{
                                padding: '6px 12px', borderRadius: 99, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 700,
                                background: theme === 'dark' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent',
                                color: theme === 'dark' ? '#fff' : '#8891a3',
                            }}>Dark</button>
                            <button onClick={() => setTheme('light')} style={{
                                padding: '6px 12px', borderRadius: 99, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 700,
                                background: theme === 'light' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent',
                                color: theme === 'light' ? '#fff' : '#8891a3',
                            }}>Light</button>
                        </div>
                    </div>
                </div>

                {/* Hero */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: mobile ? 12 : 14, padding: mobile ? '0 4px' : 0 }}>
                    <LogoMark t={t} size={24} />
                    <Eyebrow t={t} color={ACCENTS.indigo}>Connect Plans</Eyebrow>
                    <h1 style={{ margin: 0, fontSize: mobile ? 28 : 38, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: t.heading, maxWidth: 720 }}>
                        One business number. <span style={{
                            backgroundImage: t.heroGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                        }}>Three ways to grow.</span>
                    </h1>
                    <p style={{ margin: 0, fontSize: mobile ? 14.5 : 15.5, lineHeight: 1.6, color: t.body, maxWidth: 640 }}>
                        Every plan starts with a dedicated business number for calls, messages and voicemail —
                        with recordings and transcriptions built in. Step up to Plus for direct TradeTrak
                        integration and AI answering, or Premium for full team routing control.
                    </p>
                </div>

                {/* Tier cards */}
                <div style={{
                    display: mobile ? 'flex' : 'grid',
                    gridTemplateColumns: mobile ? undefined : 'repeat(3, 1fr)',
                    flexDirection: 'column',
                    gap: mobile ? 22 : 20,
                    alignItems: 'stretch',
                    paddingTop: mobile ? 0 : 10,
                }}>
                    {TIERS.map(tier => <TierCard key={tier.id} t={t} tier={tier} mobile={mobile} />)}
                </div>

                {/* Compare table */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: mobile ? 12 : 14 }}>
                    <div style={{ fontSize: mobile ? 13 : 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.muted, padding: mobile ? '0 4px' : 0 }}>
                        Compare plans
                    </div>
                    <CompareTable t={t} mobile={mobile} />
                </div>

                {/* Architecture: how everything fits with TradeTrak */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: mobile ? 12 : 14 }}>
                    <div style={{ fontSize: mobile ? 13 : 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: t.muted, padding: mobile ? '0 4px' : 0 }}>
                        How it fits with TradeTrak
                    </div>
                    <div style={{
                        // Light mode: border only, no background — the page background
                        // shows straight through so the diagram adds no extra colour block.
                        background: t.mode === 'dark' ? 'rgba(99,102,241,0.04)' : 'transparent',
                        border: `1px solid ${t.border}`, borderRadius: 18,
                        padding: mobile ? '14px' : '20px 22px',
                    }}>
                        <div style={{ marginBottom: mobile ? 16 : 20, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                            <div style={{
                                fontSize: mobile ? 22 : 28, fontWeight: 800, color: t.heading,
                                letterSpacing: '-0.02em', lineHeight: 1.15, maxWidth: 760,
                            }}>
                                Every product pushes jobs{' '}
                                <span style={{
                                    backgroundImage: t.heroGradient, WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                                }}>into</span>{' '}
                                TradeTrak. Nothing pulls customers out.
                            </div>
                            <div style={{ fontSize: mobile ? 13.5 : 14, color: t.body, marginTop: 2 }}>
                                TradeTrak stays the system of record — <span style={{ fontWeight: 700, color: t.heading }}>Autofront is the lead-flow layer around it.</span>
                            </div>
                        </div>
                        <TradetrakStack theme={theme} />
                    </div>
                </div>

                {/* Footer */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap',
                    fontSize: mobile ? 13 : 12, color: t.muted, textAlign: 'center', padding: mobile ? '0 8px' : 0,
                }}>
                    <Calendar size={14} style={{ flex: '0 0 auto' }} color={t.mode === 'dark' ? '#6366f1' : '#4f46e5'} />
                    Month-to-month, unlimited users on every plan, and you keep your number if you leave. Usage (calls & SMS) is transparently metered with a realtime itemised view — what you see is what you pay.
                    <a href="/sheets/connect" style={{ color: t.mode === 'dark' ? '#a5b4fc' : '#4f46e5', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        See the Connect sheet <ChevronRight size={13} />
                    </a>
                </div>
            </div>
        </div>
    )
}
