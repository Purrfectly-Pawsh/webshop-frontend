import { useLoaderData } from "react-router-dom";
import { Product } from "../utils/types";
import { GETProductsURL } from "../utils/urls";

export const productsPageLoader = async () => {
    const response = fetch(GETProductsURL, {
        method: "GET",
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then(response => {
            if (response.ok) {
                return response.json() as Promise<Product[]>
            }
            throw new Error("Network response was not ok!");
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Fetching [GET PRODUCTS] failed:\n', error);
            return [];
        });

    return response;
};


export default function ProductsPage() {
    const products = useLoaderData() as Product[]

    return (
        <div className="flex-grow overflow-y-auto">
            {products.map(product => (
                <p key={product.id}>{product.name}</p>
            ))}
        </div>
    )
}