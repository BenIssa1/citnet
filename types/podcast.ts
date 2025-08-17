export interface Podcast {
  id?: string;
  title: string;
  duration: number;
  videoUrl: string;
  imageUrl: string;
  color: string;
  publishedAt: string | null;
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

export interface CreatePodcastData {
  title: string;
  duration: number;
  videoUrl: string;
  imageUrl: string;
  color: string;
  categoryId: string;
  tagIds: string[];
}

export interface PodcastEditData {
  id: string;
  title: string;
  duration: number;
  videoUrl: string;
  imageUrl: string;
  color: string;
  categoryId: string;
  tagIds: string[];
}

export interface PodcastListResponse {
  data: {
    podcasts: Podcast[];
  };
}
