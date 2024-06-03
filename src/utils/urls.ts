const baseURL = import.meta.env.VITE_PRODUCT_SERVICE_BASE_URL;

export const GETProductsURL = `${baseURL}/products`;
export const GETProductURL = `${baseURL}/products/`;
export const GETProductsByKeywordURL = `${baseURL}/products/search?keyword=`;
