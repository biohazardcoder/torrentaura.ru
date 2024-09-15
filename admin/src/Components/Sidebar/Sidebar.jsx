import React from "react";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  return (
    <aside className="bg-sidebarBg h-screen shadow-lg">
      <ul className="h-full flex flex-col ">
        {[
          { path: "/", label: "Dashboard" },
          { path: "/admins", label: "Admins" },
          { path: "/games", label: "Games" },
          { path: "/clients", label: "Clients" },
        ].map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `flex items-center text-lg font-semibold p-4 transition-colors duration-300 
                ${isActive ? "bg-highlight text-highlightText" : "text-sidebarText hover:bg-hoverBg hover:text-hoverText"}`
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};
