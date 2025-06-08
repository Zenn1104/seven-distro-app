import PrimaryButton from "@/Components/PrimaryButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Order } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

type OrderSuccessProps = {
    order: Order;
};

export default function SuccessOrder({ order }: OrderSuccessProps) {
    return (
        <Authenticated>
            <Head title="Thank You For Order" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white w-full p-4 shadow sm:rounded-lg sm:p-8">
                        <div className="w-full">
                            <div className="flex items-center justify-center">
                                <DotLottieReact
                                    src="https://lottie.host/afc6282c-ff52-43d2-a7cd-2cd82a58d7d9/BW59qjl7k1.lottie"
                                    autoplay
                                    className="h-48 w-48"
                                />
                            </div>

                            <h1 className="text-3xl text-center font-bold text-teal-600">
                                Thank you for ordering our product!
                            </h1>

                            <p className="text-gray-600 text-center mb-12">
                                Your order was placed on{" "}
                                <strong>
                                    {new Date(
                                        order.created_at
                                    ).toLocaleDateString()}
                                </strong>
                                .
                            </p>

                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border rounded-md">
                                    <thead>
                                        <tr className="bg-gray-100 text-left">
                                            <th className="py-2 px-4 border-b">
                                                Product
                                            </th>
                                            <th className="py-2 px-4 border-b">
                                                Quantity
                                            </th>
                                            <th className="py-2 px-4 border-b">
                                                Price
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
                                                    {item.quantity}
                                                </td>
                                                <td className="py-2 px-4 border-b">
                                                    Rp{" "}
                                                    {item.price.toLocaleString()}
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
                                        View My Orders
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
