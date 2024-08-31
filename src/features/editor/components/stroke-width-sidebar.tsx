import { cn } from "@/lib/utils";
import { ActiveTool, Editor, STROKE_WIDTH } from "../types";
import { ToolSidebarHeader } from "./tool-sidebar-header";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface StrokeWidthSidebarProps {
    editor: Editor | undefined
    activeTool: ActiveTool
    onChangeActiveTool: (tool: ActiveTool) => void
}

export const StrokeWidthSidebar = ({
    editor,
    activeTool,
    onChangeActiveTool,
}: StrokeWidthSidebarProps) => {
    const value = editor?.getActiveStrokeWidth() || STROKE_WIDTH

    const onClose = () => {
        onChangeActiveTool("select")
    }

    const onChange = (value: number) => {
        editor?.changeStrokeWidth(value)
    }

    return (
        <aside
            className={cn(
                "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
                activeTool === "stroke-width" ? "visible" : "hidden",
            )}
        >
            <ToolSidebarHeader
                title="Stroke options"
                description="Modify stroke of your object"
            />
            <ScrollArea>
                <div className="p-4 space-y-4 border-b">
                    <Label className="text-sm">
                        Stroke width
                    </Label>
                    <Slider 
                        value={[value]}
                        onValueChange={(values) => onChange(values[0])}
                    />
                </div>
            </ScrollArea>

            <ToolSidebarClose onClick={onClose} />
        </aside>
    )
}