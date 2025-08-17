'use client'

import { categoryFormData } from "@/lib/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import CategoryTable from "@/components/data-table/CategoryTable";
import CategoryModal from "@/components/forms/CategoryModal";
import { editCategory, createCategory, deleteCategory } from "@/services/category";
import { CreateCategoryData, CategoryEditData } from "@/types/category";

export default function CategoryPage() {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editCategoryData, setEditCategoryData] = useState<CategoryEditData | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [confirmDeleteCategoryOpen, setConfirmDeleteCategoryOpen] = useState(false);

  const queryClient = useQueryClient();

  const createCategoryMutation = useMutation({
    mutationFn: async ({ name, slug, description, imageUrl, color }: CreateCategoryData) =>
      await createCategory(name, slug, description, imageUrl, color),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setOpen(false);
      toast.success('Catégorie créée avec succès', { duration: 1000 });
    },
    onError: (error: any) => {
      if (error?.response?.data) {
        toast.error(error?.response?.data?.message || 'Échec de création');
      } else {
        toast.error('Erreur lors de la création');
      }
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, ...rest }: CategoryEditData) => editCategory(id, rest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setOpen(false);
      toast.success('Catégorie modifiée avec succès', { duration: 1000 });
    },
    onError: (error: any) => {
      if (error?.response?.data) {
        toast.error(error?.response?.data?.message || 'Échec de modification');
      } else {
        toast.error('Erreur lors de la modification');
      }
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setConfirmDeleteCategoryOpen(false);
      toast.success('Catégorie supprimée avec succès', { duration: 1000 });
    },
    onError: (error: any) => {
      toast.error('Erreur lors de la suppression');
    },
  });

  const handleCategorySubmit = (data: categoryFormData) => {
    const apiData = {
      name: data.name,
      slug: data.slug,
      description: data.description,
      imageUrl: data.imageUrl,
      color: data.color,
    };

    if (editCategoryData) {
      const editData: CategoryEditData = {
        id: editCategoryData.id,
        ...apiData,
      };

      updateCategoryMutation.mutate(editData);
    } else {
      const createData: CreateCategoryData = {
        ...apiData,
      };

      createCategoryMutation.mutate(createData);
    }
  };

  const handleDeleteCategory = () => {
    if (selectedCategoryId) {
      deleteCategoryMutation.mutate(selectedCategoryId);
    }
  };

  return (
    <div className="p-4">
      <h3 className='text-xl font-bold mb-3'>Gestion des catégories</h3>

      <CategoryTable
        onEditCategoryData={setEditCategoryData}
        onIsEditing={setIsEditing}
        onOpen={setOpen}
        onSetConfirmDeleteCategoryOpen={setConfirmDeleteCategoryOpen}
        onSetSelectedCategoryId={setSelectedCategoryId}
        buttonComponent={
          <CategoryModal
            initialData={editCategoryData ?? undefined}
            isEditing={isEditing}
            onSubmit={handleCategorySubmit}
            isLoading={createCategoryMutation.isPending || updateCategoryMutation.isPending}
            open={open}
            setOpen={setOpen}
          />
        }
      />
    </div>
  )
}
