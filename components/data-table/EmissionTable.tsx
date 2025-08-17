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
import { MoreHorizontal, Play, Clock, Hash, Image } from "lucide-react";
import { Emission, EmissionEditData } from "@/types/emission";
import { getAllEmissions } from "@/services/emission";
import { Badge } from "../ui/badge";

interface Props {
    buttonComponent?: React.ReactNode;
    onEditEmissionData: (data: EmissionEditData) => void;
    onIsEditing: (data: boolean) => void;
    onOpen: (value: boolean) => void;
    onSetConfirmDeleteEmissionOpen: (value: boolean) => void;
    onSetSelectedEmissionId: (value: string) => void;
}

export default function EmissionTable({
    buttonComponent,
    onEditEmissionData,
    onIsEditing,
    onOpen,
    onSetConfirmDeleteEmissionOpen,
    onSetSelectedEmissionId
}: Props) {
    const {
        data: emissionsData = { emissions: [] },
        isFetching: emissionsLoading,
        isError: emissionsError,
        refetch: refetchEmissions,
    } = useQuery<{ emissions: Emission[] }>({
        queryKey: ["emissions"],
        queryFn: () => {
            return getAllEmissions();
        },
        placeholderData: keepPreviousData,
    });

    const formatDuration = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        }
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const columns: ColumnDef<Emission>[] = [
        {
            accessorKey: "order",
            header: "Ordre",
            cell: ({ row }) => {
                const order = row.getValue("order") as number;
                return (
                    <div className="flex items-center gap-1">
                        <Hash className="h-3 w-3 text-gray-500" />
                        <Badge variant="outline" className="font-mono">
                            {order}
                        </Badge>
                    </div>
                );
            }
        },
        {
            accessorKey: "title",
            header: "Titre",
            cell: ({ row }) => {
                const title = row.getValue("title") as string;
                return (
                    <div className="max-w-[200px] truncate font-medium" title={title}>
                        {title}
                    </div>
                );
            }
        },
        {
            accessorKey: "category",
            header: "Catégorie",
            cell: ({ row }) => {
                const category = row.getValue("category") as any;
                return (
                    <div className="flex items-center gap-2">
                        <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: category.color }}
                        />
                        <span className="text-sm">{category.name}</span>
                    </div>
                );
            }
        },
        {
            accessorKey: "duration",
            header: "Durée",
            cell: ({ row }) => {
                const duration = row.getValue("duration") as number;
                return (
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock className="h-3 w-3" />
                        {formatDuration(duration)}
                    </div>
                );
            }
        },
        {
            accessorKey: "thumbnail",
            header: "Miniature",
            cell: ({ row }) => {
                const thumbnail = row.getValue("thumbnail") as string;
                return (
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Image className="h-3 w-3" />
                        <span className="max-w-[100px] truncate" title={thumbnail}>
                            {thumbnail.split('/').pop() || thumbnail}
                        </span>
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
                const emission = row.original

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
                                onEditEmissionData({
                                    id: emission.id!,
                                    title: emission.title,
                                    duration: emission.duration,
                                    thumbnail: emission.thumbnail,
                                    videoUrl: emission.videoUrl,
                                    order: emission.order,
                                    categoryId: emission.category.id,
                                    tagIds: emission.tags.map(tag => tag.id)
                                });
                                onIsEditing(true);
                                onOpen(true);
                            }}>Modifier</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                                onSetSelectedEmissionId(emission.id!);
                                onSetConfirmDeleteEmissionOpen(true);
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
                        title: "Émission spéciale : Les enjeux climatiques",
                        duration: 3600, // 1 heure
                        thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400",
                        videoUrl: "https://example.com/video1.mp4",
                        order: 1,
                        createdAt: "2024-01-20T10:00:00Z",
                        updatedAt: "2024-01-20T10:00:00Z",
                        category: {
                            id: "1",
                            name: "Environnement",
                            slug: "environnement",
                            color: "#10B981"
                        },
                        tags: [
                            { id: "1", name: "Climat", color: "#10B981" },
                            { id: "2", name: "Écologie", color: "#059669" }
                        ]
                    },
                    {
                        id: "2",
                        title: "Débat politique : L'avenir de l'Europe",
                        duration: 2700, // 45 minutes
                        thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
                        videoUrl: "https://example.com/video2.mp4",
                        order: 2,
                        createdAt: "2024-01-18T14:30:00Z",
                        updatedAt: "2024-01-18T14:30:00Z",
                        category: {
                            id: "2",
                            name: "Politique",
                            slug: "politique",
                            color: "#3B82F6"
                        },
                        tags: [
                            { id: "3", name: "Europe", color: "#3B82F6" },
                            { id: "4", name: "Débat", color: "#1D4ED8" }
                        ]
                    },
                    {
                        id: "3",
                        title: "Culture : Les nouveaux talents du cinéma",
                        duration: 1800, // 30 minutes
                        thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
                        videoUrl: "https://example.com/video3.mp4",
                        order: 3,
                        createdAt: "2024-01-15T11:00:00Z",
                        updatedAt: "2024-01-15T11:00:00Z",
                        category: {
                            id: "3",
                            name: "Culture",
                            slug: "culture",
                            color: "#8B5CF6"
                        },
                        tags: [
                            { id: "5", name: "Cinéma", color: "#8B5CF6" },
                            { id: "6", name: "Art", color: "#7C3AED" }
                        ]
                    },
                    {
                        id: "4",
                        title: "Santé : Les avancées de la médecine moderne",
                        duration: 2400, // 40 minutes
                        thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
                        videoUrl: "https://example.com/video4.mp4",
                        order: 4,
                        createdAt: "2024-01-12T08:00:00Z",
                        updatedAt: "2024-01-12T08:00:00Z",
                        category: {
                            id: "4",
                            name: "Santé",
                            slug: "sante",
                            color: "#EF4444"
                        },
                        tags: [
                            { id: "7", name: "Médecine", color: "#EF4444" },
                            { id: "8", name: "Innovation", color: "#DC2626" }
                        ]
                    },
                    {
                        id: "5",
                        title: "Technologie : L'intelligence artificielle au quotidien",
                        duration: 3000, // 50 minutes
                        thumbnail: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400",
                        videoUrl: "https://example.com/video5.mp4",
                        order: 5,
                        createdAt: "2024-01-08T14:00:00Z",
                        updatedAt: "2024-01-08T14:00:00Z",
                        category: {
                            id: "5",
                            name: "Technologie",
                            slug: "technologie",
                            color: "#F59E0B"
                        },
                        tags: [
                            { id: "9", name: "IA", color: "#F59E0B" },
                            { id: "10", name: "Innovation", color: "#D97706" }
                        ]
                    }
                ]}
                isLoading={emissionsLoading}
                toolbarActionComponent={buttonComponent}
                filterColumn="title"
                placeholder="Filtrer par titre..."
            />
        </div>
    )
}
