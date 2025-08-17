export interface Tag {
  id: string;
  name: string;
  color: string;
  createdAt: string;
}

export interface CreateTagData {
  name: string;
  color: string;
}

export interface TagEditData {
  id: string;
  name: string;
  color: string;
}

export interface TagListResponse {
  data: {
    tags: Tag[];
  };
}
