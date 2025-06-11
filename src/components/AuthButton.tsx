import React from "react";

interface AuthButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  type = "button",
  onClick,
  children,
  fullWidth = true,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`py-3 rounded-lg font-bold text-lg mt-4 transition-colors shadow-none ${
        fullWidth ? "w-full" : ""
      } ${
        disabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-teal-400 text-white hover:bg-teal-500"
      }`}
    >
      {children}
    </button>
  );
};

export default AuthButton;
