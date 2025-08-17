import axiosAuth from "@/lib/axios";
import { podcastEditFormData } from "@/lib/validation";
import { Podcast, PodcastListResponse } from "@/types/podcast";

// Récupérer tous les podcasts
export const getAllPodcasts = async (): Promise<{
  podcasts: Podcast[];
}> => {
  const response = await axiosAuth.get(`/podcasts`);
  const data: PodcastListResponse = response;

  return {
    podcasts: data.data.podcasts,
  };
};

// Créer un nouveau podcast
export const createPodcast = async (
  title: string,
  duration: number,
  videoUrl: string,
  imageUrl: string,
  color: string,
  categoryId: string,
  tagIds: string[]
): Promise<Podcast> => {
  const response = await axiosAuth.post("/podcasts", {
    title,
    duration,
    videoUrl,
    imageUrl,
    color,
    categoryId,
    tagIds,
  });
  return response.data;
};

// Modifier un podcast
export const editPodcast = async (
  id: string,
  data: Omit<podcastEditFormData, "id">
): Promise<Podcast> => {
  const response = await axiosAuth.put(`/podcasts/${id}`, data);
  return response.data;
};

// Supprimer un podcast
export const deletePodcast = async (id: string): Promise<void> => {
  await axiosAuth.delete(`/podcasts/${id}`);
};

// Publier un podcast
export const publishPodcast = async (id: string): Promise<Podcast> => {
  const response = await axiosAuth.patch(`/podcasts/${id}/publish`);
  return response.data;
};
