import axiosAuth from "@/lib/axios";
import { emissionEditFormData } from "@/lib/validation";
import { Emission, EmissionListResponse } from "@/types/emission";

// Récupérer toutes les émissions
export const getAllEmissions = async (): Promise<{
  emissions: Emission[];
}> => {
  const response = await axiosAuth.get(`/emissions`);
  const data: EmissionListResponse = response;

  return {
    emissions: data.data.emissions,
  };
};

// Créer une nouvelle émission
export const createEmission = async (
  title: string,
  duration: number,
  thumbnail: string,
  videoUrl: string,
  order: number,
  categoryId: string,
  tagIds: string[]
): Promise<Emission> => {
  const response = await axiosAuth.post("/emissions", {
    title,
    duration,
    thumbnail,
    videoUrl,
    order,
    categoryId,
    tagIds,
  });
  return response.data;
};

// Modifier une émission
export const editEmission = async (
  id: string,
  data: Omit<emissionEditFormData, "id">
): Promise<Emission> => {
  const response = await axiosAuth.put(`/emissions/${id}`, data);
  return response.data;
};

// Supprimer une émission
export const deleteEmission = async (id: string): Promise<void> => {
  await axiosAuth.delete(`/emissions/${id}`);
};

// Réorganiser les émissions
export const reorderEmissions = async (emissionIds: string[]): Promise<Emission[]> => {
  const response = await axiosAuth.patch(`/emissions/reorder`, { emissionIds });
  return response.data;
};
