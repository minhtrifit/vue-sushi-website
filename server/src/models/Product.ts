export interface GetProductsParams {
  page?: number;
  limit?: number;
  q?: string;
  categoryId?: string;
  isActive?: string;
}

export interface ProductBase {
  name: string;
  sku: string;
  price: number;
  stock: number;
  imageUrl: string;
  description: string;
  isActive: boolean;
  categoryId: string;
}

export interface Product extends ProductBase {
  id: string;
}

export interface ProductReviewPayload {
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  imageUrl: string;
}

export interface GetReviewsParams {
  page?: number;
  limit?: number;
  q?: string;
  productId?: string;
  rate?: number;
}

export interface GetProductsReviewsParams {
  rate?: number;
}

export interface SearchKeywordBase {
  title: string;
  count: number;
}

export interface SearchKeyword extends SearchKeywordBase {
  id: string;
}

export interface SearchKeywordPayload {
  title: string;
}

export interface GetKeywordsParams {
  title?: string;
  limit?: number;
}
