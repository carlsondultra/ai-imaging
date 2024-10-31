"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

import { useFailModal } from "../store/use-fail-modal"

export const SubscriptionAlert = () => {
    const params = useSearchParams()
    
    const { onOpen: onOpenFail } = useFailModal()

    const canceled = params.get("canceled")

    useEffect(() => {
        if (canceled) {
            onOpenFail()
        }
    }, [canceled, onOpenFail])
}