import React from "react";

interface AuthButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  fullWidth = true,
  children,
  type = "button",
  disabled = false,
  className = "",
  ...restProps
}) => {
  const combinedClassName = `${className} py-3 rounded-lg font-bold text-lg mt-4 transition-colors shadow-none ${
    fullWidth ? "w-full" : ""
  } ${
    disabled
      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
      : "bg-teal-400 text-white hover:bg-teal-500"
  }`;
  return (
    <button
      type={type}
      disabled={disabled}
      className={combinedClassName}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default AuthButton;
