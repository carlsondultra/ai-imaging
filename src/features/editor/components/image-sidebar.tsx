import { cn } from "@/lib/utils";
import { ActiveTool, Editor} from "../types";
import { ToolSidebarHeader } from "./tool-sidebar-header";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetImages } from "@/features/images/api/use-get-images";
import { AlertTriangle, Loader } from "lucide-react";
import Image from "next/image";

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
    const { data, isLoading, isError } = useGetImages()

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
            {isLoading && (
                <div className="flex items-center justify-center flex-1">
                    <Loader className="size-4 text-muted-foreground animate-spin"/>
                </div>
            )}
            {isError && (
                <div className="flex flex-col gap-y-4 items-center justify-center flex-1">
                    <AlertTriangle className="size-4 text-muted-foreground"/>
                    <p className="text-muted-foreground text-xs">
                        Failed to fetch images
                    </p>
                </div>
            )}
            <ScrollArea>
                <div className="p-4 space-y-1 border-b">
                   {data && data.map((image) => {
                    return (
                        <button
                            key={image.id}
                            className="relative w-full h-[100px] group hover:opacity-75 transition bg-muted rounded-sm overflow-hidden border"
                        >
                            <Image
                                fill
                                src={image.urls.small}
                                alt={image.alt_description || "Image"}
                                className="object-cover"
                            />
                        </button>
                    )
                   })}
                </div>
            </ScrollArea>

            <ToolSidebarClose onClick={onClose} />
        </aside>
    )
}