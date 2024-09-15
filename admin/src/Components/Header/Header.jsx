import React from "react";
import { SiGamejolt } from "react-icons/si";

export const Header = () => {
  return (
    <header className="bg-sidebarBg h-[60px] shadow-lg flex items-center justify-center">
      <div className="w-full max-w-6xl flex items-center justify-center px-4 text-sidebarText">
        <div className="flex items-center justify-center gap-3">
          <span className="text-[30px] text-accent hover:text-highlight transition-colors duration-300 ease-in-out">
            <SiGamejolt />
          </span>
          <h1 className="text-xl cursor-default font-semibold text-mainText tracking-wide hover:text-highlight transition-colors duration-300 ease-in-out">
            Torrent Aura
          </h1>
        </div>
      </div>
    </header>
  );
};
