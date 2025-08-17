export interface Emission {
  id?: string;
  title: string;
  duration: number;
  thumbnail: string;
  videoUrl: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
    slug: string;
    color: string;
  };
  tags: Array<{
    id: string;
    name: string;
    color: string;
  }>;
}

export interface CreateEmissionData {
  title: string;
  duration: number;
  thumbnail: string;
  videoUrl: string;
  order: number;
  categoryId: string;
  tagIds: string[];
}

export interface EmissionEditData {
  id: string;
  title: string;
  duration: number;
  thumbnail: string;
  videoUrl: string;
  order: number;
  categoryId: string;
  tagIds: string[];
}

export interface EmissionListResponse {
  data: {
    emissions: Emission[];
  };
}
