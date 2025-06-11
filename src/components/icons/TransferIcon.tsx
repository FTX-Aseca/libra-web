import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  isActive?: boolean;
}

const TransferIcon: React.FC<IconProps> = ({ isActive, ...props }) => (
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
      d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h18m-9.75-14.25L21 6.75m0 0L16.5 11.25M21 6.75H3"
    />
  </svg>
);

export default TransferIcon;
