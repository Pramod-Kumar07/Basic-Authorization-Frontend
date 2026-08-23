import type { ReactNode, ButtonHTMLAttributes } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset" | undefined;
  children: ReactNode;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger" | "outline";
  classname?: string;
}

export function Button({
  type = "button",
  children,
  disabled = false,
  variant = "primary",
  classname,
  ...props
}: IButton) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer";

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",

    secondary:
      "bg-slate-600 text-white hover:bg-slate-700 focus:ring-slate-500",

    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",

    outline:
      "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:ring-blue-500",
  };
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${classname}`}
      {...props}
    >
      {children}
    </button>
  );
}
