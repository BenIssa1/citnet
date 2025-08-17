'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { articleEditFormData, articleEditFormSchema, articleFormData, articleFormSchema } from "@/lib/validation";
import { Category } from "@/types/category";
import { Tag } from "@/types/tag";

type ArticleFormProps = {
    onSubmit: (data: articleFormData | articleEditFormData) => void;
    isLoading?: boolean;
    initialData?: articleEditFormData;
    isEditing?: boolean;
    open?: boolean;
    setOpen?: (value: boolean) => void;
};

// Données de test pour les catégories et tags
const mockCategories: Category[] = [
    { id: "1", name: "Technologie", slug: "technologie", description: "", imageUrl: "", color: "#3B82F6", count: 0, createdAt: "", updatedAt: "" },
    { id: "2", name: "Santé & Bien-être", slug: "sante-bien-etre", description: "", imageUrl: "", color: "#10B981", count: 0, createdAt: "", updatedAt: "" },
    { id: "3", name: "Voyage", slug: "voyage", description: "", imageUrl: "", color: "#F59E0B", count: 0, createdAt: "", updatedAt: "" },
    { id: "4", name: "Cuisine", slug: "cuisine", description: "", imageUrl: "", color: "#EF4444", count: 0, createdAt: "", updatedAt: "" },
    { id: "5", name: "Mode & Style", slug: "mode-style", description: "", imageUrl: "", color: "#8B5CF6", count: 0, createdAt: "", updatedAt: "" }
];

const mockTags: Tag[] = [
    { id: "1", name: "Innovation", color: "#3B82F6", createdAt: "" },
    { id: "2", name: "Tech", color: "#10B981", createdAt: "" },
    { id: "3", name: "Santé", color: "#F59E0B", createdAt: "" },
    { id: "4", name: "Nutrition", color: "#EF4444", createdAt: "" },
    { id: "5", name: "Voyage", color: "#8B5CF6", createdAt: "" },
    { id: "6", name: "Europe", color: "#06B6D4", createdAt: "" },
    { id: "7", name: "Cuisine", color: "#059669", createdAt: "" },
    { id: "8", name: "France", color: "#DC2626", createdAt: "" }
];

