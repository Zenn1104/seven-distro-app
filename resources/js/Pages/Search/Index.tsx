import Card from "@/Components/Card";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Category, Product } from "@/types";

interface Props {
    products: Product[];
    categories: Category[];
    query: string;
}

export default function Index({ query, products, categories }: Props) {
    return (
        <Authenticated>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-24">
                    <div className="bg-white w-full p-4 shadow sm:rounded-lg sm:p-8">
                        <div className="w-full">
                            <div className="p-6">
                                <h1 className="text-xl font-bold mb-4">
                                    Search results for: "{query}"
                                </h1>

                                <h2 className="text-lg font-semibold mt-6 mb-2">
                                    Products
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {products.length > 0 ? (
                                        products.map((product) => (
                                            <Card
                                                key={product.id}
                                                product={product}
                                            />
                                        ))
                                    ) : (
                                        <p>No products found.</p>
                                    )}
                                </div>

                                <h2 className="text-lg font-semibold mt-6 mb-2">
                                    Categories
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {categories.length > 0 ? (
                                        categories.map((category) => (
                                            <div
                                                key={category.id}
                                                className="p-4 border rounded shadow"
                                            >
                                                {category.name}
                                            </div>
                                        ))
                                    ) : (
                                        <p>No categories found.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
