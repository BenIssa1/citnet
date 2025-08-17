'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react"
import { Label } from "@/components/ui/label"
import { userEditFormData, userEditFormSchema, userFormData, userFormSchema } from "@/lib/validation";

type userFormProps = {
    onSubmit: (data: userFormData | userEditFormData) => void;
    isLoading?: boolean;
    initialData?: userEditFormData;
    isEditing?: boolean;
    open?: boolean;
    setOpen?: (value: boolean) => void;
};

const UserModal: React.FC<userFormProps> = ({
    onSubmit,
    isLoading = false,
    initialData,
    isEditing,
    open,
    setOpen,
}) => {

    // Schéma et type conditionnels
    const schema = isEditing ? userEditFormSchema : userFormSchema;
    const defaultValues = isEditing
        ? {
            email: "",
            lastName: "",
            firstName: "",
        }
        : {
            email: "",
            lastName: "",
            firstName: "",
        };


    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<userFormData | userEditFormData>({
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
            ? (["email", "lastName", "firstName"] as const)
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
                <Button onClick={() => setOpen?.(true)}>Ajouter un user</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Ajouter un user</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="grid grid-cols-4 items-center gap-4 mb-3">
                        <Label htmlFor="lastName" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            className="col-span-3"
                            {...register("email")}
                        />
                    </div>

                    {errors.email && (
                        <p
                            className="my-1 text-sm text-red-600"
                        >
                            {errors.email.message as string}
                        </p>)}

                    <div className="grid grid-cols-4 items-center gap-4 mb-3">
                        <Label htmlFor="lastName" className="text-right">
                            Nom
                        </Label>
                        <Input
                            id="lastName"
                            className="col-span-3"
                            {...register("lastName")}
                        />
                    </div>

                    {errors.firstName && (
                        <p
                            className="my-1 text-sm text-red-600"
                        >
                            {errors.firstName.message as string}
                        </p>)}

                    <div className="grid grid-cols-4 items-center gap-4 mb-3">
                        <Label htmlFor="firstName" className="text-right">
                            Prenoms
                        </Label>
                        <Input
                            id="firstName"
                            className="col-span-3"
                            {...register("firstName")}
                        />
                    </div>

                    {errors.firstName && (
                        <p
                            className="my-1 text-sm text-red-600"
                        >
                            {errors.firstName.message as string}
                        </p>)}

                    <div className="mt-6">
                        <Button
                            type="submit"
                            disabled={isLoading || (isEditing && !isFormModified)}
                        >
                            {isLoading ? "En cours..." : isEditing ? "Modifier" : "Ajouter"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UserModal