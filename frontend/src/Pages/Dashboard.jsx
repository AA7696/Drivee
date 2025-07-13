import React, { useState } from 'react';
import DashboardNavbar from '../components/DashboardNavbar';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col min-h-screen w-screen bg-gray-50">
      {/* Pass toggle state and handler */}
      <DashboardNavbar toggleSidebar={() => setIsSidebarOpen(prev => !prev)} />
      <div className="flex flex-1 mt-16">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <div className="flex-1 p-4 sm:p-10 overflow-auto bg-gray-50 lg:ml-60">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
