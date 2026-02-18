"use client"

import React from "react"

import ProofEnginePanel from "@/app/pm/panels/ProofEnginePanel"
import { useRouter } from "next/navigation"

export default function ProofPage() {
    const router = useRouter()

    return (

        <main className="flex-1 overflow-hidden">
            <ProofEnginePanel onClose={() => router.push("/pm")} />
        </main>
    )
}
