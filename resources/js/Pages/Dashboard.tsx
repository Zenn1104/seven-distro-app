import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import AdminDashboard from "./Dashboard/AdminDashboard";
import CustomerDashboard from "./Dashboard/CustomerDashboard";
import { Product, TopProductData, UserGrowthData } from "@/types";

interface Props {
    role: string;
    products: Product[];
    product_bestseller: Product[];
    userGrowth: UserGrowthData[];
    topProducts: TopProductData[];
}

export default function Dashboard({
    role,
    products,
    product_bestseller,
    userGrowth,
    topProducts,
}: Props) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            {role === "admin" ? (
                <AdminDashboard
                    userGrowthData={userGrowth}
                    bestSellingProducts={topProducts}
                />
            ) : (
                <CustomerDashboard
                    products={products}
                    product_bestseller={product_bestseller}
                />
            )}
        </AuthenticatedLayout>
    );
}