const ArticleModal: React.FC<ArticleFormProps> = ({
    onSubmit,
    isLoading = false,
    initialData,
    isEditing,
    open,
    setOpen,
}) => {

    // Schéma et type conditionnels
    const schema = isEditing ? articleEditFormSchema : articleFormSchema;
    const defaultValues = isEditing
        ? {
            title: "",
            slug: "",
            excerpt: "",
            content: "",
            imageUrl: "",
            timeToRead: 5,
            status: "draft" as const,
            featured: false,
            categoryId: "",
            tagIds: [],
        }
        : {
            title: "",
            slug: "",
            excerpt: "",
            content: "",
            imageUrl: "",
            timeToRead: 5,
            status: "draft" as const,
            featured: false,
            categoryId: "",
            tagIds: [],
        };

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<articleFormData | articleEditFormData>({
        resolver: zodResolver(schema),
        defaultValues,
    });

    // Surveiller les valeurs du formulaire
    const watchedValues = watch();

    // Réinitialiser le formulaire avec les données initiales quand elles changent
    useEffect(() => {
        if (initialData) {
            if (isEditing) {
                const { ...editData } = initialData;
                reset(editData);
            } else {
                reset(initialData);
            }
        }
    }, [initialData, isEditing, reset]);

    // Vérifier si le formulaire a été modifié
    const isFormModified = useMemo(() => {
        if (!isEditing || !initialData) return true;

        const fieldsToCompare = isEditing
            ? (["title", "slug", "excerpt", "content", "imageUrl", "timeToRead", "status", "featured", "categoryId", "tagIds"] as const)
            : (Object.keys(watchedValues) as (keyof typeof watchedValues)[]);

        return fieldsToCompare.some((key) => {
            const currentValue = watchedValues[key as keyof typeof watchedValues];
            const initialValue = initialData[key as keyof typeof initialData];
            return currentValue !== initialValue;
        });
    }, [watchedValues, initialData, isEditing]);

    // Gérer la sélection des tags
    const handleTagToggle = (tagId: string) => {
        const currentTags = watchedValues.tagIds || [];
        const newTags = currentTags.includes(tagId)
            ? currentTags.filter(id => id !== tagId)
            : [...currentTags, tagId];
        setValue("tagIds", newTags);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setOpen?.(true)}>Ajouter un article</Button>
            </DialogTrigger>

            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? "Modifier l'article" : "Ajouter un article"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">
                                Titre *
                            </Label>
                            <Input
                                id="title"
                                placeholder="Titre de l'article"
                                {...register("title")}
                            />
                            {errors.title && (
                                <p className="text-sm text-red-600">
                                    {errors.title.message as string}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="slug">
                                Slug *
                            </Label>
                            <Input
                                id="slug"
                                placeholder="slug-de-l-article"
                                {...register("slug")}
                            />
                            {errors.slug && (
                                <p className="text-sm text-red-600">
                                    {errors.slug.message as string}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="excerpt">
                            Extrait *
                        </Label>
                        <Textarea
                            id="excerpt"
                            placeholder="Résumé court de l'article"
                            rows={3}
                            {...register("excerpt")}
                        />
                        {errors.excerpt && (
                            <p className="text-sm text-red-600">
                                {errors.excerpt.message as string}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="content">
                            Contenu *
                        </Label>
                        <Textarea
                            id="content"
                            placeholder="Contenu complet de l'article"
                            rows={8}
                            {...register("content")}
                        />
                        {errors.content && (
                            <p className="text-sm text-red-600">
                                {errors.content.message as string}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="imageUrl">
                                URL de l'image *
                            </Label>
                            <Input
                                id="imageUrl"
                                placeholder="https://example.com/image.jpg"
                                {...register("imageUrl")}
                            />
                            {errors.imageUrl && (
                                <p className="text-sm text-red-600">
                                    {errors.imageUrl.message as string}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="timeToRead">
                                Temps de lecture (minutes) *
                            </Label>
                            <Input
                                id="timeToRead"
                                type="number"
                                min="1"
                                {...register("timeToRead", { valueAsNumber: true })}
                            />
                            {errors.timeToRead && (
                                <p className="text-sm text-red-600">
                                    {errors.timeToRead.message as string}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="status">
                                Statut *
                            </Label>
                            <Select
                                value={watchedValues.status}
                                onValueChange={(value) => setValue("status", value as any)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner un statut" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="draft">Brouillon</SelectItem>
                                    <SelectItem value="published">Publié</SelectItem>
                                    <SelectItem value="archived">Archivé</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.status && (
                                <p className="text-sm text-red-600">
                                    {errors.status.message as string}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="categoryId">
                                Catégorie *
                            </Label>
                            <Select
                                value={watchedValues.categoryId}
                                onValueChange={(value) => setValue("categoryId", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner une catégorie" />
                                </SelectTrigger>
                                <SelectContent>
                                    {mockCategories.map((category) => (
                                        <SelectItem key={category.id} value={category.id}>
                                            <div className="flex items-center gap-2">
                                                <div 
                                                    className="w-3 h-3 rounded-full" 
                                                    style={{ backgroundColor: category.color }}
                                                />
                                                {category.name}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.categoryId && (
                                <p className="text-sm text-red-600">
                                    {errors.categoryId.message as string}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Tags *</Label>
                        <div className="grid grid-cols-4 gap-2">
                            {mockTags.map((tag) => (
                                <div key={tag.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`tag-${tag.id}`}
                                        checked={watchedValues.tagIds?.includes(tag.id) || false}
                                        onCheckedChange={() => handleTagToggle(tag.id)}
                                    />
                                    <Label
                                        htmlFor={`tag-${tag.id}`}
                                        className="text-sm flex items-center gap-1 cursor-pointer"
                                    >
                                        <div 
                                            className="w-3 h-3 rounded-full" 
                                            style={{ backgroundColor: tag.color }}
                                        />
                                        {tag.name}
                                    </Label>
                                </div>
                            ))}
                        </div>
                        {errors.tagIds && (
                            <p className="text-sm text-red-600">
                                {errors.tagIds.message as string}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="featured"
                            checked={watchedValues.featured}
                            onCheckedChange={(checked) => setValue("featured", checked as boolean)}
                        />
                        <Label htmlFor="featured" className="cursor-pointer">
                            Mettre en vedette
                        </Label>
                    </div>

                    <div className="pt-4">
                        <Button
                            type="submit"
                            disabled={isLoading || (isEditing && !isFormModified)}
                            className="w-full"
                        >
                            {isLoading ? "En cours..." : isEditing ? "Modifier" : "Ajouter"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default ArticleModal
