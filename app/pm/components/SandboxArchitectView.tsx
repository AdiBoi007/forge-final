
"use client"

import React, { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
    Send, Sparkles, Bot, User,
    FileText, CheckCircle2, AlertOctagon,
    Clock, Globe, Users, Zap, Layout
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { generateArchitectBlueprint, InterviewBlueprint } from "@/lib/architect-data"

type Message = {
    id: string
    role: "user" | "ai"
    content: string
}

export default function SandboxArchitectView() {
    const router = useRouter()
    const [messages, setMessages] = useState<Message[]>([
        { id: "1", role: "ai", content: "Hi. I'm the Sandbox Architect. Describe the role you're hiring for, and I'll generate a simulation-based interview blueprint." }
    ])
    const [input, setInput] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const [blueprint, setBlueprint] = useState<InterviewBlueprint | null>(null)
    const chatEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, isTyping])

    const handleSend = async (customInput?: string) => {
        const text = typeof customInput === 'string' ? customInput : input
        if (!text.trim()) return

        const userMsg: Message = { id: Date.now().toString(), role: "user", content: text }
        setMessages(prev => [...prev, userMsg])
        setInput("")
        setIsTyping(true)

        // Dynamic AI Logic
        setTimeout(() => {
            // Combine previous context if it's a refinement
            // detailed prompt logic can be added here
            const generated = generateArchitectBlueprint(text)

            setBlueprint(generated)

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "ai",
                content: `I've architected a ${generated.seniority} ${generated.role} simulation. It focuses on ${generated.constraints.focus} and includes ${generated.tasks.length} interactive scenarios.`
            }

            setMessages(prev => [...prev, aiMsg])
            setIsTyping(false)
        }, 1200)
    }

    const handleExport = () => {
        if (!blueprint) return

        const template = {
            id: `custom-${Date.now()}`,
            role: blueprint.role,
            title: `Architect: ${blueprint.role}`,
            difficulty: blueprint.seniority,
            duration: blueprint.constraints.time,
            skills: blueprint.rubric.map(r => r.category),
            description: `${blueprint.summary}\n\nTasks:\n${blueprint.tasks.map((t, i) => `${i + 1}. ${t.title}: ${t.description}`).join('\n')}`
        }

        localStorage.setItem("worksim_draft_template", JSON.stringify(template))
        router.push("/pm/worksim")
    }

    return (
        <div className="flex h-full bg-[#050505]">
            {/* Left: Chat Interface */}
            <div className="w-[400px] flex flex-col border-r border-white/[0.04] bg-[#0A0A0A]">
                <div className="h-16 flex items-center px-6 border-b border-white/[0.04]">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                            <Bot className="w-4 h-4 text-indigo-400" />
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-white">Architect</h2>
                            <p className="text-[10px] text-white/40 font-mono">v3.1 (Auto-Blueprint)</p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "ai" ? "bg-indigo-500/10 text-indigo-400" : "bg-white/10 text-white/60"
                                }`}>
                                {msg.role === "ai" ? <Sparkles className="w-4 h-4" /> : <User className="w-4 h-4" />}
                            </div>
                            <div className={`p-4 rounded-2xl max-w-[85%] text-sm leading-relaxed ${msg.role === "user"
                                ? "bg-white/10 text-white"
                                : "bg-[#111] text-white/80 border border-white/5"
                                }`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0">
                                <Sparkles className="w-4 h-4 text-indigo-400" />
                            </div>
                            <div className="p-4 rounded-2xl bg-[#111] border border-white/5 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
                                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce delay-100" />
                                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce delay-200" />
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                <div className="p-4 border-t border-white/[0.04]">
                    {blueprint && (
                        <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide">
                            <button onClick={() => handleSend(`Make the ${blueprint.role} interview harder with more chaos`)} className="px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-[10px] text-red-400 hover:bg-red-500/20 whitespace-nowrap transition-colors">
                                + Add Chaos
                            </button>
                            <button onClick={() => handleSend(`Switch the ${blueprint.role} simulation to Async mode`)} className="px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] text-blue-400 hover:bg-blue-500/20 whitespace-nowrap transition-colors">
                                Switch to Async
                            </button>
                            <button onClick={() => handleSend(`Upgrade this ${blueprint.role} blueprint to a Senior / Staff level`)} className="px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] text-purple-400 hover:bg-purple-500/20 whitespace-nowrap transition-colors">
                                Upgrade to Senior
                            </button>
                        </div>
                    )}
                    <div className="relative">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            placeholder="Describe the role (e.g. 'Senior Backend Engineer')..."
                            className="w-full bg-[#151515] border border-white/10 rounded-xl px-4 py-3 pr-10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 transition-colors"
                        />
                        <button
                            onClick={() => handleSend()}
                            disabled={!input.trim() || isTyping}
                            className="absolute right-2 top-2 p-1.5 rounded-lg bg-indigo-500 text-white hover:bg-indigo-400 disabled:opacity-0 transition-all"
                        >
                            <Send className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Right: Blueprint Preview */}
            <div className="flex-1 flex flex-col bg-[#050505] relative overflow-hidden">
                {!blueprint ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-white/20">
                        <Layout className="w-16 h-16 mb-4 opacity-20" />
                        <p className="text-sm font-medium">Awaiting prompt...</p>
                        <p className="text-xs mt-2 max-w-xs text-center">Tell the Architect what you need, and a live interview blueprint will appear here.</p>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-right-4 duration-500">
                        {/* Blueprint Header */}
                        <div className="h-16 flex items-center justify-between px-8 border-b border-white/[0.04] bg-[#0A0A0A]">
                            <div className="flex items-center gap-4">
                                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                    <h1 className="text-base font-bold text-white tracking-tight">{blueprint.role}</h1>
                                    <div className="flex items-center gap-2 text-[10px] text-white/50 uppercase tracking-wider">
                                        <span>Blueprint v1.0</span>
                                        <span className="w-1 h-1 rounded-full bg-white/20" />
                                        <span>{blueprint.seniority}</span>
                                    </div>
                                </div>
                            </div>
                            <Button size="sm" onClick={handleExport} className="bg-white/10 text-white hover:bg-white/20 border border-white/5">
                                Export to WorkSim
                            </Button>
                        </div>

                        {/* Content Scroll */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-8">
                            {/* Constraints Grid */}
                            <div className="grid grid-cols-4 gap-4">
                                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                    <div className="flex items-center gap-2 mb-2 text-white/40 text-[10px] uppercase font-bold tracking-wider">
                                        <Clock className="w-3 h-3" /> Time Limit
                                    </div>
                                    <div className="text-lg font-medium text-white">{blueprint.constraints.time}</div>
                                </div>
                                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                    <div className="flex items-center gap-2 mb-2 text-white/40 text-[10px] uppercase font-bold tracking-wider">
                                        <Globe className="w-3 h-3" /> Mode
                                    </div>
                                    <div className="text-lg font-medium text-white">{blueprint.constraints.mode}</div>
                                </div>
                                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 col-span-2">
                                    <div className="flex items-center gap-2 mb-2 text-white/40 text-[10px] uppercase font-bold tracking-wider">
                                        <Zap className="w-3 h-3" /> Focus
                                    </div>
                                    <div className="text-lg font-medium text-white">{blueprint.constraints.focus}</div>
                                </div>
                            </div>

                            {/* Summary */}
                            <div className="p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
                                <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-widest mb-2">Strategy</h3>
                                <p className="text-sm text-indigo-100/80 leading-relaxed">{blueprint.summary}</p>
                            </div>

                            {/* Tasks Timeline */}
                            <div className="space-y-4">
                                <h3 className="text-white font-semibold flex items-center gap-2">
                                    <Layout className="w-4 h-4 text-white/60" />
                                    Simulation Steps
                                </h3>
                                <div className="relative border-l border-white/10 ml-3 pl-8 space-y-8 py-2">
                                    {blueprint.tasks.map((task, i) => (
                                        <div key={task.id} className="relative group">
                                            {/* Timeline Dot */}
                                            <div className={`absolute -left-[39px] w-6 h-6 rounded-full border-2 bg-[#050505] flex items-center justify-center shrink-0 z-10 
                                                ${task.type === 'chaos' ? 'border-amber-500 text-amber-500' :
                                                    task.type === 'stretch' ? 'border-purple-500 text-purple-500' :
                                                        'border-emerald-500 text-emerald-500'}`}
                                            >
                                                <span className="text-[10px] font-bold">{i + 1}</span>
                                            </div>

                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ml-1 
                                                        ${task.type === 'chaos' ? 'bg-amber-500/10 text-amber-400' :
                                                            task.type === 'stretch' ? 'bg-purple-500/10 text-purple-400' :
                                                                'bg-emerald-500/10 text-emerald-400'}`}>
                                                        {task.type}
                                                    </span>
                                                    <h4 className="text-sm font-semibold text-white mt-1">{task.title}</h4>
                                                </div>
                                                <span className="text-xs text-white/40 font-mono">{task.duration}</span>
                                            </div>
                                            <p className="text-xs text-white/60 leading-relaxed mb-3">{task.description}</p>

                                            {/* Failure Modes */}
                                            <div className="bg-red-500/5 border border-red-500/10 rounded-lg p-3">
                                                <div className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                                    <AlertOctagon className="w-3 h-3" /> Trap / Failure Mode
                                                </div>
                                                <ul className="space-y-1">
                                                    {task.failureModes.map((fm, idx) => (
                                                        <li key={idx} className="text-xs text-red-200/60 flex gap-2">
                                                            <span className="text-red-500/50">•</span> {fm}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Proof Definition */}
                            <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4" /> Proof of Competence
                                </h3>
                                <p className="text-sm text-emerald-100/80 italic">"{blueprint.proofDefinition}"</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
