
import { RoleType } from "./types"

export interface Candidate {
    id: string
    name: string
    username: string
    github: string
    portfolio: string
    portfolioExtraction?: any
    writingLinks: string[]
    resumeText: string
    resumeMeta?: {
        fileName?: string
        charCount: number
        isLikelyScanned?: boolean
        extractionMethod?: string
        warnings?: string[]
    }
    linkedinText: string
    extracurricularText: string
    status: "missing" | "validating" | "valid" | "invalid" | "warning"
    avatar?: string
    bio?: string
    publicRepos?: number
    followers?: number
    roleType: RoleType
    salaryExpectation?: {
        min?: number
        max?: number
        target?: number
        currency?: string
    }
    // Pre-calculated stats for the demo
    stats?: {
        commits: number
        issues: number
        prs: number
        reviews: number
        stars: number
        forks: number
    }
    topRepos?: Array<{
        name: string
        description: string
        language: string
        stars: number
    }>

    // Extended Data for Deep Profiles
    extendedSkills?: {
        technical: Array<{
            name: string
            tags: string[]
            indicators: string[]
            evidence: Array<{ label: string; url?: string }>
        }>
        domain: Array<{
            name: string
            tags: string[]
            indicators: string[]
            evidence: Array<{ label: string; url?: string }>
        }>
    }
    recentInterests?: {
        tags: string[]
        score: number
        categories: Array<{ name: string; items: string[] }>
        recentFocus: string
        forks: Array<{ category: string; description: string }>
    }
    learningVelocity?: {
        score: number // 0-100
        trend: "accelerating" | "steady" | "slowing"
        newTechAdoption: number // languages/frameworks learned in last 6mo
        diversityScore: number // breadth of different areas explored
        recentMilestones: string[]
    }
}

const ROLES: RoleType[] = ["engineer", "designer", "pm", "founder"]
const LANGUAGES = ["TypeScript", "Rust", "Go", "Python", "C++", "Swift", "Kotlin"]

