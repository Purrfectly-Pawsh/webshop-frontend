import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import CategoryMenu from "../components/CategoryMenu";
import Footer from "../components/Footer";

export default function RootPage() {
	return (
		<div className="flex flex-col h-screen">
			<Navbar />
			<CategoryMenu />
			<div className="overflow-auto flex-grow">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
}
