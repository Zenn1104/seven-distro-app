import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "danger" | "warning" | "outline";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
}

export default function PrimaryButton({
    className = "",
    disabled,
    children,
    variant = "primary",
    ...props
}: Props) {
    const base =
        "inline-flex items-center rounded-md border px-4 py-2 text-xs font-semibold uppercase tracking-widest transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variants: Record<Variant, string> = {
        primary:
            "bg-teal-800 text-white border-transparent hover:bg-teal-700 focus:bg-teal-700 active:bg-teal-900 focus:ring-teal-500",
        danger: "bg-red-800 text-white border-transparent hover:bg-red-700 focus:bg-red-700 active:bg-red-900 focus:ring-red-500",
        warning:
            "bg-yellow-800 text-white border-transparent hover:bg-yellow-700 focus:bg-yellow-700 active:bg-yellow-900 focus:ring-yellow-500",
        outline:
            "bg-transparent text-teal-800 border-teal-800 hover:text-white hover:bg-teal-800 active:bg-teal-800 focus:ring-teal-500",
    };

    return (
        <button
            {...props}
            className={`${base} ${variants[variant]} ${
                disabled ? "opacity-25 cursor-not-allowed" : ""
            } ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