function generateCandidates(count: number): Candidate[] {
    const candidates: Candidate[] = []

    // Some specific high-quality profiles to ensure good demos
    const VIPs: Partial<Candidate>[] = [
        {
            name: "Zimo Ji",
            username: "lltsdyp",
            roleType: "engineer",
            bio: "Student at East China Normal University working across systems programming and academic projects. Contributes to compiler development with work on a Tiger compiler implementation.",
            stats: { commits: 134, issues: 12, prs: 9, reviews: 5, stars: 27, forks: 9 },
            extendedSkills: {
                technical: [
                    {
                        name: "Compiler Design & Code Generation",
                        tags: ["C", "Assembly", "Compiler Architecture"],
                        indicators: [
                            "Implements complete compiler architecture from parsing to code generation",
                            "Demonstrates knowledge of intermediate representations and optimization techniques",
                            "Applies language theory concepts to practical compiler construction"
                        ],
                        evidence: [{ label: "lltsdyp/TigerCompiler", url: "#" }]
                    },
                    {
                        name: "Low-Level Systems Programming",
                        tags: ["C", "C++", "Assembly"],
                        indicators: ["Kernel module development", "Memory management implementation"],
                        evidence: [{ label: "Uno-OS", url: "#" }, { label: "rtthread-riscv", url: "#" }]
                    },
                    {
                        name: "Distributed Data Systems & Databases",
                        tags: ["Go", "Distributed Systems", "DB Implementation"],
                        indicators: ["Consensus algorithm implementation", "Storage engine design"],
                        evidence: []
                    },
                    {
                        name: "Full-Stack Web Development",
                        tags: ["TypeScript", "Web Frameworks", "Frontend Arch"],
                        indicators: ["Complex UI state management", "Component library design"],
                        evidence: [{ label: "SEProject2025-Vilingo", url: "#" }]
                    }
                ],
                domain: []
            },
            recentInterests: {
                tags: ["Rust", "Java", "TypeScript", "Go"],
                score: 100,
                categories: [
                    { name: "Compiler infrastructure", items: ["LLVM", "Clang", "CompilerGym"] },
                    { name: "Systems programming", items: ["RustDesk", "performance analysis"] },
                    { name: "Machine learning infrastructure", items: ["ML compiler optimization", "AI frameworks"] },
                    { name: "Program analysis", items: ["Tai-e static analysis"] }
                ],
                recentFocus: "Infrastructure and systems-level tools, particularly compiler optimization and program analysis frameworks",
                forks: [
                    { category: "Compiler/Language Infrastructure", description: "Forked LLVM, Clang IR, and Typst - active engagement with compiler projects" },
                    { category: "Educational/Algorithmic", description: "Forked AI systems and performance benchmarking repos related to coursework" },
                    { category: "Systems Programming", description: "Forked performance analysis and low-level programming references" }
                ]
            }
        },
        {
            name: "Andreas Kling",
            username: "awesomekling",
            roleType: "engineer",
            bio: "Founder of SerenityOS. Love C++, systems programming, and vintage computing.",
            stats: { commits: 12400, issues: 450, prs: 3200, reviews: 800, stars: 15000, forks: 2000 }
        },
        {
            name: "Tanner Linsley",
            username: "tannerlinsley",
            roleType: "engineer",
            bio: "Building TanStack. React, Query, Table, Charts.",
            stats: { commits: 4500, issues: 1200, prs: 850, reviews: 200, stars: 45000, forks: 3000 }
        },
        {
            name: "Rich Harris",
            username: "rich-harris",
            roleType: "engineer",
            bio: "Working on Svelte at Vercel. Graphics editor at NYT.",
            stats: { commits: 5200, issues: 800, prs: 900, reviews: 400, stars: 60000, forks: 4000 }
        },
        {
            name: "Sarah Drasner",
            username: "sdras",
            roleType: "engineer",
            bio: "Director of Engineering at Google. Author, speaker.",
            stats: { commits: 3800, issues: 400, prs: 300, reviews: 150, stars: 25000, forks: 1200 }
        },
        {
            name: "Lee Robinson",
            username: "leerob",
            roleType: "engineer",
            bio: "VP of Product at Vercel. Next.js, React, Web.",
            stats: { commits: 2900, issues: 600, prs: 500, reviews: 300, stars: 12000, forks: 800 }
        }
    ]

    // Add VIPs first
    VIPs.forEach((vip, i) => {
        candidates.push({
            id: `vip_${i}`,
            name: vip.name!,
            username: vip.username!,
            github: vip.username!,
            portfolio: `https://${vip.username}.com`,
            writingLinks: [`https://${vip.username}.com/blog`],
            resumeText: `${vip.name} - ${vip.bio}\nExperienced in ${LANGUAGES.slice(0, 3).join(", ")}.`,
            linkedinText: "",
            extracurricularText: vip.bio || "",
            status: "valid",
            roleType: vip.roleType as RoleType,
            stats: vip.stats,
            topRepos: [
                { name: "core-lib", description: "High performance core library", language: LANGUAGES[i % LANGUAGES.length], stars: (vip.stats?.stars || 100) / 5 },
                { name: "ui-kit", description: "Component library", language: "TypeScript", stars: (vip.stats?.stars || 100) / 10 },
                { name: "utils", description: "Utility functions", language: LANGUAGES[(i + 1) % LANGUAGES.length], stars: (vip.stats?.stars || 100) / 20 }
            ],
            extendedSkills: vip.extendedSkills,
            recentInterests: vip.recentInterests,
            learningVelocity: vip.learningVelocity || generateRandomLearningVelocity()
        })
    })

    // Generate rest
    for (let i = 0; i < count - VIPs.length; i++) {
        const role = ROLES[Math.floor(Math.random() * ROLES.length)]
        const firstName = ["Alex", "Sam", "Jordan", "Casey", "Riley", "Taylor", "Morgan", "Quinn", "Avery", "Parker"][Math.floor(Math.random() * 10)]
        const lastName = ["Chen", "Smith", "Kim", "Patel", "Garcia", "Johnson", "Lee", "Wong", "Rodriguez", "Nguyen"][Math.floor(Math.random() * 10)]
        const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${Math.floor(Math.random() * 99)}`

        candidates.push({
            id: `gen_${i}`,
            name: `${firstName} ${lastName}`,
            username: username,
            github: username,
            portfolio: `https://${username}.dev`,
            writingLinks: [],
            resumeText: `Experienced ${role} with focus on scalability and performance.`,
            linkedinText: "",
            extracurricularText: "",
            status: Math.random() > 0.8 ? "warning" : "valid",
            roleType: role,
            stats: {
                commits: Math.floor(Math.random() * 5000),
                issues: Math.floor(Math.random() * 200),
                prs: Math.floor(Math.random() * 300),
                reviews: Math.floor(Math.random() * 200),
                stars: Math.floor(Math.random() * 1000),
                forks: Math.floor(Math.random() * 200)
            },
            topRepos: [
                { name: `repo-${i}-alpha`, description: "Experimental project", language: LANGUAGES[Math.floor(Math.random() * LANGUAGES.length)], stars: Math.floor(Math.random() * 100) },
                { name: `project-${i}`, description: "Main portfolio project", language: LANGUAGES[Math.floor(Math.random() * LANGUAGES.length)], stars: Math.floor(Math.random() * 500) }
            ],
            extendedSkills: generateRandomExtendedSkills(role),
            recentInterests: generateRandomRecentInterests(),
            learningVelocity: generateRandomLearningVelocity()
        })
    }

    return candidates
}

