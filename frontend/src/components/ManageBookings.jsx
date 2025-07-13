import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { db } from '../firebase/firbaseConfig';
import { collection, getDocs, doc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { Trash } from 'lucide-react';


const fetchBookings = async () => {
  const bookingsSnapshot = await getDocs(collection(db, 'bookings'));
  const bookings = [];

  for (let docSnap of bookingsSnapshot.docs) {
    const bookingData = docSnap.data();
    const vehicleRef = doc(db, 'vehicles', bookingData.vehicleId);
    const vehicleSnap = await getDoc(vehicleRef);

    const userRef = doc(db, 'users', bookingData.userId)
    const userSnap = await getDoc(userRef);

    bookings.push({
      id: docSnap.id,
      ...bookingData,
      vehicle: vehicleSnap.exists() ? vehicleSnap.data() : null,
      user: userSnap.exists() ? userSnap.data() : null
    });
  }

  return bookings;
};

const ManageBookings = () => {
  const { data: bookings, isLoading, refetch } = useQuery({
    queryKey: ['admin-bookings'],
    queryFn: fetchBookings,
  });

  const handleCancel = async (bookingId, vehicleId) => {
    const confirm = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirm) return;

    try {
      // Step 1: Delete booking
      await deleteDoc(doc(db, 'bookings', bookingId));

      // Step 2: Update vehicle availability
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

  if (isLoading) return <p className="p-6">Loading bookings...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-2">Manage Bookings</h1>
      <p className="text-gray-500 mb-6">
        Track all customer bookings, approve or cancel requests, and manage booking statuses.
      </p>

      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full table-auto text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-4">Car</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Date Range</th>
              <th className="p-4">Total</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((b) => (
              <tr key={b.id} className="border-t">
                <td className="p-4 font-medium">{b.vehicle?.name || 'N/A'}</td>
                <td className="p-4">{b.user?.name || 'N/A'}</td>
                <td className="p-4">
                  {new Date(b.pickupDate).toLocaleDateString()} -{" "}
                  {new Date(b.dropoffDate).toLocaleDateString()}
                </td>
                <td className="p-4">₹{b.total}</td>
                <td className="p-4">
                  <span className={`font-semibold ${b.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600'}`}>
                    {b.paymentStatus}
                  </span>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleCancel(b.id, b.vehicleId)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    <Trash />
                  </button>
                </td>
              </tr>
            ))}
            {bookings?.length === 0 && (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">No bookings found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;
