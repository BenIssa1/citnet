export interface Article {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  timeToRead: number;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  views: number;
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

export interface CreateArticleData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  timeToRead: number;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  categoryId: string;
  tagIds: string[];
}

export interface ArticleEditData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  timeToRead: number;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  categoryId: string;
  tagIds: string[];
}

export interface ArticleListResponse {
  data: {
    articles: Article[];
  };
}
