import "../css/app.css";
import "./bootstrap";

import { createInertiaApp, router } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";

const appName = import.meta.env.VITE_APP_NAME || "Seven Distro";

let loader: HTMLElement | null = null;

router.on("start", () => {
    loader = document.createElement("div");
    loader.innerHTML = `
    <div id="global-loader" style="
        position: fixed;
        inset: 0;
        z-index: 9997;
        background-color: rgba(255, 255, 255, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
    ">
        <div style="position: relative; width: 80px; height: 80px;">
            <!-- Spinner -->
            <div class="animate-spin rounded-full border-t-4 border-b-4 border-teal-600"
                style="width: 80px; height: 80px;">
            </div>

            <!-- Logo in center -->
            <img src="/storage/images/seven-distro-logo.png"
                style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
                width: 40px; height: 40px; mix-blend-mode: multiply;" />
        </div>
    </div>
  `;
    document.body.appendChild(loader);
});

router.on("finish", () => {
    if (loader) {
        document.body.removeChild(loader);
        loader = null;
    }
});

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: "transparent",
        showSpinner: false,
    },
});
