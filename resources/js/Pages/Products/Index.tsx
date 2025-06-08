import Card from "@/Components/Card";
import PrimaryButton from "@/Components/PrimaryButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Product } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import { PackagePlus, Pencil, Trash } from "lucide-react";
import { useState } from "react";

interface Props {
    products: Product[];
    role: string;
}

export default function Index({ products, role }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [selectedSizeId, setSelectedSizeId] = useState<number | null>(null);

    const { data, setData, patch, reset } = useForm({
        stock: 1,
    });

    const { delete: destroy } = useForm();

    const openModal = (sizeId: number) => {
        setSelectedSizeId(sizeId);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedSizeId(null);
        reset();
    };

    const handleAddStock = () => {
        if (!selectedSizeId) return;

        patch(route("products.add-stock", { size: selectedSizeId }), {
            preserveScroll: true,
            onSuccess: () => {
                alert("Stock successfully updated");
                closeModal();
            },
        });
    };

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this product?")) {
            destroy(route("products.destroy", { product: id }));
        }
    };

    const renderAdminTable = () => (
        <div>
            <div className="flex justify-between mx-auto">
                <div>
                    <h1 className="text-2xl font-bold mb-2">Products List</h1>
                    <p className="mt-1 text-sm text-gray-600">
                        List of products.
                    </p>
                </div>
                <div className="my-auto">
                    <Link href={route("products.create")}>
                        <PrimaryButton variant="primary">Create</PrimaryButton>
                    </Link>
                </div>
            </div>

            <table className="w-full border-collapse border border-gray-300 mt-4">
                <thead>
                    <tr className="bg-gray-100 text-center">
                        <th className="border px-4 py-2">#</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Category</th>
                        <th className="border px-4 py-2">Price</th>
                        <th className="border px-4 py-2">Sizes</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => {
                        return (
                            <tr key={product.id} className="text-center">
                                <td className="border px-4 py-2">
                                    {index + 1}
                                </td>
                                <td className="border px-4 py-2 text-left">
                                    <div className="flex gap-3 items-center">
                                        <div className="w-10 h-10 rounded-lg overflow-hidden">
                                            {product.image_url ? (
                                                <img
                                                    src={`/storage/${product.image_url}`}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="bg-gray-200 w-full h-full flex items-center justify-center text-xs text-gray-600">
                                                    No Image
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-bold max-w-20 truncate">
                                                {product.name}
                                            </div>
                                            <div className="text-xs text-gray-500 max-w-20 truncate">
                                                {product.description}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="border px-1">
                                    {product.category?.name ?? "-"}
                                </td>
                                <td className="border px-1">{product.price}</td>
                                <td className="border px-8">
                                    <div className="space-y-1 space-x-1 flex flex-wrap">
                                        {product.sizes?.length > 0 ? (
                                            product.sizes.map((size) => (
                                                <div
                                                    key={size.id}
                                                    className="flex items-center gap-2"
                                                >
                                                    <span className="text-xs font-medium">
                                                        {size.size}:{" "}
                                                        {size.stock}
                                                    </span>
                                                    <PrimaryButton
                                                        onClick={() =>
                                                            openModal(size.id)
                                                        }
                                                    >
                                                        <PackagePlus className="w-4 h-4" />
                                                    </PrimaryButton>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-gray-500">
                                                No sizes
                                            </p>
                                        )}
                                    </div>
                                </td>
                                <td className="border px-4 py-2 space-x-2 space-y-4">
                                    <Link
                                        href={route("products.edit", {
                                            product: product.id,
                                        })}
                                    >
                                        <PrimaryButton variant="warning">
                                            <Pencil className="w-4 h-4" />
                                        </PrimaryButton>
                                    </Link>
                                    <PrimaryButton
                                        onClick={() => handleDelete(product.id)}
                                        variant="danger"
                                    >
                                        <Trash className="w-4 h-4" />
                                    </PrimaryButton>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );

    const renderUserGrid = () => (
        <div className="mb-12">
            <h1 className="text-2xl font-bold mb-2">Product List</h1>
            <p className="mt-1 text-sm text-gray-600">List of our products.</p>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                    <Card key={product.id} product={product} />
                ))}
            </div>
        </div>
    );

    const renderStockModal = () => (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4">Add Stock</h2>
                <div className="mb-4">
                    <label
                        htmlFor="stock"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Stock Amount
                    </label>
                    <input
                        type="number"
                        id="stock"
                        min={1}
                        value={data.stock}
                        onChange={(e) =>
                            setData("stock", parseInt(e.target.value || "1"))
                        }
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                </div>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={closeModal}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAddStock}
                        className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <Authenticated>
            <Head title="Product List" />
            <div className="py-12">
                <div
                    className={`mx-auto space-y-6 sm:px-6 lg:px-8 ${
                        role === "admin" ? "max-w-5xl" : "max-w-7xl"
                    }`}
                >
                    <div className="bg-white w-full p-4 shadow sm:rounded-lg sm:p-8">
                        {role === "admin"
                            ? renderAdminTable()
                            : renderUserGrid()}
                    </div>
                    {showModal && renderStockModal()}
                </div>
            </div>
        </Authenticated>
    );
}
