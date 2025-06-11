import React from "react";

interface AuthHeaderProps {
  mainText: string;
  subText: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ mainText, subText }) => {
  return (
    <>
      <h2 className="text-2xl font-bold text-white text-center mb-2">
        {mainText}
      </h2>
      <p className="text-center text-gray-400 mb-8">{subText}</p>
    </>
  );
};

export default AuthHeader;
