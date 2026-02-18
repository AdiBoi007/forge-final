"use client"

import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Brain, Search, Database, Shield, FileText,
    Network, ArrowRight, CheckCircle, RefreshCw,
    Users, Briefcase, Code, Lock, GitCommit,
    ChevronRight, Globe, Layers, Sparkles, X,
    ChevronLeft, Clock, User, Zap, Cpu, Activity
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
// import PMSidebar from "@/app/pm/components/PMSidebar" // Removed if not needed here or kept if used in layout
import { BRAIN_DOCS, type BrainDoc } from "@/lib/brain-data"
import HROpsView from "@/app/pm/brain/components/HROpsView"

// ─── Cosmic Layers ──────────────────────────────────────────────────────────
const KNOWLEDGE_LAYERS = [
    {
        id: "core",
        title: "Orbital Core",
        icon: Globe,
        color: "text-cyan-400",
        bgColor: "bg-cyan-500/10",
        borderColor: "border-cyan-500/20",
        shadow: "shadow-cyan-500/20",
        stats: "12 Docs · Synced",
        description: "Mission, Vision, Values, Product Roadmap"
    },
    {
        id: "role",
        title: "Role Constellation",
        icon: Users,
        color: "text-indigo-400",
        bgColor: "bg-indigo-500/10",
        borderColor: "border-indigo-500/20",
        shadow: "shadow-indigo-500/20",
        stats: "24 Roles · 8 Active",
        description: "Rubrics, Success Profiles, Historical Outcomes"
    },
    {
        id: "tech",
        title: "Tech Nebula",
        icon: Code,
        color: "text-violet-400",
        bgColor: "bg-violet-500/10",
        borderColor: "border-violet-500/20",
        shadow: "shadow-violet-500/20",
        stats: "45 Stacks · 12 Constraints",
        description: "Tech Stack, Architecture, Standards"
    },
    {
        id: "policy",
        title: "Ops Horizon",
        icon: Shield,
        color: "text-fuchsia-400",
        bgColor: "bg-fuchsia-500/10",
        borderColor: "border-fuchsia-500/20",
        shadow: "shadow-fuchsia-500/20",
        stats: "18 Policies · Updated",
        description: "HR, Compliance, Performance Frameworks"
    },
    {
        id: "decision",
        title: "Decision Void",
        icon: GitCommit,
        color: "text-rose-400",
        bgColor: "bg-rose-500/10",
        borderColor: "border-rose-500/20",
        shadow: "shadow-rose-500/20",
        stats: "156 Decisions",
        description: "Rationale, Pivots, Tradeoffs"
    }
]

