import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from './icons/HomeIcon';
import TransferIcon from './icons/TransferIcon';
import TransactionsIcon from './icons/TransactionsIcon';
import SettingsIcon from './icons/SettingsIcon';

const navItems = [
  { path: '/home', label: 'Home', Icon: HomeIcon },
  { path: '/transfer', label: 'Transfer', Icon: TransferIcon },
  { path: '/transactions', label: 'Transactions', Icon: TransactionsIcon },
  { path: '/settings', label: 'Settings', Icon: SettingsIcon },
];

const BottomNavigationBar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1A202C] shadow-t-lg border-t border-gray-700">
      <div className="max-w-md mx-auto flex justify-around items-center h-16">
        {navItems.map(({ path, label, Icon }) => {
          const isActive = location.pathname === path;
          return (
            <Link 
              to={path} 
              key={path} 
              className={`flex flex-col items-center justify-center p-2 rounded-md 
                          w-1/4 h-full 
                          transition-colors duration-200 ease-in-out 
                          ${
                            isActive 
                              ? 'text-teal-400' 
                              : 'text-gray-400 hover:text-teal-300'
                          }`}
            >
              <Icon isActive={isActive} />
              <span className={`text-xs mt-1 ${isActive ? 'font-semibold' : ''}`}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigationBar; 