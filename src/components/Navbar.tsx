import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
	const navigate = useNavigate();

	return (
		<div className="navbar bg-primary max-h-36 min-h-36">
			<div className="hidden sm:block flex-1">
				<Link to={"/"}>
					<img alt="Logo" src="/big_logo.png" className="h-32" />
				</Link>
			</div>
			<div className="rounded-md w-1/3 mx-auto">
				<div className="flex flex-grow input input-bordered items-center justify-between w-auto rounded-3xl">
					<input
						type="text"
						placeholder="Search..."
						className="w-full pl-2"
						onChange={(e) =>
							navigate(
								e.target.value === ""
									? "/products"
									: `/products?keyword=${e.target.value}`,
							)
						}
					/>
					<svg
						role="img"
						aria-label="Search Icon"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16 16"
						fill="currentColor"
						className="w-4 h-4 opacity-70"
					>
						<path
							fillRule="evenodd"
							d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
			</div>
			<div className="flex-1 justify-end">
				<div
					tabIndex={0}
					role="button"
					className="btn btn-ghost btn-circle m-6"
				>
					<img aria-label="Support Icon" src="/support.svg" />
				</div>
				<div
					tabIndex={0}
					role="button"
					className="btn btn-ghost btn-circle m-6"
				>
					<img aria-label="Profile Icon" src="/profile.svg" />
				</div>
				<div
					tabIndex={0}
					role="button"
					className="btn btn-ghost btn-circle m-6"
				>
					<a href="/basket">
						<img
							aria-label="Basket Icon"
							src="/basket.svg"
							className="scale-125"
						/>
					</a>
				</div>
			</div>
		</div>
	);
}
