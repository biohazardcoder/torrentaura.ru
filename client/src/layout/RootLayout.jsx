import React from 'react'
import { Outlet } from "react-router-dom";
import { Header } from '../components/Header';
import Sidebar from '../components/Sidebar/Sidebar';

export const RootLayout = () => {
  return (
    <div className='grid grid-cols-6 grid-rows-11 h-screen' >
      <Header />
      <Outlet />
    </div>
  )
}
