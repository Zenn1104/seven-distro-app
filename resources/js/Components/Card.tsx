import { Link } from "@inertiajs/react";
import PrimaryButton from "./PrimaryButton";
import { Category, Product } from "../types";

interface Props {
    product: Product;
    category?: Category | null;
}

export default function Card({ product, category = null }: Props) {
    // Determine category name from either product.category or the optional category prop
    const categoryName =
        product.category?.name || category?.name || "Uncategorized";

    // Handle image URL
    const imageUrl = product.image_url
        ? `storage/${product.image_url}`
        : "/api/placeholder/300/300";

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 w-56">
            <div className="relative h-56 overflow-hidden">
                <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>

            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {product.name}
                </h3>
                <div className="flex justify-between items-center mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {categoryName}
                    </span>
                    <span
                        className={`text-xs px-2 py-1 rounded-full ${
                            product.stock > 0
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                        }`}
                    >
                        {product.stock > 0
                            ? `In Stock: ${product.stock}`
                            : "Out of Stock"}
                    </span>
                </div>
                <div className="text-xl font-bold text-gray-900 mb-2">
                    ${product.price}
                </div>
                <Link href={route("products.show", { product: product.id })}>
                    <PrimaryButton variant="primary">Detail</PrimaryButton>
                </Link>
            </div>
        </div>
    );
}
