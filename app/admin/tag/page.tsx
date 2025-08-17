'use client'

import { tagFormData } from "@/lib/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import TagTable from "@/components/data-table/TagTable";
import TagModal from "@/components/forms/TagModal";
import { editTag, createTag, deleteTag } from "@/services/tag";
import { CreateTagData, TagEditData } from "@/types/tag";

export default function TagPage() {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTagData, setEditTagData] = useState<TagEditData | null>(null);
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
  const [confirmDeleteTagOpen, setConfirmDeleteTagOpen] = useState(false);

  const queryClient = useQueryClient();

  const createTagMutation = useMutation({
    mutationFn: async ({ name, color }: CreateTagData) =>
      await createTag(name, color),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      setOpen(false);
      toast.success('Tag créé avec succès', { duration: 1000 });
    },
    onError: (error: any) => {
      if (error?.response?.data) {
        toast.error(error?.response?.data?.message || 'Échec de création');
      } else {
        toast.error('Erreur lors de la création');
      }
    },
  });

  const updateTagMutation = useMutation({
    mutationFn: ({ id, ...rest }: TagEditData) => editTag(id, rest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      setOpen(false);
      toast.success('Tag modifié avec succès', { duration: 1000 });
    },
    onError: (error: any) => {
      if (error?.response?.data) {
        toast.error(error?.response?.data?.message || 'Échec de modification');
      } else {
        toast.error('Erreur lors de la modification');
      }
    },
  });

  const deleteTagMutation = useMutation({
    mutationFn: (id: string) => deleteTag(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      setConfirmDeleteTagOpen(false);
      toast.success('Tag supprimé avec succès', { duration: 1000 });
    },
    onError: (error: any) => {
      toast.error('Erreur lors de la suppression');
    },
  });

  const handleTagSubmit = (data: tagFormData) => {
    const apiData = {
      name: data.name,
      color: data.color,
    };

    if (editTagData) {
      const editData: TagEditData = {
        id: editTagData.id,
        ...apiData,
      };

      updateTagMutation.mutate(editData);
    } else {
      const createData: CreateTagData = {
        ...apiData,
      };

      createTagMutation.mutate(createData);
    }
  };

  const handleDeleteTag = () => {
    if (selectedTagId) {
      deleteTagMutation.mutate(selectedTagId);
    }
  };

  return (
    <div className="p-4">
      <h3 className='text-xl font-bold mb-3'>Gestion des tags</h3>

      <TagTable
        onEditTagData={setEditTagData}
        onIsEditing={setIsEditing}
        onOpen={setOpen}
        onSetConfirmDeleteTagOpen={setConfirmDeleteTagOpen}
        onSetSelectedTagId={setSelectedTagId}
        buttonComponent={
          <TagModal
            initialData={editTagData ?? undefined}
            isEditing={isEditing}
            onSubmit={handleTagSubmit}
            isLoading={createTagMutation.isPending || updateTagMutation.isPending}
            open={open}
            setOpen={setOpen}
          />
        }
      />
    </div>
  )
}
