interface RatingProps {
	rating: number;
}

export default function Rating({ rating }: RatingProps) {
	const ratings: number[] = [1, 2, 3, 4, 5];

	return (
		<div className="rating">
			{ratings.map((i) => (
				<input
                    key={i}
					type="radio"
					className="mask mask-star"
					readOnly
					checked={i === rating}
				/>
			))}
		</div>
	);
}
