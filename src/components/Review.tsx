import type { Review } from "../utils/types";
import Rating from "./Rating";

interface ReviewProps {
	review: Review;
}

export default function ReviewComponent({ review }: ReviewProps) {
	function formatDate(date: string): string {
		const newDate: Date = new Date(date);
		const options: Intl.DateTimeFormatOptions = {};
		options.month = "long";
		options.day = "2-digit";
		options.year = "numeric";
		options.hour = "2-digit";
		options.minute = "2-digit";
		options.hour12 = true;
		return new Intl.DateTimeFormat("en-US", options).format(newDate);
	}

	return (
		<div className="bg-primary rounded-2xl p-2 m-4">
			<div className="mx-2">
				<div className="flex justify-between items-center">
					<div>
						<h1 className="text-xl font-bold">
							{review.author} - {review.title}
						</h1>
						<p>{review.content}</p>
					</div>
					<div className="text-right">
						<Rating rating={review.rating} />
						<p>{formatDate(review.date)}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
