"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    X, Activity, TrendingUp, AlertTriangle, MessageSquare, Users, ArrowRightLeft, Map,
    ArrowUp, ArrowDown, Minus, ChevronRight, ChevronDown, Zap,
} from "lucide-react"
import {
    DEMO_PERFORMANCE_SUMMARIES,
    DEMO_PROMOTION_CASE,
    DEMO_UNDERPERFORMANCE_ALERTS,
    DEMO_COACHING,
    DEMO_PEER_REPORT,
    DEMO_MOBILITY,
    DEMO_CAPABILITY_MAP,
} from "@/lib/pm-performance-data"

type Tab = 'performance' | 'promotion' | 'underperformance' | 'coaching' | 'peers' | 'mobility' | 'capability'

const TABS: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: 'performance', label: 'Performance', icon: Activity },
    { key: 'promotion', label: 'Promotion', icon: TrendingUp },
    { key: 'underperformance', label: 'Alerts', icon: AlertTriangle },
    { key: 'coaching', label: 'Coaching', icon: MessageSquare },
    { key: 'peers', label: 'Peers', icon: Users },
    { key: 'mobility', label: 'Mobility', icon: ArrowRightLeft },
    { key: 'capability', label: 'Skills', icon: Map },
]

/* ═══════════════════════════════════════════════════════════════════════════════
   ROOT
   ═══════════════════════════════════════════════════════════════════════════════ */
