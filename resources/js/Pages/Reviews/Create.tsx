import { useForm } from "@inertiajs/react";
import React from "react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Create({ productId }: { productId: number }) {
    const { data, setData, post, processing, reset } = useForm({
        rating: 0,
        review: "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("reviews.store", productId), {
            onSuccess: () => reset(),
        });
    };

    return (
        <form onSubmit={submit} className="space-y-4 bg-gray-50 p-4 rounded-md">
            <div>
                <label className="block font-semibold mb-1">Rating</label>
                <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setData("rating", star)}
                            className="text-2xl focus:outline-none"
                        >
                            <span
                                className={
                                    star <= data.rating
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                }
                            >
                                ★
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block font-semibold mb-1">Review</label>
                <textarea
                    value={data.review}
                    onChange={(e) => setData("review", e.target.value)}
                    className="w-full border rounded p-2"
                />
            </div>

            <PrimaryButton
                variant="primary"
                type="submit"
                disabled={processing}
            >
                Submit Review
            </PrimaryButton>
        </form>
    );
}
