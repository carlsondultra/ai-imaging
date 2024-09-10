"use client"

import { Children } from "react"
import { QueryProvider } from "./query-provider"

interface ProvidersProps {
    children: React.ReactNode
}

export  const Providers = ({ children }: ProvidersProps) => {
    return (
        <QueryProvider>
            {children}
        </QueryProvider>
    )
}