import React, { useState } from 'react';
import { useVehicles } from '../hooks/useVehicles';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firbaseConfig';
import toast from 'react-hot-toast';
import {Trash,Pencil} from 'lucide-react'

const ManageVehicle = () => {
  const { data: vehicles, isLoading, refetch } = useVehicles();
  const [editingVehicle, setEditingVehicle] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this vehicle?')) return;
    await deleteDoc(doc(db, 'vehicles', id));
    toast.success('Vehicle deleted');
    refetch();
  };

  const toggleAvailability = async (id, currentStatus) => {
    await updateDoc(doc(db, 'vehicles', id), {
      isAvailable: !currentStatus,
    });
    toast.success('Availability updated');
    refetch();
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedData = {
      name: form.name.value,
      stroke: form.stroke.value,
      mileage: form.mileage.value,
      gear: form.gear.value,
      hp: form.hp.value,
      engine: form.engine.value,
      price: Number(form.price.value),
      type: form.type.value,
      fuel: form.fuel.value,
      transmission: form.transmission.value,
      isAvailable: form.isAvailable.value === 'true',
      seats: Number(form.seats.value),
      location: form.location.value,
      description: form.description.value,
      image: form.image.value, // update from text input
    };

    try {
      await updateDoc(doc(db, 'vehicles', editingVehicle.id), updatedData);
      toast.success('Vehicle updated');
      setEditingVehicle(null);
      refetch();
    } catch (error) {
      console.error(error);
      toast.error('Update failed');
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold mb-2 text-black">Manage Cars</h2>
      <p className="text-gray-600 mb-4">Edit or remove listed vehicles below.</p>

      <div className="overflow-x-auto">
        <table className="w-full border text-left rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3">Car</th>
              <th className="p-3">Type</th>
              <th className="p-3">Price</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles?.map((vehicle) => (
              <tr key={vehicle.id} className="border-b">
                <td className="p-3 flex items-center gap-2">
                  <img src={vehicle.image} alt={vehicle.name} className="h-12 w-12 object-cover rounded" />
                  <span className="text-black">{vehicle.name}</span>
                </td>
                <td className="p-3 text-black">{vehicle.type}</td>
                <td className="p-3 text-black">₹{vehicle.price}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded font-semibold ${
                      vehicle.isAvailable ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {vehicle.isAvailable ? 'Available' : 'Not Available'}
                  </span>
                </td>
                <td className="p-3 space-x-2">
                  <button onClick={() => toggleAvailability(vehicle.id, vehicle.isAvailable)} className="text-sm text-blue-600 hover:underline">
                    Toggle
                  </button>
                  <button onClick={() => handleEdit(vehicle)} className="text-sm text-green-600 hover:underline">
                    <Pencil />
                  </button>
                  <button onClick={() => handleDelete(vehicle.id)} className="text-sm text-red-600 hover:underline">
                    <Trash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {vehicles?.length === 0 && (
          <p className="text-center py-6 text-gray-500">No vehicles found.</p>
        )}
      </div>

      {/* Edit Modal */}
      {editingVehicle && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50 text-black">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl overflow-y-auto max-h-[90vh]">
            <h3 className="text-xl font-semibold mb-4">Edit Vehicle</h3>
            <form onSubmit={handleUpdate} className="grid grid-cols-1 gap-3">
              <label>
                Image URL
                <input type="text" name="image" defaultValue={editingVehicle.image} className="border p-2 rounded w-full" required />
              </label>
              <label>
                Name
                <input type="text" name="name" defaultValue={editingVehicle.name} className="border p-2 rounded w-full" required />
              </label>
              <label>
                Stroke
                <input type="text" name="stroke" defaultValue={editingVehicle.stroke} className="border p-2 rounded w-full" required />
              </label>
              <label>
                Mileage
                <input type="text" name="mileage" defaultValue={editingVehicle.mileage} className="border p-2 rounded w-full" required />
              </label>
              <label>
                Gear
                <input type="text" name="gear" defaultValue={editingVehicle.gear} className="border p-2 rounded w-full" required />
              </label>
              <label>
                Horsepower
                <input type="text" name="hp" defaultValue={editingVehicle.hp} className="border p-2 rounded w-full" required />
              </label>
              <label>
                Engine
                <input type="text" name="engine" defaultValue={editingVehicle.engine} className="border p-2 rounded w-full" required />
              </label>
              <label>
                Price
                <input type="number" name="price" defaultValue={editingVehicle.price} className="border p-2 rounded w-full" required />
              </label>
              <label>
                Seats
                <input type="number" name="seats" defaultValue={editingVehicle.seats} className="border p-2 rounded w-full" required />
              </label>
              <label>
                Type
                <select name="type" defaultValue={editingVehicle.type} className="border p-2 rounded w-full" required>
                  <option value="Car">Car</option>
                  <option value="Bike">Bike</option>
                </select>
              </label>
              <label>
                Fuel
                <select name="fuel" defaultValue={editingVehicle.fuel} className="border p-2 rounded w-full" required>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                </select>
              </label>
              <label>
                Transmission
                <select name="transmission" defaultValue={editingVehicle.transmission} className="border p-2 rounded w-full" required>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </select>
              </label>
              <label>
                Availability
                <select name="isAvailable" defaultValue={editingVehicle.isAvailable.toString()} className="border p-2 rounded w-full" required>
                  <option value="true">Available</option>
                  <option value="false">Not Available</option>
                </select>
              </label>
              <label>
                Location
                <select name="location" defaultValue={editingVehicle.location} className="border p-2 rounded w-full" required>
                  <option value="Delhi">Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Manali">Manali</option>
                </select>
              </label>
              <label>
                Description
                <textarea name="description" defaultValue={editingVehicle.description} rows={3} className="border p-2 rounded w-full" required />
              </label>

              <div className="flex justify-end gap-2 mt-4">
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Update</button>
                <button type="button" onClick={() => setEditingVehicle(null)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageVehicle;
