'use client'

import { articleFormData } from "@/lib/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import ArticleTable from "@/components/data-table/ArticleTable";
import ArticleModal from "@/components/forms/ArticleModal";
import { editArticle, createArticle, deleteArticle } from "@/services/article";
import { CreateArticleData, ArticleEditData } from "@/types/article";

export default function ArticlePage() {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editArticleData, setEditArticleData] = useState<ArticleEditData | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [confirmDeleteArticleOpen, setConfirmDeleteArticleOpen] = useState(false);

  const queryClient = useQueryClient();

  const createArticleMutation = useMutation({
    mutationFn: async ({ 
      title, 
      slug, 
      excerpt, 
      content, 
      imageUrl, 
      timeToRead, 
      status, 
      featured, 
      categoryId, 
      tagIds 
    }: CreateArticleData) =>
      await createArticle(
        title, 
        slug, 
        excerpt, 
        content, 
        imageUrl, 
        timeToRead, 
        status, 
        featured, 
        categoryId, 
        tagIds
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      setOpen(false);
      toast.success('Article créé avec succès', { duration: 1000 });
    },
    onError: (error: any) => {
      if (error?.response?.data) {
        toast.error(error?.response?.data?.message || 'Échec de création');
      } else {
        toast.error('Erreur lors de la création');
      }
    },
  });

  const updateArticleMutation = useMutation({
    mutationFn: ({ id, ...rest }: ArticleEditData) => editArticle(id, rest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      setOpen(false);
      toast.success('Article modifié avec succès', { duration: 1000 });
    },
    onError: (error: any) => {
      if (error?.response?.data) {
        toast.error(error?.response?.data?.message || 'Échec de modification');
      } else {
        toast.error('Erreur lors de la modification');
      }
    },
  });

  const deleteArticleMutation = useMutation({
    mutationFn: (id: string) => deleteArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      setConfirmDeleteArticleOpen(false);
      toast.success('Article supprimé avec succès', { duration: 1000 });
    },
    onError: (error: any) => {
      toast.error('Erreur lors de la suppression');
    },
  });

  const handleArticleSubmit = (data: articleFormData) => {
    const apiData = {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      imageUrl: data.imageUrl,
      timeToRead: data.timeToRead,
      status: data.status,
      featured: data.featured,
      categoryId: data.categoryId,
      tagIds: data.tagIds,
    };

    if (editArticleData) {
      const editData: ArticleEditData = {
        id: editArticleData.id,
        ...apiData,
      };

      updateArticleMutation.mutate(editData);
    } else {
      const createData: CreateArticleData = {
        ...apiData,
      };

      createArticleMutation.mutate(createData);
    }
  };

  const handleDeleteArticle = () => {
    if (selectedArticleId) {
      deleteArticleMutation.mutate(selectedArticleId);
    }
  };

  return (
    <div className="p-4">
      <h3 className='text-xl font-bold mb-3'>Gestion des articles</h3>

      <ArticleTable
        onEditArticleData={setEditArticleData}
        onIsEditing={setIsEditing}
        onOpen={setOpen}
        onSetConfirmDeleteArticleOpen={setConfirmDeleteArticleOpen}
        onSetSelectedArticleId={setSelectedArticleId}
        buttonComponent={
          <ArticleModal
            initialData={editArticleData ?? undefined}
            isEditing={isEditing}
            onSubmit={handleArticleSubmit}
            isLoading={createArticleMutation.isPending || updateArticleMutation.isPending}
            open={open}
            setOpen={setOpen}
          />
        }
      />
    </div>
  )
}
