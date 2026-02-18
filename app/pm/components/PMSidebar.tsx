"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    Brain,
    Bot,
    LayoutDashboard,
    Users,
    LineChart,
    Settings,
    Briefcase,
    Search,
    Network,
    Shield,
} from "lucide-react"

export default function PMSidebar() {
    const pathname = usePathname()
    const [isExpanded, setIsExpanded] = useState(false)

    const navItems = [
        { label: "Search", icon: Search, href: "/chat" },
        { label: "Command Center", icon: LayoutDashboard, href: "/pm", exact: true },
        { label: "Architect", icon: Bot, href: "/pm/builder" },
        { label: "Company Brain", icon: Network, href: "/pm/brain" },
        { label: "Interviews", icon: Users, href: "/pm/interview" },
        { label: "Work Simulation", icon: Briefcase, href: "/pm/worksim" },
        { label: "Proof Engine", icon: Shield, href: "/pm/proof" },
        { label: "Performance", icon: LineChart, href: "/pm/performance" },
        { label: "Analysis", icon: Search, href: "/pm/analysis" },
    ]

    return (
        <div
            className={cn(
                "flex flex-col py-6 bg-[#050505] border-r border-white/[0.04] shrink-0 z-50 transition-all duration-300 ease-in-out group/sidebar",
                isExpanded ? "w-64 px-4 items-start" : "w-16 items-center"
            )}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            {/* Logo area */}
            <div className={cn("mb-8 flex items-center gap-3 px-2", isExpanded ? "justify-start w-full" : "justify-center")}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-white/10 to-white/5 flex items-center justify-center border border-white/10 hover:border-white/20 transition-colors cursor-pointer shrink-0">
                    <Brain className="w-5 h-5 text-white/80" />
                </div>
                <div className={cn(
                    "flex flex-col overflow-hidden transition-all duration-300",
                    isExpanded ? "opacity-100 max-w-[200px]" : "opacity-0 max-w-0"
                )}>
                    <span className="text-sm font-bold text-white tracking-wide whitespace-nowrap">Forge AI</span>
                    <span className="text-[10px] text-white/40 font-medium tracking-wider uppercase whitespace-nowrap">Hiring Platform</span>
                </div>
            </div>

            {/* Nav Items */}
            <div className="flex-1 flex flex-col gap-2 w-full">
                {navItems.map((item) => {
                    const isActive = item.exact
                        ? pathname === item.href
                        : pathname.startsWith(item.href)

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "h-10 rounded-xl flex items-center transition-all duration-300 relative group",
                                isExpanded ? "w-full px-3 gap-3 justify-start" : "w-10 mx-auto justify-center",
                                isActive
                                    ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                                    : "text-white/40 hover:text-white hover:bg-white/10"
                            )}
                        >
                            <item.icon className="w-5 h-5 shrink-0" strokeWidth={isActive ? 2.5 : 2} />

                            {/* Label (Expanded) */}
                            <span className={cn(
                                "text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300",
                                isExpanded ? "opacity-100 w-auto translate-x-0" : "opacity-0 w-0 -translate-x-4 absolute"
                            )}>
                                {item.label}
                            </span>

                            {/* Tooltip on Hover (Collapsed Only) */}
                            {!isExpanded && (
                                <div className="absolute left-14 px-3 py-1.5 bg-[#1A1A1A] border border-white/10 rounded-lg text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl">
                                    {item.label}
                                </div>
                            )}

                            {/* Active Indicator (Collapsed Only) */}
                            {isActive && !isExpanded && (
                                <div className="absolute -right-2 w-1 h-4 rounded-full bg-white/50 blur-[2px]" />
                            )}
                        </Link>
                    )
                })}
            </div>

            {/* Bottom Actions */}
            <div className={cn("mt-auto flex flex-col gap-2 w-full", isExpanded ? "px-0" : "px-0 items-center")}>
                <button className={cn(
                    "h-10 rounded-xl flex items-center text-white/40 hover:text-white hover:bg-white/10 transition-colors",
                    isExpanded ? "w-full px-3 gap-3 justify-start" : "w-10 justify-center"
                )}>
                    <Settings className="w-5 h-5 shrink-0" />
                    <span className={cn(
                        "text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300",
                        isExpanded ? "opacity-100 w-auto translate-x-0" : "opacity-0 w-0 -translate-x-4 absolute"
                    )}>
                        Settings
                    </span>
                </button>

                <div className={cn(
                    "flex items-center gap-3 p-1 rounded-full transition-all duration-300",
                    isExpanded ? "bg-white/5 pr-4" : "p-0"
                )}>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 ring-2 ring-black flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                        AD
                    </div>
                    <div className={cn(
                        "flex flex-col overflow-hidden transition-all duration-300",
                        isExpanded ? "opacity-100 max-w-[200px]" : "opacity-0 max-w-0"
                    )}>
                        <span className="text-xs font-semibold text-white whitespace-nowrap">Adhiraj Dogra</span>
                        <span className="text-[10px] text-white/40 whitespace-nowrap">Product Manager</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
