const apiVersion = import.meta.env.VITE_PRODUCT_SERVICE_API_VERSION;
const baseURL = import.meta.env.VITE_PRODUCT_SERVICE_BASE_URL;

export const GETProductsURL = `${baseURL}/${apiVersion}/products`;
export const GETProductURL = `${baseURL}/${apiVersion}/products/`;
