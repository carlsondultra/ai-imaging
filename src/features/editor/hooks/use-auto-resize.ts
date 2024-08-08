import { useEffect } from "react"

interface UseAutoResizeProps {
    canvas: fabric.Canvas | null
    container: HTMLDivElement | null
}

export const useAutoResize = ({
    canvas,
    container,
}: UseAutoResizeProps) => {
    useEffect(() => {
        let resizeObserver: ResizeObserver | null = null
        if (canvas && container) {
            resizeObserver = new ResizeObserver(() => {
                console.log("resizing")
            })

            resizeObserver.observe(container)
        }

        return () => {
            if (resizeObserver) {
                resizeObserver.disconnect() //avoiding overflow
            }
        }

    }, [
        canvas,
        container
    ])
}