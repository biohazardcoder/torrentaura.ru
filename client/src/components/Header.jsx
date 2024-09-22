import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { SiGamejolt } from 'react-icons/si';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navData = [
    { name: 'Games', path: '/' },
    { name: 'Download', path: '/download' },
    { name: 'Contact', path: '/contact' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-sidebarBg text-sidebarText w-full col-span-6 row-span-1 shadow-lg py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <span className="text-4xl text-highlight hover:text-green-500 transition-colors duration-300">
            <SiGamejolt />
          </span>
          <h1 className="text-2xl font-bold text-mainText cursor-pointer tracking-wide hover:text-green-500 transition-colors duration-300">
            Torrent Aura
          </h1>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8">
          {navData.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? 'text-white font-bold border-b-2 border-green-500'
                  : 'text-sidebarText hover:text-green-500 transition-colors duration-300'
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-sidebarText hover:text-green-500 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden px-4 py-2 space-y-2">
          {navData.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? 'block py-2 text-white font-bold border-b-2 border-green-500'
                  : 'block py-2 text-sidebarText hover:text-green-500 transition-colors duration-300'
              }
              onClick={toggleMenu}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
};
