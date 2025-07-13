import React from 'react'
import Navbar from '../components/Navbar'
import Vehicle from '../components/Vehicle'
import { useVehicles } from '../hooks/useVehicles'
import { useFilterStore } from '../store/useFilterStore';
import { useFilteredVehiclesOnMount } from '../hooks/useFilteredVehiclesOnMount';
import Loading from '../components/Loading'
import Error from '../components/Error'

const RentPage = () => {
  const { data, isLoading, isError } = useVehicles();
  const { type, fuel, location, transmission, setFilters, clearFilters } = useFilterStore();
  const filteredVehicles = useFilteredVehiclesOnMount(data);

  const handleFilterChange = (key, value) => {
    setFilters({ [key]: value });
  };



  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    )
  };
  if (isError) {
    <>
      <Error />
    </>
  };
  return (

    <div className=' w-screen min-h-screen text-white bg-white flex flex-col items-center  '>

      <div
        className="w-full bg-cover bg-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://tse4.mm.bing.net/th/id/OIP.DZ5UrsDHY8ndPcJ6A6A9egHaE7?rs=1&pid=ImgDetMain&o=7&rm=3')`,
        }}
      >
        {/* Navbar */}
        <Navbar />

        {/* Hero Content */}
        <div className="relative  text-white py-16 px-6">
          <h1 className="text-4xl lg:text-5xl font-bold text-center">
            Rent A Vehicle Rent Your Freedom
          </h1>
          {/* Decorative Illustration */}
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/path-to-hero-bg.svg')] bg-cover bg-no-repeat opacity-30 z-0"></div>
        </div>

      </div>
      {/* Filters box */}
      <div className="bg-white shadow-xl rounded-xl mx-4 sm:mx-6 lg:mx-20 px-6 py-5 mt-8 flex flex-wrap items-center justify-between gap-6 text-black">

        {/* Vehicle Type */}
        <div className="flex flex-col w-full sm:w-[180px]">
          <label className="mb-2 font-semibold text-gray-700">Vehicle</label>
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
        <div className="flex flex-col w-full sm:w-[180px]">
          <label className="mb-2 font-semibold text-gray-700">Location</label>
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
          >
            <option value="">Select Location</option>
            <option>Delhi</option>
            <option>Mumbai</option>
            <option>Bangalore</option>
            <option>Chandigarh</option>
            <option>Manali</option>
          </select>
        </div>

        {/* Fuel Type */}
        <div className="flex flex-col w-full sm:w-[180px]">
          <label className="mb-2 font-semibold text-gray-700">Fuel</label>
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={fuel}
            onChange={(e) => handleFilterChange('fuel', e.target.value)}
          >
            <option value="">Select Fuel Type</option>
            <option>Petrol</option>
            <option>Diesel</option>
            <option>Electric</option>
          </select>
        </div>

        {/* Transmission */}
        <div className="flex flex-col w-full sm:w-[180px]">
          <label className="mb-2 font-semibold text-gray-700">Transmission</label>
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
        <div className="w-full sm:w-auto mt-2">
          <button
          onClick={clearFilters}
            className="bg-black text-white font-semibold px-8 py-3 rounded-lg transition duration-300 hover:bg-gray-900 w-full"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Vehicle cards */}
      <div className="p-6  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center items-center">
        {filteredVehicles.length > 0 ? (
          filteredVehicles.map((item) => (
            <Vehicle key={item.id} item={item} />
          ))
        ) : (
          <div className="text-center col-span-full text-gray-600 text-lg font-medium">
            No vehicles found matching your filters.
          </div>
        )}

      </div>


    </div>
  )
}

export default RentPage

// bg-white shadow-lg rounded-lg p-4 flex flex-wrap gap-4 items-center justify-center -mt-12 relative z-10 max-w-5xl mx-auto