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
import { MoreHorizontal, Play, Calendar, Clock } from "lucide-react";
import { Podcast, PodcastEditData } from "@/types/podcast";
import { getAllPodcasts } from "@/services/podcast";
import { Badge } from "../ui/badge";

interface Props {
    buttonComponent?: React.ReactNode;
    onEditPodcastData: (data: PodcastEditData) => void;
    onIsEditing: (data: boolean) => void;
    onOpen: (value: boolean) => void;
    onSetConfirmDeletePodcastOpen: (value: boolean) => void;
    onSetSelectedPodcastId: (value: string) => void;
}

export default function PodcastTable({
    buttonComponent,
    onEditPodcastData,
    onIsEditing,
    onOpen,
    onSetConfirmDeletePodcastOpen,
    onSetSelectedPodcastId
}: Props) {
    const {
        data: podcastsData = { podcasts: [] },
        isFetching: podcastsLoading,
        isError: podcastsError,
        refetch: refetchPodcasts,
    } = useQuery<{ podcasts: Podcast[] }>({
        queryKey: ["podcasts"],
        queryFn: () => {
            return getAllPodcasts();
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

    const columns: ColumnDef<Podcast>[] = [
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
            accessorKey: "publishedAt",
            header: "Publié le",
            cell: ({ row }) => {
                const publishedAt = row.getValue("publishedAt") as string;
                if (!publishedAt) return <span className="text-gray-400">Non publié</span>;
                const date = new Date(publishedAt);
                return (
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar className="h-3 w-3" />
                        {date.toLocaleDateString("fr-FR")}
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
                const podcast = row.original

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
                                onEditPodcastData({
                                    id: podcast.id!,
                                    title: podcast.title,
                                    duration: podcast.duration,
                                    videoUrl: podcast.videoUrl,
                                    imageUrl: podcast.imageUrl,
                                    color: podcast.color,
                                    categoryId: podcast.category.id,
                                    tagIds: podcast.tags.map(tag => tag.id)
                                });
                                onIsEditing(true);
                                onOpen(true);
                            }}>Modifier</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                                onSetSelectedPodcastId(podcast.id!);
                                onSetConfirmDeletePodcastOpen(true);
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
                        title: "Les secrets de la productivité au travail",
                        duration: 1800, // 30 minutes
                        videoUrl: "https://example.com/video1.mp4",
                        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400",
                        color: "#3B82F6",
                        publishedAt: "2024-01-20T10:00:00Z",
                        createdAt: "2024-01-15T10:00:00Z",
                        updatedAt: "2024-01-20T10:00:00Z",
                        category: {
                            id: "1",
                            name: "Technologie",
                            slug: "technologie",
                            color: "#3B82F6"
                        },
                        tags: [
                            { id: "1", name: "Productivité", color: "#3B82F6" },
                            { id: "2", name: "Travail", color: "#10B981" }
                        ]
                    },
                    {
                        id: "2",
                        title: "Guide complet de la méditation quotidienne",
                        duration: 1200, // 20 minutes
                        videoUrl: "https://example.com/video2.mp4",
                        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
                        color: "#10B981",
                        publishedAt: "2024-01-18T14:30:00Z",
                        createdAt: "2024-01-10T09:00:00Z",
                        updatedAt: "2024-01-18T14:30:00Z",
                        category: {
                            id: "2",
                            name: "Santé & Bien-être",
                            slug: "sante-bien-etre",
                            color: "#10B981"
                        },
                        tags: [
                            { id: "2", name: "Méditation", color: "#10B981" },
                            { id: "3", name: "Bien-être", color: "#F59E0B" }
                        ]
                    },
                    {
                        id: "3",
                        title: "Découverte des cuisines du monde",
                        duration: 2700, // 45 minutes
                        videoUrl: "https://example.com/video3.mp4",
                        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
                        color: "#F59E0B",
                        publishedAt: null,
                        createdAt: "2024-01-05T11:00:00Z",
                        updatedAt: "2024-01-15T13:20:00Z",
                        category: {
                            id: "3",
                            name: "Voyage",
                            slug: "voyage",
                            color: "#F59E0B"
                        },
                        tags: [
                            { id: "4", name: "Cuisine", color: "#EF4444" },
                            { id: "5", name: "Culture", color: "#8B5CF6" }
                        ]
                    },
                    {
                        id: "4",
                        title: "Les tendances de la mode 2024",
                        duration: 1500, // 25 minutes
                        videoUrl: "https://example.com/video4.mp4",
                        imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
                        color: "#EF4444",
                        publishedAt: "2024-01-22T08:00:00Z",
                        createdAt: "2024-01-12T08:00:00Z",
                        updatedAt: "2024-01-22T08:00:00Z",
                        category: {
                            id: "4",
                            name: "Mode & Style",
                            slug: "mode-style",
                            color: "#EF4444"
                        },
                        tags: [
                            { id: "5", name: "Mode", color: "#8B5CF6" },
                            { id: "6", name: "Tendances", color: "#06B6D4" }
                        ]
                    },
                    {
                        id: "5",
                        title: "L'histoire de l'art moderne",
                        duration: 3600, // 1 heure
                        videoUrl: "https://example.com/video5.mp4",
                        imageUrl: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400",
                        color: "#8B5CF6",
                        publishedAt: "2024-01-19T11:30:00Z",
                        createdAt: "2024-01-08T14:00:00Z",
                        updatedAt: "2024-01-19T11:30:00Z",
                        category: {
                            id: "5",
                            name: "Art & Culture",
                            slug: "art-culture",
                            color: "#8B5CF6"
                        },
                        tags: [
                            { id: "7", name: "Art", color: "#059669" },
                            { id: "8", name: "Histoire", color: "#DC2626" }
                        ]
                    }
                ]}
                isLoading={podcastsLoading}
                toolbarActionComponent={buttonComponent}
                filterColumn="title"
                placeholder="Filtrer par titre..."
            />
        </div>
    )
}
