'use client'

import { emissionFormData } from "@/lib/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import EmissionTable from "@/components/data-table/EmissionTable";
import EmissionModal from "@/components/forms/EmissionModal";
import { editEmission, createEmission, deleteEmission } from "@/services/emission";
import { CreateEmissionData, EmissionEditData } from "@/types/emission";

export default function EmissionPage() {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editEmissionData, setEditEmissionData] = useState<EmissionEditData | null>(null);
  const [selectedEmissionId, setSelectedEmissionId] = useState<string | null>(null);
  const [confirmDeleteEmissionOpen, setConfirmDeleteEmissionOpen] = useState(false);

  const queryClient = useQueryClient();

  const createEmissionMutation = useMutation({
    mutationFn: async ({ 
      title, 
      duration, 
      thumbnail, 
      videoUrl, 
      order, 
      categoryId, 
      tagIds 
    }: CreateEmissionData) =>
      await createEmission(
        title, 
        duration, 
        thumbnail, 
        videoUrl, 
        order, 
        categoryId, 
        tagIds
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emissions'] });
      setOpen(false);
      toast.success('Émission créée avec succès', { duration: 1000 });
    },
    onError: (error: any) => {
      if (error?.response?.data) {
        toast.error(error?.response?.data?.message || 'Échec de création');
      } else {
        toast.error('Erreur lors de la création');
      }
    },
  });

  const updateEmissionMutation = useMutation({
    mutationFn: ({ id, ...rest }: EmissionEditData) => editEmission(id, rest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emissions'] });
      setOpen(false);
      toast.success('Émission modifiée avec succès', { duration: 1000 });
    },
    onError: (error: any) => {
      if (error?.response?.data) {
        toast.error(error?.response?.data?.message || 'Échec de modification');
      } else {
        toast.error('Erreur lors de la modification');
      }
    },
  });

  const deleteEmissionMutation = useMutation({
    mutationFn: (id: string) => deleteEmission(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emissions'] });
      setConfirmDeleteEmissionOpen(false);
      toast.success('Émission supprimée avec succès', { duration: 1000 });
    },
    onError: (error: any) => {
      toast.error('Erreur lors de la suppression');
    },
  });

  const handleEmissionSubmit = (data: emissionFormData) => {
    const apiData = {
      title: data.title,
      duration: data.duration,
      thumbnail: data.thumbnail,
      videoUrl: data.videoUrl,
      order: data.order,
      categoryId: data.categoryId,
      tagIds: data.tagIds,
    };

    if (editEmissionData) {
      const editData: EmissionEditData = {
        id: editEmissionData.id,
        ...apiData,
      };

      updateEmissionMutation.mutate(editData);
    } else {
      const createData: CreateEmissionData = {
        ...apiData,
      };

      createEmissionMutation.mutate(createData);
    }
  };

  const handleDeleteEmission = () => {
    if (selectedEmissionId) {
      deleteEmissionMutation.mutate(selectedEmissionId);
    }
  };

  return (
    <div className="p-4">
      <h3 className='text-xl font-bold mb-3'>Gestion des émissions</h3>

      <EmissionTable
        onEditEmissionData={setEditEmissionData}
        onIsEditing={setIsEditing}
        onOpen={setOpen}
        onSetConfirmDeleteEmissionOpen={setConfirmDeleteEmissionOpen}
        onSetSelectedEmissionId={setSelectedEmissionId}
        buttonComponent={
          <EmissionModal
            initialData={editEmissionData ?? undefined}
            isEditing={isEditing}
            onSubmit={handleEmissionSubmit}
            isLoading={createEmissionMutation.isPending || updateEmissionMutation.isPending}
            open={open}
            setOpen={setOpen}
          />
        }
      />

    </div>
  )
}
