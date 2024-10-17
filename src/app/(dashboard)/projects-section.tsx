"use client"

import { Table, TableRow, TableBody, TableCell } from "@/components/ui/table"
import { useGetProjects } from "@/features/projects/api/use-get-projects"
import { AlertTriangle, FileIcon, Loader, Search } from "lucide-react"
import React from "react"

export const ProjectsSection = () => {
    const {
        data,
        status,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
    } = useGetProjects()

    if (status === "pending"){
        return (
            <div className="space-y-4">
            <h3 className="font-semibold text-lg">
            Recent projects
            </h3>
            <div className="flex flex-col gap-y-4 items-center justify-center h-32">
                <Loader className="size-6 text-muted-foreground animate-spin"/>
            </div>
        </div>
        )
    }

    if (status === "error") {
        return (
            <div className="space-y-4">
            <h3 className="font-semibold text-lg">
            Recent projects
            </h3>
            <div className="flex flex-col gap-y-4 items-center justify-center h-32">
                <AlertTriangle className="size-6 text-muted-foreground"/>
                <p className="text-muted-foreground text-sm">
                    Failed to load projects
                </p>
            </div>
        </div>
        )
    }

    if (!data.pages.length) {
        return (
            <div className="space-y-4">
            <h3 className="font-semibold text-lg">
            Recent projects
            </h3>
            <div className="flex flex-col gap-y-4 items-center justify-center h-32">
                <Search className="size-6 text-muted-foreground"/>
                <p className="text-muted-foreground text-sm">
                    No projects found
                </p>
            </div>
        </div>
        )
    }

    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-lg">
            Recent projects
            </h3>
            <Table>
                <TableBody>
                    {data.pages.map((group, i) => (
                        <React.Fragment key={i}>
                            {group.data.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell className="font-medium flex items-center gap-x-2 cursor-pointer">
                                        <FileIcon className="size-6"/>
                                        {project.name}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}