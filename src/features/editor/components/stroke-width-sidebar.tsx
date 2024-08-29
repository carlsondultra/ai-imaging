import { cn } from "@/lib/utils";
import { ActiveTool, Editor, STROKE_COLOR } from "../types";
import { ToolSidebarHeader } from "./tool-sidebar-header";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    const value = editor?.getActiveStrokeColor() || STROKE_COLOR

    const onClose = () => {
        onChangeActiveTool("select")
    }

    const onChange = (value: string) => {
        editor?.changeStrokeColor(value)
    }

    return (
        <aside
            className={cn(
                "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
                activeTool === "stroke-width" ? "visible" : "hidden",
            )}
        >
            <ToolSidebarHeader
                title="Stroke width"
                description="Modify stroke of your object"
            />
            <ScrollArea>
                <div className="p-4 space-y-6">
                    
                </div>
            </ScrollArea>

            <ToolSidebarClose onClick={onClose} />
        </aside>
    )
}