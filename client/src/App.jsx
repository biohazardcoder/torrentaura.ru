import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RootLayout } from './layout/RootLayout';
import Home from './pages/Home/Home';
import GameDetailPage from './pages/GameDetail/GameDetail';
import { Error } from './pages/Error/Error';
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';
import Contact from './pages/Contact/Contact';
import { BiSolidError } from "react-icons/bi";

function App() {
  return (
    <Router>
      <div className="sm:block lg:hidden absolute top-0 left-0 bg-sidebarBg w-full h-screen flex items-center justify-center">
        <h1 className="text-xl  font-bold text-white md: tracking-wide text-center flex items-center justify-center flex-col p-6  rounded-lg">
          <BiSolidError className='text-8xl' />
          <span className='mt-5'>This site is available only on PC devices</span>
        </h1>
      </div>

      <div className="sm:hidden lg:block">
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="/game/:id" element={<GameDetailPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
