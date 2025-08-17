import axiosAuth from "@/lib/axios";
import { categoryEditFormData } from "@/lib/validation";
import { Category, CategoryListResponse } from "@/types/category";

// Récupérer toutes les catégories
export const getAllCategories = async (): Promise<{
  categories: Category[];
}> => {
  const response = await axiosAuth.get(`/categories`);
  const data: CategoryListResponse = response;

  return {
    categories: data.data.categories,
  };
};

// Créer une nouvelle catégorie
export const createCategory = async (
  name: string,
  slug: string,
  description: string,
  imageUrl: string,
  color: string
): Promise<Category> => {
  const response = await axiosAuth.post("/categories", {
    name,
    slug,
    description,
    imageUrl,
    color,
  });
  return response.data;
};

// Modifier une catégorie
export const editCategory = async (
  id: string,
  data: Omit<categoryEditFormData, "id">
): Promise<Category> => {
  const response = await axiosAuth.put(`/categories/${id}`, data);
  return response.data;
};

// Supprimer une catégorie
export const deleteCategory = async (id: string): Promise<void> => {
  await axiosAuth.delete(`/categories/${id}`);
};
