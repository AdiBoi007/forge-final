"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    X, Brain, Target, Zap, AlertTriangle, Shield, CheckCircle,
    Terminal, FileCode, Mail, MessageSquare, ChevronRight, Activity,
    GitBranch, PlayCircle, Eye, FileText, ArrowUpRight
} from "lucide-react"
import { DEMO_LATENCY_SCENARIO, RoleDNA, AdaptiveNode, HiringBrief } from "@/lib/pm-worksim-data"

type Tab = 'role-dna' | 'simulation' | 'instrumentation' | 'decision'

const TABS: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: 'role-dna', label: 'Role Decomposition', icon: Brain },
    { key: 'simulation', label: 'Simulation Flow', icon: GitBranch },
    { key: 'instrumentation', label: 'Instrumentation', icon: Eye },
    { key: 'decision', label: 'Hiring Brief', icon: FileText },
]

/* ═══════════════════════════════════════════════════════════════════════════════
   ROOT
   ═══════════════════════════════════════════════════════════════════════════════ */
export default function WorkSimPanel({ onClose }: { onClose: () => void }) {
    const [tab, setTab] = useState<Tab>('role-dna')
    const scenario = DEMO_LATENCY_SCENARIO

    return (
        <div className="h-full flex flex-col" style={{ background: 'linear-gradient(180deg, #0c0c0f 0%, #09090b 100%)' }}>
            {/* ── Header ── */}
            <div className="px-8 pt-6 pb-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0.05) 100%)' }}
                    >
                        <Target className="w-5 h-5 text-blue-400/80" />
                    </div>
                    <div>
                        <h2 className="text-[15px] font-semibold text-white/90 tracking-[-0.01em]">Job Simulation Engine</h2>
                        <p className="text-[10px] text-white/20 font-medium tracking-[0.08em] uppercase mt-0.5">{scenario.roleDna.title}</p>
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
                        className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-[11px] font-medium transition-all duration-200 whitespace-nowrap ${tab === t.key ? 'text-white/90' : 'text-white/25 hover:text-white/40'
                            }`}
                    >
                        <t.icon className="w-3.5 h-3.5" />
                        {t.label}
                        {tab === t.key && (
                            <motion.div layoutId="activeTab"
                                className="absolute inset-0 rounded-xl"
                                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)', boxShadow: '0 0 0 1px rgba(255,255,255,0.06)' }}
                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                        )}
                    </button>
                ))}
            </div>

            <div className="h-px mx-6 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent shrink-0" />

            {/* ── Content ── */}
            <div className="flex-1 overflow-y-auto px-8 py-8 scrollbar-none">
                <AnimatePresence mode="wait">
                    <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                        {tab === 'role-dna' && <RoleDNATab data={scenario.roleDna} />}
                        {tab === 'simulation' && <SimulationTab nodes={scenario.adaptiveFlow} />}
                        {tab === 'instrumentation' && <InstrumentationTab data={scenario.instrumentation} />}
                        {tab === 'decision' && <DecisionTab brief={scenario.demoBrief} />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   UI PRIMITIVES
   ═══════════════════════════════════════════════════════════════════════════════ */
const cardStyle = {
    background: 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.005) 100%)',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06), 0 0 0 1px rgba(255,255,255,0.05)',
    borderRadius: '16px',
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return <p className="text-[10px] text-white/20 font-semibold uppercase tracking-[0.1em] mb-4">{children}</p>
}

function GridCard({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.4 }}
            className={`p-5 ${className}`} style={cardStyle}
        >{children}</motion.div>
    )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   TAB 1: ROLE DECOMPOSITION
   ═══════════════════════════════════════════════════════════════════════════════ */
function RoleDNATab({ data }: { data: RoleDNA }) {
    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-light text-white/90 tracking-tight">{data.title}</h1>
                    <p className="text-sm text-white/30 mt-1">Level {data.level} · Role DNA Decomposition</p>
                </div>
                <div className="px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-[10px] text-blue-400 uppercase tracking-widest font-semibold">
                    Analysis Complete
                </div>
            </div>

            {/* Core Tasks & Failure Modes Grid */}
            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                    <SectionLabel>Core Work To Be Done</SectionLabel>
                    <div className="grid gap-3">
                        {data.coreTasks.map((task, i) => (
                            <GridCard key={task.id} delay={i * 0.1}>
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">{task.icon}</span>
                                    <div>
                                        <h3 className="text-sm font-medium text-white/80">{task.title}</h3>
                                        <p className="text-xs text-white/40 mt-0.5">{task.description}</p>
                                    </div>
                                </div>
                            </GridCard>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <SectionLabel>Critical Failure Modes</SectionLabel>
                    <div className="grid gap-3">
                        {data.failureModes.map((fm, i) => (
                            <GridCard key={fm.id} delay={0.2 + i * 0.1} className="relative overflow-hidden group">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500/50 to-red-500/10" />
                                <h3 className="text-sm font-medium text-white/80 flex items-center gap-2">
                                    {fm.title}
                                    {fm.riskLevel === 'critical' && <span className="text-[9px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded uppercase tracking-wider">Critical</span>}
                                </h3>
                                <p className="text-xs text-white/40 mt-1 leading-relaxed">{fm.description}</p>
                            </GridCard>
                        ))}
                    </div>
                </div>
            </div>

            {/* Thinking Style & Profiles */}
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-1 space-y-4">
                    <SectionLabel>Required Thinking Style</SectionLabel>
                    <GridCard delay={0.4}>
                        <div className="space-y-4">
                            {data.requiredThinking.map((trait, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-xs mb-1.5">
                                        <span className="text-white/60 font-medium">{trait.trait}</span>
                                        <span className="text-blue-400/60 font-mono">{trait.value}%</span>
                                    </div>
                                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div initial={{ width: 0 }} animate={{ width: `${trait.value}%` }} transition={{ delay: 0.6 + i * 0.1, duration: 1 }}
                                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                                        />
                                    </div>
                                    <p className="text-[10px] text-white/20 mt-1">{trait.description}</p>
                                </div>
                            ))}
                        </div>
                    </GridCard>
                </div>

                <div className="col-span-2 space-y-4">
                    <SectionLabel>Signal Profiling</SectionLabel>
                    <div className="grid grid-cols-2 gap-4 h-full">
                        <GridCard delay={0.5} className="bg-emerald-500/[0.02] border-emerald-500/10!">
                            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <CheckCircle className="w-3 h-3" /> Good Profile
                            </h4>
                            <p className="text-sm text-white/60 leading-relaxed">"{data.goodProfile}"</p>
                        </GridCard>
                        <GridCard delay={0.6} className="bg-red-500/[0.02] border-red-500/10!">
                            <h4 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <AlertTriangle className="w-3 h-3" /> Bad Profile
                            </h4>
                            <p className="text-sm text-white/60 leading-relaxed">"{data.badProfile}"</p>
                        </GridCard>
                    </div>
                </div>
            </div>
        </div>
    )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   TAB 2: SIMULATION FLOW
   ═══════════════════════════════════════════════════════════════════════════════ */
function SimulationTab({ nodes }: { nodes: AdaptiveNode[] }) {
    const [activeNodeId, setActiveNodeId] = useState(nodes[0].id)
    const activeNode = nodes.find(n => n.id === activeNodeId) || nodes[0]

    return (
        <div className="flex gap-8 h-[600px]">
            {/* Left: Adaptive Flow Visualization */}
            <div className="w-1/3 space-y-4">
                <SectionLabel>Adaptive Logic Flow</SectionLabel>
                <div className="relative pl-6 pt-2">
                    <div className="absolute left-[11px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-white/10 to-transparent" />
                    {nodes.map((node, i) => {
                        const isActive = activeNodeId === node.id
                        const color = node.type === 'chaos' ? 'text-red-400 border-red-500/30 bg-red-500/5'
                            : node.type === 'stretch' ? 'text-amber-400 border-amber-500/30 bg-amber-500/5'
                                : 'text-blue-400 border-blue-500/30 bg-blue-500/5'

                        return (
                            <motion.button key={node.id} onClick={() => setActiveNodeId(node.id)}
                                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                                className={`relative flex items-start gap-4 mb-8 w-full text-left group`}
                            >
                                <div className={`z-10 w-6 h-6 rounded-full border-2 bg-[#0c0c0f] flex items-center justify-center shrink-0 transition-all duration-300 ${isActive ? 'border-white scale-110 shadow-[0_0_10px_rgba(255,255,255,0.2)]' : 'border-white/10 group-hover:border-white/30'}`}>
                                    <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : 'bg-white/20'}`} />
                                </div>
                                <div className={`flex-1 p-3 rounded-xl border transition-all duration-300 ${isActive ? 'bg-white/[0.04] border-white/10' : 'bg-transparent border-transparent hover:bg-white/[0.02]'}`}>
                                    <div className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider mb-1.5 ${color}`}>
                                        {node.type}
                                    </div>
                                    <h4 className="text-sm font-medium text-white/80">{node.title}</h4>
                                    <p className="text-[10px] text-white/30 mt-1 italic">
                                        Trigger: "{node.triggerCondition}"
                                    </p>
                                </div>
                            </motion.button>
                        )
                    })}
                </div>
            </div>

            {/* Right: Simulation Environment Preview */}
            <div className="flex-1 flex flex-col h-full rounded-2xl border border-white/5 bg-[#0a0a0c] overflow-hidden">
                <div className="h-10 border-b border-white/5 bg-white/[0.02] flex items-center px-4 gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20" />
                    </div>
                    <div className="h-4 w-px bg-white/5 mx-2" />
                    <span className="text-[10px] text-white/30 font-mono">Job Simulator v2.0</span>
                </div>

                <div className="p-6 flex-1 overflow-y-auto">
                    <AnimatePresence mode="wait">
                        <motion.div key={activeNode.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                            <div className="mb-6">
                                <h3 className="text-lg font-light text-white/90 mb-2">{activeNode.description}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {activeNode.constraints.map((c, i) => (
                                        <span key={i} className="text-[10px] bg-red-500/10 text-red-400/80 px-2 py-1 rounded border border-red-500/20">
                                            🛑 Constraint: {c}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                {activeNode.assets.map((asset, i) => (
                                    <div key={i} className="rounded-lg border border-white/10 bg-[#050505] overflow-hidden">
                                        <div className="px-3 py-2 bg-white/5 border-b border-white/5 flex items-center justify-between">
                                            <span className="text-xs text-white/50 font-mono flex items-center gap-2">
                                                {asset.type === 'code' ? <FileCode className="w-3.5 h-3.5" />
                                                    : asset.type === 'logs' ? <Terminal className="w-3.5 h-3.5" />
                                                        : <Mail className="w-3.5 h-3.5" />}
                                                {asset.title}
                                            </span>
                                            <span className="text-[9px] text-white/20 uppercase">ReadOnly</span>
                                        </div>
                                        <pre className="p-4 text-[11px] font-mono text-white/70 leading-relaxed overflow-x-auto">
                                            {asset.content}
                                        </pre>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   TAB 3: INSTRUMENTATION
   ═══════════════════════════════════════════════════════════════════════════════ */
function InstrumentationTab({ data }: { data: { signals: any[], probes: any[] } }) {
    return (
        <div className="grid grid-cols-5 gap-6 max-w-6xl mx-auto">
            {/* Signals Column */}
            <div className="col-span-3 space-y-6">
                <SectionLabel>Active Signals (The 'Watch')</SectionLabel>
                <div className="grid gap-4">
                    {data.signals.map((sig, i) => (
                        <GridCard key={sig.id} delay={i * 0.05} className="flex gap-4">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                                <Activity className="w-5 h-5 text-white/40" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h4 className="text-sm font-medium text-white/90">{sig.signal}</h4>
                                        <span className="text-[10px] text-white/30 uppercase tracking-wider">{sig.category}</span>
                                    </div>
                                    <span className="text-[10px] font-mono text-white/20">Weight: {sig.weight}/10</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3 mt-3">
                                    <div className="p-2 rounded bg-emerald-500/5 border border-emerald-500/10">
                                        <p className="text-[9px] text-emerald-400/60 uppercase font-bold mb-1">Pass Signal</p>
                                        <p className="text-[11px] text-emerald-100/60 leading-tight">{sig.positiveIndicator}</p>
                                    </div>
                                    <div className="p-2 rounded bg-red-500/5 border border-red-500/10">
                                        <p className="text-[9px] text-red-400/60 uppercase font-bold mb-1">Fail Signal</p>
                                        <p className="text-[11px] text-red-100/60 leading-tight">{sig.negativeIndicator}</p>
                                    </div>
                                </div>
                            </div>
                        </GridCard>
                    ))}
                </div>
            </div>

            {/* Probes Column */}
            <div className="col-span-2 space-y-6">
                <SectionLabel>Black Box Probes (Async)</SectionLabel>
                <div className="relative pl-4">
                    <div className="absolute left-[7px] top-0 bottom-0 w-0.5 bg-dashed bg-gradient-to-b from-purple-500/30 to-transparent" />
                    {data.probes.map((probe, i) => (
                        <GridCard key={i} delay={0.4 + i * 0.1} className="mb-4 ml-2 relative">
                            <div className="absolute -left-[23px] top-6 w-3 h-3 rounded-full bg-[#0c0c0f] border-2 border-purple-500 flex items-center justify-center">
                                <div className="w-1 h-1 bg-purple-500 rounded-full" />
                            </div>
                            <div className="mb-2">
                                <span className="text-[9px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded border border-purple-500/20 uppercase tracking-wider">
                                    Trigger: {probe.trigger}
                                </span>
                            </div>
                            <h4 className="text-sm font-medium text-white/80 italic mb-2">"{probe.question}"</h4>
                            <p className="text-[10px] text-white/30">
                                <span className="font-bold text-white/50">Intent:</span> {probe.intent}
                            </p>
                        </GridCard>
                    ))}
                </div>
            </div>
        </div>
    )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   TAB 4: DECISION ENGINE
   ═══════════════════════════════════════════════════════════════════════════════ */
function DecisionTab({ brief }: { brief: HiringBrief }) {
    const isHire = brief.recommendation.includes('hire')
    const color = isHire ? 'emerald' : 'red'

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Top Summary */}
            <div className="flex gap-6">
                <GridCard className="flex-1 flex items-center justify-between bg-gradient-to-br from-white/[0.03] to-white/[0.005]">
                    <div>
                        <h1 className="text-2xl font-light text-white mb-1">{brief.candidateName}</h1>
                        <p className="text-sm text-white/40">{brief.role}</p>
                    </div>
                    <div className={`text-right px-6 py-3 rounded-xl border ${isHire ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                        <p className={`text-xs font-bold uppercase tracking-widest ${isHire ? 'text-emerald-400' : 'text-red-400'}`}>Recommendation</p>
                        <p className={`text-xl font-semibold mt-1 ${isHire ? 'text-emerald-100' : 'text-red-100'}`}>
                            {brief.recommendation.replace('_', ' ').toUpperCase()}
                        </p>
                    </div>
                </GridCard>

                <GridCard className="w-48 flex flex-col justify-center items-center">
                    <div className="relative w-20 h-20 flex items-center justify-center">
                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                            <circle cx="40" cy="40" r="36" stroke="rgba(255,255,255,0.05)" strokeWidth="6" fill="none" />
                            <motion.circle cx="40" cy="40" r="36" stroke={isHire ? '#34d399' : '#ef4444'} strokeWidth="6" fill="none"
                                strokeDasharray={2 * Math.PI * 36}
                                initial={{ strokeDashoffset: 2 * Math.PI * 36 }}
                                animate={{ strokeDashoffset: 2 * Math.PI * 36 * (1 - brief.confidence / 100) }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                strokeLinecap="round"
                            />
                        </svg>
                        <span className="text-2xl font-light text-white">{brief.confidence}%</span>
                    </div>
                    <p className="text-[10px] text-white/30 uppercase tracking-widest mt-2">Confidence</p>
                </GridCard>
            </div>

            {/* 3 Column Deep Dive */}
            <div className="grid grid-cols-3 gap-6">
                {/* Risk Profile */}
                <div className="space-y-4">
                    <SectionLabel>Risk Profile</SectionLabel>
                    {brief.riskProfile.map((risk, i) => (
                        <GridCard key={i} delay={0.2 + i * 0.1} className="py-4">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="text-xs font-semibold text-white/80">{risk.area}</h4>
                                <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider ${risk.risk === 'low' ? 'bg-emerald-500/10 text-emerald-400'
                                        : risk.risk === 'medium' ? 'bg-amber-500/10 text-amber-400'
                                            : 'bg-red-500/10 text-red-400'
                                    }`}>{risk.risk} Risk</span>
                            </div>
                            <p className="text-[11px] text-white/40 leading-relaxed">{risk.description}</p>
                        </GridCard>
                    ))}
                </div>

                {/* Environment Fit */}
                <div className="space-y-4">
                    <SectionLabel>Environment Fit</SectionLabel>
                    {brief.environmentFit.map((env, i) => (
                        <GridCard key={i} delay={0.3 + i * 0.1} className="py-4">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="text-xs font-semibold text-white/80 capitalize">{env.type}</h4>
                                <div className="flex gap-0.5">
                                    {[1, 2, 3].map(bar => (
                                        <div key={bar} className={`w-1.5 h-2 rounded-sm ${(env.fit === 'high' && bar <= 3) || (env.fit === 'medium' && bar <= 2) || (env.fit === 'low' && bar <= 1)
                                                ? 'bg-blue-400' : 'bg-white/10'
                                            }`} />
                                    ))}
                                </div>
                            </div>
                            <p className="text-[11px] text-white/40 leading-relaxed">{env.reason}</p>
                        </GridCard>
                    ))}
                </div>

                {/* Capabilities */}
                <div className="space-y-4">
                    <SectionLabel>Capability Evidence</SectionLabel>
                    {brief.capabilities.map((cap, i) => (
                        <GridCard key={i} delay={0.4 + i * 0.1} className="py-4">
                            <div className="flex justify-between items-baseline mb-1">
                                <h4 className="text-xs font-semibold text-white/80">{cap.skill}</h4>
                                <span className="text-xs font-mono text-blue-400">{cap.score}/100</span>
                            </div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden mb-2">
                                <div className="h-full bg-blue-500/50 rounded-full" style={{ width: `${cap.score}%` }} />
                            </div>
                            <p className="text-[10px] text-white/30 leading-snug">"{cap.evidence}"</p>
                        </GridCard>
                    ))}
                </div>
            </div>
        </div>
    )
}
