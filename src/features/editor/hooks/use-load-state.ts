import { useEffect, useRef } from "react";
import { JSON_KEYS } from "../types";
import { fabric } from "fabric";

interface UseLoadStateProps {
    autoZoom: () => void
    canvas: fabric.Canvas | null
    initialState: React.MutableRefObject<string | undefined>
    canvasHistory: React.MutableRefObject<string[]>
    setHistoryIndex: React.Dispatch<React.SetStateAction<number>>

}

export const useLoadState = ({ 
    canvas,
    autoZoom,
    initialState,
    canvasHistory,
    setHistoryIndex,
}: UseLoadStateProps) => {
    const initialized = useRef(false)

    useEffect(() => {
        if (!initialized.current && initialState?.current && canvas) {
            const data = JSON.parse(initialState.current)

            canvas.loadFromJSON(data, () => {
                const currentState = JSON.stringify(
                    canvas.toJSON(JSON_KEYS),
                )

                canvasHistory.current = [currentState]
                setHistoryIndex(0)
                autoZoom()
            })
            initialized.current = true
        }
    }, 
    [
        canvas,
        autoZoom,
        initialState,
        canvasHistory,
        setHistoryIndex,
    ])
}