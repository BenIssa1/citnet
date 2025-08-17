'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { emissionEditFormData, emissionEditFormSchema, emissionFormData, emissionFormSchema } from "@/lib/validation";
import { Category } from "@/types/category";
import { Tag } from "@/types/tag";

type EmissionFormProps = {
    onSubmit: (data: emissionFormData | emissionEditFormData) => void;
    isLoading?: boolean;
    initialData?: emissionEditFormData;
    isEditing?: boolean;
    open?: boolean;
    setOpen?: (value: boolean) => void;
};

// Données de test pour les catégories et tags
const mockCategories: Category[] = [
    { id: "1", name: "Environnement", slug: "environnement", description: "", imageUrl: "", color: "#10B981", count: 0, createdAt: "", updatedAt: "" },
    { id: "2", name: "Politique", slug: "politique", description: "", imageUrl: "", color: "#3B82F6", count: 0, createdAt: "", updatedAt: "" },
    { id: "3", name: "Culture", slug: "culture", description: "", imageUrl: "", color: "#8B5CF6", count: 0, createdAt: "", updatedAt: "" },
    { id: "4", name: "Santé", slug: "sante", description: "", imageUrl: "", color: "#EF4444", count: 0, createdAt: "", updatedAt: "" },
    { id: "5", name: "Technologie", slug: "technologie", description: "", imageUrl: "", color: "#F59E0B", count: 0, createdAt: "", updatedAt: "" }
];

const mockTags: Tag[] = [
    { id: "1", name: "Climat", color: "#10B981", createdAt: "" },
    { id: "2", name: "Écologie", color: "#059669", createdAt: "" },
    { id: "3", name: "Europe", color: "#3B82F6", createdAt: "" },
    { id: "4", name: "Débat", color: "#1D4ED8", createdAt: "" },
    { id: "5", name: "Cinéma", color: "#8B5CF6", createdAt: "" },
    { id: "6", name: "Art", color: "#7C3AED", createdAt: "" },
    { id: "7", name: "Médecine", color: "#EF4444", createdAt: "" },
    { id: "8", name: "Innovation", color: "#DC2626", createdAt: "" },
    { id: "9", name: "IA", color: "#F59E0B", createdAt: "" },
    { id: "10", name: "Tech", color: "#D97706", createdAt: "" }
];

const EmissionModal: React.FC<EmissionFormProps> = ({
    onSubmit,
    isLoading = false,
    initialData,
    isEditing,
    open,
    setOpen,
}) => {

    // Schéma et type conditionnels
    const schema = isEditing ? emissionEditFormSchema : emissionFormSchema;
    const defaultValues = isEditing
        ? {
            title: "",
            duration: 1800, // 30 minutes par défaut
            thumbnail: "",
            videoUrl: "",
            order: 1,
            categoryId: "",
            tagIds: [],
        }
        : {
            title: "",
            duration: 1800, // 30 minutes par défaut
            thumbnail: "",
            videoUrl: "",
            order: 1,
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
    } = useForm<emissionFormData | emissionEditFormData>({
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
            ? (["title", "duration", "thumbnail", "videoUrl", "order", "categoryId", "tagIds"] as const)
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

    // Formater la durée en format lisible
    const formatDuration = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        }
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setOpen?.(true)}>Ajouter une émission</Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? "Modifier l'émission" : "Ajouter une émission"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">
                            Titre *
                        </Label>
                        <Input
                            id="title"
                            placeholder="Titre de l'émission"
                            {...register("title")}
                        />
                        {errors.title && (
                            <p className="text-sm text-red-600">
                                {errors.title.message as string}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="duration">
                                Durée (secondes) *
                            </Label>
                            <Input
                                id="duration"
                                type="number"
                                min="1"
                                placeholder="1800"
                                {...register("duration", { valueAsNumber: true })}
                            />
                            {watchedValues.duration && (
                                <p className="text-sm text-gray-500">
                                    Durée: {formatDuration(watchedValues.duration)}
                                </p>
                            )}
                            {errors.duration && (
                                <p className="text-sm text-red-600">
                                    {errors.duration.message as string}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="order">
                                Ordre *
                            </Label>
                            <Input
                                id="order"
                                type="number"
                                min="0"
                                placeholder="1"
                                {...register("order", { valueAsNumber: true })}
                            />
                            {errors.order && (
                                <p className="text-sm text-red-600">
                                    {errors.order.message as string}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="videoUrl">
                            URL de la vidéo *
                        </Label>
                        <Input
                            id="videoUrl"
                            placeholder="https://example.com/video.mp4"
                            {...register("videoUrl")}
                        />
                        {errors.videoUrl && (
                            <p className="text-sm text-red-600">
                                {errors.videoUrl.message as string}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="thumbnail">
                            URL de la miniature *
                        </Label>
                        <Input
                            id="thumbnail"
                            placeholder="https://example.com/thumbnail.jpg"
                            {...register("thumbnail")}
                        />
                        {errors.thumbnail && (
                            <p className="text-sm text-red-600">
                                {errors.thumbnail.message as string}
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

                    <div className="space-y-2">
                        <Label>Tags *</Label>
                        <div className="grid grid-cols-3 gap-2">
                            {mockTags.map((tag) => (
                                <div key={tag.id} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id={`tag-${tag.id}`}
                                        checked={watchedValues.tagIds?.includes(tag.id) || false}
                                        onChange={() => handleTagToggle(tag.id)}
                                        className="rounded border-gray-300"
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

export default EmissionModal
