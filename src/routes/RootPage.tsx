import { Navigate, Outlet, redirect } from "react-router-dom"
import Navbar from "../components/Navbar";
import CategoryMenu from "../components/CategoryMenu";
import Footer from "../components/Footer";

export const loader = async () => {
    console.log("Loader entered")
    // as long as we don't have a home page, we are just going to redirect
    // users if they want to access "/"
    return redirect("/products");
};

export default function RootPage() {
    return (
        <div className="flex flex-col h-screen">
            <Navigate to={"/products"} />
            <Navbar />
            <CategoryMenu />
            <Outlet />
            <Footer />
        </div>
        
    )
}