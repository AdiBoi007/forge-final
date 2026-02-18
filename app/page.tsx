"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Check,
  ShieldCheck,
  Brain,
  Users,
  Target,
  Award,
  TrendingUp,
  FileCheck,
  Sparkles,
  ChevronRight,
  BarChart3,
  Lock,
  Eye,
  GitBranch,
  FileText,
  MessageSquare,
  Briefcase,
  GraduationCap,
  Star,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  Minus,
} from "lucide-react"

const LinkedInLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const GitHubLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
)

const SlackLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <path
      fill="#E01E5A"
      d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z"
    />
    <path
      fill="#36C5F0"
      d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z"
    />
    <path
      fill="#2EB67D"
      d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z"
    />
    <path
      fill="#ECB22E"
      d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"
    />
  </svg>
)

const NotionLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.934zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952l1.448.327s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z" />
  </svg>
)

const FigmaLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <path fill="#F24E1E" d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z" />
    <path fill="#A259FF" d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z" />
    <path fill="#F24E1E" d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z" />
    <path fill="#FF7262" d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z" />
    <path fill="#1ABCFE" d="M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z" />
  </svg>
)

const MicrosoftLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <path fill="#F25022" d="M0 0h11.377v11.377H0z" />
    <path fill="#00A4EF" d="M0 12.623h11.377V24H0z" />
    <path fill="#7FBA00" d="M12.623 0H24v11.377H12.623z" />
    <path fill="#FFB900" d="M12.623 12.623H24V24H12.623z" />
  </svg>
)

const IndeedLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#2164f3]" fill="currentColor">
    <path d="M11.566 21.5622v-8.0305c.2862.044.5765.066.8682.066 1.4573 0 2.7955-.5765 3.8027-1.518v9.4823c0 .8108-.3984 1.232-1.1873 1.232-.7847 0-1.188-.4212-1.188-1.232h-2.2956zm.8682-10.0247c-2.4102 0-4.3808-1.9702-4.3808-4.3805 0-2.4144 1.9706-4.3847 4.3808-4.3847 2.414 0 4.3847 1.9703 4.3847 4.3847 0 2.4103-1.9706 4.3805-4.3847 4.3805z" />
  </svg>
)

const GreenhouseLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#3ab549]" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
  </svg>
)

const LeverLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#1da1f2]" fill="currentColor">
    <path d="M19.5 3h-15A1.5 1.5 0 003 4.5v15A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0019.5 3zM12 18a6 6 0 110-12 6 6 0 010 12zm0-9a3 3 0 100 6 3 3 0 000-6z" />
  </svg>
)

const WorkdayLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#ff6900]" fill="currentColor">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
)

const SeekLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#0d3880]" fill="currentColor">
    <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44-3.84 0-7.13-2.99-7.13-7.27s3.29-7.27 7.13-7.27c3.04 0 4.82 1.94 4.82 1.94l1.91-1.97S16.32 2 12.19 2C6.42 2 2 6.7 2 12c0 5.21 4.29 10 10.26 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.16-1.81z" />
  </svg>
)

const INTEGRATIONS = [
  { name: "LinkedIn", Logo: LinkedInLogo, color: "text-[#0A66C2]" },
  { name: "GitHub", Logo: GitHubLogo, color: "text-white" },
  { name: "Google", Logo: GoogleLogo, color: "" },
  { name: "Slack", Logo: SlackLogo, color: "" },
  { name: "Notion", Logo: NotionLogo, color: "text-white" },
  { name: "Figma", Logo: FigmaLogo, color: "" },
  { name: "Microsoft", Logo: MicrosoftLogo, color: "" },
  { name: "Indeed", Logo: IndeedLogo, color: "" },
  { name: "Greenhouse", Logo: GreenhouseLogo, color: "" },
  { name: "Lever", Logo: LeverLogo, color: "" },
  { name: "Workday", Logo: WorkdayLogo, color: "" },
  { name: "Seek", Logo: SeekLogo, color: "" },
]

const STATS = [
  { value: "10x", label: "Faster than manual screening" },
  { value: "87%", label: "Reduction in mis-hires" },
  { value: "<60s", label: "Average time to rank" },
  { value: "100%", label: "Proof-based decisions" },
]

