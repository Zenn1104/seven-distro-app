import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm, Link, Head } from "@inertiajs/react";
import { useState } from "react";
import { CartItem } from "@/types";

interface Props {
    items: CartItem[];
}

export default function CartIndex({ items: initialItems }: Props) {
    const [items, setItems] = useState<CartItem[]>(initialItems);
    const { put, post, delete: destroy, data, setData, errors } = useForm();

    const handleUpdateQuantity = (id: number, value: string) => {
        const quantity = parseInt(value);
        if (isNaN(quantity) || quantity < 1) return;

        setData("quantity", quantity);
        put(route("cart.update", id), {
            preserveScroll: true,
        });

        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const handleDeleteItem = (id: number) => {
        if (confirm("Yakin ingin menghapus item ini dari keranjang?")) {
            destroy(route("cart.destroy", id), {
                preserveScroll: true,
                onSuccess: () => {
                    setItems((prevItems) =>
                        prevItems.filter((item) => item.id !== id)
                    );
                },
            });
        }
    };

    const handleCheckout = () => {
        post(route("cart.checkout"), {
            preserveScroll: true,
            onSuccess: (e) => {
                alert("Checkout berhasil!");
            },
        });
    };

    const total = items.reduce((sum, item) => {
        const price = parseInt(item.product.price);
        return sum + price * item.quantity;
    }, 0);

    return (
        <Authenticated>
            <Head title="Keranjang" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white w-full p-4 shadow sm:rounded-lg sm:p-8">
                        <div className="w-full">
                            <h1 className="text-xl font-semibold mb-6">
                                Keranjang Saya
                            </h1>

                            <div className="bg-white rounded shadow overflow-hidden">
                                {items.length === 0 ? (
                                    <div className="p-6 text-center text-gray-500">
                                        Keranjang kosong.
                                    </div>
                                ) : (
                                    <>
                                        {items.map((item) => {
                                            return (
                                                <div
                                                    key={item.id}
                                                    className="flex items-center gap-4 border-b p-4"
                                                >
                                                    <img
                                                        src={`/storage/${item.product.image_url}`}
                                                        alt={item.product.name}
                                                        className="w-24 h-24 object-cover rounded"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="font-xl">
                                                            {item.product.name}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            Kategori:{" "}
                                                            {
                                                                item.product
                                                                    .category
                                                                    .name
                                                            }
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            Harga: Rp{" "}
                                                            {parseInt(
                                                                item.product
                                                                    .price
                                                            ).toLocaleString()}
                                                        </div>
                                                        <div className="text-xs text-gray-500 mt-1">
                                                            Ukuran:{" "}
                                                            <span className="font-semibold text-gray-800">
                                                                {
                                                                    item
                                                                        .product_size
                                                                        .size
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="font-semibold mt-1">
                                                        <div className="flex flex-col gap-6">
                                                            Rp{" "}
                                                            {(
                                                                parseInt(
                                                                    item.product
                                                                        .price
                                                                ) *
                                                                item.quantity
                                                            ).toLocaleString()}
                                                            <div className="mt-2 flex items-center gap-2">
                                                                <InputLabel className="text-xs">
                                                                    Qty:
                                                                </InputLabel>
                                                                <div className="flex items-center border rounded w-fit overflow-hidden">
                                                                    <button
                                                                        type="button"
                                                                        className="w-8 h-8 flex items-center justify-center text-gray-700 border-r hover:bg-gray-100 disabled:cursor-not-allowed"
                                                                        onClick={() =>
                                                                            handleUpdateQuantity(
                                                                                item.id,
                                                                                String(
                                                                                    item.quantity -
                                                                                        1
                                                                                )
                                                                            )
                                                                        }
                                                                        disabled={
                                                                            item.quantity <=
                                                                            1
                                                                        }
                                                                    >
                                                                        -
                                                                    </button>
                                                                    <div className="w-10 h-8 flex items-center justify-center text-sm">
                                                                        {
                                                                            item.quantity
                                                                        }
                                                                    </div>
                                                                    <button
                                                                        type="button"
                                                                        className="w-8 h-8 flex items-center justify-center text-gray-700 border-l hover:bg-gray-100"
                                                                        onClick={() =>
                                                                            handleUpdateQuantity(
                                                                                item.id,
                                                                                String(
                                                                                    item.quantity +
                                                                                        1
                                                                                )
                                                                            )
                                                                        }
                                                                    >
                                                                        +
                                                                    </button>
                                                                </div>
                                                                <button
                                                                    onClick={() =>
                                                                        handleDeleteItem(
                                                                            item.id
                                                                        )
                                                                    }
                                                                    className="text-red-500 hover:text-red-700 text-xs ml-2"
                                                                >
                                                                    Hapus
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}

                                        <div className="flex justify-between items-center p-4">
                                            <span className="font-semibold">
                                                Total
                                            </span>
                                            <span className="text-xl text-teal-600 font-bold">
                                                Rp {total.toLocaleString()}
                                            </span>
                                        </div>

                                        <div className="p-4 text-right">
                                            <PrimaryButton
                                                onClick={handleCheckout}
                                            >
                                                Checkout
                                            </PrimaryButton>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
