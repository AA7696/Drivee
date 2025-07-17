import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import profile from '../assets/profile.png'
import {CarFront, LayoutDashboard, Plus, NotebookText} from 'lucide-react'

function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/owner', icon: <LayoutDashboard /> },
    { name: 'Add Vehicle', path: '/owner/add-car', icon: <Plus /> },
    { name: 'Manage Vehicle', path: '/owner/manage-cars', icon: <CarFront /> },
    { name: 'Manage Bookings', path: '/owner/manage-bookings', icon: <NotebookText /> },
  ];

  return (
    <aside className={`${isOpen? `w-60`: ` hidden`} bg-white shadow-md flex-col items-center p-6 fixed h-full lg:flex z-40`}>
      {/* Profile Section */}
      <div className="flex flex-col items-center gap-2 mb-6">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
          <img src={profile} alt="" />
        </div>
        <p className="text-lg font-semibold">Aachman</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 w-full">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 text-sm font-medium ${
                isActive
                  ? 'bg-orange-400 text-white shadow'
                  : 'text-gray-700 hover:bg-orange-100'
              }`}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
