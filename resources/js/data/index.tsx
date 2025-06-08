import { ShoppingCart, PackageSearch, Box } from "lucide-react";

interface Widgets {
    icon: JSX.Element;
    label: string;
    href: string;
}

export const widgets: Array<Widgets> = [
    {
        icon: <ShoppingCart className="w-12 h-12 mb-1" />,
        label: "Pesanan Saya",
        href: "/orders",
    },
    {
        icon: <PackageSearch className="w-12 h-12 mb-1" />,
        label: "Cari Produk",
        href: "/products",
    },
    {
        icon: <Box className="w-12 h-12 mb-1" />,
        label: "Kategori",
        href: "/categories",
    },
];
