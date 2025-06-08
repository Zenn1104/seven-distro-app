import { Link, usePage, Head } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Order } from "@/types";

type PageProps = {
    order: Order;
    role: string;
};

export default function Show({ order, role }: PageProps) {
    return (
        <Authenticated>
            <Head title="Order Detail" />
            <div className="py-12">
                <div
                    className={`mx-auto space-y-6 sm:px-6 lg:px-8 ${
                        role == "admin" ? "max-w-5xl" : "max-w-7xl"
                    }`}
                >
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="w-full p-6">
                            <h1 className="text-2xl font-bold mb-4">
                                Order Details
                            </h1>

                            <div className="mb-6">
                                <p>
                                    <strong>Order ID:</strong> #{order.id}
                                </p>
                                <p>
                                    <strong>Order Date:</strong>{" "}
                                    {new Date(
                                        order.created_at
                                    ).toLocaleDateString()}
                                </p>
                                {role === "admin" && (
                                    <p>
                                        <strong>Customer:</strong>{" "}
                                        {order.user.name}
                                    </p>
                                )}
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="py-2 px-4 border-b">
                                                Product
                                            </th>
                                            <th className="py-2 px-4 border-b">
                                                Price
                                            </th>
                                            <th className="py-2 px-4 border-b">
                                                Quantity
                                            </th>
                                            <th className="py-2 px-4 border-b">
                                                Subtotal
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.items.map((item) => (
                                            <tr key={item.id}>
                                                <td className="py-2 px-4 border-b">
                                                    {item.product.name}
                                                </td>
                                                <td className="py-2 px-4 border-b">
                                                    Rp{" "}
                                                    {item.price.toLocaleString()}
                                                </td>
                                                <td className="py-2 px-4 border-b">
                                                    {item.quantity}
                                                </td>
                                                <td className="py-2 px-4 border-b">
                                                    Rp{" "}
                                                    {item.subtotal.toLocaleString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex justify-end mt-6">
                                <p className="text-xl font-semibold">
                                    Total:{" "}
                                    <span className="text-teal-600">
                                        Rp {order.total_price.toLocaleString()}
                                    </span>
                                </p>
                            </div>

                            <div className="mt-8 flex justify-center">
                                <Link href={route("orders.index")}>
                                    <PrimaryButton variant="primary">
                                        Back to Orders
                                    </PrimaryButton>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