export default function PerformanceIntelPanel({ onClose }: { onClose: () => void }) {
    const [tab, setTab] = useState<Tab>('performance')

    return (
        <div className="h-full flex flex-col" style={{ background: 'linear-gradient(180deg, #0c0c0f 0%, #09090b 100%)' }}>
            {/* ── Header ── */}
            <div className="px-8 pt-6 pb-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(168,85,247,0.06) 100%)' }}
                    >
                        <Activity className="w-[18px] h-[18px] text-violet-400/70" />
                    </div>
                    <div>
                        <h2 className="text-[15px] font-semibold text-white/90 tracking-[-0.01em]">Performance Intelligence</h2>
                        <p className="text-[10px] text-white/20 font-medium tracking-[0.08em] uppercase mt-0.5">People Ops · Analytics</p>
                    </div>
                </div>
                <button onClick={onClose} className="w-8 h-8 rounded-xl hover:bg-white/[0.05] flex items-center justify-center transition-all duration-200 group">
                    <X className="w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors" />
                </button>
            </div>

            {/* ── Tab bar ── */}
            <div className="px-6 flex gap-1 shrink-0 mb-1">
                {TABS.map(t => (
                    <button key={t.key} onClick={() => setTab(t.key)}
                        className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-[11px] font-medium transition-all duration-200 whitespace-nowrap ${tab === t.key
                                ? 'text-white/90'
                                : 'text-white/25 hover:text-white/40'
                            }`}
                    >
                        <t.icon className="w-3.5 h-3.5" />
                        {t.label}
                        {tab === t.key && (
                            <motion.div layoutId="activeTab"
                                className="absolute inset-0 rounded-xl"
                                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)', boxShadow: '0 0 0 1px rgba(255,255,255,0.06), 0 1px 2px rgba(0,0,0,0.3)' }}
                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                        )}
                    </button>
                ))}
            </div>

            <div className="h-px mx-6 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent shrink-0" />

            {/* ── Content ── */}
            <div className="flex-1 overflow-y-auto px-8 py-6 scrollbar-none">
                <AnimatePresence mode="wait">
                    <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}>
                        {tab === 'performance' && <PerformanceTab />}
                        {tab === 'promotion' && <PromotionTab />}
                        {tab === 'underperformance' && <AlertsTab />}
                        {tab === 'coaching' && <CoachingTab />}
                        {tab === 'peers' && <PeersTab />}
                        {tab === 'mobility' && <MobilityTab />}
                        {tab === 'capability' && <CapabilityTab />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}


/* ═══════════════════════════════════════════════════════════════════════════════
   DESIGN PRIMITIVES — Apple / OpenAI grade
   ═══════════════════════════════════════════════════════════════════════════════ */

const cardStyle: React.CSSProperties = {
    background: 'linear-gradient(145deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.008) 100%)',
    boxShadow: '0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.04)',
    borderRadius: '16px',
}

const cardStyleSm: React.CSSProperties = {
    ...cardStyle,
    borderRadius: '12px',
}

/* ─── Ring Gauge ──────────────────────────────────────────────────────────── */
function Ring({ value, size = 100, stroke = 6, label, sub, delay = 0, gradient }: {
    value: number; size?: number; stroke?: number; label?: string; sub?: string; delay?: number
    gradient?: [string, string]
}) {
    const r = (size - stroke) / 2
    const circ = 2 * Math.PI * r
    const off = circ - (value / 100) * circ
    const gid = `ring-${size}-${delay}-${value}`
    const [c1, c2] = gradient || ['#8b5cf6', '#a78bfa']

    return (
        <div className="flex flex-col items-center">
            <div className="relative" style={{ width: size, height: size }}>
                <svg width={size} height={size} className="-rotate-90">
                    <defs>
                        <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={c1} />
                            <stop offset="100%" stopColor={c2} />
                        </linearGradient>
                    </defs>
                    <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth={stroke} />
                    <motion.circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={`url(#${gid})`} strokeWidth={stroke} strokeLinecap="round"
                        strokeDasharray={circ} initial={{ strokeDashoffset: circ }} animate={{ strokeDashoffset: off }}
                        transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: delay + 0.4, duration: 0.4 }}
                        className="text-[28px] font-light tabular-nums text-white/90 tracking-tight"
                        style={{ fontSize: size > 80 ? '28px' : '18px' }}
                    >{value}</motion.span>
                </div>
            </div>
            {label && <span className="text-[10px] text-white/35 font-medium mt-2">{label}</span>}
            {sub && <span className="text-[9px] text-white/15 mt-0.5">{sub}</span>}
        </div>
    )
}

/* ─── Radar ───────────────────────────────────────────────────────────────── */
function Radar({ axes, values, size = 240, comparisonValues }: {
    axes: string[]; values: number[]; size?: number; comparisonValues?: number[]
}) {
    const cx = size / 2, cy = size / 2, maxR = size * 0.34, n = axes.length
    const step = (2 * Math.PI) / n, start = -Math.PI / 2
    const pt = (i: number, r: number) => ({
        x: cx + r * Math.cos(start + i * step),
        y: cy + r * Math.sin(start + i * step),
    })
    const poly = (vals: number[]) => vals.map((v, i) => { const p = pt(i, (v / 100) * maxR); return `${p.x},${p.y}` }).join(' ')

    return (
        <motion.svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}
            initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
            <defs>
                <radialGradient id="rGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="rFill" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.02" />
                </linearGradient>
            </defs>
            <circle cx={cx} cy={cy} r={maxR * 1.1} fill="url(#rGlow)" />
            {/* Grid */}
            {[1, 2, 3, 4].map(l => {
                const r2 = (l / 4) * maxR
                return <polygon key={l} points={Array.from({ length: n }).map((_, i) => { const p = pt(i, r2); return `${p.x},${p.y}` }).join(' ')}
                    fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="0.5" />
            })}
            {axes.map((_, i) => {
                const p = pt(i, maxR)
                return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
            })}
            {/* Comparison */}
            {comparisonValues && (
                <motion.polygon points={poly(comparisonValues)} fill="none" stroke="#fbbf24" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 4"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                />
            )}
            {/* Data */}
            <motion.polygon points={poly(values)} fill="url(#rFill)" stroke="url(#rFill)" strokeWidth="1.5"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.6 }}
            />
            <motion.polygon points={poly(values)} fill="none" stroke="#8b5cf6" strokeWidth="1.5" strokeOpacity="0.5"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
                style={{ filter: 'drop-shadow(0 0 6px rgba(139,92,246,0.15))' }}
            />
            {values.map((v, i) => {
                const p = pt(i, (v / 100) * maxR)
                return <motion.circle key={i} cx={p.x} cy={p.y} r="3" fill="#8b5cf6" stroke="#0c0c0f" strokeWidth="2"
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 + i * 0.04 }}
                    style={{ filter: 'drop-shadow(0 0 4px rgba(139,92,246,0.3))' }}
                />
            })}
            {/* Labels */}
            {axes.map((label, i) => {
                const p = pt(i, maxR + 20)
                return <text key={`l-${i}`} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle"
                    fill="rgba(255,255,255,0.25)" fontSize="9" fontWeight="500" letterSpacing="0.03em"
                >{label}</text>
            })}
        </motion.svg>
    )
}

/* ─── Spark ───────────────────────────────────────────────────────────────── */
function Spark({ data, w = 100, h = 28, gradient }: {
    data: number[]; w?: number; h?: number; gradient?: [string, string]
}) {
    if (!data.length) return null
    const [c1, c2] = gradient || ['#8b5cf6', '#a78bfa']
    const mn = Math.min(...data) - 2, mx = Math.max(...data) + 2, rng = mx - mn || 1
    const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - mn) / rng) * (h - 4) - 2}`).join(' ')
    const uid = `sp${w}${h}${data.length}`
    return (
        <motion.svg width={w} height={h} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <defs>
                <linearGradient id={uid} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={c1} stopOpacity="0.12" />
                    <stop offset="100%" stopColor={c2} stopOpacity="0" />
                </linearGradient>
                <linearGradient id={`${uid}s`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={c1} />
                    <stop offset="100%" stopColor={c2} />
                </linearGradient>
            </defs>
            <polygon points={`0,${h} ${pts} ${w},${h}`} fill={`url(#${uid})`} />
            <polyline points={pts} fill="none" stroke={`url(#${uid}s)`} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
        </motion.svg>
    )
}

