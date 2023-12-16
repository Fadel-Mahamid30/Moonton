import PropTypes from "prop-types";

PrimaryButton.propTypes = {
    type: PropTypes.oneOf(["button", "submit", "reset"]),
    className: PropTypes.string,
    variant: PropTypes.oneOf([
        "primary",
        "warning",
        "danger",
        "light-outline",
        "white-outline",
        "secondary"
    ]),
    processing: PropTypes.bool,
    children: PropTypes.node
}

export default function PrimaryButton({
    type="submit",
    className = '',
    disabled,
    children,
    processing,
    variant="primary",
    sizeWidth="w-full",
    ...props }) {
    return (
        <button
            {...props}
            type={type}
            className={`rounded-2xl py-[13px] text-center ${sizeWidth} btn-${variant} ${processing && "opacity-30"} ${className}`}
            disabled={processing}
        >
            {children}
        </button>
    );
}
