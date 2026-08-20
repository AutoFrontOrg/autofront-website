import {
    Phone, MessageSquare, CalendarCheck, PhoneMissed, Sparkles, RefreshCcw,
    Megaphone, Route, Target, Bot, Briefcase, FileText, CalendarDays,
    ArrowDown, CircleDollarSign, Wrench,
} from 'lucide-react'
import { getTheme, ACCENTS } from './theme'
import { useIsMobile } from './ui'

// Autofront + TradeTrak architecture, styled to match the /sheets system.
// Core message: every Autofront product pushes jobs INTO TradeTrak — nothing
// pulls the customer out of it. (Forecast + VEU deliberately excluded:
// single-tenant / not partner-ready.)
const FLOW = [
    {
        id: 'customer', label: 'Customers', color: ACCENTS.pink,
        caption: 'Where the customer meets the business',
        items: [
            { icon: Phone, text: 'Calls the business number' },
            { icon: MessageSquare, text: 'Sends an SMS' },
            { icon: CalendarCheck, text: 'Books themselves via Assist' },
        ],
    },
    {
        id: 'autofront', label: 'Autofront layer', color: ACCENTS.violet,
        caption: 'Capture, qualify and communicate — then hand over',
        groups: [
            {
                title: 'Connect Core · $79/mo', color: ACCENTS.indigo,
                items: [
                    { icon: Phone, text: 'Business number + calling' },
                    { icon: MessageSquare, text: 'SMS, voicemail, transcripts' },
                ],
            },
            {
                title: 'Assist · 2 honest ways to pay', color: ACCENTS.emerald,
                items: [
                    { icon: CalendarCheck, text: 'Flat — $149/mo, unlimited bookings' },
                    { icon: CircleDollarSign, text: 'Or per-outcome — $49/mo + $6 per booking created in Trak' },
                    { icon: RefreshCcw, text: '60-day review: we move you to whichever is cheaper' },
                ],
            },
            {
                title: 'Bolt-ons', color: ACCENTS.amber,
                items: [
                    { icon: Sparkles, text: 'Ava — AI answering · $149' },
                    { icon: PhoneMissed, text: 'Adam — missed-call SMS · $59' },
                    { icon: RefreshCcw, text: 'Drop-off Recovery · $49' },
                ],
            },
            {
                title: 'Add-ons', color: ACCENTS.cyan,
                items: [
                    { icon: Megaphone, text: 'Campaigns — SMS/email win-back · $99' },
                    { icon: Route, text: 'Route Optimisation · $99 — sequenced runs from your Trak jobs (vehicle tracking on the roadmap)' },
                    { icon: Target, text: 'Leads & Attribution · $69' },
                    { icon: Bot, text: 'AI Assistant · $39' },
                ],
            },
        ],
    },
    {
        id: 'trak', label: 'TradeTrak', color: ACCENTS.indigo,
        caption: 'The system of record — untouched, always',
        items: [
            { icon: Briefcase, text: 'Jobs & tasks' },
            { icon: FileText, text: 'Quoting' },
            { icon: CalendarDays, text: 'Scheduling' },
            { icon: FileText, text: 'Invoicing' },
        ],
    },
]

function FlowArrow({ t, mobile, label }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: mobile ? '6px 0' : '8px 0' }}>
            <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                fontSize: mobile ? 14 : 15.5, fontWeight: 800, letterSpacing: '-0.01em', color: t.mode === 'dark' ? '#c4b5fd' : '#6d28d8',
                background: t.tint(ACCENTS.violet, t.mode === 'dark' ? '1c' : '10'),
                border: `1px solid ${t.tintBorder(ACCENTS.violet, '33')}`,
                borderRadius: 99, padding: mobile ? '8px 18px' : '9px 20px',
            }}>
                <ArrowDown size={mobile ? 16 : 17} />
                {label}
            </div>
            <div style={{ width: 1, height: mobile ? 10 : 14, background: t.tintBorder(ACCENTS.violet, '55') }} />
        </div>
    )
}

function LayerRow({ t, mobile, layer }) {
    const m = !!mobile
    return (
        <div style={{
            background: t.mode === 'dark' ? 'rgba(255,255,255,0.035)' : '#ffffff',
            border: `1px solid ${t.tintBorder(layer.color, '3d')}`,
            borderRadius: 16, padding: m ? '16px 14px' : '20px 22px',
            boxShadow: t.mode === 'light' ? t.cardShadow : 'none',
            display: 'flex', flexDirection: 'column', gap: 12,
        }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontSize: m ? 16 : 15, fontWeight: 800, color: layer.color, letterSpacing: '-0.01em' }}>{layer.label}</span>
                <span style={{ fontSize: m ? 11.5 : 11, color: t.muted, fontWeight: 600 }}>{layer.caption}</span>
            </div>

            {/* simple item rows for customer + trak layers */}
            {layer.items && (
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(${m ? 140 : 180}px, 1fr))`, gap: m ? 8 : 10 }}>
                    {layer.items.map(it => (
                        <div key={it.text} style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            background: t.tint(layer.color, t.mode === 'dark' ? '12' : '08'),
                            border: `1px solid ${t.tintBorder(layer.color, '26')}`,
                            borderRadius: 10, padding: m ? '9px 11px' : '10px 12px',
                        }}>
                            <it.icon size={m ? 15 : 14} color={layer.color} style={{ flex: '0 0 auto' }} />
                            <span style={{ fontSize: m ? 12.5 : 12, fontWeight: 600, color: t.heading }}>{it.text}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* grouped product cards for the autofront layer */}
            {layer.groups && (
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(${m ? 150 : 210}px, 1fr))`, gap: m ? 10 : 12 }}>
                    {layer.groups.map(g => (
                        <div key={g.title} style={{
                            background: t.mode === 'dark' ? 'rgba(255,255,255,0.03)' : t.panel,
                            border: `1px solid ${t.tintBorder(g.color, '30')}`,
                            borderRadius: 12, padding: m ? '12px 12px' : '14px 14px',
                            display: 'flex', flexDirection: 'column', gap: 8,
                        }}>
                            <div style={{ fontSize: m ? 12.5 : 12, fontWeight: 800, color: g.color, letterSpacing: '-0.01em' }}>{g.title}</div>
                            {g.items.map(it => (
                                <div key={it.text} style={{ display: 'flex', alignItems: 'flex-start', gap: 7 }}>
                                    <it.icon size={m ? 13 : 12} color={g.color} style={{ flex: '0 0 auto', marginTop: 2 }} />
                                    <span style={{ fontSize: m ? 11.5 : 11, lineHeight: 1.45, color: t.body, fontWeight: 500 }}>{it.text}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default function TradetrakStack({ theme = 'dark' }) {
    const mobile = useIsMobile()
    const t = getTheme(theme, mobile)

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: mobile ? 14 : 16 }}>
            <FlowArrow t={t} mobile={mobile} label="Every path a customer can take" />
            <LayerRow t={t} mobile={mobile} layer={FLOW[0]} />
            <FlowArrow t={t} mobile={mobile} label="Captured, qualified, communicated" />
            <LayerRow t={t} mobile={mobile} layer={FLOW[1]} />
            <FlowArrow t={t} mobile={mobile} label="Jobs created in TradeTrak — nothing bypasses it" />
            <LayerRow t={t} mobile={mobile} layer={FLOW[2]} />
        </div>
    )
}
