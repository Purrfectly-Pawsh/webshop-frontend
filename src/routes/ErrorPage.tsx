import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage = () => {
	const error = useRouteError();
	const errorMessage = isRouteErrorResponse(error)
		? error.statusText
		: error instanceof Error
			? error.message
			: "An unknown error has occurred.";

	return (
		<div className="flex justify-center items-center h-full">
			<div className="bg-btnRed rounded-2xl border-4 border-gray-400 p-10 text-center w-fit">
				<h1 className="text-xl py-4 font-bold">
					Unfortunately something went wrong.
				</h1>
				<p className="font-medium">{errorMessage}</p>
				<a href="/">
					<button type="button" className="btn bg-btnBlue text-2xl px-4 mt-10">
						Go to Home
					</button>
				</a>
			</div>
		</div>
	);
};

export default ErrorPage;
