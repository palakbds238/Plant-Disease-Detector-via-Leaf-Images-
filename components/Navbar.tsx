import React, { useState } from 'react';
import { LeafIcon, HomeIcon, InfoIcon, BookOpenIcon, MenuIcon, XIcon, HistoryIcon, ChartBarIcon } from './Icons';

interface NavbarProps {
  currentPage: string;
  setPage: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Detector', icon: <HomeIcon className="h-5 w-5" /> },
    { id: 'dashboard', label: 'Dashboard', icon: <ChartBarIcon className="h-5 w-5" /> },
    { id: 'library', label: 'Library', icon: <BookOpenIcon className="h-5 w-5" /> },
    { id: 'history', label: 'History', icon: <HistoryIcon className="h-5 w-5" /> },
    { id: 'about', label: 'About', icon: <InfoIcon className="h-5 w-5" /> },
  ];

  const NavLink: React.FC<{ id: string, label: string, icon: React.ReactNode, isMobile?: boolean }> = ({ id, label, icon, isMobile = false }) => (
    <button
      onClick={() => {
        setPage(id);
        setIsOpen(false);
      }}
      className={`flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-all duration-200 transform hover:scale-105 w-full text-left
        ${currentPage === id
          ? 'bg-green-100 text-green-800'
          : 'text-gray-600 hover:bg-green-50 hover:text-green-700'
        }
        ${isMobile ? 'text-base' : 'text-sm'}
      `}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between h-16">
          <button className="flex items-center group" onClick={() => setPage('home')}>
            <div className="flex-shrink-0 flex items-center gap-2 text-green-800 font-bold text-xl">
              <LeafIcon className="h-8 w-8 text-green-600 transition-transform duration-500 group-hover:rotate-12" />
              <span>Plant AI</span>
            </div>
          </button>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2">
              {navItems.map(item => <NavLink key={item.id} {...item} />)}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map(item => <NavLink key={item.id} {...item} isMobile />)}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;