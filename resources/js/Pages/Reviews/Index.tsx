import { Review } from "@/types";

export default function Index({ reviews }: { reviews: Review[] }) {
    return (
        <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
            {reviews.length === 0 ? (
                <p className="text-gray-500">No reviews yet.</p>
            ) : (
                <ul className="max-h-screen space-y-4 rounded-xl p-4 overflow-y-scroll">
                    {reviews.map((review) => (
                        <li key={review.id} className="border-b pb-4">
                            <div className="flex flex-col gap-2">
                                <strong>{review.user.name}</strong>
                                <div className="flex gap-2 items-center">
                                    <span className="text-yellow-500">
                                        {"★".repeat(review.rating)}
                                    </span>
                                    <span className="text-xs">
                                        {new Date(
                                            review.created_at
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                            <p className="text-gray-700">{review.review}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
