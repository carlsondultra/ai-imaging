import {fabric} from "fabric"
import { useCallback } from "react"

export const useEditor = () => {
    const init = useCallback(({
        initialCanvas,
        initialContainer,
    }: {
        initialCanvas: fabric.Canvas
        initialContainer: HTMLDivElement,
    }) => {
        console.log("Initializing Editor")
    }, [])

    return { init }
}