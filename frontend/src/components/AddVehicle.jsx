import React, { useState } from 'react';
import { db } from '../firebase/firbaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const AddVehicle = () => {
  const [formData, setFormData] = useState({
    name: '',
    stroke: '',
    mileage: '',
    gear: '',
    hp: '',
    engine: '',
    price: 0,
    type: '',
    isAvailable: true,
    transmission: '',
    fuel: '',
    seats: '',
    location: '',
    description: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'isAvailable' ? value === 'true' : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      toast.error("Please add an image.");
      return;
    }

    try {

      await addDoc(collection(db, 'vehicles'), {
        ...formData,
        createdAt: new Date()
      });

      toast.dismiss();
      toast.success('Vehicle added successfully!');
      setFormData({
        name: '',
        stroke: '',
        mileage: '',
        gear: '',
        hp: 0,
        engine: 0,
        price: 0,
        type: '',
        isAvailable: true,
        transmission: '',
        fuel: '',
        seats: 2,
        location: '',
        description: '',
        image: ''
      });
    } catch (err) {
      toast.dismiss();
      console.error(err);
      toast.error('Failed to add vehicle.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto p-6 text-black rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Car</h2>

      <div className="mb-4">
        <label className="block mb-1">Image URL</label>
        <input className="border p-2" name='image' type="text" value={formData.image} placeholder='Image URL'  onChange={handleChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded" required />
        <input type="text" name="stroke" value={formData.stroke} onChange={handleChange} placeholder="Stroke" className="border p-2 rounded" required />
        <input type="text" name="mileage" value={formData.mileage} onChange={handleChange} placeholder="Mileage" className="border p-2 rounded" required />
        <input type="text" name="gear" value={formData.gear} onChange={handleChange} placeholder="Gear" className="border p-2 rounded" required />
        <input type="number" name="hp" value={formData.hp} onChange={handleChange} placeholder="HP" className="border p-2 rounded" required />
        <input type="number" name="engine" value={formData.engine} onChange={handleChange} placeholder="Engine" className="border p-2 rounded" required />
        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price (₹)" className="border p-2 rounded" required />
        <select name="type" value={formData.type} onChange={handleChange} className="border p-2 rounded" required>
          <option value="">Select Type</option>
          <option value="Car">Car</option>
          <option value="Bike">Bike</option>
        </select>
        <select name="isAvailable" value={formData.isAvailable} onChange={handleChange} className="border p-2 rounded" required>
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>
        <select name="transmission" value={formData.transmission} onChange={handleChange} className="border p-2 rounded" required>
          <option value="">Select Transmission</option>
          <option value="Manual">Manual</option>
          <option value="Automatic">Automatic</option>
        </select>
        <select name="fuel" value={formData.fuel} onChange={handleChange} className="border p-2 rounded" required>
          <option value="">Select Fuel</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
        </select>
        <input type="number" name="seats" value={formData.seats} onChange={handleChange} placeholder="Seating Capacity" className="border p-2 rounded" required />
      </div>

      <select name="location" value={formData.location} onChange={handleChange} className="border p-2 rounded mb-4" required>
        <option value="">Select Location</option>
        <option value="Delhi">Delhi</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Bangalore">Bangalore</option>
        <option value="Manali">Manali</option>
        <option value="Chandigarh">Chandigarh</option>
      </select>

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full border p-2 rounded mb-4"
        rows={4}
        required
      />

      <button type="submit" className="bg-black text-white px-6 py-2 rounded hover:bg-gray-900">
        Add Vehicle
      </button>
    </form>
  );
};

export default AddVehicle;
