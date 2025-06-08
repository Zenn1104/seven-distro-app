import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Category, Product } from "@/types";
import { Transition } from "@headlessui/react";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

interface Props {
    product: Product;
    categories: Category[];
}

type ProductForm = {
    name: string;
    category_id: string;
    price: string;
    stock: string;
    description: string;
    image_url: File | null;
    sizes: { size: string; stock: string }[];
    _method: string;
};

export default function Edit({ product, categories }: Props) {
    const user = usePage().props.auth.user;

    const { data, setData, post, processing, errors, recentlySuccessful } =
        useForm<ProductForm>({
            name: product.name,
            category_id: product.category_id.toString(),
            price: product.price.toString(),
            stock: product.stock.toString(),
            description: product.description,
            image_url: null,
            sizes: product.sizes.map((s) => ({
                size: s.size,
                stock: s.stock.toString(),
            })),
            _method: "PUT",
        });

    const [preview, setPreview] = useState(
        product.image_url
            ? `/storage/${product.image_url}`
            : "/storage/images/no-image.jpg"
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("products.update", { product: product.id }), {
            forceFormData: true,
            onSuccess: () => {
                console.log("Product updated!");
            },
            onError: (err) => {
                console.error("Validation failed", err);
            },
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const file = e.target.files[0];
            setData("image_url", file);
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <Authenticated>
            <Head title="Edit Product" />
            <div className="py-12">
                <div
                    className={`mx-auto space-y-6 sm:px-6 lg:px-8 ${
                        user.role === "admin" ? "max-w-5xl" : "max-w-7xl"
                    }`}
                >
                    <div className="bg-white w-full p-4 shadow sm:rounded-lg sm:p-8">
                        <header>
                            <h2 className="text-lg font-medium text-gray-900">
                                Update Product
                            </h2>
                            <p className="mt-1 text-sm text-gray-600">
                                Update a product and save changes.
                            </p>
                        </header>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-6 space-y-6"
                        >
                            {/* Name */}
                            <div>
                                <InputLabel htmlFor="name" value="Name" />
                                <TextInput
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                    autoComplete="name"
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.name}
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <InputLabel
                                    htmlFor="category"
                                    value="Category"
                                />
                                <select
                                    id="category"
                                    value={data.category_id}
                                    onChange={(e) =>
                                        setData("category_id", e.target.value)
                                    }
                                    className="border p-2 w-full rounded"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError
                                    className="mt-2"
                                    message={errors.category_id}
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <InputLabel htmlFor="price" value="Price" />
                                <TextInput
                                    id="price"
                                    type="number"
                                    className="mt-1 block w-full"
                                    value={data.price}
                                    onChange={(e) =>
                                        setData("price", e.target.value)
                                    }
                                    required
                                    autoComplete="price"
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.price}
                                />
                            </div>

                            {/* Stock */}
                            <div>
                                <InputLabel htmlFor="stock" value="Stock" />
                                <TextInput
                                    id="stock"
                                    type="number"
                                    className="mt-1 block w-full"
                                    value={data.stock}
                                    onChange={(e) =>
                                        setData("stock", e.target.value)
                                    }
                                    required
                                    autoComplete="stock"
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.stock}
                                />
                            </div>

                            {/* Image Upload */}
                            <div className="space-y-2">
                                <InputLabel htmlFor="image" value="Image" />
                                <div className="w-32 h-32 rounded-lg border-4 border-gray-300 overflow-hidden shadow-lg">
                                    <img
                                        src={preview}
                                        alt="Product Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="w-full border p-2"
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.image_url}
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <InputLabel
                                    htmlFor="description"
                                    value="Description"
                                />
                                <TextInput
                                    id="description"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    required
                                    autoComplete="description"
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.description}
                                />
                            </div>

                            <div>
                                <InputLabel value="Sizes" />
                                {data.sizes.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-2 mt-2"
                                    >
                                        <TextInput
                                            placeholder="Size (e.g. S, M, L)"
                                            value={item.size}
                                            onChange={(e) =>
                                                setData(
                                                    "sizes",
                                                    data.sizes.map((s, i) =>
                                                        i === index
                                                            ? {
                                                                  ...s,
                                                                  size: e.target
                                                                      .value,
                                                              }
                                                            : s
                                                    )
                                                )
                                            }
                                        />
                                        <TextInput
                                            placeholder="Stock"
                                            type="number"
                                            value={item.stock}
                                            onChange={(e) =>
                                                setData(
                                                    "sizes",
                                                    data.sizes.map((s, i) =>
                                                        i === index
                                                            ? {
                                                                  ...s,
                                                                  stock: e
                                                                      .target
                                                                      .value,
                                                              }
                                                            : s
                                                    )
                                                )
                                            }
                                        />
                                        <button
                                            type="button"
                                            className="text-red-500"
                                            onClick={() =>
                                                setData(
                                                    "sizes",
                                                    data.sizes.filter(
                                                        (_, i) => i !== index
                                                    )
                                                )
                                            }
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setData("sizes", [
                                            ...data.sizes,
                                            { size: "", stock: "" },
                                        ])
                                    }
                                    className="mt-2 text-blue-500"
                                >
                                    + Add Size
                                </button>
                                <InputError
                                    className="mt-2"
                                    message={errors.sizes}
                                />
                            </div>

                            {/* Submit */}
                            <div className="flex items-center gap-4">
                                <PrimaryButton
                                    variant="primary"
                                    disabled={processing}
                                >
                                    Save
                                </PrimaryButton>

                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-gray-600">
                                        Saved.
                                    </p>
                                </Transition>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
