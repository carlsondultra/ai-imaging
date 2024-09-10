import { cn } from "@/lib/utils";
import { ActiveTool, Editor} from "../types";
import { ToolSidebarHeader } from "./tool-sidebar-header";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ImageSidebarProps {
    editor: Editor | undefined
    activeTool: ActiveTool
    onChangeActiveTool: (tool: ActiveTool) => void
}

export const ImageSidebar = ({
    editor,
    activeTool,
    onChangeActiveTool,
}: ImageSidebarProps) => {

    const onClose = () => {
        onChangeActiveTool("select")
    }

    return (
        <aside
            className={cn(
                "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
                activeTool === "images" ? "visible" : "hidden",
            )}
        >
            <ToolSidebarHeader
                title="Images"
                description="Add images to your canvas"
            />
            <ScrollArea>
                <div className="p-4 space-y-1 border-b">
                   
                </div>
            </ScrollArea>

            <ToolSidebarClose onClick={onClose} />
        </aside>
    )
}