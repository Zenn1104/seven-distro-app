import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import Index from "../Reviews/Index";
import Create from "../Reviews/Create";
import PrimaryButton from "@/Components/PrimaryButton";
import Card from "@/Components/Card";
import { ShoppingCart } from "lucide-react";
import TextInput from "@/Components/TextInput";
import { Product } from "@/types";

interface Props {
    product: Product;
    relatedProducts: Product[];
}

export default function Show({ product, relatedProducts }: Props) {
    const {
        data: buyNowData,
        setData: setBuyNowData,
        post: postBuyNow,
        processing: buying,
        errors: buyNowErrors,
    } = useForm({
        product_id: product.id,
        quantity: 1,
        product_size_id: product.sizes?.[0]?.id || null, // default pilih pertama
    });

    const {
        data: addToCart,
        setData: setAddToCart,
        post: postAddToCart,
        processing: addingToCart,
    } = useForm({
        product_id: product.id,
        quantity: 1,
        product_size_id: product.sizes?.[0]?.id || null,
    });

    const handleBuyNow = () => {
        postBuyNow(route("orders.store"), {
            preserveScroll: true,
            onSuccess: () => {
                alert("Order created successfully!");
            },
            onError: (e) => {
                console.error(e);
            },
        });
    };

    const handleAddToCart = () => {
        postAddToCart(route("cart.store"), {
            preserveScroll: true,
            onSuccess: () => {
                alert("Cart added successfully!");
            },
        });
    };

    const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = Number(e.target.value);
        if (value > product.stock) value = product.stock;
        if (value < 1) value = 1;

        setBuyNowData("quantity", value);
        setAddToCart("quantity", value);
    };

    return (
        <AuthenticatedLayout>
            <Head title={product.name} />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex flex-col md:flex-row gap-8">
                                {/* Image */}
                                <div className="w-full md:w-2/5">
                                    <img
                                        src={`/storage/${product.image_url}`}
                                        alt={product.name}
                                        className="w-full h-96 object-contain"
                                    />
                                </div>

                                {/* Info */}
                                <div className="w-full md:w-3/5">
                                    <h1 className="text-2xl font-bold mb-2">
                                        {product.name}
                                    </h1>
                                    <p className="text-xl text-teal-500 mb-4">
                                        Rp {product.price}
                                    </p>
                                    <p className="mb-4 text-gray-700">
                                        {product.stock} stock tersedia
                                    </p>

                                    {/* Size Select Input */}
                                    {product.sizes &&
                                        product.sizes.length > 0 && (
                                            <div className="mb-4">
                                                <label className="block font-semibold mb-1">
                                                    Pilih Ukuran
                                                </label>
                                                <div className="flex flex-wrap gap-2">
                                                    {product.sizes.map(
                                                        (size) => {
                                                            const isSelected =
                                                                buyNowData.product_size_id ===
                                                                size.id;

                                                            return (
                                                                <button
                                                                    key={
                                                                        size.id
                                                                    }
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setBuyNowData(
                                                                            "product_size_id",
                                                                            size.id
                                                                        );
                                                                        setAddToCart(
                                                                            "product_size_id",
                                                                            size.id
                                                                        );
                                                                    }}
                                                                    className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all duration-150
                                                                        ${
                                                                            isSelected
                                                                                ? "border-teal-600 text-white bg-teal-600"
                                                                                : "border-gray-300 text-gray-700 hover:border-teal-500 hover:text-teal-600"
                                                                        }
                                                                        ${
                                                                            size.stock ===
                                                                            0
                                                                                ? "cursor-not-allowed opacity-50"
                                                                                : ""
                                                                        }
                                                                    `}
                                                                    disabled={
                                                                        size.stock ===
                                                                        0
                                                                    }
                                                                >
                                                                    {size.size}
                                                                </button>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                                {buyNowErrors.product_size_id && (
                                                    <div className="text-red-500 text-sm mt-1">
                                                        {
                                                            buyNowErrors.product_size_id
                                                        }
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                    {/* Quantity Input */}
                                    <div className="mb-8 flex justify-between items-center">
                                        <label className="block font-semibold mb-2">
                                            Jumlah
                                        </label>
                                        <div className="flex items-center gap-2">
                                            {/* Tombol - */}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newQty = Math.max(
                                                        1,
                                                        buyNowData.quantity - 1
                                                    );
                                                    setBuyNowData(
                                                        "quantity",
                                                        newQty
                                                    );
                                                    setAddToCart(
                                                        "quantity",
                                                        newQty
                                                    );
                                                }}
                                                className="px-3 py-1.5 border rounded text-lg font-semibold hover:bg-gray-100 disabled:opacity-50"
                                                disabled={
                                                    buyNowData.quantity <= 1
                                                }
                                            >
                                                −
                                            </button>

                                            {/* Input Jumlah */}
                                            <TextInput
                                                type="number"
                                                min={1}
                                                max={product.stock}
                                                value={buyNowData.quantity}
                                                onChange={handleChangeQuantity}
                                                className="w-16 text-center border rounded py-1.5"
                                            />

                                            {/* Tombol + */}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newQty = Math.min(
                                                        product.stock,
                                                        buyNowData.quantity + 1
                                                    );
                                                    setBuyNowData(
                                                        "quantity",
                                                        newQty
                                                    );
                                                    setAddToCart(
                                                        "quantity",
                                                        newQty
                                                    );
                                                }}
                                                className="px-3 py-1.5 border rounded text-lg font-semibold hover:bg-gray-100 disabled:opacity-50"
                                                disabled={
                                                    buyNowData.quantity >=
                                                    product.stock
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                        {buyNowErrors.quantity && (
                                            <div className="text-red-500 text-sm mt-1">
                                                {buyNowErrors.quantity}
                                            </div>
                                        )}
                                    </div>

                                    {/* Buy Now Button */}
                                    <div className="flex gap-4">
                                        <PrimaryButton
                                            onClick={handleBuyNow}
                                            disabled={buying}
                                            variant="primary"
                                        >
                                            {buying
                                                ? "Processing..."
                                                : "Buy Now"}
                                        </PrimaryButton>

                                        <PrimaryButton
                                            onClick={handleAddToCart}
                                            disabled={addingToCart}
                                            variant="outline"
                                        >
                                            <ShoppingCart className="w-5 h-5" />
                                            {addingToCart ? "Adding..." : null}
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mt-10">
                                <h2 className="text-xl font-semibold mb-2">
                                    Description
                                </h2>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: product.description,
                                    }}
                                    className="prose max-w-none"
                                />
                            </div>

                            {/* Komponen Daftar Review */}
                            <Index reviews={product.reviews} />

                            {/* Komponen Form Review (jika user login) */}
                            <div className="mt-6">
                                <Create productId={product.id} />
                            </div>

                            {/* Produk Terkait */}
                            <div className="mt-12">
                                <h2 className="text-xl font-semibold mb-4">
                                    Produk Terkait
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {relatedProducts.map((item) => (
                                        <Card key={item.id} product={item} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
