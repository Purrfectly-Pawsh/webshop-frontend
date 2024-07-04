const baseURL = import.meta.env.VITE_API_GATEWAY_SERVICE_BASE_URL;
const keycloakURL = import.meta.env.VITE_KEYCLOAK_SERVER_URL;
const keycloakRealm = import.meta.env.VITE_KEYCLOAK_REALM;
export const keycloakClientID = import.meta.env.VITE_KEYCLOAK_CLIENT_ID;

export const GETProductsURL = `${baseURL}/products`;
export const GETProductURL = `${baseURL}/products/`;
export const POSTProductURL = `${baseURL}/products`;
export const GETProductsByKeywordURL = `${baseURL}/products/search?keyword=`;
export const GETReviewsForProductURL = (productId: string) =>
	`${baseURL}/products/${productId}/reviews`;
export const GETBasketURL = (basketId: string) =>
	`${baseURL}/baskets/${basketId}`;
export const POSTProductToBasketURL = (basketId: string) =>
	`${baseURL}/baskets/${basketId}`;
export const DELETEProductFromBasketURL = (basketId: string, itemId: string) =>
	`${baseURL}/baskets/${basketId}/items/${itemId}`;
export const keycloakServerURL = `${keycloakURL}/realms/${keycloakRealm}`;
export const POSTCheckoutURL = `http://localhost:8084/v1/checkout/create-checkout-session`;