/* ─── Bar ─────────────────────────────────────────────────────────────────── */
function Bar({ label, value, max = 100, delay = 0, rightLabel, gradient }: {
    label: string; value: number; max?: number; delay?: number; rightLabel?: string; gradient?: [string, string]
}) {
    const pct = Math.min(100, Math.round((value / max) * 100))
    const [c1, c2] = gradient || ['#8b5cf6', '#a78bfa']
    return (
        <div className="space-y-1.5">
            <div className="flex justify-between items-baseline">
                <span className="text-[11px] text-white/35 font-medium">{label}</span>
                <span className="text-[11px] text-white/20 font-mono tabular-nums">{rightLabel ?? value}</span>
            </div>
            <div className="h-[5px] rounded-full bg-white/[0.03] overflow-hidden">
                <motion.div className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${c1}, ${c2})`, boxShadow: `0 0 12px ${c1}25` }}
                    initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                    transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
                />
            </div>
        </div>
    )
}

/* ─── Section Label ──────────────────────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
    return <p className="text-[10px] text-white/20 font-semibold uppercase tracking-[0.1em] mb-4">{children}</p>
}

/* ─── Card ────────────────────────────────────────────────────────────────── */
function Card({ children, className = '', delay = 0, small }: {
    children: React.ReactNode; className?: string; delay?: number; small?: boolean
}) {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.35 }}
            className={`${className}`}
            style={small ? cardStyleSm : cardStyle}
        >{children}</motion.div>
    )
}


/* ═══════════════════════════════════════════════════════════════════════════════
   TAB 1 — PERFORMANCE
   ═══════════════════════════════════════════════════════════════════════════════ */
function PerformanceTab() {
    const [sel, setSel] = useState(0)
    const emp = DEMO_PERFORMANCE_SUMMARIES[sel]
    const radarAxes = emp.signals.map(s => s.metric.split('/')[0].split(' ')[0])
    const radarValues = emp.signals.map(s => Math.round((s.value / s.maxValue) * 100))
    const trendGrad: [string, string] = emp.trend === 'rising' ? ['#34d399', '#6ee7b7'] : emp.trend === 'declining' ? ['#f87171', '#fca5a5'] : ['#8b5cf6', '#a78bfa']

    return (
        <div className="space-y-8">
            {/* Employee selector */}
            <div className="flex gap-3">
                {DEMO_PERFORMANCE_SUMMARIES.map((e, i) => (
                    <button key={e.employeeId} onClick={() => setSel(i)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${sel === i ? 'text-white/80' : 'text-white/25 hover:text-white/40'
                            }`}
                        style={sel === i ? cardStyle : { background: 'transparent' }}
                    >
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-bold"
                            style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0.05) 100%)' }}
                        >{e.avatar}</div>
                        <div className="text-left">
                            <p className="text-[12px] font-semibold tracking-tight">{e.name}</p>
                            <p className="text-[9px] text-white/15">{e.role}</p>
                        </div>
                    </button>
                ))}
            </div>

            {/* Hero Row */}
            <div className="flex items-center gap-6">
                {/* Score Ring */}
                <Card className="p-6 flex flex-col items-center" delay={0.05}>
                    <Ring value={emp.overallScore} size={110} stroke={7} gradient={trendGrad} />
                    <div className="mt-3 flex items-center gap-2">
                        {emp.trend === 'rising' ? <ArrowUp className="w-3 h-3 text-emerald-400/50" /> : emp.trend === 'declining' ? <ArrowDown className="w-3 h-3 text-red-400/50" /> : <Minus className="w-3 h-3 text-white/15" />}
                        <span className="text-[11px] tabular-nums" style={{ color: emp.trend === 'rising' ? '#34d39980' : emp.trend === 'declining' ? '#f8717180' : 'rgba(255,255,255,0.2)' }}>
                            {emp.trendDelta > 0 ? '+' : ''}{emp.trendDelta}%
                        </span>
                    </div>
                </Card>

                {/* Radar */}
                <Card className="flex-1 py-4 flex justify-center" delay={0.1}>
                    <Radar axes={radarAxes} values={radarValues} size={200} />
                </Card>

                {/* Sparkline */}
                <Card className="p-5 flex flex-col items-center gap-3" delay={0.15}>
                    <Spark data={emp.weeklyScores} gradient={trendGrad} w={120} h={32} />
                    <span className="text-[8px] text-white/12 uppercase tracking-[0.15em]">12 week trend</span>
                </Card>
            </div>

            {/* Signals Grid */}
            <div>
                <SectionLabel>Signals</SectionLabel>
                <div className="grid grid-cols-5 gap-3">
                    {emp.signals.map((sig, i) => (
                        <Card key={sig.id} className="p-4" delay={0.1 + i * 0.04} small>
                            <div className="flex items-start justify-between mb-3">
                                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.04 }}
                                    className="text-[26px] font-light tabular-nums tracking-tight"
                                    style={{ color: sig.trend === 'up' ? '#34d39990' : sig.trend === 'down' ? '#f8717180' : 'rgba(255,255,255,0.5)' }}
                                >{sig.value}</motion.span>
                                {sig.trend === 'up' ? <ArrowUp className="w-3 h-3 text-emerald-400/30 mt-2" />
                                    : sig.trend === 'down' ? <ArrowDown className="w-3 h-3 text-red-400/30 mt-2" />
                                        : <Minus className="w-3 h-3 text-white/10 mt-2" />}
                            </div>
                            <p className="text-[9px] text-white/20 font-medium uppercase tracking-[0.06em]">
                                {sig.metric.split('/')[0]}
                            </p>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Highlights / Watch */}
            <div className="grid grid-cols-2 gap-4">
                <Card className="p-5" delay={0.3}>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/50" />
                        <span className="text-[9px] text-emerald-400/40 font-semibold uppercase tracking-[0.1em]">Highlights</span>
                    </div>
                    {emp.highlights.map((h, i) => (
                        <p key={i} className="text-[11px] text-white/30 leading-[1.6] mb-1.5">{h}</p>
                    ))}
                </Card>
                <Card className="p-5" delay={0.35}>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400/50" />
                        <span className="text-[9px] text-amber-400/40 font-semibold uppercase tracking-[0.1em]">Watch</span>
                    </div>
                    {emp.areasToWatch.map((a, i) => (
                        <p key={i} className="text-[11px] text-white/30 leading-[1.6] mb-1.5">{a}</p>
                    ))}
                </Card>
            </div>
        </div>
    )
}


