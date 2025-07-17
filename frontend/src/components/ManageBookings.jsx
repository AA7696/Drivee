import React from 'react';
import { useAllBookingsWithUser } from '../hooks/useAllBookingsWithUser';
import { db } from '../firebase/firbaseConfig';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const ManageBookings = () => {
  const { data: bookings, isLoading, refetch } = useAllBookingsWithUser();

  const handleCancel = async (bookingId, vehicleId) => {
    const confirm = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, 'bookings', bookingId));
      await updateDoc(doc(db, 'vehicles', vehicleId), {
        isAvailable: true,
      });

      toast.success("Booking cancelled and vehicle marked available.");
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel booking.");
    }
  };

  const handleUpdate = async (bookingId,vehicleId, updates) => {
    try {
      await updateDoc(doc(db, 'bookings', bookingId), updates);
       if (updates.returned === true && vehicleId) {
      await updateDoc(doc(db, 'vehicles', vehicleId), {
        isAvailable: true,
      });
    }
      toast.success("Booking updated.");
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Update failed.");
    }
  };

  if (isLoading) return <p className="p-6">Loading bookings...</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-2">Manage Bookings</h1>
      <p className="text-gray-500 mb-6">
        Track and manage customer bookings, payments, and vehicle handover.
      </p>

      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full table-auto text-left text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-4">Car</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Date Range</th>
              <th className="p-4">Total</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Given</th>
              <th className="p-4">Returned</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((b) => (
              <tr key={b.id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">{b.vehicle?.name || 'N/A'}</td>
                <td className="p-4">{b.user?.name || b.user?.email || 'Unknown User'}</td>
                <td className="p-4">
                  {new Date(b.pickupDate).toLocaleDateString()} -{' '}
                  {new Date(b.dropoffDate).toLocaleDateString()}
                </td>
                <td className="p-4">₹{b.total}</td>
                <td className="p-4">
                  <span className={`font-semibold ${b.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600'}`}>
                    {b.paymentStatus}
                  </span>
                </td>
                <td className="p-4">{b.given ? '✅' : '❌'}</td>
                <td className="p-4">{b.returned ? '✅' : '❌'}</td>

                <td className="p-4 space-y-2 ">
                  {!b.given && (
                    <button
                      onClick={() => handleCancel(b.id, b.vehicleId)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                    >
                       Cancel
                    </button>
                  )}

                  {b.paymentStatus === 'pending' && (
                    <button
                      onClick={() => handleUpdate(b.id,b.vehicleId, { paymentStatus: 'paid' })}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-xs"
                    >
                      Mark Paid
                    </button>
                  )}

                  {!b.given && (
                    <button
                      onClick={() => handleUpdate(b.id,b.vehicleId, { given: true })}
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-xs"
                    >
                      Mark Given
                    </button>
                  )}

                  {b.given && !b.returned && (
                    <button
                      onClick={() => handleUpdate(b.id,b.vehicleId, { returned: true })}
                      className="bg-green-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Mark Returned
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {bookings?.length === 0 && (
              <tr>
                <td colSpan="8" className="p-6 text-center text-gray-500">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;
