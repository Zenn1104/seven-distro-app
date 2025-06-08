import React from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Package, PackageCheck, PackageOpen } from "lucide-react";
import { Order } from "@/types";

type PageProps = {
    role: string;
    orders: Order[];
};

export default function Index({ role, orders }: PageProps) {
    const { data, setData, patch, processing } = useForm({
        status: "pending",
    });

    const handleUpdateStatus = (id: number) => {
        patch(route("orders.status", { order: id }));
    };
    return (
        <Authenticated>
            <Head title="List Order" />
            <div className="py-12">
                <div
                    className={`mx-auto space-y-6 sm:px-6 lg:px-8 ${
                        role == "admin" ? "max-w-5xl" : "max-w-7xl"
                    }`}
                >
                    <div className="bg-white w-full p-4 shadow sm:rounded-lg sm:p-8">
                        <div className="w-full">
                            <h1 className="text-2xl font-bold mb-6">
                                Order List
                            </h1>

                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-200">
                                    <thead>
                                        <tr className="bg-gray-100 text-left">
                                            <th className="py-2 px-4 border-b">
                                                Order ID
                                            </th>
                                            {role === "admin" && (
                                                <th className="py-2 px-4 border-b">
                                                    Customer
                                                </th>
                                            )}
                                            <th className="py-2 px-4 border-b">
                                                Order Date
                                            </th>
                                            <th className="py-2 px-4 border-b">
                                                Total Price
                                            </th>
                                            <th className="py-2 px-4 border-b">
                                                Order Status
                                            </th>
                                            <th className="py-2 px-4 border-b">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order: Order) => (
                                            <tr key={order.id}>
                                                <td className="py-2 px-4 border-b">
                                                    #{order.id}
                                                </td>
                                                {role === "admin" && (
                                                    <td className="py-2 px-4 border-b">
                                                        {order.user.name}
                                                    </td>
                                                )}
                                                <td className="py-2 px-4 border-b">
                                                    {new Date(
                                                        order.created_at
                                                    ).toLocaleDateString()}
                                                </td>
                                                <td className="py-2 px-4 border-b">
                                                    {`Rp. ${Number(
                                                        order.total_price
                                                    ).toLocaleString("id-ID", {
                                                        minimumFractionDigits: 0,
                                                        maximumFractionDigits: 0,
                                                    })}`}
                                                </td>
                                                <td className="py-2 px-4 border-b">
                                                    {order.status}
                                                </td>
                                                <td className="py-2 px-4 border-b">
                                                    <div className="flex items-center gap-2">
                                                        <Link
                                                            href={route(
                                                                "orders.show",
                                                                order.id
                                                            )}
                                                            className="text-blue-600 hover:underline"
                                                        >
                                                            View Details
                                                        </Link>
                                                        {role == "admin" ? (
                                                            <div className="space-x-1 space-y-1">
                                                                <PrimaryButton
                                                                    variant="outline"
                                                                    onClick={() => {
                                                                        setData(
                                                                            "status",
                                                                            "processed"
                                                                        );
                                                                        handleUpdateStatus(
                                                                            order.id
                                                                        );
                                                                    }}
                                                                >
                                                                    <PackageOpen className="w4 h-4" />
                                                                </PrimaryButton>
                                                                <PrimaryButton
                                                                    variant="primary"
                                                                    onClick={() => {
                                                                        setData(
                                                                            "status",
                                                                            "shipedd"
                                                                        );
                                                                        handleUpdateStatus(
                                                                            order.id
                                                                        );
                                                                    }}
                                                                >
                                                                    <Package className="w4 h-4" />
                                                                </PrimaryButton>
                                                            </div>
                                                        ) : (
                                                            <PrimaryButton
                                                                variant="primary"
                                                                onClick={() => {
                                                                    setData(
                                                                        "status",
                                                                        "completed"
                                                                    );
                                                                    handleUpdateStatus(
                                                                        order.id
                                                                    );
                                                                }}
                                                            >
                                                                <PackageCheck className="w4 h-4" />
                                                            </PrimaryButton>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {orders.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan={
                                                        role === "admin" ? 5 : 4
                                                    }
                                                    className="text-center py-4 text-gray-500"
                                                >
                                                    No orders found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
