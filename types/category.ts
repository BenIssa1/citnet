export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  color: string;
  count: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryData {
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  color: string;
}

export interface CategoryEditData {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  color: string;
}

export interface CategoryListResponse {
  data: {
    categories: Category[];
  };
}
