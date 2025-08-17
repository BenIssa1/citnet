import axiosAuth from "@/lib/axios";
import { tagEditFormData } from "@/lib/validation";
import { Tag, TagListResponse } from "@/types/tag";

// Récupérer tous les tags
export const getAllTags = async (): Promise<{
  tags: Tag[];
}> => {
  const response = await axiosAuth.get(`/tags`);
  const data: TagListResponse = response;

  return {
    tags: data.data.tags,
  };
};

// Créer un nouveau tag
export const createTag = async (
  name: string,
  color: string
): Promise<Tag> => {
  const response = await axiosAuth.post("/tags", {
    name,
    color,
  });
  return response.data;
};

// Modifier un tag
export const editTag = async (
  id: string,
  data: Omit<tagEditFormData, "id">
): Promise<Tag> => {
  const response = await axiosAuth.put(`/tags/${id}`, data);
  return response.data;
};

// Supprimer un tag
export const deleteTag = async (id: string): Promise<void> => {
  await axiosAuth.delete(`/tags/${id}`);
};
