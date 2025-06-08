import { TopProductData, UserGrowthData } from "@/types";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";

interface Props {
    userGrowthData: UserGrowthData[];
    bestSellingProducts: TopProductData[];
}

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

export default function AdminDashboard({
    userGrowthData = [],
    bestSellingProducts = [],
}: Props) {
    const fixedBestSellingProducts = bestSellingProducts.map((product) => ({
        ...product,
        sales: Number(product.sales),
    }));

    return (
        <div className="py-8">
            <div className="mx-auto max-w-5xl sm:px-6 lg:px-8 space-y-8">
                <div className="bg-white w-full p-4 shadow sm:rounded-lg sm:p-8">
                    <h2 className="text-xl font-semibold mb-4">
                        Admin Dashboard
                    </h2>
                    <p className="text-gray-500">Ringkasan performa aplikasi</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* User Growth Line Chart */}
                        <div className="bg-white p-6 rounded shadow">
                            <h3 className="text-lg font-semibold mb-4">
                                Perkembangan User
                            </h3>
                            {userGrowthData.length > 0 ? (
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={userGrowthData}>
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Line
                                            type="monotone"
                                            dataKey="users"
                                            stroke="#8884d8"
                                            strokeWidth={2}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            ) : (
                                <p className="text-center text-gray-400">
                                    Data user belum tersedia.
                                </p>
                            )}
                        </div>

                        {/* Best Selling Product Pie Chart */}
                        <div className="bg-white p-6 rounded shadow">
                            <h3 className="text-lg font-semibold mb-4">
                                Produk Paling Laku
                            </h3>
                            {fixedBestSellingProducts.length > 0 ? (
                                <div className="w-full h-[300px]">
                                    <ResponsiveContainer
                                        width="100%"
                                        height={300}
                                    >
                                        <PieChart>
                                            <Pie
                                                data={fixedBestSellingProducts}
                                                dataKey="sales"
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={80}
                                                fill="#8884d8"
                                                label
                                            >
                                                {fixedBestSellingProducts.map(
                                                    (entry, index) => (
                                                        <Cell
                                                            key={`cell-${index}`}
                                                            fill={
                                                                COLORS[
                                                                    index %
                                                                        COLORS.length
                                                                ]
                                                            }
                                                        />
                                                    )
                                                )}
                                            </Pie>
                                            <Tooltip />
                                            <Legend verticalAlign="bottom" />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            ) : (
                                <p className="text-center text-gray-400">
                                    Data produk belum tersedia.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