/* ═══════════════════════════════════════════════════════════════════════════════
   TAB 2 — PROMOTION
   ═══════════════════════════════════════════════════════════════════════════════ */
function PromotionTab() {
    const p = DEMO_PROMOTION_CASE
    const axes = p.comparisons.map(c => c.metric.split(' ')[0])
    const vals = p.comparisons.map(c => c.candidate)
    const l6 = p.comparisons.map(c => c.nextLevelAvg)

    const readinessGrad: [string, string] = p.readinessScore >= 80 ? ['#34d399', '#6ee7b7'] : p.readinessScore >= 60 ? ['#fbbf24', '#fcd34d'] : ['#8b5cf6', '#a78bfa']

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-[18px] text-white/85 font-semibold tracking-[-0.02em]">{p.name}</h3>
                    <p className="text-[11px] text-white/20 mt-1">{p.currentLevel} → {p.targetLevel} · {p.timeInRole}</p>
                </div>
                <Ring value={p.readinessScore} size={80} stroke={5} gradient={readinessGrad}
                    label={p.readinessLabel === 'ready' ? 'Ready' : p.readinessLabel === 'almost' ? 'Almost' : 'Growing'}
                />
            </div>

            {/* Radar */}
            <Card className="py-6 flex flex-col items-center" delay={0.1}>
                <Radar axes={axes} values={vals} size={260} comparisonValues={l6} />
                <div className="flex gap-6 mt-3">
                    <span className="flex items-center gap-2 text-[10px] text-white/25">
                        <span className="w-6 h-[2px] rounded-full" style={{ background: 'linear-gradient(90deg, #8b5cf6, #a78bfa)' }} />Candidate
                    </span>
                    <span className="flex items-center gap-2 text-[10px] text-white/25">
                        <span className="w-6 h-[2px] rounded-full border-t border-dashed border-amber-400/30" style={{ background: 'transparent' }} />L6 Average
                    </span>
                </div>
            </Card>

            {/* Evidence */}
            <div>
                <SectionLabel>Evidence</SectionLabel>
                <Card className="p-5 space-y-3" delay={0.2}>
                    {p.evidenceAreas.map((ea, i) => (
                        <Bar key={ea.area} label={ea.area} value={ea.score} max={100} delay={i * 0.06}
                            gradient={ea.score >= 85 ? ['#34d399', '#6ee7b7'] : ea.score >= 70 ? ['#8b5cf6', '#a78bfa'] : ['#fbbf24', '#fcd34d']}
                            rightLabel={`${ea.score}`}
                        />
                    ))}
                </Card>
            </div>

            {/* Gaps */}
            {p.gapAreas.length > 0 && (
                <div>
                    <SectionLabel>Gaps to Close</SectionLabel>
                    <div className="flex gap-3">
                        {p.gapAreas.map((g, i) => (
                            <Card key={g.area} className="p-4 flex-1" delay={0.25 + i * 0.06} small>
                                <p className="text-[12px] text-white/40 font-medium">{g.area}</p>
                                <p className="text-[10px] text-white/15 mt-1">{g.recommendation}</p>
                                <p className="text-[9px] text-violet-400/30 mt-2 font-medium">{g.timeToClose}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* Recommendation */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                className="rounded-2xl p-5 text-[11px] text-white/30 leading-[1.7]"
                style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.04) 0%, rgba(139,92,246,0.01) 100%)' }}
            >
                <Zap className="w-3.5 h-3.5 text-violet-400/30 mb-2" />
                {p.recommendation}
            </motion.div>
        </div>
    )
}


/* ═══════════════════════════════════════════════════════════════════════════════
   TAB 3 — ALERTS
   ═══════════════════════════════════════════════════════════════════════════════ */
function AlertsTab() {
    return (
        <div className="space-y-5">
            {DEMO_UNDERPERFORMANCE_ALERTS.map((alert, ai) => {
                const riskGrad: [string, string] = alert.riskLevel === 'critical' ? ['#ef4444', '#f87171']
                    : alert.riskLevel === 'high' ? ['#f59e0b', '#fbbf24'] : ['#3b82f6', '#60a5fa']
                const riskPct = alert.riskLevel === 'critical' ? 90 : alert.riskLevel === 'high' ? 65 : 35

                return (
                    <Card key={alert.id} className="p-6 space-y-5" delay={ai * 0.1}>
                        {/* Header */}
                        <div className="flex items-center gap-5">
                            <div className="flex-1">
                                <h4 className="text-[14px] text-white/70 font-semibold tracking-tight">{alert.name}</h4>
                                <p className="text-[10px] text-white/20 mt-0.5">{alert.role} · {alert.team}</p>
                            </div>
                            <Ring value={riskPct} size={56} stroke={4} gradient={riskGrad} label="Risk" delay={ai * 0.1} />
                            <div className="flex flex-col items-end gap-1.5">
                                <Spark data={alert.weeklyTrend} gradient={riskGrad} w={88} h={24} />
                                <span className="text-[7px] text-white/10 uppercase tracking-[0.15em]">8 weeks</span>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="relative pl-4 ml-1">
                            <div className="absolute left-[5px] top-1 bottom-1 w-px bg-gradient-to-b from-white/[0.06] to-transparent" />
                            {alert.signals.slice(0, 3).map((sig, i) => {
                                const dotColor = sig.severity === 'critical' ? '#ef4444' : sig.severity === 'warning' ? '#f59e0b' : '#3b82f6'
                                return (
                                    <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.08 }}
                                        className="flex items-start gap-3 mb-3.5 relative"
                                    >
                                        <div className="w-[9px] h-[9px] rounded-full shrink-0 mt-[3px] -ml-[4px] z-10"
                                            style={{ background: dotColor, boxShadow: `0 0 8px ${dotColor}30`, border: '2px solid #0c0c0f' }}
                                        />
                                        <div className="flex-1">
                                            <p className="text-[11px] text-white/40 font-medium">{sig.signal}</p>
                                            <p className="text-[9px] text-white/15 font-mono mt-0.5">{sig.dataPoint}</p>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-2">
                            {alert.suggestedActions.slice(0, 3).map((a, i) => (
                                <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.05 }}
                                    className="text-[9px] text-violet-300/40 px-3 py-1.5 rounded-lg cursor-default transition-all duration-200 hover:text-violet-300/60"
                                    style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.06) 0%, rgba(139,92,246,0.02) 100%)', boxShadow: '0 0 0 1px rgba(139,92,246,0.08)' }}
                                >{a}</motion.span>
                            ))}
                        </div>
                    </Card>
                )
            })}
        </div>
    )
}


