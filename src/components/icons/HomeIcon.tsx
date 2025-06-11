import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  isActive?: boolean;
}

const HomeIcon: React.FC<IconProps> = ({ isActive, ...props }) => (
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
      d="M2.25 12l8.954-8.955a.75.75 0 011.06 0l8.955 8.955M3 11.25V21.75A.75.75 0 003.75 22.5h4.5a.75.75 0 00.75-.75v-6a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v6a.75.75 0 00.75.75h4.5a.75.75 0 00.75-.75V11.25m-19.5 0h19.5"
    />
  </svg>
);

export default HomeIcon;
