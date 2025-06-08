import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Category } from "@/types";
import { Transition } from "@headlessui/react";
import { Head, useForm, usePage } from "@inertiajs/react";

interface Props {
    categories: Category[];
}

export default function Create({ categories }: Props) {
    const user = usePage().props.auth.user;
    const { data, setData, post, processing, errors, recentlySuccessful } =
        useForm({
            name: "",
            description: "",
            category_id: "",
            price: "",
            stock: "",
            image_url: null as File | null,
            sizes: [{ size: "", stock: 0 }],
        });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("products.create"));
    };

    return (
        <Authenticated>
            <Head title="Create Product" />
            <div className="py-12">
                <div
                    className={`mx-auto space-y-6 sm:px-6 lg:px-8 ${
                        user.role == "admin" ? "max-w-5xl" : "max-w-7xl"
                    }`}
                >
                    <div className="bg-white w-full p-4 shadow sm:rounded-lg sm:p-8">
                        <div className="max-w-xl">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">
                                    Create Product
                                </h2>

                                <p className="mt-1 text-sm text-gray-600">
                                    Create a Product.
                                </p>
                            </header>

                            <form
                                onSubmit={handleSubmit}
                                className="mt-6 space-y-6"
                            >
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
                                        isFocused
                                        autoComplete="name"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.name}
                                    />
                                </div>
                                <select
                                    value={data.category_id}
                                    onChange={(e) =>
                                        setData("category_id", e.target.value)
                                    }
                                    className="border p-2 w-full mb-3"
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
                                        isFocused
                                        autoComplete="price"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.price}
                                    />
                                </div>
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
                                        isFocused
                                        autoComplete="stock"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.stock}
                                    />
                                </div>
                                <div>
                                    <label className="block">Image</label>
                                    <input
                                        type="file"
                                        onChange={(e) =>
                                            setData(
                                                "image_url",
                                                e.target.files?.[0] || null
                                            )
                                        }
                                        className="w-full border p-2"
                                    />
                                </div>
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
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        required
                                        isFocused
                                        autoComplete="description"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.description}
                                    />
                                </div>

                                <div>
                                    <InputLabel value="Sizes (optional)" />

                                    {data.sizes.map((s, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 mt-2"
                                        >
                                            <TextInput
                                                className="w-1/2"
                                                placeholder="Size (e.g., S, M, L)"
                                                value={s.size}
                                                onChange={(e) =>
                                                    setData("sizes", [
                                                        ...data.sizes.slice(
                                                            0,
                                                            index
                                                        ),
                                                        {
                                                            ...s,
                                                            size: e.target
                                                                .value,
                                                        },
                                                        ...data.sizes.slice(
                                                            index + 1
                                                        ),
                                                    ])
                                                }
                                            />
                                            <TextInput
                                                className="w-1/3"
                                                type="number"
                                                placeholder="Stock"
                                                value={s.stock}
                                                onChange={(e) =>
                                                    setData("sizes", [
                                                        ...data.sizes.slice(
                                                            0,
                                                            index
                                                        ),
                                                        {
                                                            ...s,
                                                            stock: Number(
                                                                e.target.value
                                                            ),
                                                        },
                                                        ...data.sizes.slice(
                                                            index + 1
                                                        ),
                                                    ])
                                                }
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const updated = [
                                                        ...data.sizes,
                                                    ];
                                                    updated.splice(index, 1);
                                                    setData("sizes", updated);
                                                }}
                                                className="text-red-500"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setData("sizes", [
                                                ...data.sizes,
                                                { size: "", stock: 0 },
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
            </div>
        </Authenticated>
    );
}
