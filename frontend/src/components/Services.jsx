// components/RentOptionsSection.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
const Services = () => {
  const navigate = useNavigate();

  const handleRent = () => {
    navigate('/rent');
  };

return (
    <div id="services" className="px-6 md:px-20 py-16 space-y-20 bg-white">

        {/* Rent a Car */}
        <div className="flex flex-col md:flex-row items-center gap-10 rounded-xl shadow p-8 ">
            <div className="md:w-1/2 space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Rent A Car</h2>
                <div className="flex space-x-2">
                    <span className="bg-white text-gray-800 px-3 py-1 rounded text-sm border">LUXURY</span>
                    <span className="bg-white text-gray-800 px-3 py-1 rounded text-sm border">COMFORT</span>
                    <span className="bg-white text-gray-800 px-3 py-1 rounded text-sm border">PRESTIGE</span>
                </div>
                <p className="text-gray-700">
                    Booking a self-driving car with us is simple and easy. You can browse our selection of vehicles online,
                    choose the car that best fits your needs, and book it for the duration of your choice. Our user-friendly
                    platform allows you to manage your bookings and view your trip history with ease.
                </p>
                <button
                    onClick={handleRent}
                 className="mt-4 px-5 py-2 bg-black text-white rounded  transition">Rent Car</button>
            </div>

            <img src='https://retrofitlab.com/cdn/shop/collections/6_e63_e64.jpg?v=1648794029' alt="Car" className="md:w-1/2 rounded-xl shadow-md" />
        </div>
        
        <div className="flex flex-col-reverse md:flex-row items-center gap-10 rounded-xl shadow p-8 ">
            <img src='https://static.toiimg.com/photo/80452572/Top-15-Sports-Bikes-in-India.jpg' alt="Bike" className="md:w-1/2 rounded-xl shadow-md" />

            <div className="md:w-1/2 space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Rent A Bike</h2>
                <div className="flex space-x-2">
                    <span className="bg-white text-gray-800 px-3 py-1 rounded text-sm border">LUXURY</span>
                    <span className="bg-white text-gray-800 px-3 py-1 rounded text-sm border">COMFORT</span>
                    <span className="bg-white text-gray-800 px-3 py-1 rounded text-sm border">PRESTIGE</span>
                </div>
                <p className="text-gray-700">
                    Booking a self-driving bike with us is simple and easy. You can browse our selection of vehicles online,
                    choose the bike that best fits your needs, and book it for the duration of your choice. Our user-friendly
                    platform allows you to manage your bookings and view your trip history with ease.
                </p>
                <button
                    onClick={handleRent} 
                className="mt-4 px-5 py-2 bg-black text-white rounded hover:bg-gray-800 transition">Rent Bike</button>
            </div>
        </div>
         <div className="px-6 lg:px-20 py-16 bg-black">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
        
        {/* Left Text */}
        <div className="lg:w-1/2 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">Why Choose Us</h2>
          <p className="text-white">
            Booking a self-driving car with us is simple and easy. You can browse our selection of vehicles online,
            choose the car that best fits your needs, and book it for the duration of your choice.
          </p>
        </div>

        {/* Right Stats */}
        <div className="bg-white shadow-md rounded-xl px-6 py-6 flex justify-around w-full md:w-1/2 text-center">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-black">45k+</div>
            <div className="text-sm text-gray-500">SuccessTour</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-black">1M+</div>
            <div className="text-sm text-gray-500">Happy Customer</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-black">3+</div>
            <div className="text-sm text-gray-500">Year Experience</div>
          </div>
        </div>

      </div>
    </div>
    </div>
);
};

export default Services;
