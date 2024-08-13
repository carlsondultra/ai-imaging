import { cn } from "@/lib/utils";
import { ActiveTool } from "../types";

interface ShapeSidebarProps {
    activeTool: ActiveTool
    onChangeActiveTool: (tool: ActiveTool) => void
}

export const ShapeSidebar = ({
    activeTool,
    onChangeActiveTool,
}: ShapeSidebarProps) => {
    return (
        <aside
            className={cn(
                "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
                activeTool === "shapes" ? "visible" : "hidden",
            )}
        >
            Shapes Sidebar
        </aside>
    )
}