/* ═══════════════════════════════════════════════════════════════════════════════
   TAB 4 — COACHING
   ═══════════════════════════════════════════════════════════════════════════════ */
function CoachingTab() {
    const [openId, setOpenId] = useState<string | null>(DEMO_COACHING[0]?.id || null)

    const catGrad: Record<string, [string, string]> = {
        feedback: ['#3b82f6', '#60a5fa'],
        recognition: ['#f59e0b', '#fbbf24'],
        'difficult-conversation': ['#ef4444', '#f87171'],
        'development-planning': ['#8b5cf6', '#a78bfa'],
        delegation: ['#06b6d4', '#22d3ee'],
    }

    return (
        <div className="space-y-3">
            {DEMO_COACHING.map((c, ci) => {
                const isOpen = openId === c.id
                const grad = catGrad[c.category] || ['#8b5cf6', '#a78bfa']
                return (
                    <motion.div key={c.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: ci * 0.06 }}
                        style={cardStyle}
                        className="overflow-hidden"
                    >
                        <button onClick={() => setOpenId(isOpen ? null : c.id)}
                            className="w-full flex items-center gap-4 px-5 py-4 text-left transition-all duration-200 group"
                        >
                            <div className="w-[4px] h-7 rounded-full shrink-0" style={{ background: `linear-gradient(180deg, ${grad[0]}60, ${grad[1]}20)` }} />
                            <div className="flex-1 min-w-0">
                                <p className="text-[12px] text-white/50 font-medium truncate group-hover:text-white/65 transition-colors">{c.scenario}</p>
                                <p className="text-[9px] text-white/15 uppercase tracking-[0.08em] mt-0.5">{c.urgency}</p>
                            </div>
                            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                <ChevronDown className="w-3.5 h-3.5 text-white/15" />
                            </motion.div>
                        </button>

                        <AnimatePresence>
                            {isOpen && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25 }} className="overflow-hidden"
                                >
                                    <div className="h-px mx-5" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)' }} />
                                    <div className="px-5 py-5 space-y-5">
                                        {/* Scripts */}
                                        <div className="space-y-3">
                                            {c.suggestedLanguage.map((sl, i) => (
                                                <motion.div key={i} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                                                    className="rounded-xl p-4"
                                                    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.005) 100%)' }}
                                                >
                                                    <p className="text-[8px] text-white/12 uppercase tracking-[0.1em] mb-2">{sl.situation}</p>
                                                    <p className="text-[11px] text-white/40 italic leading-[1.6]">&ldquo;{sl.script}&rdquo;</p>
                                                    <p className="text-[9px] mt-2 font-medium" style={{ color: `${grad[0]}50` }}>{sl.tone}</p>
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Steps */}
                                        <div className="relative pl-5">
                                            <div className="absolute left-[7px] top-0 bottom-0 w-px" style={{ background: `linear-gradient(180deg, ${grad[0]}15, transparent)` }} />
                                            {c.developmentPlan.map((dp, i) => (
                                                <div key={i} className="flex items-start gap-3 mb-3 relative">
                                                    <div className="w-[15px] h-[15px] rounded-full z-10 shrink-0 -ml-[7px] flex items-center justify-center text-[7px] font-bold text-white/30"
                                                        style={{ background: '#0c0c0f', boxShadow: `0 0 0 1.5px ${grad[0]}20` }}
                                                    >{i + 1}</div>
                                                    <div>
                                                        <p className="text-[11px] text-white/35">{dp.step}</p>
                                                        <p className="text-[9px] text-white/12 mt-0.5">{dp.timeline}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Do / Don't */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="rounded-xl p-4" style={{ background: 'linear-gradient(135deg, rgba(52,211,153,0.04) 0%, rgba(52,211,153,0.01) 100%)' }}>
                                                <p className="text-[8px] text-emerald-400/35 font-bold uppercase tracking-[0.12em] mb-2.5">Do</p>
                                                {c.doList.slice(0, 3).map((d, i) => (
                                                    <p key={i} className="text-[10px] text-white/25 leading-[1.7] mb-1">• {d}</p>
                                                ))}
                                            </div>
                                            <div className="rounded-xl p-4" style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.04) 0%, rgba(239,68,68,0.01) 100%)' }}>
                                                <p className="text-[8px] text-red-400/35 font-bold uppercase tracking-[0.12em] mb-2.5">Don&apos;t</p>
                                                {c.dontList.slice(0, 3).map((d, i) => (
                                                    <p key={i} className="text-[10px] text-white/25 leading-[1.7] mb-1">• {d}</p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )
            })}
        </div>
    )
}


/* ═══════════════════════════════════════════════════════════════════════════════
   TAB 5 — PEERS
   ═══════════════════════════════════════════════════════════════════════════════ */
function PeersTab() {
    const r = DEMO_PEER_REPORT
    const themeAxes = r.themes.map(t => t.theme.split(' ')[0])
    const themeVals = r.themes.map(t => Math.min(100, t.frequency * 12))

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center gap-5">
                <Ring value={r.overallSentiment} size={80} stroke={5} gradient={['#8b5cf6', '#a78bfa']} label="Sentiment" />
                <div className="flex-1">
                    <h3 className="text-[16px] text-white/80 font-semibold tracking-[-0.01em]">{r.name}</h3>
                    <p className="text-[10px] text-white/20 mt-0.5">{r.role} · {r.feedbackCount} signals · {r.period}</p>
                    <div className="mt-2.5">
                        <Spark data={r.sentimentTrend} gradient={['#8b5cf6', '#a78bfa']} w={140} h={22} />
                    </div>
                </div>
            </div>

            {/* Radar */}
            <Card className="py-5 flex justify-center" delay={0.1}>
                <Radar axes={themeAxes} values={themeVals} size={220} />
            </Card>

            {/* Theme bars */}
            <div>
                <SectionLabel>Themes</SectionLabel>
                <Card className="p-5 space-y-3" delay={0.15}>
                    {r.themes.map((th, i) => {
                        const tGrad: [string, string] = th.sentiment === 'positive' ? ['#34d399', '#6ee7b7']
                            : th.sentiment === 'negative' ? ['#ef4444', '#f87171']
                                : th.sentiment === 'constructive' ? ['#f59e0b', '#fbbf24'] : ['#71717a', '#a1a1aa']
                        return <Bar key={th.theme} label={th.theme} value={th.frequency} max={10} gradient={tGrad} delay={i * 0.05} rightLabel={`${th.frequency}×`} />
                    })}
                </Card>
            </div>

            {/* Quotes */}
            <div>
                <SectionLabel>Quotes</SectionLabel>
                <div className="space-y-3">
                    {r.verbatims.slice(0, 3).map((v, i) => {
                        const qGrad = v.sentiment === 'positive'
                            ? 'linear-gradient(135deg, rgba(52,211,153,0.04) 0%, rgba(52,211,153,0.01) 100%)'
                            : v.sentiment === 'negative'
                                ? 'linear-gradient(135deg, rgba(239,68,68,0.04) 0%, rgba(239,68,68,0.01) 100%)'
                                : 'linear-gradient(135deg, rgba(251,191,36,0.04) 0%, rgba(251,191,36,0.01) 100%)'
                        return (
                            <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.08 }}
                                className="rounded-2xl p-4" style={{ background: qGrad }}
                            >
                                <p className="text-[11px] text-white/35 italic leading-[1.7]">&ldquo;{v.quote}&rdquo;</p>
                                <p className="text-[8px] text-white/12 mt-2">{v.context}{v.anonymous ? ' · anonymous' : ''}</p>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}


/* ═══════════════════════════════════════════════════════════════════════════════
   TAB 6 — MOBILITY
   ═══════════════════════════════════════════════════════════════════════════════ */
function MobilityTab() {
    return (
        <div className="space-y-5">
            {DEMO_MOBILITY.map((mob, mi) => {
                const skillsMet = mob.skillOverlap.filter(s => s.current >= s.required).length
                const fitPct = Math.round((skillsMet / mob.skillOverlap.length) * 100)
                return (
                    <Card key={mob.id} className="p-6 space-y-6" delay={mi * 0.12}>
                        {/* Flow */}
                        <div className="flex items-stretch gap-4">
                            <div className="flex-1 rounded-2xl py-5 flex flex-col items-center justify-center"
                                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)' }}
                            >
                                <p className="text-[8px] text-white/15 uppercase tracking-[0.12em] mb-1">Current</p>
                                <p className="text-[14px] text-white/50 font-semibold tracking-tight">{mob.currentRole}</p>
                                <p className="text-[9px] text-white/15 mt-0.5">{mob.currentTeam}</p>
                            </div>

                            <div className="flex flex-col items-center justify-center gap-1.5 px-2">
                                <motion.div animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}>
                                    <ChevronRight className="w-5 h-5 text-violet-400/30" />
                                </motion.div>
                                <span className="text-[10px] text-violet-400/40 font-mono tabular-nums font-medium">{mob.matchScore}%</span>
                            </div>

                            <div className="flex-1 rounded-2xl py-5 flex flex-col items-center justify-center"
                                style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.06) 0%, rgba(139,92,246,0.02) 100%)' }}
                            >
                                <p className="text-[8px] text-violet-400/30 uppercase tracking-[0.12em] mb-1">Target</p>
                                <p className="text-[14px] text-violet-300/70 font-semibold tracking-tight">{mob.recommendedRole}</p>
                                <p className="text-[9px] text-violet-400/20 mt-0.5">{mob.recommendedTeam}</p>
                            </div>
                        </div>

                        {/* Skills + Ring */}
                        <div className="flex items-start gap-6">
                            <Ring value={fitPct} size={64} stroke={4} gradient={fitPct >= 80 ? ['#34d399', '#6ee7b7'] : ['#fbbf24', '#fcd34d']} label="Fit" delay={mi * 0.1} />
                            <div className="flex-1 space-y-2.5">
                                {mob.skillOverlap.map((s, i) => (
                                    <Bar key={s.skill} label={s.skill} value={s.current} max={100}
                                        gradient={s.current >= s.required ? ['#34d399', '#6ee7b7'] : ['#fbbf24', '#fcd34d']}
                                        delay={i * 0.04} rightLabel={`${s.current}/${s.required}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Meta */}
                        <div className="flex gap-5 text-[9px] text-white/15">
                            <span>⏱ {mob.timeline}</span>
                            <span>👥 Impact: {mob.impactOnCurrentTeam}</span>
                        </div>
                    </Card>
                )
            })}
        </div>
    )
}


/* ═══════════════════════════════════════════════════════════════════════════════
   TAB 7 — CAPABILITY / SKILLS
   ═══════════════════════════════════════════════════════════════════════════════ */
function CapabilityTab() {
    const cm = DEMO_CAPABILITY_MAP
    const catGrad: Record<string, [string, string]> = {
        core: ['#34d399', '#6ee7b7'],
        emerging: ['#8b5cf6', '#a78bfa'],
        declining: ['#ef4444', '#f87171'],
    }

    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-[18px] text-white/80 font-semibold tracking-[-0.02em]">{cm.teamName}</h3>
                <p className="text-[11px] text-white/20 mt-0.5">{cm.headcount} members</p>
            </div>

            {/* Proficiency Grid */}
            <div>
                <SectionLabel>Proficiency</SectionLabel>
                <div className="grid grid-cols-4 gap-3">
                    {cm.capabilities.map((cap, i) => {
                        const grad = catGrad[cap.category] || ['#8b5cf6', '#a78bfa']
                        return (
                            <Card key={cap.skill} className="p-5" delay={0.05 + i * 0.04} small>
                                <span className="text-[8px] font-semibold uppercase tracking-[0.1em] mb-3 inline-block"
                                    style={{ color: `${grad[0]}60` }}
                                >{cap.category}</span>
                                <div>
                                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 + i * 0.04 }}
                                        className="text-[32px] font-light tabular-nums tracking-tight leading-none"
                                        style={{ color: `${grad[0]}80` }}
                                    >{cap.proficiencyAvg}</motion.span>
                                </div>
                                <p className="text-[11px] text-white/30 font-medium mt-2">{cap.skill}</p>
                                <p className="text-[9px] text-white/12 mt-1">{cap.currentCoverage}/{cm.headcount} people</p>
                            </Card>
                        )
                    })}
                </div>
            </div>

            {/* Future Gaps */}
            <div>
                <SectionLabel>Future Demand Gaps</SectionLabel>
                <Card className="p-5 space-y-3" delay={0.25}>
                    {cm.futureNeeds.map((fn, i) => (
                        <Bar key={fn.skill} label={fn.skill} value={fn.currentGap} max={100} gradient={['#ef4444', '#f87171']} delay={i * 0.06} rightLabel={`${fn.currentGap}%`} />
                    ))}
                </Card>
            </div>

            {/* Hire Recs */}
            <div>
                <SectionLabel>Hire Recommendations</SectionLabel>
                <div className="grid grid-cols-2 gap-3">
                    {cm.hireRecommendations.map((hr, i) => {
                        const prGrad = hr.priority === 'critical' ? ['#ef4444', '#f87171'] : hr.priority === 'high' ? ['#f59e0b', '#fbbf24'] : ['#3b82f6', '#60a5fa']
                        return (
                            <Card key={hr.role} className="p-5" delay={0.3 + i * 0.06} small>
                                <div className="flex items-start justify-between mb-3">
                                    <p className="text-[12px] text-white/45 font-medium">{hr.role}</p>
                                    <span className="text-[7px] font-bold uppercase tracking-[0.1em] px-2 py-1 rounded-lg"
                                        style={{ color: `${prGrad[0]}80`, background: `linear-gradient(135deg, ${prGrad[0]}08, ${prGrad[0]}03)` }}
                                    >{hr.priority}</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                    {hr.skills.slice(0, 3).map((s, j) => (
                                        <span key={j} className="text-[8px] text-white/20 px-2 py-0.5 rounded-md"
                                            style={{ background: 'rgba(255,255,255,0.03)' }}
                                        >{s}</span>
                                    ))}
                                </div>
                                <p className="text-[9px] text-white/12">{hr.timeline}</p>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