const FORGE_VS_ATS = [
  { feature: "Evidence-based scoring", forge: true, ats: false },
  { feature: "Real-time skill verification", forge: true, ats: false },
  { feature: "GitHub/Portfolio analysis", forge: true, ats: false },
  { feature: "AI-powered candidate matching", forge: true, ats: "partial" },
  { feature: "Bias-free evaluation", forge: true, ats: false },
  { feature: "Portable proof profiles", forge: true, ats: false },
  { feature: "Instant feedback to candidates", forge: true, ats: false },
  { feature: "Keyword filtering", forge: false, ats: true },
  { feature: "Application tracking", forge: true, ats: true },
  { feature: "Interview scheduling", forge: true, ats: true },
]

const CHALLENGE_TYPES = [
  { name: "Live Coding", icon: GitBranch, description: "Real-time coding challenges with auto-grading" },
  { name: "SQL Simulator", icon: BarChart3, description: "Query challenges against real databases" },
  { name: "Spreadsheet Modeling", icon: FileText, description: "Financial and data modeling tasks" },
  { name: "Inbox Simulation", icon: MessageSquare, description: "Decision-making scenarios" },
  { name: "Case Builder", icon: Briefcase, description: "Strategic memo and plan outputs" },
]

const PROOF_TIERS = [
  {
    tier: "Verified Artifact",
    multiplier: "1.0x",
    description: "Owned repo, shipped product, 10+ commits",
    color: "text-emerald-400",
  },
  {
    tier: "Strong Signal",
    multiplier: "0.7x",
    description: "Contributed meaningfully, corroborated details",
    color: "text-blue-400",
  },
  { tier: "Weak Signal", multiplier: "0.4x", description: "Some evidence, partial context", color: "text-amber-400" },
  { tier: "Claim Only", multiplier: "0.15x", description: "Resume claim, no verification", color: "text-orange-400" },
  { tier: "Unverified", multiplier: "0x", description: "No evidence found", color: "text-red-400" },
]

// Animated counter component
function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const numericTarget = Number.parseInt(target.replace(/\D/g, "")) || 0
    const duration = 2000
    const steps = 60
    const increment = numericTarget / steps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= numericTarget) {
        setCount(numericTarget)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isVisible, target])

  const displayValue = target.includes("x")
    ? `${count}x`
    : target.includes("%")
      ? `${count}%`
      : target.includes("s")
        ? `${count}s`
        : target

  return (
    <span ref={ref} className="tabular-nums">
      {isVisible ? displayValue : target}
    </span>
  )
}

// Floating animation wrapper
function FloatingElement({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div
      className="animate-float"
      style={{
        animationDelay: `${delay}s`,
        animationDuration: "6s",
      }}
    >
      {children}
    </div>
  )
}

