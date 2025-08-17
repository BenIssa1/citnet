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
import { MoreHorizontal, Eye, Star, Calendar } from "lucide-react";
import { Article, ArticleEditData } from "@/types/article";
import { getAllArticles } from "@/services/article";
import { Badge } from "../ui/badge";

interface Props {
    buttonComponent?: React.ReactNode;
    onEditArticleData: (data: ArticleEditData) => void;
    onIsEditing: (data: boolean) => void;
    onOpen: (value: boolean) => void;
    onSetConfirmDeleteArticleOpen: (value: boolean) => void;
    onSetSelectedArticleId: (value: string) => void;
}

export default function ArticleTable({
    buttonComponent,
    onEditArticleData,
    onIsEditing,
    onOpen,
    onSetConfirmDeleteArticleOpen,
    onSetSelectedArticleId
}: Props) {
    const {
        data: articlesData = { articles: [] },
        isFetching: articlesLoading,
        isError: articlesError,
        refetch: refetchArticles,
    } = useQuery<{ articles: Article[] }>({
        queryKey: ["articles"],
        queryFn: () => {
            return getAllArticles();
        },
        placeholderData: keepPreviousData,
    });

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'published':
                return <Badge variant="default" className="bg-green-100 text-green-800">Publié</Badge>;
            case 'draft':
                return <Badge variant="secondary">Brouillon</Badge>;
            case 'archived':
                return <Badge variant="outline">Archivé</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const columns: ColumnDef<Article>[] = [
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
            accessorKey: "status",
            header: "Statut",
            cell: ({ row }) => {
                const status = row.getValue("status") as string;
                return getStatusBadge(status);
            }
        },
        {
            accessorKey: "featured",
            header: "Vedette",
            cell: ({ row }) => {
                const featured = row.getValue("featured") as boolean;
                return featured ? (
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                ) : (
                    <span className="text-gray-400">-</span>
                );
            }
        },
        {
            accessorKey: "views",
            header: "Vues",
            cell: ({ row }) => {
                const views = row.getValue("views") as number;
                return (
                    <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3 text-gray-500" />
                        <span className="text-sm">{views}</span>
                    </div>
                );
            }
        },
        {
            accessorKey: "timeToRead",
            header: "Temps de lecture",
            cell: ({ row }) => {
                const timeToRead = row.getValue("timeToRead") as number;
                return `${timeToRead} min`;
            }
        },
        {
            accessorKey: "publishedAt",
            header: "Publié le",
            cell: ({ row }) => {
                const publishedAt = row.getValue("publishedAt") as string;
                if (!publishedAt) return <span className="text-gray-400">-</span>;
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
            id: "actions",
            cell: ({ row }) => {
                const article = row.original

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
                                onEditArticleData({
                                    id: article.id!,
                                    title: article.title,
                                    slug: article.slug,
                                    excerpt: article.excerpt,
                                    content: article.content,
                                    imageUrl: article.imageUrl,
                                    timeToRead: article.timeToRead,
                                    status: article.status,
                                    featured: article.featured,
                                    categoryId: article.category.id,
                                    tagIds: article.tags.map(tag => tag.id)
                                });
                                onIsEditing(true);
                                onOpen(true);
                            }}>Modifier</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                                onSetSelectedArticleId(article.id!);
                                onSetConfirmDeleteArticleOpen(true);
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
                        title: "Les dernières innovations technologiques en 2024",
                        slug: "innovations-technologiques-2024",
                        excerpt: "Découvrez les avancées technologiques les plus prometteuses de cette année qui vont révolutionner notre quotidien.",
                        content: "Contenu complet de l'article sur les innovations technologiques...",
                        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400",
                        timeToRead: 8,
                        status: "published",
                        featured: true,
                        views: 1250,
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
                            { id: "1", name: "Innovation", color: "#3B82F6" },
                            { id: "2", name: "Tech", color: "#10B981" }
                        ]
                    },
                    {
                        id: "2",
                        title: "Guide complet de la nutrition équilibrée",
                        slug: "guide-nutrition-equilibree",
                        excerpt: "Apprenez les bases d'une alimentation saine et équilibrée pour maintenir votre santé et votre bien-être.",
                        content: "Contenu complet de l'article sur la nutrition...",
                        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
                        timeToRead: 12,
                        status: "published",
                        featured: false,
                        views: 890,
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
                            { id: "2", name: "Santé", color: "#10B981" },
                            { id: "4", name: "Nutrition", color: "#EF4444" }
                        ]
                    },
                    {
                        id: "3",
                        title: "Destinations de voyage incontournables en Europe",
                        slug: "destinations-voyage-europe",
                        excerpt: "Explorez les plus belles destinations européennes et planifiez votre prochain voyage de rêve.",
                        content: "Contenu complet de l'article sur les destinations européennes...",
                        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
                        timeToRead: 15,
                        status: "draft",
                        featured: false,
                        views: 0,
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
                            { id: "3", name: "Voyage", color: "#F59E0B" },
                            { id: "5", name: "Europe", color: "#8B5CF6" }
                        ]
                    },
                    {
                        id: "4",
                        title: "Recettes traditionnelles françaises",
                        slug: "recettes-traditionnelles-francaises",
                        excerpt: "Découvrez les secrets de la gastronomie française avec ces recettes authentiques transmises de génération en génération.",
                        content: "Contenu complet de l'article sur les recettes françaises...",
                        imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
                        timeToRead: 20,
                        status: "published",
                        featured: true,
                        views: 2100,
                        publishedAt: "2024-01-22T08:00:00Z",
                        createdAt: "2024-01-12T08:00:00Z",
                        updatedAt: "2024-01-22T08:00:00Z",
                        category: {
                            id: "4",
                            name: "Cuisine",
                            slug: "cuisine",
                            color: "#EF4444"
                        },
                        tags: [
                            { id: "4", name: "Cuisine", color: "#EF4444" },
                            { id: "6", name: "France", color: "#06B6D4" }
                        ]
                    },
                    {
                        id: "5",
                        title: "Tendances mode printemps-été 2024",
                        slug: "tendances-mode-printemps-ete-2024",
                        excerpt: "Les dernières tendances de la mode pour la saison printemps-été, des couleurs aux silhouettes en passant par les accessoires.",
                        content: "Contenu complet de l'article sur les tendances mode...",
                        imageUrl: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400",
                        timeToRead: 10,
                        status: "published",
                        featured: false,
                        views: 1560,
                        publishedAt: "2024-01-19T11:30:00Z",
                        createdAt: "2024-01-08T14:00:00Z",
                        updatedAt: "2024-01-19T11:30:00Z",
                        category: {
                            id: "5",
                            name: "Mode & Style",
                            slug: "mode-style",
                            color: "#8B5CF6"
                        },
                        tags: [
                            { id: "5", name: "Mode", color: "#8B5CF6" },
                            { id: "7", name: "Tendances", color: "#059669" }
                        ]
                    }
                ]}
                isLoading={articlesLoading}
                toolbarActionComponent={buttonComponent}
                filterColumn="title"
                placeholder="Filtrer par titre..."
            />
        </div>
    )
}
