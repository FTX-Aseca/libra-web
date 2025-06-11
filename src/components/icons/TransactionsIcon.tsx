import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  isActive?: boolean;
}

const TransactionsIcon: React.FC<IconProps> = ({ isActive, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke={isActive ? "#2DD4BF" : "currentColor"} // teal-400 for active
    className={`w-6 h-6 ${isActive ? "" : "text-gray-400"}`}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export default TransactionsIcon;
