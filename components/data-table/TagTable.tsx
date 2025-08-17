'use client'

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { DataTable } from "../Table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { Tag, TagEditData } from "@/types/tag";
import { getAllTags } from "@/services/tag";

interface Props {
    buttonComponent?: React.ReactNode;
    onEditTagData: (data: TagEditData) => void;
    onIsEditing: (data: boolean) => void;
    onOpen: (value: boolean) => void;
    onSetConfirmDeleteTagOpen: (value: boolean) => void;
    onSetSelectedTagId: (value: string) => void;
}

export default function TagTable({
    buttonComponent,
    onEditTagData,
    onIsEditing,
    onOpen,
    onSetConfirmDeleteTagOpen,
    onSetSelectedTagId
}: Props) {
    const {
        data: tagsData = { tags: [] },
        isFetching: tagsLoading,
        isError: tagsError,
        refetch: refetchTags,
    } = useQuery<{ tags: Tag[] }>({
        queryKey: ["tags"],
        queryFn: () => {
            return getAllTags();
        },
        placeholderData: keepPreviousData,
    });

    const columns: ColumnDef<Tag>[] = [
        {
            accessorKey: "name",
            header: "Nom"
        },
        {
            accessorKey: "color",
            header: "Couleur",
            cell: ({ row }) => {
                const color = row.getValue("color") as string;
                return (
                    <div className="flex items-center gap-2">
                        <div 
                            className="w-4 h-4 rounded-full border border-gray-300" 
                            style={{ backgroundColor: color }}
                        />
                        <span className="text-sm">{color}</span>
                    </div>
                );
            }
        },
        {
            accessorKey: "createdAt",
            header: "Créé le",
            cell: ({ row }) => {
                const date = new Date(row.getValue("createdAt"));
                return date.toLocaleDateString("fr-FR");
            }
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const tag = row.original

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => {
                                onEditTagData({
                                    id: tag.id!,
                                    name: tag.name,
                                    color: tag.color
                                });
                                onIsEditing(true);
                                onOpen(true);
                            }}>Modifier</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                                onSetSelectedTagId(tag.id!);
                                onSetConfirmDeleteTagOpen(true);
                            }}>Supprimer</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    return (
        <div>
            <DataTable
                length={3}
                columns={columns}
                data={[
                    {
                        id: "1",
                        name: "Technologie",
                        color: "#3B82F6",
                        createdAt: "2024-01-15T10:00:00Z"
                    },
                    {
                        id: "2",
                        name: "Santé",
                        color: "#10B981",
                        createdAt: "2024-01-10T09:00:00Z"
                    },
                    {
                        id: "3",
                        name: "Voyage",
                        color: "#F59E0B",
                        createdAt: "2024-01-05T11:00:00Z"
                    },
                    {
                        id: "4",
                        name: "Cuisine",
                        color: "#EF4444",
                        createdAt: "2024-01-12T08:00:00Z"
                    },
                    {
                        id: "5",
                        name: "Mode",
                        color: "#8B5CF6",
                        createdAt: "2024-01-08T14:00:00Z"
                    },
                    {
                        id: "6",
                        name: "Sport",
                        color: "#06B6D4",
                        createdAt: "2024-01-03T16:00:00Z"
                    },
                    {
                        id: "7",
                        name: "Business",
                        color: "#059669",
                        createdAt: "2024-01-01T12:00:00Z"
                    },
                    {
                        id: "8",
                        name: "Art",
                        color: "#DC2626",
                        createdAt: "2024-01-06T13:00:00Z"
                    }
                ]}
                isLoading={tagsLoading}
                toolbarActionComponent={buttonComponent}
                filterColumn="name"
                placeholder="Filtrer par nom..."
            />
        </div>
    )
}
