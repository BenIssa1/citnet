'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { categoryEditFormData, categoryEditFormSchema, categoryFormData, categoryFormSchema } from "@/lib/validation";

type CategoryFormProps = {
    onSubmit: (data: categoryFormData | categoryEditFormData) => void;
    isLoading?: boolean;
    initialData?: categoryEditFormData;
    isEditing?: boolean;
    open?: boolean;
    setOpen?: (value: boolean) => void;
};

const CategoryModal: React.FC<CategoryFormProps> = ({
    onSubmit,
    isLoading = false,
    initialData,
    isEditing,
    open,
    setOpen,
}) => {

    // Schéma et type conditionnels
    const schema = isEditing ? categoryEditFormSchema : categoryFormSchema;
    const defaultValues = isEditing
        ? {
            name: "",
            slug: "",
            description: "",
            imageUrl: "",
            color: "#000000",
        }
        : {
            name: "",
            slug: "",
            description: "",
            imageUrl: "",
            color: "#000000",
        };

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<categoryFormData | categoryEditFormData>({
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
            ? (["name", "slug", "description", "imageUrl", "color"] as const)
            : (Object.keys(watchedValues) as (keyof typeof watchedValues)[]);

        return fieldsToCompare.some((key) => {
            const currentValue = watchedValues[key as keyof typeof watchedValues];
            const initialValue = initialData[key as keyof typeof initialData];
            return currentValue !== initialValue;
        });
    }, [watchedValues, initialData, isEditing]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setOpen?.(true)}>Ajouter une catégorie</Button>
            </DialogTrigger>

            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? "Modifier la catégorie" : "Ajouter une catégorie"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <div className="space-y-2">
                        <Label htmlFor="name">
                            Nom *
                        </Label>
                        <Input
                            id="name"
                            placeholder="Nom de la catégorie"
                            {...register("name")}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-600">
                                {errors.name.message as string}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="slug">
                            Slug *
                        </Label>
                        <Input
                            id="slug"
                            placeholder="slug-de-la-categorie"
                            {...register("slug")}
                        />
                        {errors.slug && (
                            <p className="text-sm text-red-600">
                                {errors.slug.message as string}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">
                            Description *
                        </Label>
                        <Textarea
                            id="description"
                            placeholder="Description de la catégorie"
                            rows={3}
                            {...register("description")}
                        />
                        {errors.description && (
                            <p className="text-sm text-red-600">
                                {errors.description.message as string}
                            </p>
                        )}
                    </div>

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
                        <Label htmlFor="color">
                            Couleur *
                        </Label>
                        <div className="flex items-center gap-2">
                            <Input
                                id="color"
                                type="color"
                                className="w-16 h-10 p-1"
                                {...register("color")}
                            />
                            <Input
                                placeholder="#000000"
                                {...register("color")}
                            />
                        </div>
                        {errors.color && (
                            <p className="text-sm text-red-600">
                                {errors.color.message as string}
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

export default CategoryModal
