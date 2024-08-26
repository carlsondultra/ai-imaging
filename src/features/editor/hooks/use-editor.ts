import { fabric } from "fabric";
import { useCallback, useState, useMemo } from "react";

import { useAutoResize } from "./use-auto-resize";
import { BuildEditorProps, CIRCLE_OPTIONS, DIAMOND_OPTIONS, Editor, FILL_COLOR, RECTANGLE_OPTIONS, STROKE_COLOR, STROKE_WIDTH, TRIANGLE_OPTIONS } from "../types";
import { useCanvasEvents } from "./use-canvas-events";
import { isTextType } from "../utils";

const buildEditor = ({ 
  canvas,
  fillColor,
  setFillColor,
  strokeColor,
  setStrokeColor,
  strokeWidth,
  setStrokeWidth,
}: BuildEditorProps): Editor => {
  const getWorkspace = () => {
    return canvas.getObjects().find((object) => object.name === "clip");
  };

  const center = (object: fabric.Object) => {
    const workspace = getWorkspace();
    const center = workspace?.getCenterPoint()

    if (!center) return

    // @ts-ignore
    canvas._centerObject(object, center)
  };

  const addToCanvas = (object: fabric.Object) => {
    center(object)
    canvas.add(object)
    canvas.setActiveObject(object)
  }

  return {
    changeFillColor: (value: string) => {
      setFillColor(value)
      canvas.getActiveObjects().forEach((object) => {
        object.set({ fill: value })
      })
      canvas.renderAll();
    },
    changeStrokeColor: (value: string) => {
      setStrokeColor(value)
      canvas.getActiveObjects().forEach((object) => {
        // No stroke on text types
        if (isTextType(object.type)) {
          object.set({ fill: value })
          return
        }
        object.set({ stroke: value })
      })
      canvas.renderAll()
    },
    changeStrokeWidth: (value: number) => {
      setStrokeWidth(value)
      canvas.getActiveObjects().forEach((object) => {
        object.set({ strokeWidth: value })
      })
      canvas.renderAll()
    },
    addCircle: () => {
      const object = new fabric.Circle({
        ...CIRCLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      });

      addToCanvas(object)
    },
    addSoftRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        rx: 50,
        ry: 50,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      });

      addToCanvas(object)
    },
    addRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      });

      addToCanvas(object)
    },
    addTriangle: () => {
      const object = new fabric.Triangle({
        ...TRIANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      });

      addToCanvas(object)
    },
    addInverseTriangle: () => {
      const HEIGHT = TRIANGLE_OPTIONS.height
      const WIDTH = TRIANGLE_OPTIONS.width

      const object = new fabric.Polygon(
        [
          { x: 0, y: 0},
          { x: WIDTH, y: 0},
          { x: WIDTH/2, y: HEIGHT},
        ],
        {
          ...TRIANGLE_OPTIONS,
          fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        }
      )

      addToCanvas(object)
    },
    addDiamond: () => {
      const HEIGHT = DIAMOND_OPTIONS.height
      const WIDTH = DIAMOND_OPTIONS.width

      const object = new fabric.Polygon(
        [
          { x: WIDTH / 2, y: 0},
          { x: WIDTH, y: HEIGHT / 2},
          { x: WIDTH / 2, y: HEIGHT},
          { x: 0, y: HEIGHT / 2},
        ],
        {
          ...DIAMOND_OPTIONS,
          fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        }
      )

      addToCanvas(object)
    },
    canvas,
    fillColor,
    strokeWidth,
    strokeColor,
  };
};

export const useEditor = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([])

  const [fillColor, setFillColor] = useState(FILL_COLOR)
  const [strokeColor, setStrokeColor] = useState(STROKE_COLOR)
  const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH)

  useAutoResize({
    canvas,
    container,
  });

  useCanvasEvents({
    canvas,
    setSelectedObjects,
    container,
  })

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({
        canvas,
        fillColor,
        strokeColor,
        strokeWidth,
        setFillColor,
        setStrokeColor,
        setStrokeWidth,
      });
    }

    return undefined;
  }, [
    canvas,
    fillColor,
    setFillColor,
    strokeColor,
    setStrokeColor,
    strokeWidth,
    setStrokeWidth,
  ]);

  const init = useCallback(
    ({
      initialCanvas,
      initialContainer,
    }: {
      initialCanvas: fabric.Canvas;
      initialContainer: HTMLDivElement;
    }) => {
      fabric.Object.prototype.set({
        cornerColor: "#FFF",
        cornerStyle: "circle",
        borderColor: "#3b82f6",
        borderScaleFactor: 1.5,
        transparentCorners: false,
        borderOpacityWhenMoving: 1,
        cornerStrokeColor: "#3b82f6",
      });
      const initialWorkspace = new fabric.Rect({
        width: 900,
        height: 1200,
        name: "clip",
        fill: "white",
        selectable: false,
        hasControls: false,
        shadow: new fabric.Shadow({
          color: "rgba(0,0,0,0.8)",
          blur: 5,
        }),
      });

      initialCanvas.setWidth(initialContainer.offsetWidth);
      initialCanvas.setHeight(initialContainer.offsetHeight);

      initialCanvas.add(initialWorkspace);
      initialCanvas.centerObject(initialWorkspace); //centering workspace
      initialCanvas.clipPath = initialWorkspace; // every element not in central workspace will not be visible

      setCanvas(initialCanvas);
      setContainer(initialContainer);
    },
    []
  );

  return { init, editor };
};
