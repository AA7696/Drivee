import React from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { useFilterStore } from '../store/useFilterStore';
import bg from '../assets/bg.jpg'
import useAuthStore from '../store/useAuthStore';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, db } from '../firebase/firbaseConfig.js';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';


const HeroSection = () => {
  const navigate = useNavigate();
  const { type, fuel, location, transmission, setFilters } = useFilterStore();
  const { user } = useAuthStore();

  const handleFilterChange = (key, value) => {
    setFilters({ [key]: value });
  };

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
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error('Google login error:', error.message);
    }
  };




  return (
    <div
      className="min-h-screen w-screen bg-cover bg-center text-white relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${bg})`,
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className=" w-full flex flex-col items-center justify-center text-center pt-32 px-4 sm:px-10 lg:px-20">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight tracking-wide">
          Unlock Endless Driving <br /> With <span className="text-orange-300">Drivee</span>
        </h1>

        <p className="text-gray-300 text-sm sm:text-base max-w-2xl mb-6">

          Drive your self, Enjoy your ride, we aim to revolutionize sustainable mobility through our diverse fleet of exceptional vehicles        </p>
        {
          !user ? (
            <>
              <button
                onClick={handleGoogleLogin}
                className="bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500
              px-8 py-3 rounded-full text-white font-medium shadow-lg transition-all duration-300"
              >
                Sign Up
              </button>

            </>
          ) :
            (
              <>
                <button
                  onClick={() => navigate('/rent')}
                  className="bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500
              px-8 py-3 rounded-full text-white font-medium shadow-lg transition-all duration-300"
                >
                  Rent Your Vehicle
                </button>

              </>
            )
        }

      </div>

      {/* Filter Form */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-10%] sm:bottom-[-7%] md:bottom-[-5%] w-[90%] max-w-6xl bg-white rounded-xl shadow-2xl px-6 py-6 grid grid-cols-2 md:grid-cols-3  justify-center gap-4 text-black">
        {/* Vehicle Type */}
        <div className="flex flex-col w-[140px] sm:w-[180px]">
          <label className="mb-1 font-semibold text-gray-700">Vehicle</label>
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
          >
            <option value="">Select Type</option>
            <option>Car</option>
            <option>Bike</option>
          </select>
        </div>

        {/* Location */}
        <div className="flex flex-col w-[140px] sm:w-[180px]">
          <label className="mb-1 font-semibold text-gray-700">Location</label>
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
          >
            <option value="">Select</option>
            <option>Delhi</option>
            <option>Mumbai</option>
            <option>Bangalore</option>
            <option>Chandigarh</option>
            <option>Manali</option>
          </select>
        </div>

        {/* Fuel */}
        <div className="flex flex-col w-[140px] sm:w-[180px]">
          <label className="mb-1 font-semibold text-gray-700">Fuel</label>
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={fuel}
            onChange={(e) => handleFilterChange('fuel', e.target.value)}
          >
            <option value="">Select</option>
            <option>Petrol</option>
            <option>Diesel</option>
            <option>Electric</option>
          </select>
        </div>

        {/* Transmission */}
        <div className="flex flex-col w-[140px] sm:w-[180px]">
          <label className="mb-1 font-semibold text-gray-700">Transmission</label>
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={transmission}
            onChange={(e) => handleFilterChange('transmission', e.target.value)}
          >
            <option value="">Select</option>
            <option>Manual</option>
            <option>Automatic</option>
          </select>
        </div>

        {/* Search Button */}
        <div className="w-full sm:w-auto mt-4 sm:mt-auto">
          <button
            onClick={() => navigate('/rent')}
            className="bg-black text-white font-semibold px-8 py-3 rounded-lg transition duration-300 hover:bg-gray-900 w-full"
          >
            Search Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
