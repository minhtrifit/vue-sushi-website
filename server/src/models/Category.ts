export interface GetCategoriesParams {
  page?: number;
  limit?: number;
  q?: string;
  isActive?: string;
}

export interface CategoryBase {
  name: string;
  imageUrl: string;
  isActive?: boolean;
}

export interface Category extends CategoryBase {
  id: string;
}
