import { Head, Link, useForm } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Card from "@/Components/Card";
import PrimaryButton from "@/Components/PrimaryButton";
import { Pencil, Trash } from "lucide-react";
import { Category } from "@/types";

interface Props {
    categories: Category[];
    role: string;
}

export default function Categories({ categories, role }: Props) {
    const { delete: destroy } = useForm();
    const handleDelete = (id: number) => {
        if (confirm("Are you sure?"))
            destroy(route("category.delete", { category: id }));
    };

    return (
        <Authenticated>
            <Head title="Categories" />
            <div className="py-12">
                <div
                    className={`mx-auto space-y-6 sm:px-6 lg:px-8 ${
                        role == "admin" ? "max-w-5xl" : "max-w-7xl"
                    }`}
                >
                    <div className="bg-white w-full p-4 shadow sm:rounded-lg sm:p-8">
                        <div className="w-full">
                            {role === "admin" ? (
                                <>
                                    <div className="flex justify-between mx-auto">
                                        <div>
                                            <h1 className="text-2xl font-bold mb-2">
                                                Category List
                                            </h1>

                                            <p className="mt-1 text-sm text-gray-600">
                                                List of Category.
                                            </p>
                                        </div>
                                        <div className="my-auto">
                                            <Link
                                                href={route("category.create")}
                                            >
                                                <PrimaryButton variant="primary">
                                                    Create
                                                </PrimaryButton>
                                            </Link>
                                        </div>
                                    </div>

                                    {categories.length > 0 ? (
                                        <table className="w-full border-collapse border border-gray-300 mt-6 space-y-6">
                                            <thead>
                                                <tr className="bg-gray-100">
                                                    <th className="border px-4 py-2">
                                                        No
                                                    </th>
                                                    <th className="border px-4 py-2">
                                                        Name
                                                    </th>
                                                    <th className="border px-4 py-2">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {categories.map(
                                                    (category, index) => (
                                                        <tr
                                                            key={category.id}
                                                            className="text-center"
                                                        >
                                                            <td className="border px-4 py-2">
                                                                {index + 1}
                                                            </td>
                                                            <td className="border px-4 py-2">
                                                                {category.name}
                                                            </td>
                                                            <td className="border px-3 py-2 space-x-2">
                                                                <Link
                                                                    href={route(
                                                                        "category.edit",
                                                                        {
                                                                            category:
                                                                                category.id,
                                                                        }
                                                                    )}
                                                                >
                                                                    <PrimaryButton variant="warning">
                                                                        <Pencil className="w-4 h-4" />
                                                                    </PrimaryButton>
                                                                </Link>
                                                                <PrimaryButton
                                                                    variant="danger"
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            category.id
                                                                        )
                                                                    }
                                                                >
                                                                    <Trash className="w-4 h-4" />
                                                                </PrimaryButton>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p className="text-center text-gray-500 mt-4">
                                            Tidak ada data
                                        </p>
                                    )}
                                </>
                            ) : (
                                <div>
                                    <div className="mb-8 border-b-2 p-2">
                                        <h1 className="text-5xl font-extrabold mb-2">
                                            Category List
                                        </h1>

                                        <p className="mt-1 text-xl font-light text-gray-600">
                                            List of Category.
                                        </p>
                                    </div>
                                    {categories.length > 0 ? (
                                        <ul className="space-y-6">
                                            {categories.map((category) => (
                                                <li
                                                    key={category.id}
                                                    className="border-b-2 p-2"
                                                >
                                                    <h2 className="text-4xl font-semibold mb-4">
                                                        #{category.name}
                                                    </h2>

                                                    {category.products.length >
                                                    0 ? (
                                                        <div className="flex gap-4 overflow-x-auto">
                                                            {category.products.map(
                                                                (product) => (
                                                                    <Card
                                                                        key={
                                                                            product.id
                                                                        }
                                                                        product={
                                                                            product
                                                                        }
                                                                        category={
                                                                            category
                                                                        }
                                                                    />
                                                                )
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <p className="text-gray-500 text-sm">
                                                            Tidak ada produk
                                                            dalam kategori ini.
                                                        </p>
                                                    )}

                                                    <div className="mt-4">
                                                        <Link
                                                            href={route(
                                                                "category.show",
                                                                {
                                                                    category:
                                                                        category.id,
                                                                }
                                                            )}
                                                            className="text-center text-blue-600 hover:underline"
                                                        >
                                                            View Details
                                                        </Link>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-center text-gray-500 mt-4">
                                            Tidak ada data
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
