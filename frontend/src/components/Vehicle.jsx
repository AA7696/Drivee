import React from 'react';
import { useNavigate } from 'react-router-dom';

const Vehicle = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-lg shadow-md p-4 text-black w-full sm:w-[250px]">
      <img src={item.image} alt={item.name} className="w-full h-40 object-contain" />
      <div className=' w-full flex flex-row items-center  justify-between 
      
      '>
        <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
        <p className={` ${item.isAvailable? `bg-green-300`: `bg-red-300`} rounded-full text-sm px-2 p-1 `}>{item.isAvailable ? 'Available' : 'Booked'}</p>

      </div>
      <div className="text-sm mt-2 space-y-1 grid grid-cols-2 gap-2">
        <p>Seats: {item.seats}</p>
        <p>Horsepower: {item.hp}</p>
        <p>Fuel: {item.fuel}</p>
        <p>Mileage: {item.mileage}</p>
        <p>Transmission: {item.transmission}</p>
        <p>Location: {item.location}</p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <p className="text-lg font-bold">₹{item.price} <span className="text-sm font-normal">Per Hour</span></p>
        <button
        disabled={!item.isAvailable}
          onClick={() => navigate(`/vehicle/${item.id}`)}
          className={`${item.isAvailable? `bg-black cursor-pointer`: `bg-gray-500 cursor-not-allowed`} text-white px-4 py-2 rounded`}>Rent </button>
      </div>
    </div>
  );
};

export default Vehicle;
