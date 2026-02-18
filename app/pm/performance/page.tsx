"use client"

import React from "react"

import PerformanceIntelPanel from "@/app/pm/panels/PerformanceIntelPanel"
import { useRouter } from "next/navigation"

export default function PerformancePage() {
    const router = useRouter()

    return (

        <main className="flex-1 overflow-hidden">
            <PerformanceIntelPanel onClose={() => router.push("/pm")} />
        </main>
    )
}