export default function CompanyBrainPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [activeLayer, setActiveLayer] = useState<string | null>(null)
    const [selectedDoc, setSelectedDoc] = useState<BrainDoc | null>(null)

    // Filter docs based on search OR active layer
    const filteredDocs = useMemo(() => {
        if (searchQuery) {
            return BRAIN_DOCS.filter(doc =>
                doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                doc.snippet.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }
        if (activeLayer) {
            return BRAIN_DOCS.filter(doc => doc.category === activeLayer)
        }
        return []
    }, [searchQuery, activeLayer])

    return (
        <>
            <div className="flex-1 flex flex-col relative overflow-hidden bg-[#030305]">
                {/* Cosmic Background Effects */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>
                <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-violet-600/10 blur-[150px] rounded-full pointer-events-none animate-pulse duration-[8000ms]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none animate-pulse duration-[12000ms]" />

                {/* Header */}
                <div className="h-20 flex items-center justify-between px-8 border-b border-white/[0.04] bg-[#030305]/80 backdrop-blur-xl z-10 sticky top-0">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-500/20 to-cyan-500/20 border border-white/5 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                            <Network className="w-5 h-5 text-violet-300" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold tracking-tight text-white">Company Brain</h1>
                            <p className="text-[10px] text-violet-300/60 font-medium tracking-widest uppercase">Version 5.0 · Neural Sync</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                            </span>
                            <span className="text-[10px] font-bold text-violet-300 uppercase tracking-wider">Live Link</span>
                        </div>
                        <Button variant="outline" className="h-9 border-white/10 hover:bg-white/5 text-xs uppercase tracking-wider text-white/60 hover:text-white transition-colors">
                            <RefreshCw className="w-3.5 h-3.5 mr-2" />
                            Update
                        </Button>
                    </div>
                </div>

                {/* Main Layout */}
                <div className="flex-1 flex overflow-hidden relative z-0">
                    {/* Center Canvas */}
                    <div className={cn(
                        "flex-1 overflow-y-auto transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
                        (activeLayer || searchQuery) ? "w-[60%] lg:w-[65%]" : "w-full"
                    )}>
                        <div className="max-w-6xl mx-auto px-8 py-12">
                            {/* Search */}
                            <div className="mb-16 relative z-10">
                                <div className="relative group max-w-2xl mx-auto">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 rounded-2xl opacity-30 group-hover:opacity-60 blur transition duration-500" />
                                    <div className="relative flex items-center gap-4 bg-[#08080A] border border-white/10 rounded-2xl px-6 py-5 shadow-2xl">
                                        <Sparkles className="w-5 h-5 text-violet-400" />
                                        <input
                                            type="text"
                                            placeholder="Query the neural network..."
                                            className="flex-1 bg-transparent text-lg outline-none placeholder:text-white/20 text-white font-medium"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                        {searchQuery && (
                                            <button onClick={() => setSearchQuery("")} className="p-1 hover:bg-white/10 rounded-full text-white/40 transition-colors">
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Visualization */}
                            {activeLayer === "policy" ? (
                                <div className="mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
                                    <HROpsView />
                                </div>
                            ) : (
                                <div className={cn(
                                    "mb-16 relative flex items-center justify-center transition-all duration-700",
                                    (activeLayer || searchQuery) ? "h-[300px] scale-90" : "h-[450px]"
                                )}>
                                    {/* Neural Core */}
                                    <div className="relative flex items-center justify-center">
                                        {/* Core Glow */}
                                        <div className="absolute w-[300px] h-[300px] bg-violet-600/20 blur-[100px] rounded-full animate-pulse" />

                                        {/* Orbital Rings */}
                                        <div className="absolute w-[400px] h-[400px] border border-white/[0.03] rounded-full animate-[spin_30s_linear_infinite]" />
                                        <div className="absolute w-[300px] h-[300px] border border-dashed border-white/[0.05] rounded-full animate-[spin_20s_linear_infinite_reverse]" />
                                        <div className="absolute w-[200px] h-[200px] border border-violet-500/20 rounded-full animate-[spin_10s_linear_infinite]" />

                                        {/* Central Processor */}
                                        <div className="relative w-32 h-32 rounded-full bg-[#050508] border border-violet-500/30 flex items-center justify-center shadow-[0_0_50px_rgba(139,92,246,0.3)] z-10 group cursor-pointer hover:scale-105 transition-transform duration-500">
                                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-600/20 to-cyan-600/20 animate-pulse" />
                                            <Brain className="w-12 h-12 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                                        </div>

                                        {/* Connecting Nodes (Decorative) */}
                                        {[...Array(6)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                                                style={{
                                                    transform: `rotate(${i * 60}deg) translate(140px) rotate(-${i * 60}deg)`,
                                                }}
                                            />
                                        ))}
                                    </div>

                                    {!activeLayer && !searchQuery && (
                                        <div className="absolute bottom-0 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
                                            <p className="text-white/40 text-xs tracking-[0.2em] uppercase font-medium">Neural Architecture Active</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Layers Grid */}
                            <div>
                                <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-6 text-center">System Layers</h3>
                                <div className={cn(
                                    "grid gap-4 transition-all duration-500",
                                    (activeLayer || searchQuery) ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-5"
                                )}>
                                    {KNOWLEDGE_LAYERS.map((layer) => {
                                        const isActive = activeLayer === layer.id
                                        return (
                                            <div
                                                key={layer.id}
                                                onClick={() => {
                                                    setActiveLayer(isActive ? null : layer.id)
                                                    setSearchQuery("") // Clear search
                                                }}
                                                className={cn(
                                                    "p-6 rounded-2xl border transition-all cursor-pointer group flex flex-col items-center text-center hover:-translate-y-1 duration-300",
                                                    isActive
                                                        ? `bg-[#0A0A0C] ${layer.borderColor} shadow-xl ${layer.shadow}`
                                                        : "bg-white/[0.02] border-white/[0.04] hover:bg-white/[0.04] hover:border-white/10"
                                                )}
                                            >
                                                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-colors mb-4 shadow-lg", layer.bgColor, layer.color)}>
                                                    <layer.icon className="w-5 h-5" />
                                                </div>
                                                <h3 className="text-sm font-bold text-white mb-1 group-hover:text-white transition-colors">{layer.title}</h3>
                                                <p className="text-[9px] text-white/40 uppercase tracking-wider mb-3">{layer.stats}</p>
                                                {!activeLayer && !searchQuery && (
                                                    <p className="text-xs text-white/30 leading-relaxed max-w-[150px]">{layer.description}</p>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Slide-over Panel (Doc List) */}
                    <AnimatePresence>
                        {(activeLayer || searchQuery) && (
                            <motion.div
                                initial={{ x: "100%", opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: "100%", opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="w-[450px] border-l border-white/[0.05] bg-[#050508]/95 backdrop-blur-xl flex flex-col shadow-2xl z-20"
                            >
                                <div className="h-20 flex items-center justify-between px-6 border-b border-white/[0.05]">
                                    <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                                        {searchQuery ? (
                                            <><Search className="w-4 h-4 text-white/40" /> Search Results</>
                                        ) : (
                                            <><Layers className="w-4 h-4 text-violet-400" /> Layer: {KNOWLEDGE_LAYERS.find(l => l.id === activeLayer)?.title}</>
                                        )}
                                    </h2>
                                    <Button variant="ghost" size="icon" onClick={() => { setActiveLayer(null); setSearchQuery("") }} className="hover:bg-white/5 rounded-full">
                                        <X className="w-4 h-4 text-white/40 hover:text-white" />
                                    </Button>
                                </div>

                                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                    {filteredDocs.length > 0 ? (
                                        filteredDocs.map((doc) => (
                                            <div
                                                key={doc.id}
                                                onClick={() => setSelectedDoc(doc)}
                                                className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.06] hover:border-violet-500/20 transition-all cursor-pointer group"
                                            >
                                                <h3 className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors mb-2">{doc.title}</h3>
                                                <p className="text-xs text-white/50 line-clamp-2 mb-3 leading-relaxed">{doc.snippet}</p>
                                                <div className="flex items-center gap-4 text-[10px] text-white/30 uppercase tracking-wider">
                                                    <span className="flex items-center gap-1.5">
                                                        <Clock className="w-3 h-3 text-white/20" /> {doc.lastUpdated}
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <User className="w-3 h-3 text-white/20" /> {doc.author}
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-20 text-center">
                                            <div className="w-12 h-12 rounded-full bg-white/[0.02] flex items-center justify-center mb-4">
                                                <Search className="w-5 h-5 text-white/20" />
                                            </div>
                                            <p className="text-sm text-white/30">No neural data found.</p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Document Reader Modal */}
                <AnimatePresence>
                    {selectedDoc && (
                        <div className="absolute inset-0 z-50 flex items-center justify-center p-8 bg-black/80 backdrop-blur-md">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="w-full max-w-3xl h-full max-h-[85vh] bg-[#08080A] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden ring-1 ring-violet-500/20"
                            >
                                <div className="h-16 flex items-center justify-between px-6 border-b border-white/[0.05] bg-[#0C0C0E]">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400">
                                            <FileText className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h2 className="text-sm font-semibold text-white">{selectedDoc.title}</h2>
                                            <p className="text-[10px] text-white/40 uppercase tracking-wider">Authored by {selectedDoc.author}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="sm" onClick={() => setSelectedDoc(null)} className="hover:bg-white/5 text-white/40 hover:text-white">
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex-1 overflow-y-auto p-10 font-serif leading-loose text-white/80">
                                    <div className="prose prose-invert max-w-none prose-p:text-white/70 prose-headings:text-white prose-strong:text-violet-200">
                                        {selectedDoc.content.split('\n').map((line, i) => {
                                            if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-bold text-white mb-6 mt-2 tracking-tight">{line.replace('# ', '')}</h1>
                                            if (line.startsWith('## ')) return <h2 key={i} className="text-lg font-bold text-violet-100 mb-4 mt-8 flex items-center gap-2"><div className="w-1 h-4 bg-violet-500 rounded-full" />{line.replace('## ', '')}</h2>
                                            if (line.startsWith('**')) return <p key={i} className="mb-4"><strong className="text-white font-semibold">{line.replace(/\*\*/g, '')}</strong></p>
                                            if (line.startsWith('1. ') || line.startsWith('- ')) return <li key={i} className="ml-4 mb-2 marker:text-violet-500 text-white/70 pl-2">{line.replace(/^[1-]\. |^- /, '')}</li>
                                            return <p key={i} className="mb-4 text-white/70">{line}</p>
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

            </div>
        </>
    )
}
