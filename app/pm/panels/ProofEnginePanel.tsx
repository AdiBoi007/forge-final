"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    X, Microscope, FileSearch, Box, Video, Play,
    ChevronDown, ChevronRight, Clock, ExternalLink,
} from "lucide-react"
import {
    DEMO_PROOF_ITEMS, VERDICT_CONFIG,
    DEMO_SANDBOXES, SANDBOX_STATUS_CONFIG,
    DEMO_ASYNC_INTERVIEW,
    DEMO_REPLAY,
} from "@/lib/pm-proof-data"

type Tab = 'proof' | 'sandbox' | 'async' | 'replay'

const TABS: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: 'proof', label: 'Proof Check', icon: FileSearch },
    { key: 'sandbox', label: 'Sandboxes', icon: Box },
    { key: 'async', label: 'Async Interview', icon: Video },
    { key: 'replay', label: 'Replay', icon: Play },
]

export default function ProofEnginePanel({ onClose }: { onClose: () => void }) {
    const [tab, setTab] = useState<Tab>('proof')

    return (
        <div className="h-full flex flex-col bg-[#0A0A0A]">
            {/* Header */}
            <div className="px-6 py-5 border-b border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center">
                        <Microscope className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold text-white">Proof-Based Screening</h2>
                        <p className="text-[11px] text-white/40 uppercase tracking-wider">Verify · Test · Analyse</p>
                    </div>
                </div>
                <button onClick={onClose} className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center transition-colors">
                    <X className="w-4 h-4 text-white/40" />
                </button>
            </div>

            {/* Tabs */}
            <div className="px-4 pt-3 pb-1 flex gap-1 overflow-x-auto border-b border-white/[0.06]">
                {TABS.map(t => (
                    <button
                        key={t.key}
                        onClick={() => setTab(t.key)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-medium transition-all whitespace-nowrap ${tab === t.key ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' : 'text-white/40 hover:text-white/60 hover:bg-white/[0.04]'
                            }`}
                    >
                        <t.icon className="w-3.5 h-3.5" />
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
                <AnimatePresence mode="wait">
                    <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                        {tab === 'proof' && <ProofTab />}
                        {tab === 'sandbox' && <SandboxTab />}
                        {tab === 'async' && <AsyncTab />}
                        {tab === 'replay' && <ReplayTab />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}

/* ─── Proof Tab ─────────────────────────────────────────────────────────────── */
function ProofTab() {
    const grouped = DEMO_PROOF_ITEMS.reduce((acc, pi) => {
        if (!acc[pi.candidateName]) acc[pi.candidateName] = []
        acc[pi.candidateName].push(pi)
        return acc
    }, {} as Record<string, typeof DEMO_PROOF_ITEMS>)

    const stats = {
        verified: DEMO_PROOF_ITEMS.filter(p => p.verdict === 'verified').length,
        exceeds: DEMO_PROOF_ITEMS.filter(p => p.verdict === 'exceeds').length,
        inflated: DEMO_PROOF_ITEMS.filter(p => p.verdict === 'inflated').length,
        unverifiable: DEMO_PROOF_ITEMS.filter(p => p.verdict === 'unverifiable').length,
    }

    return (
        <div className="space-y-5">
            <h3 className="text-sm font-semibold text-white">Resume → Proof Replacement</h3>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-2">
                {Object.entries(stats).map(([key, count]) => {
                    const vc = VERDICT_CONFIG[key]
                    return (
                        <div key={key} className={`rounded-lg border p-2.5 text-center ${vc.color}`}>
                            <span className="text-lg">{vc.icon}</span>
                            <p className="text-[16px] font-bold mt-0.5">{count}</p>
                            <p className="text-[9px] opacity-60">{vc.label}</p>
                        </div>
                    )
                })}
            </div>

            {/* By candidate */}
            {Object.entries(grouped).map(([name, items]) => (
                <div key={name} className="space-y-2">
                    <h4 className="text-[11px] text-white/60 font-semibold">{name}</h4>
                    {items.map(pi => {
                        const vc = VERDICT_CONFIG[pi.verdict]
                        return (
                            <div key={pi.id} className={`rounded-xl border p-3 ${vc.color}`}>
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <p className="text-[10px] text-white/30 uppercase tracking-wider font-medium">Credential</p>
                                        <p className="text-[11px] text-white/70 font-medium mt-0.5">{pi.credential}</p>
                                    </div>
                                    <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-white/[0.06]">{vc.icon} {vc.label}</span>
                                </div>
                                <div className="rounded-lg bg-white/[0.03] p-2.5 mb-2">
                                    <p className="text-[10px] text-white/30 font-medium mb-0.5">Proof Replacement</p>
                                    <p className="text-[11px] text-white/50">{pi.proofReplacement}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] text-white/30">Confidence: {pi.confidenceScore}%</span>
                                    <div className="w-24 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                                        <div className="h-full rounded-full bg-cyan-500/50" style={{ width: `${pi.confidenceScore}%` }} />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ))}
        </div>
    )
}

/* ─── Sandbox Tab ───────────────────────────────────────────────────────────── */
function SandboxTab() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">Sandbox Environments</h3>
                <span className="text-[10px] text-white/40">{DEMO_SANDBOXES.length} configured</span>
            </div>
            {DEMO_SANDBOXES.map(sb => {
                const sc = SANDBOX_STATUS_CONFIG[sb.status]
                return (
                    <div key={sb.id} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <h4 className="text-[12px] text-white/80 font-semibold">{sb.name}</h4>
                            <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded ${sc.color}`}>{sc.label}</span>
                        </div>
                        <p className="text-[11px] text-white/50">{sb.description}</p>

                        <div className="flex items-center gap-2 flex-wrap">
                            <Clock className="w-3 h-3 text-white/30" />
                            <span className="text-[10px] text-white/40">{sb.timeLimit}</span>
                            <span className="text-[10px] text-white/20">•</span>
                            <span className="text-[10px] text-white/40">{sb.resourceLimits.cpu} / {sb.resourceLimits.memory}</span>
                        </div>

                        <div>
                            <p className="text-[10px] text-white/30 font-medium mb-1.5">Stack</p>
                            <div className="flex flex-wrap gap-1">{sb.stack.map((s, i) => <span key={i} className="text-[9px] text-cyan-400/80 bg-cyan-500/10 px-1.5 py-0.5 rounded">{s}</span>)}</div>
                        </div>

                        <div>
                            <p className="text-[10px] text-white/30 font-medium mb-1.5">Features</p>
                            <div className="flex flex-wrap gap-1">{sb.features.map((f, i) => <span key={i} className="text-[9px] text-white/40 bg-white/[0.06] px-1.5 py-0.5 rounded">{f}</span>)}</div>
                        </div>

                        {sb.templateRepo && (
                            <div className="flex items-center gap-1.5 text-[10px] text-white/30">
                                <ExternalLink className="w-3 h-3" />
                                <span>{sb.templateRepo}</span>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

/* ─── Async Interview Tab ───────────────────────────────────────────────────── */
function AsyncTab() {
    const ai = DEMO_ASYNC_INTERVIEW
    const typeIcons: Record<string, string> = { video: '🎥', code: '💻', text: '📝', diagram: '📊' }

    return (
        <div className="space-y-5">
            <div>
                <h3 className="text-sm font-semibold text-white">{ai.title}</h3>
                <p className="text-[11px] text-white/40 mt-0.5">{ai.totalDuration}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2">
                <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-2.5 text-center">
                    <p className="text-[16px] font-bold text-white/80">{ai.candidateCount}</p>
                    <p className="text-[9px] text-white/30">Candidates</p>
                </div>
                <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-2.5 text-center">
                    <p className="text-[16px] font-bold text-cyan-400">{ai.completionRate}%</p>
                    <p className="text-[9px] text-white/30">Completion</p>
                </div>
                <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-2.5 text-center">
                    <p className="text-[16px] font-bold text-white/80">{ai.avgCompletionTime}</p>
                    <p className="text-[9px] text-white/30">Avg Time</p>
                </div>
            </div>

            {/* Questions */}
            {ai.questions.map(q => (
                <div key={q.id} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 space-y-2">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-base">{typeIcons[q.type]}</span>
                        <span className="text-[11px] text-white/70 font-medium">Q{q.order}: {q.type.charAt(0).toUpperCase() + q.type.slice(1)} Response</span>
                        <span className="text-[9px] text-white/30 ml-auto">{q.timeLimit}</span>
                    </div>
                    <p className="text-[11px] text-white/60">{q.question}</p>
                    <div className="rounded-lg bg-white/[0.03] p-2.5">
                        <p className="text-[10px] text-white/30 font-medium mb-0.5">Instructions</p>
                        <p className="text-[10px] text-white/40">{q.instructions}</p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                        {q.evaluationCriteria.map((ec, i) => <span key={i} className="text-[9px] text-cyan-400/60 bg-cyan-500/10 px-1.5 py-0.5 rounded">{ec}</span>)}
                    </div>
                </div>
            ))}
        </div>
    )
}

/* ─── Replay Tab ────────────────────────────────────────────────────────────── */
function ReplayTab() {
    const r = DEMO_REPLAY
    const sentColors: Record<string, string> = { positive: 'border-emerald-500/30', neutral: 'border-zinc-500/20', concerning: 'border-amber-500/30' }

    return (
        <div className="space-y-5">
            <div>
                <h3 className="text-sm font-semibold text-white">Live Coding Replay — {r.candidateName}</h3>
                <p className="text-[11px] text-white/40 mt-0.5">{r.taskTitle} • {r.totalDuration}</p>
            </div>

            {/* Time breakdown */}
            <div>
                <p className="text-[10px] text-white/30 uppercase tracking-wider font-medium mb-2">Time Breakdown</p>
                <div className="h-4 rounded-full overflow-hidden flex">
                    {r.timeBreakdown.map((tb, i) => (
                        <div key={i} title={`${tb.category}: ${tb.percentage}%`} className="h-full" style={{ width: `${tb.percentage}%`, backgroundColor: tb.color }} />
                    ))}
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                    {r.timeBreakdown.map((tb, i) => (
                        <div key={i} className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tb.color }} />
                            <span className="text-[9px] text-white/40">{tb.category} ({tb.percentage}%)</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Event Timeline */}
            <div>
                <p className="text-[10px] text-white/30 uppercase tracking-wider font-medium mb-2">Event Timeline</p>
                <div className="space-y-1">
                    {r.events.map((ev, i) => (
                        <div key={i} className={`rounded-lg border-l-2 ${sentColors[ev.sentiment]} bg-white/[0.02] px-3 py-2`}>
                            <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-[9px] text-white/30 font-mono">{ev.timestamp}</span>
                                <span className="text-[9px] text-white/20 bg-white/[0.06] px-1 rounded">{ev.category}</span>
                            </div>
                            <p className="text-[10px] text-white/60 font-medium">{ev.event}</p>
                            <p className="text-[10px] text-white/30 italic mt-0.5">{ev.insight}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Insights */}
            <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
                    <p className="text-[10px] text-emerald-400 font-medium mb-1.5">✅ Strength Signals</p>
                    {r.strengthSignals.map((s, i) => <p key={i} className="text-[10px] text-white/40 mb-0.5">{s}</p>)}
                </div>
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3">
                    <p className="text-[10px] text-amber-400 font-medium mb-1.5">⚠️ Concerns</p>
                    {r.concernSignals.map((s, i) => <p key={i} className="text-[10px] text-white/40 mb-0.5">{s}</p>)}
                </div>
            </div>
        </div>
    )
}
