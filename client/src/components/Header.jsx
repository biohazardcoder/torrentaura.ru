import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { SiGamejolt } from 'react-icons/si';
import Axios from '../Axios';
import Cookies from "js-cookie";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const fetchUserData = async () => {
    const token = Cookies.get("token");
    console.log(token);

    try {
      const response = await Axios.get('/client/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.client) {
        setUser(response.data.client);
        setIsLoggedIn(true);
        console.log(response);
      }
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = () => {
    const isConfirmed = window.confirm("Are you sure you want to log out?");

    if (isConfirmed) {
      Cookies.remove("token");
      setIsLoggedIn(false);
      setUser(null);
      alert("You have successfully logged out.");
      window.location.href = "/";
    } else {
      alert("Logout cancelled.");
    }
  };


  const toggleMenu = () => setIsOpen(!isOpen);

  const navData = [
    { name: 'Games', path: '/' },
    { name: 'Contact', path: '/contact' },
    ...(isLoggedIn ? [] : [{ name: 'Login', path: '/login' }]),
  ];


  return (
    <header className="bg-sidebarBg text-sidebarText w-full col-span-6 row-span-1 shadow-lg py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-4xl text-highlight hover:text-green-500 transition-colors duration-300">
            <SiGamejolt />
          </span>
          <h1 className="text-2xl font-bold text-mainText cursor-pointer tracking-wide hover:text-green-500 transition-colors duration-300">
            <a href="/"> Torrent Aura</a>
          </h1>
        </div>

        {isLoggedIn && user && (
          <div className="flex items-center">
            <img src={user.avatar} alt="User Avatar" className="w-8 h-8 rounded-full mr-2" />
            <span className="text-mainText">
              {user.firstName} {user.lastName} ({user.phoneNumber})
            </span>
          </div>
        )}

        <nav className="hidden md:flex space-x-8">
          {navData.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? 'text-white  border-b-4 border-green-500'
                  : 'text-sidebarText border-b-4 border-transparent  hover:text-green-500 transition-colors duration-300'
              }
            >
              {item.name}
            </NavLink>
          ))}
          {isLoggedIn && (
            <button onClick={handleLogout} className="flex items-center gap-2 px-6 py-[2px] bg-gradient-to-r from-green-400 to-teal-500 text-white font-semibold rounded-md shadow-md hover:shadow-lg transition-transform transform hover:scale-105 duration-300">
              Logout
            </button>
          )}
        </nav>

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
          {isLoggedIn && (
            <button onClick={handleLogout} className="block py-2 text-sidebarText hover:text-green-500 transition-colors duration-300">
              Logout
            </button>
          )}
        </nav>
      )}
    </header>
  );
};