// Helpers for procedural generation
function generateRandomExtendedSkills(role: RoleType) {
    const techs = [
        { name: "Systems Programming", tags: ["Rust", "C++", "Memory Safety"], indicators: ["Custom allocator implementation", "Zero-copy deserialization"] },
        { name: "Distributed Systems", tags: ["Go", "gRPC", "Consensus"], indicators: ["Raft implementation", "Eventual consistency handling"] },
        { name: "Frontend Architecture", tags: ["React", "Performance", "State"], indicators: ["Virtual DOM optimization", "State machine design"] },
        { name: "Machine Learning", tags: ["Python", "PyTorch", "CUDA"], indicators: ["Custom kernel writing", "Model quantization"] },
        { name: "Database Internals", tags: ["B-Tree", "LSM", "WAL"], indicators: ["Storage engine design", "Query planner optimization"] }
    ]

    // Pick 3-4 random technical skills
    const selectedTechs = techs.sort(() => 0.5 - Math.random()).slice(0, 3 + Math.floor(Math.random() * 2))

    return {
        technical: selectedTechs.map(t => ({
            name: t.name,
            tags: t.tags,
            indicators: t.indicators,
            evidence: [{ label: `repo-${Math.floor(Math.random() * 100)}`, url: "#" }]
        })),
        domain: [
            { name: "Product Engineering", tags: ["UX", "Analytics"], indicators: ["Data-driven design", "A/B testing frameworks"], evidence: [] },
            { name: "Developer Tools", tags: ["CLI", "DX"], indicators: ["Plugin architecture", " AST manipulation"], evidence: [] }
        ]
    }
}

function generateRandomRecentInterests() {
    const topics = ["Compiler Dev", "Game Engines", "OS Dev", "Generative Art", "Cryptography", "Embedded Systems"]
    const selected = topics.sort(() => 0.5 - Math.random()).slice(0, 4)

    return {
        tags: selected,
        score: 85 + Math.floor(Math.random() * 15),
        categories: [
            { name: "Core Infrastructure", items: [selected[0], "Performance"] },
            { name: "Experimental", items: [selected[1], "Prototypes"] }
        ],
        recentFocus: `Deep diving into ${selected[0]} and its applications in ${selected[1]}. Exploring new paradigms in ${selected[2]}.`,
        forks: [
            { category: "Learning", description: `Forked multiple ${selected[0]} repos for analysis` },
            { category: "Contribution", description: `Active PRs in major ${selected[1]} libraries` }
        ]
    }
}

function generateRandomLearningVelocity() {
    const trends: Array<"accelerating" | "steady" | "slowing"> = ["accelerating", "steady", "slowing"]
    const trend = trends[Math.floor(Math.random() * trends.length)]
    const score = trend === "accelerating" ? 75 + Math.floor(Math.random() * 25) : trend === "steady" ? 50 + Math.floor(Math.random() * 25) : 25 + Math.floor(Math.random() * 25)

    const milestones = [
        "Contributed to 3 new open source projects",
        "Mastered Rust fundamentals in 2 months",
        "Published 5 technical blog posts",
        "Completed distributed systems course",
        "Built production app with new framework",
        "Earned AWS certification",
        "Shipped feature to 1M+ users",
        "Led migration to microservices",
        "Implemented CI/CD pipeline from scratch"
    ]

    return {
        score,
        trend,
        newTechAdoption: 2 + Math.floor(Math.random() * 5),
        diversityScore: 60 + Math.floor(Math.random() * 40),
        recentMilestones: milestones.sort(() => 0.5 - Math.random()).slice(0, 2 + Math.floor(Math.random() * 2))
    }
}

export const DEMO_CANDIDATES: Candidate[] = generateCandidates(256)
