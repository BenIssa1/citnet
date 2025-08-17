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
import { Category, CategoryEditData } from "@/types/category";
import { getAllCategories } from "@/services/category";

interface Props {
    buttonComponent?: React.ReactNode;
    onEditCategoryData: (data: CategoryEditData) => void;
    onIsEditing: (data: boolean) => void;
    onOpen: (value: boolean) => void;
    onSetConfirmDeleteCategoryOpen: (value: boolean) => void;
    onSetSelectedCategoryId: (value: string) => void;
}

export default function CategoryTable({
    buttonComponent,
    onEditCategoryData,
    onIsEditing,
    onOpen,
    onSetConfirmDeleteCategoryOpen,
    onSetSelectedCategoryId
}: Props) {
    const {
        data: categoriesData = { categories: [] },
        isFetching: categoriesLoading,
        isError: categoriesError,
        refetch: refetchCategories,
    } = useQuery<{ categories: Category[] }>({
        queryKey: ["categories"],
        queryFn: () => {
            return getAllCategories();
        },
        placeholderData: keepPreviousData,
    });

    const columns: ColumnDef<Category>[] = [
        {
            accessorKey: "name",
            header: "Nom"
        },
        {
            accessorKey: "slug",
            header: "Slug"
        },
        {
            accessorKey: "description",
            header: "Description",
            cell: ({ row }) => {
                const description = row.getValue("description") as string;
                return (
                    <div className="max-w-[200px] truncate" title={description}>
                        {description}
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
            accessorKey: "count",
            header: "Nombre d'articles"
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
                const category = row.original

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
                                onEditCategoryData({
                                    id: category.id!,
                                    name: category.name,
                                    slug: category.slug,
                                    description: category.description,
                                    imageUrl: category.imageUrl,
                                    color: category.color
                                });
                                onIsEditing(true);
                                onOpen(true);
                            }}>Modifier</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                                onSetSelectedCategoryId(category.id!);
                                onSetConfirmDeleteCategoryOpen(true);
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
                      slug: "technologie",
                      description: "Articles sur les dernières innovations technologiques, gadgets et développements dans le monde de la tech.",
                      imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400",
                      color: "#3B82F6",
                      count: 15,
                      createdAt: "2024-01-15T10:00:00Z",
                      updatedAt: "2024-01-20T14:30:00Z"
                    },
                    {
                      id: "2",
                      name: "Santé & Bien-être",
                      slug: "sante-bien-etre",
                      description: "Conseils et informations sur la santé physique et mentale, nutrition et mode de vie sain.",
                      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
                      color: "#10B981",
                      count: 12,
                      createdAt: "2024-01-10T09:00:00Z",
                      updatedAt: "2024-01-18T16:45:00Z"
                    },
                    {
                      id: "3",
                      name: "Voyage",
                      slug: "voyage",
                      description: "Destinations de voyage, conseils pratiques et expériences de voyage à travers le monde.",
                      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
                      color: "#F59E0B",
                      count: 8,
                      createdAt: "2024-01-05T11:00:00Z",
                      updatedAt: "2024-01-15T13:20:00Z"
                    },
                    {
                      id: "4",
                      name: "Cuisine",
                      slug: "cuisine",
                      description: "Recettes, techniques culinaires et découvertes gastronomiques du monde entier.",
                      imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
                      color: "#EF4444",
                      count: 20,
                      createdAt: "2024-01-12T08:00:00Z",
                      updatedAt: "2024-01-22T10:15:00Z"
                    },
                    {
                      id: "5",
                      name: "Mode & Style",
                      slug: "mode-style",
                      description: "Tendances de la mode, conseils de style et inspiration pour tous les looks.",
                      imageUrl: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400",
                      color: "#8B5CF6",
                      count: 18,
                      createdAt: "2024-01-08T14:00:00Z",
                      updatedAt: "2024-01-19T11:30:00Z"
                    },
                    {
                      id: "6",
                      name: "Sport",
                      slug: "sport",
                      description: "Actualités sportives, conseils d'entraînement et analyses des performances.",
                      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
                      color: "#06B6D4",
                      count: 14,
                      createdAt: "2024-01-03T16:00:00Z",
                      updatedAt: "2024-01-17T09:45:00Z"
                    },
                    {
                      id: "7",
                      name: "Business",
                      slug: "business",
                      description: "Actualités économiques, conseils entrepreneuriaux et analyses du monde des affaires.",
                      imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400",
                      color: "#059669",
                      count: 22,
                      createdAt: "2024-01-01T12:00:00Z",
                      updatedAt: "2024-01-21T15:20:00Z"
                    },
                    {
                      id: "8",
                      name: "Art & Culture",
                      slug: "art-culture",
                      description: "Expositions d'art, événements culturels et analyses des tendances artistiques.",
                      imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400",
                      color: "#DC2626",
                      count: 16,
                      createdAt: "2024-01-06T13:00:00Z",
                      updatedAt: "2024-01-16T12:10:00Z"
                    }
                  ]}
                isLoading={categoriesLoading}
                toolbarActionComponent={buttonComponent}
                filterColumn="name"
                placeholder="Filtrer par nom..."
            />
        </div>
    )
}
