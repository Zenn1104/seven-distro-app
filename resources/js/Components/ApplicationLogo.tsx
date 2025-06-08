import { ImgHTMLAttributes } from "react";

export default function ApplicationLogo(
    props: ImgHTMLAttributes<HTMLImageElement>
) {
    return (
        <img {...props} src="/Seven-distro-logo.svg" alt="Application Logo" />
    );
}
