import { User } from "@/types";

export default function Navbar({
    user,
    showingNavigationDropdown,
    setShowingNavigationDropdown,
}: {
    user: User;
    showingNavigationDropdown: boolean;
    setShowingNavigationDropdown: () => void;
}) {}
