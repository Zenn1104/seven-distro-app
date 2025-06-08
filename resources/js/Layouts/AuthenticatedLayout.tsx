import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import Sidebar from "@/Components/Sidebar";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { ShoppingCart, Search } from "lucide-react";
import {
    PropsWithChildren,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from "react";

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;
    const isAdmin = user.role === "admin";
    const cartCount = usePage().props.cartCount as number;
    const { data, setData, get } = useForm({ q: "" });
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const [showInput, setShowInput] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setShowInput(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setShowInput]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        get(route("search.index"));
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="fixed top-0 left-0 right-0 z-[9999] border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto" />
                                </Link>
                            </div>

                            {!isAdmin && (
                                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                    <NavLink
                                        href={route("dashboard")}
                                        active={route().current("dashboard")}
                                    >
                                        Dashboard
                                    </NavLink>
                                    <NavLink
                                        href={route("products.index")}
                                        active={route().current(
                                            "products.index"
                                        )}
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
                                </div>
                            )}
                        </div>

                        <div className="hidden gap-2 sm:ms-6 sm:flex sm:items-center">
                            <div ref={containerRef} className="relative">
                                {showInput ? (
                                    <form
                                        onSubmit={handleSearch}
                                        className="flex items-center gap-2"
                                    >
                                        <TextInput
                                            type="text"
                                            value={data.q}
                                            onChange={(e) =>
                                                setData("q", e.target.value)
                                            }
                                            onKeyDown={(e) => {
                                                if (e.key === "Escape") {
                                                    setShowInput(false);
                                                }
                                            }}
                                            autoFocus
                                            placeholder="Search products or categories..."
                                            className="border px-3 py-1 rounded"
                                        />
                                        <button type="submit">
                                            <Search className="w-6 h-6 text-gray-600" />
                                        </button>
                                    </form>
                                ) : (
                                    <button
                                        onClick={() => setShowInput(true)}
                                        className="pt-2"
                                    >
                                        <Search className="w-6 h-6 text-gray-600" />
                                    </button>
                                )}
                            </div>

                            <div className="relative">
                                <Link href={route("cart.index")}>
                                    <ShoppingCart className="w-6 h-6 text-gray-600" />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>
                            </div>

                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                            >
                                                <img
                                                    src={`/storage/${user.profile_picture}`}
                                                    alt="User Avatar"
                                                    className="w-8 h-8 rounded-full object-cover"
                                                />
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex gap-2 items-center sm:hidden">
                            <div ref={containerRef} className="relative">
                                {showInput ? (
                                    <form
                                        onSubmit={handleSearch}
                                        className="flex items-center gap-2"
                                    >
                                        <TextInput
                                            type="text"
                                            value={data.q}
                                            onChange={(e) =>
                                                setData("q", e.target.value)
                                            }
                                            onKeyDown={(e) => {
                                                if (e.key === "Escape") {
                                                    setShowInput(false);
                                                }
                                            }}
                                            autoFocus
                                            placeholder="Search products or categories..."
                                            className="border px-3 py-1 rounded"
                                        />
                                        <button type="submit">
                                            <Search className="w-6 h-6 text-gray-600" />
                                        </button>
                                    </form>
                                ) : (
                                    <button
                                        onClick={() => setShowInput(true)}
                                        className="pt-2"
                                    >
                                        <Search className="w-6 h-6 text-gray-600" />
                                    </button>
                                )}
                            </div>

                            <div className="relative">
                                <Link href={route("cart.index")}>
                                    <ShoppingCart className="w-6 h-6 text-gray-600" />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>
                            </div>
                            <div className="relative">
                                <button
                                    onClick={() =>
                                        setShowingNavigationDropdown(
                                            (previousState) => !previousState
                                        )
                                    }
                                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                                >
                                    <img
                                        src={`/storage/${user.profile_picture}`}
                                        alt="User Avatar"
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("products.index")}
                            active={route().current("products.index")}
                        >
                            Product
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("category.get")}
                            active={route().current("category.get")}
                        >
                            Category
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("orders.index")}
                            active={route().current("orders.index")}
                        >
                            Order
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-gray-200 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("profile.edit")}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex min-h-screen">
                {isAdmin && (
                    <aside className="hidden w-48 border-r xl:block">
                        <Sidebar />
                    </aside>
                )}

                <div className="flex flex-col flex-1">
                    {header && (
                        <header className="bg-white shadow">
                            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                                {header}
                            </div>
                        </header>
                    )}

                    <main
                        className={`${
                            user.role == "admin" ? "flex-1 p-2 pt-24" : "pt-16"
                        }`}
                    >
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
