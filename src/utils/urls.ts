const baseURL = import.meta.env.VITE_PRODUCT_SERVICE_BASE_URL;

export const GETProductsURL = `${baseURL}/products`;
export const GETProductURL = `${baseURL}/products/`;
export const GETProductsByKeywordURL = `${baseURL}/products/search?keyword=`;
export const GETReviewsForProductURL = (productId: string) =>
	`${baseURL}/products/${productId}/reviews`;
export const GETBasketURL = (basketId: string) =>
	`${baseURL}/baskets/${basketId}`;
