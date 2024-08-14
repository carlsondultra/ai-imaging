import { cn } from "@/lib/utils";
import { ActiveTool } from "../types";
import { ToolSidebarHeader } from "./tool-sidebar-header";
import { ToolSidebarClose } from "./tool-sidebar-close";

interface ShapeSidebarProps {
    activeTool: ActiveTool
    onChangeActiveTool: (tool: ActiveTool) => void
}

export const ShapeSidebar = ({
    activeTool,
    onChangeActiveTool,
}: ShapeSidebarProps) => {
    const onClose = () => {
        onChangeActiveTool("select")
    }

    return (
        <aside
            className={cn(
                "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
                activeTool === "shapes" ? "visible" : "hidden",
            )}
        >
            <ToolSidebarHeader
                title="Shapes"
                description="Add shapes to canvas"
            />
            <ToolSidebarClose onClick={onClose} />
        </aside>
    )
}