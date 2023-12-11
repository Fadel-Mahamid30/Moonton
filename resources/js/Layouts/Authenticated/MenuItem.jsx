import { Link } from "@inertiajs/react";

export default function MenuItem ({
    link,
    icon,
    text,
    isActive = false,
    method = "get"
}) {
    return (
        <Link
            as="button"
            href={link ? route(link) : null}
            className={`side-link ${isActive && "active"}`}
            method={method}>
            {icon}
            {text}
        </Link>
    )
}
