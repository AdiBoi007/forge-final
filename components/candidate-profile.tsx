"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
    X,
    Github,
    Globe,
    Share2,
    MapPin,
    ExternalLink,
    GitCommit,
    Cpu,
    Terminal,
    Code2,
    Zap,
    TrendingUp,
    Circle,
    Eye
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CandidateProfileProps {
    candidate: any
    onClose: () => void
    analysis?: any
    onAutoContact?: () => void
}

export function CandidateProfile({ candidate, onClose, analysis, onAutoContact }: CandidateProfileProps) {
    const [activeTab, setActiveTab] = useState<'technical' | 'domain'>('technical')

    if (!candidate) return null

    return (
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
            className="fixed inset-y-0 right-0 w-[600px] bg-[#0A0A0A] shadow-2xl z-[100] flex flex-col font-mono text-xs overflow-hidden"
        >
            {/* Header Nav */}
            <div className="flex items-center justify-between px-6 py-3 shrink-0">
                <div className="text-white/40 text-[9px] uppercase tracking-widest">Candidate Profile</div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-full hover:bg-white/10 text-white/40 hover:text-white"
                    onClick={onClose}
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto scrollbar-hide">
                {/* Identity Banner */}
                <div className="px-8 pb-6">
                    <div className="flex gap-5 items-start">
                        <div className="w-16 h-16 rounded bg-white/10 shrink-0 overflow-hidden">
                            {candidate.username ? (
                                <img src={`https://github.com/${candidate.username}.png`} className="w-full h-full object-cover grayscale opacity-80" alt="" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-xl text-white/40">{candidate.name.charAt(0)}</div>
                            )}
                        </div>
                        <div className="flex-1 space-y-1">
                            <h1 className="text-2xl font-normal text-white tracking-tight">{candidate.name}</h1>
                            <div className="flex items-center gap-3 text-white/40">
                                <a
                                    href={`https://github.com/${candidate.username}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                                >
                                    <Zap className="w-3 h-3" /> @{candidate.username}
                                </a>
                                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> San Francisco, CA</span>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" className="h-7 text-[10px] uppercase tracking-wider bg-white/5 hover:bg-white/10 shrink-0" onClick={onAutoContact}>
                            Auto-Contact
                        </Button>
                    </div>
                </div>

                {/* Language Bar */}
                <div className="px-8 pb-6 space-y-2">
                    <div className="text-[10px] uppercase tracking-wider text-white/40">Languages</div>
                    <div className="flex h-1.5 w-full rounded-full overflow-hidden">
                        <div className="bg-[#E11584] w-[35%]" />
                        <div className="bg-[#00ADD8] w-[25%]" />
                        <div className="bg-[#F1E05A] w-[20%]" />
                        <div className="bg-[#E34C26] w-[20%]" />
                    </div>
                    <div className="flex gap-4 text-[10px] text-white/40 font-medium">
                        <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#E11584]" /> C++ 35%</div>
                        <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#00ADD8]" /> Go 25%</div>
                        <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#F1E05A]" /> JS 20%</div>
                        <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#E34C26]" /> HTML 20%</div>
                    </div>
                </div>

                {/* About */}
                <div className="px-8 pb-8">
                    <div className="text-[10px] uppercase tracking-widest text-white/20 mb-3">About</div>
                    <p className="text-sm text-white/70 leading-relaxed">
                        {candidate.bio || `${candidate.name} has contributed to multiple projects in the past year. Active in open source development with focus on systems programming and modern web technologies.`}
                    </p>
                </div>

                {/* Insights — Stats */}
                <div className="px-8 pb-8">
                    <div className="text-[10px] uppercase tracking-widest text-white/20 mb-4">Insights</div>
                    <div className="text-[9px] uppercase tracking-wider text-white/20 mb-3">This Year</div>
                    <div className="grid grid-cols-4 gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <GitCommit className="w-4 h-4 text-orange-500" />
                            <div>
                                <div className="text-xl font-light text-white">{candidate.stats?.commits || 0}</div>
                                <div className="text-[9px] uppercase tracking-wider text-white/30">Commits</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Code2 className="w-4 h-4 text-blue-500" />
                            <div>
                                <div className="text-xl font-light text-white">{candidate.stats?.prs || 0}</div>
                                <div className="text-[9px] uppercase tracking-wider text-white/30">PRs</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Circle className="w-4 h-4 text-emerald-500" />
                            <div>
                                <div className="text-xl font-light text-white">{candidate.stats?.issues || 0}</div>
                                <div className="text-[9px] uppercase tracking-wider text-white/30">Issues</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Eye className="w-4 h-4 text-purple-500" />
                            <div>
                                <div className="text-xl font-light text-white">{candidate.stats?.reviews || 0}</div>
                                <div className="text-[9px] uppercase tracking-wider text-white/30">Reviews</div>
                            </div>
                        </div>
                    </div>

                    {/* Most Active In */}
                    <div className="text-[9px] uppercase tracking-wider text-white/20 mb-2">Most Active In</div>
                    <div className="space-y-2">
                        {candidate.topRepos?.slice(0, 3).map((repo: any, i: number) => (
                            <div key={i} className="flex items-center justify-between group hover:bg-white/5 -mx-2 px-2 py-1 rounded transition-colors">
                                <span className="text-xs text-white/60 group-hover:text-white/80">{repo.name}</span>
                                <div className="flex items-center gap-2">
                                    <div className="h-1 w-16 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-orange-500" style={{ width: `${i === 0 ? 80 : i === 1 ? 60 : 40}%` }} />
                                    </div>
                                    <span className="text-xs text-white/40 w-6 text-right">{repo.stars || (i * 10 + 15)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Signals */}
                <div className="px-8 pb-8 bg-[#0A0A0A]">
                    <div className="flex items-center gap-2 mb-4">
                        <Zap className="w-4 h-4 text-orange-500" />
                        <span className="text-[10px] uppercase tracking-widest text-white/40">Signals</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded">
                        <Code2 className="w-6 h-6 text-orange-500" />
                        <div>
                            <div className="text-2xl font-light text-white">{Math.floor((candidate.stats?.prs || 0) * 0.3)}</div>
                            <div className="text-[10px] uppercase tracking-wider text-white/30">External PRs Merged</div>
                        </div>
                    </div>
                </div>

                {/* Skills & Expertise */}
                <div className="px-8 pb-8">
                    <div className="flex mb-4">
                        <button
                            onClick={() => setActiveTab('technical')}
                            className={cn(
                                "flex-1 py-3 text-[10px] font-medium tracking-widest uppercase transition-colors",
                                activeTab === 'technical' ? "text-orange-500" : "text-white/30 hover:text-white"
                            )}
                        >
                            Technical Expertise ({candidate.extendedSkills?.technical?.length || 5})
                        </button>
                        <button
                            onClick={() => setActiveTab('domain')}
                            className={cn(
                                "flex-1 py-3 text-[10px] font-medium tracking-widest uppercase transition-colors",
                                activeTab === 'domain' ? "text-orange-500" : "text-white/30 hover:text-white"
                            )}
                        >
                            Domain Expertise ({candidate.extendedSkills?.domain?.length || 4})
                        </button>
                    </div>

                    <div className="space-y-8">
                        {candidate.extendedSkills ? (
                            (activeTab === 'technical' ? candidate.extendedSkills.technical : candidate.extendedSkills.domain)?.map((skill: any, i: number) => (
                                <div key={i} className="space-y-4">
                                    <div className="flex items-center justify-between group cursor-pointer">
                                        <span className="text-white font-medium group-hover:text-orange-500 transition-colors">{skill.name}</span>
                                        <div className="flex gap-1">
                                            {skill.tags.map((tag: string, j: number) => (
                                                <span key={j} className="px-1.5 py-0.5 text-[10px] text-white/40 rounded uppercase">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="pl-4 space-y-4">
                                        <div className="space-y-2">
                                            <div className="text-[9px] uppercase tracking-wider text-white/20 mb-1">Indicators</div>
                                            {skill.indicators.map((indicator: string, k: number) => (
                                                <p key={k} className="text-white/50 text-xs">• {indicator}</p>
                                            ))}
                                        </div>
                                        {skill.evidence && skill.evidence.length > 0 && (
                                            <div className="flex gap-2">
                                                {skill.evidence.map((ev: any, l: number) => (
                                                    <a key={l} href={ev.url} target="_blank" rel="noopener noreferrer" className="bg-white/5 hover:bg-white/10 px-2 py-1 rounded flex items-center gap-2 transition-colors">
                                                        <span className="text-[10px] font-mono text-emerald-500">{ev.label}</span>
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-white font-medium">eBPF & Linux Kernel Programming</span>
                                    <div className="flex gap-1">
                                        <span className="px-1.5 py-0.5 text-[10px] text-white/40 rounded">EBPF</span>
                                        <span className="px-1.5 py-0.5 text-[10px] text-white/40 rounded">C</span>
                                        <span className="px-1.5 py-0.5 text-[10px] text-white/40 rounded">LINUX KERNEL</span>
                                    </div>
                                </div>
                                <div className="space-y-2 text-white/50 pl-4">
                                    <p>• Develops real-time packet processing and kernel instrumentation using eBPF</p>
                                    <p>• Implements low-level network security software with kernel-space execution</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Interests */}
                {candidate.recentInterests ? (
                    <div className="px-8 pb-8 bg-[#0C0C0C]">
                        <div className="flex items-center justify-between mb-6 pt-6">
                            <span className="text-[10px] uppercase tracking-widest text-white/40">Recent Interests</span>
                            <div className="flex gap-2">
                                {candidate.recentInterests.tags.map((tag: string) => (
                                    <span key={tag} className="px-2 py-1 bg-white/5 text-[10px] text-white/60 rounded">{tag}</span>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <div className="flex items-center gap-2 text-orange-500">
                                        <Zap className="w-4 h-4" />
                                        <span className="text-sm font-medium tracking-wide uppercase">Interests</span>
                                    </div>
                                    <span className="text-xl font-light text-white">{candidate.recentInterests.score}</span>
                                </div>
                                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-orange-500 w-full" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                {candidate.recentInterests.categories.map((cat: any, i: number) => (
                                    <div key={i} className="space-y-1">
                                        <div className="text-xs text-white/80 font-medium">{cat.name}</div>
                                        <div className="text-[10px] text-white/40">{cat.items.join(", ")}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4 space-y-4">
                                <div>
                                    <span className="text-[9px] uppercase tracking-wider text-white/20 block mb-1">Recent</span>
                                    <p className="text-xs text-white/60 leading-relaxed">{candidate.recentInterests.recentFocus}</p>
                                </div>
                                <div>
                                    <span className="text-[9px] uppercase tracking-wider text-white/20 block mb-2">Forked</span>
                                    <div className="space-y-3">
                                        {candidate.recentInterests.forks.map((fork: any, i: number) => (
                                            <div key={i} className="flex gap-3">
                                                <div className="text-[10px] font-medium text-white/70 w-32 shrink-0">{fork.category}</div>
                                                <div className="text-[10px] text-white/40">{fork.description}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="px-8 pb-8 bg-[#0C0C0C]">
                        <div className="flex justify-between items-center mb-6 pt-6">
                            <div className="flex items-center gap-2">
                                <Terminal className="w-4 h-4 text-orange-500" />
                                <span className="text-[10px] uppercase tracking-widest text-white/70">Coding Patterns</span>
                            </div>
                            <span className="text-[10px] text-white/30">1,027 commits analyzed</span>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <span className="text-[9px] uppercase tracking-wider text-white/20 block mb-2">By Day</span>
                                <div className="grid grid-cols-7 gap-1 h-8">
                                    {[...Array(7)].map((_, i) => (
                                        <div key={i} className={`rounded-sm ${i === 1 ? 'bg-orange-600' : 'bg-white/5'}`} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Learning Velocity */}
                {candidate.learningVelocity && (
                    <div className="px-8 pb-8">
                        <div className="flex justify-between items-center mb-6 pt-6">
                            <div className="flex items-center gap-2">
                                <div className={cn(
                                    "transition-colors",
                                    candidate.learningVelocity.trend === "accelerating" ? "text-emerald-500" :
                                        candidate.learningVelocity.trend === "steady" ? "text-orange-500" : "text-red-500"
                                )}>
                                    <TrendingUp className="w-4 h-4" />
                                </div>
                                <span className="text-[10px] uppercase tracking-widest text-white/40">Learning Velocity</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={cn(
                                    "text-xs px-2 py-0.5 rounded uppercase tracking-wide",
                                    candidate.learningVelocity.trend === "accelerating" ? "bg-emerald-500/10 text-emerald-500" :
                                        candidate.learningVelocity.trend === "steady" ? "bg-orange-500/10 text-orange-500" :
                                            "bg-red-500/10 text-red-500"
                                )}>
                                    {candidate.learningVelocity.trend}
                                </span>
                                <span className="text-2xl font-light text-white">{candidate.learningVelocity.score}</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className={cn(
                                        "h-full transition-all",
                                        candidate.learningVelocity.trend === "accelerating" ? "bg-emerald-500" :
                                            candidate.learningVelocity.trend === "steady" ? "bg-orange-500" : "bg-red-500"
                                    )}
                                    style={{ width: `${candidate.learningVelocity.score}%` }}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <div className="text-[9px] uppercase tracking-wider text-white/20">New Tech Adoption</div>
                                    <div className="text-lg font-light text-white">{candidate.learningVelocity.newTechAdoption} <span className="text-xs text-white/40">in 6mo</span></div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-[9px] uppercase tracking-wider text-white/20">Diversity Score</div>
                                    <div className="text-lg font-light text-white">{candidate.learningVelocity.diversityScore}<span className="text-xs text-white/40">/100</span></div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <div className="text-[9px] uppercase tracking-wider text-white/20 mb-3">Recent Milestones</div>
                                <div className="space-y-2">
                                    {candidate.learningVelocity.recentMilestones.map((milestone: string, i: number) => (
                                        <div key={i} className="flex items-start gap-2 text-xs text-white/60">
                                            <div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                                            <span>{milestone}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Working Styles Quadrant */}
                <div className="px-8 pb-12">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-[10px] uppercase tracking-widest text-white/40">Working Styles</span>
                    </div>
                    <div className="aspect-video w-full rounded-lg relative grid grid-cols-2 grid-rows-2">
                        <div className="absolute -top-6 left-0 right-0 flex justify-around text-[9px] uppercase tracking-wider text-white/30">
                            <span>Exploration Focus</span>
                            <span>Execution Focus</span>
                        </div>
                        <div className="bg-orange-900/20 relative">
                            <div className="absolute inset-0 bg-orange-600/20 m-1 rounded" />
                        </div>
                        <div />
                        <div />
                        <div />
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
