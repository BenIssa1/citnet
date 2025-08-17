import { z } from "zod";

/* User */

export const loginSchema = z.object({
  email: z.string().min(1, { message: "L'email est requis" }),
  password: z.string().min(1, { message: "Le mot de passe est requis" }),
});

export const userFormSchema = z.object({
  email: z.string().min(1, { message: "L'email est requis" }),
  lastName: z.string().min(1, { message: "Le nom est requis" }),
  firstName: z.string().min(1, { message: "Le prénoms est requis" }),
});

export const userEditFormSchema = z.object({
  email: z.string().min(1, { message: "L'email est requis" }),
  lastName: z.string().min(1, { message: "Le nom est requis" }),
  firstName: z.string().min(1, { message: "Le prénoms est requis" }),
});

export type userFormData = z.infer<typeof userFormSchema>;
export type userEditFormData = z.infer<typeof userEditFormSchema>;

export const emailSchema = z.object({
  email: z.string().email("Adresse email invalide"),
});

export const otpSchema = z.object({
  code: z.string().length(4, "Le code doit contenir 4 chiffres"),
});

export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(4, "Le mot de passe doit contenir au moins 4 caractères"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

/* Category */

export const categoryFormSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis" }),
  slug: z.string().min(1, { message: "Le slug est requis" }),
  description: z.string().min(1, { message: "La description est requise" }),
  imageUrl: z.string().min(1, { message: "L'URL de l'image est requise" }),
  color: z.string().min(1, { message: "La couleur est requise" }),
});

export const categoryEditFormSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis" }),
  slug: z.string().min(1, { message: "Le slug est requis" }),
  description: z.string().min(1, { message: "La description est requise" }),
  imageUrl: z.string().min(1, { message: "L'URL de l'image est requise" }),
  color: z.string().min(1, { message: "La couleur est requise" }),
});

export type categoryFormData = z.infer<typeof categoryFormSchema>;
export type categoryEditFormData = z.infer<typeof categoryEditFormSchema>;

/* Tag */

export const tagFormSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis" }),
  color: z.string().min(1, { message: "La couleur est requise" }),
});

export const tagEditFormSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis" }),
  color: z.string().min(1, { message: "La couleur est requise" }),
});

export type tagFormData = z.infer<typeof tagFormSchema>;
export type tagEditFormData = z.infer<typeof tagEditFormSchema>;

/* Article */

export const articleFormSchema = z.object({
  title: z.string().min(1, { message: "Le titre est requis" }),
  slug: z.string().min(1, { message: "Le slug est requis" }),
  excerpt: z.string().min(1, { message: "L'extrait est requis" }),
  content: z.string().min(1, { message: "Le contenu est requis" }),
  imageUrl: z.string().min(1, { message: "L'URL de l'image est requise" }),
  timeToRead: z.number().min(1, { message: "Le temps de lecture doit être supérieur à 0" }),
  status: z.enum(['draft', 'published', 'archived'], { message: "Le statut est requis" }),
  featured: z.boolean(),
  categoryId: z.string().min(1, { message: "La catégorie est requise" }),
  tagIds: z.array(z.string()).min(1, { message: "Au moins un tag est requis" }),
});

export const articleEditFormSchema = z.object({
  title: z.string().min(1, { message: "Le titre est requis" }),
  slug: z.string().min(1, { message: "Le slug est requis" }),
  excerpt: z.string().min(1, { message: "L'extrait est requis" }),
  content: z.string().min(1, { message: "Le contenu est requis" }),
  imageUrl: z.string().min(1, { message: "L'URL de l'image est requise" }),
  timeToRead: z.number().min(1, { message: "Le temps de lecture doit être supérieur à 0" }),
  status: z.enum(['draft', 'published', 'archived'], { message: "Le statut est requis" }),
  featured: z.boolean(),
  categoryId: z.string().min(1, { message: "La catégorie est requise" }),
  tagIds: z.array(z.string()).min(1, { message: "Au moins un tag est requis" }),
});

export type articleFormData = z.infer<typeof articleFormSchema>;
export type articleEditFormData = z.infer<typeof articleEditFormSchema>;

/* Podcast */

export const podcastFormSchema = z.object({
  title: z.string().min(1, { message: "Le titre est requis" }),
  duration: z.number().min(1, { message: "La durée doit être supérieure à 0" }),
  videoUrl: z.string().min(1, { message: "L'URL de la vidéo est requise" }),
  imageUrl: z.string().min(1, { message: "L'URL de l'image est requise" }),
  color: z.string().min(1, { message: "La couleur est requise" }),
  categoryId: z.string().min(1, { message: "La catégorie est requise" }),
  tagIds: z.array(z.string()).min(1, { message: "Au moins un tag est requis" }),
});

export const podcastEditFormSchema = z.object({
  title: z.string().min(1, { message: "Le titre est requis" }),
  duration: z.number().min(1, { message: "La durée doit être supérieure à 0" }),
  videoUrl: z.string().min(1, { message: "L'URL de la vidéo est requise" }),
  imageUrl: z.string().min(1, { message: "L'URL de l'image est requise" }),
  color: z.string().min(1, { message: "La couleur est requise" }),
  categoryId: z.string().min(1, { message: "La catégorie est requise" }),
  tagIds: z.array(z.string()).min(1, { message: "Au moins un tag est requis" }),
});

export type podcastFormData = z.infer<typeof podcastFormSchema>;
export type podcastEditFormData = z.infer<typeof podcastEditFormSchema>;

/* Emission */

export const emissionFormSchema = z.object({
  title: z.string().min(1, { message: "Le titre est requis" }),
  duration: z.number().min(1, { message: "La durée doit être supérieure à 0" }),
  thumbnail: z.string().min(1, { message: "L'URL de la miniature est requise" }),
  videoUrl: z.string().min(1, { message: "L'URL de la vidéo est requise" }),
  order: z.number().min(0, { message: "L'ordre doit être supérieur ou égal à 0" }),
  categoryId: z.string().min(1, { message: "La catégorie est requise" }),
  tagIds: z.array(z.string()).min(1, { message: "Au moins un tag est requis" }),
});

export const emissionEditFormSchema = z.object({
  title: z.string().min(1, { message: "Le titre est requis" }),
  duration: z.number().min(1, { message: "La durée doit être supérieure à 0" }),
  thumbnail: z.string().min(1, { message: "L'URL de la miniature est requise" }),
  videoUrl: z.string().min(1, { message: "L'URL de la vidéo est requise" }),
  order: z.number().min(0, { message: "L'ordre doit être supérieur ou égal à 0" }),
  categoryId: z.string().min(1, { message: "La catégorie est requise" }),
  tagIds: z.array(z.string()).min(1, { message: "Au moins un tag est requis" }),
});

export type emissionFormData = z.infer<typeof emissionFormSchema>;
export type emissionEditFormData = z.infer<typeof emissionEditFormSchema>;