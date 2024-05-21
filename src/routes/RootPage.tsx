import { Navigate, Outlet, redirect } from "react-router-dom"

export const loader = async () => {
    console.log("Loader entered")
    // as long as we don't have a home page, we are just going to redirect
    // users if they want to access "/"
    return redirect("/products");
};

export default function RootPage() {
    return (
        <div>
            <Navigate to={"/products"} />
            <Outlet />
        </div>
        
    )
}