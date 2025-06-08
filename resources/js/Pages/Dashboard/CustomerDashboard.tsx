import Card from "@/Components/Card";
import SectionHero from "@/Components/Fragment/SectionHero";
import { widgets } from "@/data";
import { Product } from "@/types";
import { Link } from "@inertiajs/react";

interface Props {
    products: Product[];
    product_bestseller: Product[];
}

export default function CustomerDashboard({
    products,
    product_bestseller,
}: Props) {
    return (
        <div>
            <SectionHero />
            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-24">
                    <div className="bg-white w-full p-4 shadow sm:rounded-lg sm:p-8">
                        <div className="w-full">
                            {/* WIDGETS SECTION */}
                            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
                                {widgets.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 flex flex-col items-center justify-center p-3 bg-white border rounded shadow-sm hover:bg-gray-50"
                                    >
                                        {item.icon}
                                        <span className="text-sm sm:text-base md:text-lg text-center mt-2">
                                            {item.label}
                                        </span>
                                    </Link>
                                ))}
                            </div>

                            {/* BEST SELLER SECTION */}
                            <div className="py-12">
                                <div className="mb-8 text-center">
                                    <h1 className="text-xl sm:text-2xl font-bold mb-2">
                                        Best Seller Products
                                    </h1>
                                    <p className="text-sm text-gray-600">
                                        List of our best selling products.
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {product_bestseller.map((product) => (
                                        <Card
                                            key={product.id}
                                            product={product}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* LATEST PRODUCTS SECTION */}
                            <div className="py-12">
                                <div className="mb-8 text-center">
                                    <h1 className="text-xl sm:text-2xl font-bold mb-2">
                                        Latest Products
                                    </h1>
                                    <p className="text-sm text-gray-600">
                                        Newly added products in our catalog.
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {products.map((product) => (
                                        <Card
                                            key={product.id}
                                            product={product}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
