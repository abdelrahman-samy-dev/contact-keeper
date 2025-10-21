import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost' | 'success';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    loading?: boolean;
    children: React.ReactNode;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    loading = false,
    children,
    className = '',
    disabled,
    leftIcon,
    rightIcon,
    ...props
}) => {
    const baseClasses = `
        inline-flex items-center justify-center font-medium rounded-xl
        transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        transform hover:scale-[1.02] active:scale-[0.98]
        shadow-soft hover:shadow-medium
    `;

    const variantClasses = {
        primary: `
            gradient-primary text-white
            hover:shadow-lg hover:shadow-blue-500/25
            focus:ring-blue-500/50
            active:shadow-inner
        `,
        secondary: `
            bg-slate-100 text-slate-700 border border-slate-200
            hover:bg-slate-200 hover:border-slate-300
            focus:ring-slate-500/50
            active:bg-slate-300
        `,
        danger: `
            gradient-error text-white
            hover:shadow-lg hover:shadow-red-500/25
            focus:ring-red-500/50
            active:shadow-inner
        `,
        outline: `
            border-2 border-blue-500 text-blue-600 bg-white
            hover:bg-blue-50 hover:border-blue-600
            focus:ring-blue-500/50
            active:bg-blue-100
        `,
        ghost: `
            text-slate-600 bg-transparent
            hover:bg-slate-100 hover:text-slate-700
            focus:ring-slate-500/50
            active:bg-slate-200
        `,
        success: `
            gradient-success text-white
            hover:shadow-lg hover:shadow-green-500/25
            focus:ring-green-500/50
            active:shadow-inner
        `,
    };

    const sizeClasses = {
        xs: 'px-2.5 py-1 text-xs font-medium',
        sm: 'px-3 py-1.5 text-sm font-medium',
        md: 'px-4 py-2 text-sm font-semibold',
        lg: 'px-6 py-3 text-base font-semibold',
        xl: 'px-8 py-4 text-lg font-bold',
    };

    const iconSizeClasses = {
        xs: 'w-3 h-3',
        sm: 'w-4 h-4',
        md: 'w-4 h-4',
        lg: 'w-5 h-5',
        xl: 'w-6 h-6',
    };

    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

    return (
        <button
            className={classes}
            disabled={disabled || loading}
            {...props}
        >
            {loading && (
                <svg
                    className={`animate-spin ${iconSizeClasses[size]} mr-2`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            )}

            {!loading && leftIcon && (
                <span className={`${iconSizeClasses[size]} mr-2`}>
                    {leftIcon}
                </span>
            )}

            {children}

            {!loading && rightIcon && (
                <span className={`${iconSizeClasses[size]} ml-2`}>
                    {rightIcon}
                </span>
            )}
        </button>
    );
};

export default Button;