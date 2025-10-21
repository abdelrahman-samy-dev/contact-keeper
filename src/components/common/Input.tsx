import React, { useState } from "react";

interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
    label?: string;
    error?: string;
    helperText?: string;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    variant?: "default" | "filled" | "outlined";
    size?: "sm" | "md" | "lg";
}

const Input: React.FC<InputProps> = ({
    label,
    error,
    helperText,
    icon,
    iconPosition = "left",
    variant = "default",
    size = "md",
    className = "",
    required,
    ...props
}) => {
    const [focused, setFocused] = useState(false);

    const baseClasses = `
    block w-full rounded-xl border transition-all duration-200
    focus:outline-none focus:ring-2 disabled:opacity-60 disabled:cursor-not-allowed
    placeholder:text-slate-400
  `;

    const variantClasses: Record<string, string> = {
        default: `
      bg-white border-slate-300
      hover:border-slate-400 focus:border-blue-500 focus:ring-blue-200
      shadow-sm hover:shadow-md
    `,
        filled: `
      bg-slate-50 border-transparent
      hover:bg-slate-100 focus:bg-white focus:border-blue-500 focus:ring-blue-200
      shadow-sm hover:shadow-md
    `,
        outlined: `
      bg-transparent border-2 border-slate-300
      hover:border-slate-400 focus:border-blue-500 focus:ring-blue-200
      shadow-none hover:shadow-sm
    `,
    };

    const sizeClasses: Record<string, string> = {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-3 text-base",
        lg: "px-5 py-4 text-lg",
    };

    const iconPadding = icon
        ? iconPosition === "left"
            ? size === "sm"
                ? "pl-10"
                : size === "md"
                    ? "pl-11"
                    : "pl-12"
            : size === "sm"
                ? "pr-10"
                : size === "md"
                    ? "pr-11"
                    : "pr-12"
        : "";

    const borderColor = error
        ? "border-red-400 focus:border-red-500 focus:ring-red-200"
        : focused
            ? "focus:border-blue-500 focus:ring-blue-200"
            : "";

    const classes = [
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        borderColor,
        iconPadding,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className="w-full space-y-1">
            {label && (
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div className="relative">
                {icon && iconPosition === "left" && (
                    <div
                        className={`absolute inset-y-0 left-0 flex items-center z-10 ${size === "sm"
                                ? "pl-3"
                                : size === "md"
                                    ? "pl-4"
                                    : size === "lg"
                                        ? "pl-5"
                                        : ""
                            }`}
                    >
                        {icon}
                    </div>
                )}

                <input
                    {...props}
                    required={required}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className={classes}
                />

                {icon && iconPosition === "right" && (
                    <div
                        className={`absolute inset-y-0 right-0 flex items-center z-10 ${size === "sm"
                                ? "pr-3"
                                : size === "md"
                                    ? "pr-4"
                                    : size === "lg"
                                        ? "pr-5"
                                        : ""
                            }`}
                    >
                        {icon}
                    </div>
                )}
            </div>

            {error ? (
                <div className="flex items-center space-x-1 mt-1">
                    <svg
                        className="w-4 h-4 text-red-500 shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-5.25a.75.75 0 011.5 0v.5a.75.75 0 01-1.5 0v-.5zm0-6a.75.75 0 011.5 0v4a.75.75 0 01-1.5 0v-4z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <p className="text-sm text-red-600 font-medium">{error}</p>
                </div>
            ) : (
                helperText && <p className="text-sm text-slate-500 mt-1">{helperText}</p>
            )}
        </div>
    );
};

export default Input;