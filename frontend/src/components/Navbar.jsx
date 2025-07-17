import React, { useEffect, useState, useRef } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider , db } from '../firebase/firbaseConfig.js';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from "../store/useAuthStore";
import toast from "react-hot-toast";
import { Menu, X } from 'lucide-react'; // hamburger icons
import profile from '../assets/profile.png';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const Navbar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef();
  const { user, logout } = useAuthStore();

  console.log(user.photoURL);
  


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Check if user exists in Firestore
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: new Date().toISOString(),
        role: 'user' 
      });
    }

    toast.success("Logged in successfully!");
    navigate('/rent');
    setMenuOpen(false);
  } catch (error) {
    toast.error("Login failed. Please try again.");
    console.error('Google login error:', error.message);
  }
};

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully!");
    setShowDropdown(false);
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className="w-full  shadow-sm  px-4 sm:px-8 md:px-16 py-4 flex items-center justify-between">
      {/* Logo */}
      <div
        className="text-2xl sm:text-3xl font-bold text-orange-400 cursor-pointer"
        onClick={() => navigate('/')}
      >
        Drivee
      </div>

      {/* Hamburger */}
      <div className="md:hidden">
        {menuOpen ? (
          <X size={28} className="text-white" onClick={() => setMenuOpen(false)} />
        ) : (
          <Menu size={28} className="text-white" onClick={() => setMenuOpen(true)} />
        )}
      </div>

      {/* Desktop Links */}
      <ul className="hidden md:flex space-x-6 font-medium text-white">
        {user ? (
          <>
            <li><Link to="/" className="hover:text-orange-500">Home</Link></li>
            <li><Link to="/rent" className="hover:text-orange-500">Rent</Link></li>
            <li><Link to="/my-booking" className="hover:text-orange-500">My Bookings</Link></li>
          </>
        ) : (
          <>
            <li><a href="#home" className="hover:text-orange-500">Home</a></li>
            <li><a href="#services" className="hover:text-orange-500">Services</a></li>
            <li><a href="#reviews" className="hover:text-orange-500">Reviews</a></li>
          </>
        )}
      </ul>

      {/* Right Side */}
      <div className="hidden md:flex items-center gap-4 relative" ref={dropdownRef}>
        {!user ? (
          <>
            <button
              onClick={() => navigate('/admin')}
              className="px-4 py-2 bg-black text-white rounded shadow transition"
            >
              Admin
            </button>
            <button
              onClick={handleGoogleLogin}
              className="px-4 py-2 bg-black text-white rounded shadow transition"
            >
              Sign Up
            </button>
          </>
        ) : (
          <div className="flex items-center gap-3">
            {user.email === 'admin@gmail.com' ? (
              <>
                <button
                  onClick={() => navigate('/owner')}
                  className="px-4 py-2 bg-black text-white rounded shadow"
                >
                  Dashboard
                </button>

              </>
            ) : (<></>)}
            <img
              src={user?.photoURL || profile}
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-10 h-10 rounded-full border cursor-pointer object-cover"
              alt="profile"
            />
            {showDropdown && (
              <div className="absolute top-14 right-0 w-32  border rounded shadow z-50">
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-sm bg-black  "
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-black/60 px-6 py-4 shadow-lg md:hidden z-40 space-y-4 font-medium text-white transition-all duration-3000 ease-in-out">
          {user ? (
            <>
              <Link to="/" className="block hover:text-orange-500" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/rent" className="block hover:text-orange-500" onClick={() => setMenuOpen(false)}>Rent</Link>
              <Link to="/my-booking" className="block hover:text-orange-500" onClick={() => setMenuOpen(false)}>My Bookings</Link>
              {user.email === 'admin@gmail.com' ? (
                <>
                  <button
                    onClick={() => { navigate('/owner'); setMenuOpen(false); }}
                    className="w-full bg-white text-black"
                  >
                    Dashboard
                  </button>

                </>
              ) : (<></>)}
              <button
                onClick={handleLogout}
                className="w-full bg-white text-black"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="#home" className="block hover:text-orange-500" onClick={() => setMenuOpen(false)}>Home</a>
              <a href="#services" className="block hover:text-orange-500" onClick={() => setMenuOpen(false)}>Services</a>
              <a href="#reviews" className="block hover:text-orange-500" onClick={() => setMenuOpen(false)}>Reviews</a>
              <button
                onClick={() => { navigate('/admin'); setMenuOpen(false); }}
                className="w-full  bg-white text-black"
              >
                Admin
              </button>
              <button
                onClick={handleGoogleLogin}
                className="w-full bg-white text-black"
              >
                Sign In
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
