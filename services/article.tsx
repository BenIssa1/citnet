import axiosAuth from "@/lib/axios";
import { articleEditFormData } from "@/lib/validation";
import { Article, ArticleListResponse } from "@/types/article";

// Récupérer tous les articles
export const getAllArticles = async (): Promise<{
  articles: Article[];
}> => {
  const response = await axiosAuth.get(`/articles`);
  const data: ArticleListResponse = response;

  return {
    articles: data.data.articles,
  };
};

// Créer un nouvel article
export const createArticle = async (
  title: string,
  slug: string,
  excerpt: string,
  content: string,
  imageUrl: string,
  timeToRead: number,
  status: 'draft' | 'published' | 'archived',
  featured: boolean,
  categoryId: string,
  tagIds: string[]
): Promise<Article> => {
  const response = await axiosAuth.post("/articles", {
    title,
    slug,
    excerpt,
    content,
    imageUrl,
    timeToRead,
    status,
    featured,
    categoryId,
    tagIds,
  });
  return response.data;
};

// Modifier un article
export const editArticle = async (
  id: string,
  data: Omit<articleEditFormData, "id">
): Promise<Article> => {
  const response = await axiosAuth.put(`/articles/${id}`, data);
  return response.data;
};

// Supprimer un article
export const deleteArticle = async (id: string): Promise<void> => {
  await axiosAuth.delete(`/articles/${id}`);
};

// Publier un article
export const publishArticle = async (id: string): Promise<Article> => {
  const response = await axiosAuth.patch(`/articles/${id}/publish`);
  return response.data;
};

// Mettre en vedette un article
export const toggleFeaturedArticle = async (id: string, featured: boolean): Promise<Article> => {
  const response = await axiosAuth.patch(`/articles/${id}/featured`, { featured });
  return response.data;
};
