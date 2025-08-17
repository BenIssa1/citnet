'use client'

import { podcastFormData } from "@/lib/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import PodcastTable from "@/components/data-table/PodcastTable";
import PodcastModal from "@/components/forms/PodcastModal";
import { editPodcast, createPodcast, deletePodcast } from "@/services/podcast";
import { CreatePodcastData, PodcastEditData } from "@/types/podcast";

export default function PodcastPage() {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editPodcastData, setEditPodcastData] = useState<PodcastEditData | null>(null);
  const [selectedPodcastId, setSelectedPodcastId] = useState<string | null>(null);
  const [confirmDeletePodcastOpen, setConfirmDeletePodcastOpen] = useState(false);

  const queryClient = useQueryClient();

  const createPodcastMutation = useMutation({
    mutationFn: async ({ 
      title, 
      duration, 
      videoUrl, 
      imageUrl, 
      color, 
      categoryId, 
      tagIds 
    }: CreatePodcastData) =>
      await createPodcast(
        title, 
        duration, 
        videoUrl, 
        imageUrl, 
        color, 
        categoryId, 
        tagIds
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['podcasts'] });
      setOpen(false);
      toast.success('Podcast créé avec succès', { duration: 1000 });
    },
    onError: (error: any) => {
      if (error?.response?.data) {
        toast.error(error?.response?.data?.message || 'Échec de création');
      } else {
        toast.error('Erreur lors de la création');
      }
    },
  });

  const updatePodcastMutation = useMutation({
    mutationFn: ({ id, ...rest }: PodcastEditData) => editPodcast(id, rest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['podcasts'] });
      setOpen(false);
      toast.success('Podcast modifié avec succès', { duration: 1000 });
    },
    onError: (error: any) => {
      if (error?.response?.data) {
        toast.error(error?.response?.data?.message || 'Échec de modification');
      } else {
        toast.error('Erreur lors de la modification');
      }
    },
  });

  const deletePodcastMutation = useMutation({
    mutationFn: (id: string) => deletePodcast(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['podcasts'] });
      setConfirmDeletePodcastOpen(false);
      toast.success('Podcast supprimé avec succès', { duration: 1000 });
    },
    onError: (error: any) => {
      toast.error('Erreur lors de la suppression');
    },
  });

  const handlePodcastSubmit = (data: podcastFormData) => {
    const apiData = {
      title: data.title,
      duration: data.duration,
      videoUrl: data.videoUrl,
      imageUrl: data.imageUrl,
      color: data.color,
      categoryId: data.categoryId,
      tagIds: data.tagIds,
    };

    if (editPodcastData) {
      const editData: PodcastEditData = {
        id: editPodcastData.id,
        ...apiData,
      };

      updatePodcastMutation.mutate(editData);
    } else {
      const createData: CreatePodcastData = {
        ...apiData,
      };

      createPodcastMutation.mutate(createData);
    }
  };

  const handleDeletePodcast = () => {
    if (selectedPodcastId) {
      deletePodcastMutation.mutate(selectedPodcastId);
    }
  };

  return (
    <div className="p-4">
      <h3 className='text-xl font-bold mb-3'>Gestion des podcasts</h3>

      <PodcastTable
        onEditPodcastData={setEditPodcastData}
        onIsEditing={setIsEditing}
        onOpen={setOpen}
        onSetConfirmDeletePodcastOpen={setConfirmDeletePodcastOpen}
        onSetSelectedPodcastId={setSelectedPodcastId}
        buttonComponent={
          <PodcastModal
            initialData={editPodcastData ?? undefined}
            isEditing={isEditing}
            onSubmit={handlePodcastSubmit}
            isLoading={createPodcastMutation.isPending || updatePodcastMutation.isPending}
            open={open}
            setOpen={setOpen}
          />
        }
      />
     
    </div>
  )
}
