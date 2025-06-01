import React from 'react';

interface AuthButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
  fullWidth?: boolean;
}

const AuthButton: React.FC<AuthButtonProps> = (
  { type = 'button', onClick, children, fullWidth = true }
) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-3 rounded-lg bg-teal-400 text-white font-bold text-lg mt-4 hover:bg-teal-500 transition-colors shadow-none ${
        fullWidth ? 'w-full' : ''
      }`}
    >
      {children}
    </button>
  );
};

export default AuthButton; 