export default function EcosystemLandingPage() {
  const [activeTab, setActiveTab] = useState<"recruiters" | "applicants">("recruiters")
  const [hoveredIntegration, setHoveredIntegration] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Subtle grid background */}
      <div className="fixed inset-0 grid-background opacity-50 pointer-events-none" />
      <div className="fixed inset-0 radial-glow pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
              <Image src="/forge-logo.png" alt="FORGE" width={28} height={28} />
            </div>
            <span className="text-xl font-black tracking-tight">FORGE</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              How it Works
            </a>
            <a href="#for-recruiters" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              For Recruiters
            </a>
            <a href="#for-applicants" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              For Applicants
            </a>
            <a href="#integrations" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Integrations
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/recruiter">Sign In</Link>
            </Button>
            <Button size="sm" className="bg-white text-black hover:bg-white/90" asChild>
              <Link href="/recruiter">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/60 bg-card/50 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-sm">The Future of Evidence-Based Hiring</span>
            </div>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-center leading-[0.9] tracking-tight mb-6">
            <span className="block">Hire Based on</span>
            <span className="block bg-gradient-to-r from-white via-white to-muted-foreground bg-clip-text text-transparent">
              Proof, Not Claims
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground text-center max-w-3xl mx-auto mb-12 leading-relaxed">
            FORGE transforms hiring with verifiable evidence. Candidates prove skills through real work. Recruiters rank
            with confidence. No more resume roulette.
          </p>

          {/* CTA Buttons - Two Portals */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button size="lg" className="h-14 px-8 text-lg bg-white text-black hover:bg-white/90 group" asChild>
              <Link href="/recruiter">
                <Users className="w-5 h-5 mr-2" />
                I'm Hiring
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-2 group bg-transparent" asChild>
              <a href="https://forge-application-portal-sjlv91m1w.vercel.app" target="_blank" rel="noopener noreferrer">
                <GraduationCap className="w-5 h-5 mr-2" />
                I'm Applying
                <ArrowUpRight className="w-5 h-5 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm hover:border-border/80 transition-all duration-300"
              >
                <div className="text-4xl md:text-5xl font-black mb-2">
                  <AnimatedCounter target={stat.value} />
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logos Marquee */}
      <section id="integrations" className="py-12 border-y border-border/40 overflow-hidden">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground uppercase tracking-widest">
            Seamlessly integrates with your stack
          </p>
        </div>
        <div className="flex items-center gap-8 animate-marquee">
          {[...INTEGRATIONS, ...INTEGRATIONS].map((integration, i) => (
            <div
              key={`${integration.name}-${i}`}
              className="flex items-center gap-3 px-6 py-3 rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm shrink-0 hover:border-border/80 hover:bg-card/50 transition-all duration-300 group"
              onMouseEnter={() => setHoveredIntegration(integration.name)}
              onMouseLeave={() => setHoveredIntegration(null)}
            >
              <div className={`${integration.color} group-hover:scale-110 transition-transform`}>
                <integration.Logo />
              </div>
              <span className="text-sm font-semibold whitespace-nowrap">{integration.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">How FORGE Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A complete ecosystem connecting verified talent with evidence-driven hiring
            </p>
          </div>

          {/* The Algorithm */}
          <div className="mb-20">
            <div className="max-w-4xl mx-auto p-8 rounded-3xl border border-border/60 bg-card/50 backdrop-blur-sm">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-black mb-2">The FORGE Algorithm</h3>
                <p className="text-muted-foreground">Every candidate scored with the same transparent formula</p>
              </div>

              <div className="bg-black/50 rounded-2xl p-6 mb-8 border border-border/40">
                <code className="text-2xl md:text-3xl font-mono text-center block">
                  <span className="text-emerald-400">FORGE</span>
                  <span className="text-muted-foreground"> = </span>
                  <span className="text-blue-400">CS</span>
                  <span className="text-muted-foreground"> × </span>
                  <span className="text-amber-400">XS</span>
                  <span className="text-muted-foreground"> + </span>
                  <span className="text-violet-400">LV</span>
                </code>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4 rounded-xl bg-black/30 border border-emerald-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="font-black text-emerald-400">CS</span>
                  </div>
                  <div className="text-sm font-semibold mb-1">Capability Score</div>
                  <div className="text-xs text-muted-foreground">
                    Verified skills from GitHub, portfolio, challenges. Higher weight for real artifacts.
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-black/30 border border-amber-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                      <Users className="w-4 h-4 text-amber-400" />
                    </div>
                    <span className="font-black text-amber-400">XS</span>
                  </div>
                  <div className="text-sm font-semibold mb-1">Context Score</div>
                  <div className="text-xs text-muted-foreground">
                    Teamwork, communication, adaptability, ownership signals from work history.
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-black/30 border border-violet-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-violet-400" />
                    </div>
                    <span className="font-black text-violet-400">LV</span>
                  </div>
                  <div className="text-sm font-semibold mb-1">Learning Velocity</div>
                  <div className="text-xs text-muted-foreground">
                    Bonus for growth trajectory, recent skill adoption, and upskilling patterns.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Proof Tiers */}
          <div className="mb-20">
            <h3 className="text-2xl font-black text-center mb-8">Evidence Proof Tiers</h3>
            <div className="max-w-4xl mx-auto space-y-3">
              {PROOF_TIERS.map((tier, i) => (
                <div
                  key={tier.tier}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border/40 bg-card/30 hover:bg-card/50 transition-colors"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className={`w-16 text-right font-mono font-black ${tier.color}`}>{tier.multiplier}</div>
                  <div className="flex-1">
                    <div className="font-semibold">{tier.tier}</div>
                    <div className="text-sm text-muted-foreground">{tier.description}</div>
                  </div>
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-current to-transparent"
                    style={{
                      width: `${Number.parseFloat(tier.multiplier) * 100}%`,
                      maxWidth: "120px",
                      color: tier.color.replace("text-", "").includes("emerald")
                        ? "#34d399"
                        : tier.color.includes("blue")
                          ? "#60a5fa"
                          : tier.color.includes("amber")
                            ? "#fbbf24"
                            : tier.color.includes("orange")
                              ? "#fb923c"
                              : "#f87171",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Two Portals Section */}
      <section className="py-24 px-6 border-t border-border/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">One Ecosystem, Two Experiences</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you're hiring top talent or proving your skills, FORGE has you covered
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1.5 rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm">
              <button
                onClick={() => setActiveTab("recruiters")}
                className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === "recruiters" ? "bg-white text-black" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Users className="w-4 h-4 inline mr-2" />
                For Recruiters
              </button>
              <button
                onClick={() => setActiveTab("applicants")}
                className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === "applicants" ? "bg-white text-black" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <GraduationCap className="w-4 h-4 inline mr-2" />
                For Applicants
              </button>
            </div>
          </div>

          {/* Recruiters Content */}
          {activeTab === "recruiters" && (
            <div id="for-recruiters" className="animate-fade-in">
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <h3 className="text-3xl font-black mb-6">Stop Guessing. Start Knowing.</h3>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    Traditional hiring relies on resume keywords and gut feelings. FORGE gives you verifiable proof of
                    candidate capabilities, ranked by an auditable algorithm.
                  </p>
                  <div className="space-y-4 mb-8">
                    {[
                      "AI extracts required skills from your job description",
                      "Candidates submit proof: GitHub, portfolios, challenges",
                      "FORGE scores and ranks with transparent evidence",
                      "Review evidence receipts for every claim",
                      "Export interview packs tailored to each candidate",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                  <Button size="lg" className="bg-white text-black hover:bg-white/90" asChild>
                    <Link href="/recruiter">
                      Open Recruiter Portal
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                </div>

                {/* Recruiter Feature Cards */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Target, title: "Smart Filtering", desc: "Tau gate auto-filters unqualified" },
                    { icon: Eye, title: "Evidence Receipts", desc: "Click-through proof for every skill" },
                    { icon: Brain, title: "AI Talent Radar", desc: "Discover passive candidates" },
                    { icon: FileCheck, title: "Interview Packs", desc: "Custom questions per candidate" },
                    { icon: BarChart3, title: "Outcome Calibration", desc: "Learn from your hiring data" },
                    { icon: Lock, title: "Bias-Free Scoring", desc: "Algorithms don't discriminate" },
                  ].map((feature, i) => (
                    <div
                      key={feature.title}
                      className="p-5 rounded-2xl border border-border/40 bg-card/30 hover:bg-card/50 hover:border-border/80 transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-3">
                        <feature.icon className="w-5 h-5" />
                      </div>
                      <div className="font-semibold mb-1">{feature.title}</div>
                      <div className="text-xs text-muted-foreground">{feature.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Applicants Content */}
          {activeTab === "applicants" && (
            <div id="for-applicants" className="animate-fade-in">
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <h3 className="text-3xl font-black mb-6">Turn Your Work Into Proof</h3>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    Stop being filtered by keywords. FORGE lets you prove your skills through real work samples and
                    challenges. Build a portable proof profile that works across all applications.
                  </p>
                  <div className="space-y-4 mb-8">
                    {[
                      "Complete skill challenges (coding, SQL, scenarios)",
                      "Submit evidence: GitHub repos, portfolios, writing",
                      "Get instant rubric feedback and scores",
                      "Build verified skill receipts",
                      "Carry your proof profile across all applications",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-blue-400" />
                        </div>
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                  <Button size="lg" className="bg-white text-black hover:bg-white/90" asChild>
                    <a
                      href="https://forge-application-portal-sjlv91m1w.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open Application Portal
                      <ArrowUpRight className="w-5 h-5 ml-2" />
                    </a>
                  </Button>
                </div>

                {/* Challenge Types */}
                <div className="space-y-3">
                  <div className="text-sm font-semibold text-muted-foreground mb-4">CHALLENGE TYPES</div>
                  {CHALLENGE_TYPES.map((challenge, i) => (
                    <div
                      key={challenge.name}
                      className="flex items-center gap-4 p-4 rounded-xl border border-border/40 bg-card/30 hover:bg-card/50 hover:border-border/80 transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                        <challenge.icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <div className="font-semibold">{challenge.name}</div>
                        <div className="text-sm text-muted-foreground">{challenge.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What Applicants Get */}
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: Award,
                    title: "Skill Receipts",
                    desc: "Verified credentials for every challenge you complete. Like a transcript, but for actual work.",
                  },
                  {
                    icon: TrendingUp,
                    title: "Proof Profile",
                    desc: "A portable dossier of your verified skills. Use it across all job applications.",
                  },
                  {
                    icon: MessageSquare,
                    title: "Instant Feedback",
                    desc: "Rubric-based scoring tells you exactly where to improve. No more black hole applications.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="p-6 rounded-2xl border border-border/40 bg-card/30 hover:bg-card/50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="text-lg font-semibold mb-2">{item.title}</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FORGE vs ATS */}
      <section className="py-24 px-6 border-t border-border/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">FORGE vs Traditional ATS</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Most applicant tracking systems filter by keywords. FORGE evaluates by proof.
            </p>
          </div>

          <div className="rounded-3xl border border-border/60 bg-card/50 backdrop-blur-sm overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 border-b border-border/40">
              <div className="p-6 font-semibold">Feature</div>
              <div className="p-6 text-center font-black text-emerald-400 border-x border-border/40 bg-emerald-500/5">
                FORGE
              </div>
              <div className="p-6 text-center font-semibold text-muted-foreground">Traditional ATS</div>
            </div>

            {/* Rows */}
            {FORGE_VS_ATS.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-3 ${i < FORGE_VS_ATS.length - 1 ? "border-b border-border/40" : ""}`}
              >
                <div className="p-4 text-sm">{row.feature}</div>
                <div className="p-4 flex justify-center items-center border-x border-border/40 bg-emerald-500/5">
                  {row.forge === true ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : row.forge === false ? (
                    <XCircle className="w-5 h-5 text-red-400" />
                  ) : (
                    <Minus className="w-5 h-5 text-amber-400" />
                  )}
                </div>
                <div className="p-4 flex justify-center items-center">
                  {row.ats === true ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : row.ats === false ? (
                    <XCircle className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <Minus className="w-5 h-5 text-amber-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section id="integrations" className="py-24 px-6 border-t border-border/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Integrates With Everything</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              FORGE connects to your existing tools. Pull candidate data from job boards, sync with your ATS, export
              anywhere.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {INTEGRATIONS.map((integration) => (
              <div
                key={integration.name}
                className="group p-6 rounded-2xl border border-border/40 bg-card/30 hover:bg-card/50 hover:border-border/80 transition-all duration-300 flex flex-col items-center gap-3"
                onMouseEnter={() => setHoveredIntegration(integration.name)}
                onMouseLeave={() => setHoveredIntegration(null)}
              >
                <Image
                  src={integration.logo || "/placeholder.svg"}
                  alt={integration.name}
                  width={48}
                  height={48}
                  className="rounded-lg group-hover:scale-110 transition-transform duration-300"
                />
                <span className="text-sm font-semibold">{integration.name}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Don't see your tool? We're adding new integrations every week.</p>
            <Button variant="outline" size="lg">
              Request Integration
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-24 px-6 border-t border-border/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Why Teams Choose FORGE</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "We reduced time-to-hire by 60% and our quality of hire metrics improved dramatically.",
                author: "Sarah Chen",
                role: "VP Engineering, TechCorp",
              },
              {
                quote: "Finally, a hiring tool that matches what engineering actually values: real work, not resumes.",
                author: "Marcus Johnson",
                role: "CTO, StartupXYZ",
              },
              {
                quote: "The evidence receipts give us confidence in every hiring decision. No more buyer's remorse.",
                author: "Elena Rodriguez",
                role: "Head of Talent, ScaleUp Inc",
              },
            ].map((testimonial, i) => (
              <div key={i} className="p-6 rounded-2xl border border-border/40 bg-card/30">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 border-t border-border/40">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Hire Smarter?</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join the companies replacing resume roulette with evidence-based hiring. Start ranking candidates in under
            60 seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="h-16 px-10 text-lg bg-white text-black hover:bg-white/90 group" asChild>
              <Link href="/recruiter">
                <Users className="w-5 h-5 mr-2" />
                Start Hiring with FORGE
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-10 text-lg border-2 group bg-transparent" asChild>
              <a href="https://forge-application-portal-sjlv91m1w.vercel.app" target="_blank" rel="noopener noreferrer">
                <GraduationCap className="w-5 h-5 mr-2" />
                Apply as Candidate
                <ArrowUpRight className="w-5 h-5 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
              <Image src="/forge-logo.png" alt="FORGE" width={20} height={20} />
            </div>
            <span className="font-black">FORGE</span>
            <span className="text-muted-foreground text-sm">Proof-first hiring</span>
          </div>
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
