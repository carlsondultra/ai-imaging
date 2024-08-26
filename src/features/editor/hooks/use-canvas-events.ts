import { fabric } from "fabric";
import { useEffect } from "react";

interface UseCanvasEventsProps {
  canvas: fabric.Canvas | null;
  container: HTMLDivElement | null;
  setSelectedObjects: (objects: fabric.Object[]) => void;
  clearSelectionCallback?: () => void
}

export const useCanvasEvents = ({
  canvas,
  setSelectedObjects,
  clearSelectionCallback,
}: UseCanvasEventsProps) => {
  useEffect(() => {
    if (canvas) {
      canvas.on("selection:created", (e) => {
        console.log("selection:created")
        setSelectedObjects(e.selected || []);
      });
      canvas.on("selection:updated", (e) => {
        console.log("selection:updated")
        setSelectedObjects(e.selected || []);
      });
      canvas.on("selection:cleared", () => {
        console.log("selection:cleared")
        setSelectedObjects([]);
        clearSelectionCallback?.() //optional
      });
    }

    return () => {
        if (canvas) {
            canvas.off("selection:created")
            canvas.off("selection:updated")
            canvas.off("selection:cleared")
        }
    }
  }, [canvas, clearSelectionCallback, setSelectedObjects]);
};
