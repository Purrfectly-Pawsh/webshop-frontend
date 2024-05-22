const apiVersion = process.env.VITE_PRODUCT_SERVICE_API_VERSION;
const baseURL = process.env.VITE_PRODUCT_SERVICE_BASE_URL;

export const GETProductsURL = `${baseURL}/${apiVersion}/products`