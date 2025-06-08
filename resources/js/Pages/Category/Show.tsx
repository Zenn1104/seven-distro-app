import { Head, usePage } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Card from "@/Components/Card";
import { Product } from "@/types";
import { Category } from "../../types";

interface Props {
    category?: Category;
}

export default function Show({ category }: Props) {
    const user = usePage().props.auth.user;
    const currentCategory = category || {
        id: 0,
        name: "Kategori Tidak Ditemukan",
        products: [],
    };

    return (
        <Authenticated>
            <Head title={currentCategory.name} />
            <div className="py-16">
                <div
                    className={`mx-auto space-y-6 sm:px-6 lg:px-8 ${
                        user.role == "admin" ? "max-w-5xl" : "max-w-7xl"
                    }`}
                >
                    <div className="bg-white w-full p-6 shadow-lg sm:rounded-lg sm:p-8">
                        <h1 className="text-4xl font-bold mb-6 text-center">
                            {currentCategory.name}
                        </h1>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {currentCategory.products.length > 0 ? (
                                currentCategory.products.map(
                                    (product: Product) => (
                                        <Card
                                            key={product.id}
                                            product={product}
                                            category={category}
                                        />
                                    )
                                )
                            ) : (
                                <p className="text-center text-gray-500 col-span-3">
                                    Tidak ada produk dalam kategori ini.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
