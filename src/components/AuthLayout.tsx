import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#131A1A]">
      <div className="w-full max-w-md px-6 py-10 rounded-2xl shadow-lg bg-[#131A1A] flex flex-col">
        <h1 className="text-3xl font-bold text-white mb-10 text-left">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
