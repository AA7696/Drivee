import React, { useState } from 'react';
import useAuthStore from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Menu, X,AlignLeft } from 'lucide-react';


function Navbar({ toggleSidebar }) {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Logout failed');
      console.error('Logout Error:', error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b px-6 md:px-12 py-4">
      <div className="flex justify-between items-center">
        <button onClick={toggleSidebar} className="lg:hidden text-gray-700">
        <AlignLeft size={28} />
      </button>
        {/* Logo */}
        <div className="text-2xl font-bold text-orange-400">Drivee.</div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <p className="text-gray-500">Welcome, {user?.displayName || 'Admin'}</p>
          <button
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(prev => !prev)} className="text-gray-800 focus:outline-none">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col items-start gap-4 bg-white rounded-lg shadow p-4 transition-all">
          <p className="text-gray-500">Welcome, {user?.displayName || 'Admin'}</p>
          <button
            className="w-full px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
