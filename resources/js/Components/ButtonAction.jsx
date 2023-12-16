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
    ...props }) {
    return (
        <button
            {...props}
            type={type}
            className={`rounded-md flex items-center justify-center text-center w-10 h-10 btn-${variant} ${processing && "opacity-30"} ${className}`}
            disabled={processing}
        >
            <span className="text-2xl flex justify-center">
                {children}
            </span>
        </button>
    );
}
