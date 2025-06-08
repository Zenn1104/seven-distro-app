import NavLink from "./NavLink";

export default function Sidebar() {
    return (
        <aside className="hidden sm:flex flex-col w-48 min-h-screen px-4 bg-white fixed">
            {/* Sidebar muncul hanya di sm (640px) ke atas */}
            <nav className="flex flex-col gap-4 space-y-6 pt-32">
                <NavLink
                    href={route("dashboard")}
                    active={route().current("dashboard")}
                >
                    Dashboard
                </NavLink>
                <NavLink
                    href={route("products.index")}
                    active={route().current("products.index")}
                >
                    Product
                </NavLink>
                <NavLink
                    href={route("category.get")}
                    active={route().current("category.get")}
                >
                    Category
                </NavLink>
                <NavLink
                    href={route("orders.index")}
                    active={route().current("orders.index")}
                >
                    Orders
                </NavLink>
            </nav>
        </aside>
    );
}
