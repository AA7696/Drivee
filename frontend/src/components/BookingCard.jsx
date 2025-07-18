import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firbaseConfig";
import toast from "react-hot-toast";

const BookingCard = ({ booking, index, refetch }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [pickupDate, setPickupDate] = useState(booking.pickupDate);
  const [dropoffDate, setDropoffDate] = useState(booking.dropoffDate);
  const [isSaving, setIsSaving] = useState(false);

  const handleCancel = async (bookingId, vehicleId) => {
    const confirm = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, "bookings", bookingId));
      await updateDoc(doc(db, "vehicles", vehicleId), { isAvailable: true });
      toast.success("Booking cancelled.");
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel booking.");
    }
  };

  const handleSaveChanges = async () => {
    if (!pickupDate || !dropoffDate) {
      toast.error("Both pickup and dropoff dates are required.");
      return;
    }

    const start = new Date(pickupDate);
    const end = new Date(dropoffDate);
    const diffMs = end - start;
    const hours = Math.ceil(diffMs / (1000 * 60 * 60));

    if (hours <= 0) {
      toast.error("Drop-off must be after pick-up.");
      return;
    }

    const pricePerHour = booking.vehicle.price || 100; // fallback
    const newTotal = pricePerHour * hours;

    setIsSaving(true);
    try {
      await updateDoc(doc(db, "bookings", booking.id), {
        pickupDate,
        dropoffDate,
        duration: hours,
        total: newTotal,
      });
      toast.success("Booking updated.");
      setIsEditing(false);
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update booking.");
    } finally {
      setIsSaving(false);
    }
  };

  const calculatedHours = Math.ceil(
    (new Date(dropoffDate) - new Date(pickupDate)) / (1000 * 60 * 60)
  );
  const calculatedTotal = calculatedHours * (booking.vehicle.price || 100);
   const nowISO = new Date().toISOString().slice(0, 16); 



  return (
    <div className="border rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm bg-white mt-4 relative">
      {/* Vehicle Info */}
      <div className="flex items-center gap-4">
        <img
          src={booking.vehicle.image}
          alt={booking.vehicle.name}
          className="w-32 h-24 object-cover rounded"
        />
        <div>
          <h2 className="text-lg font-bold">{booking.vehicle.name}</h2>
          <p className="text-gray-500 text-sm">
            • {booking.vehicle.type} • {booking.vehicle.location}
          </p>
        </div>
      </div>

      {/* Booking Info */}
      <div className="flex-1 mt-4 md:mt-0 md:ml-6 space-y-2">
        <div className="flex items-center gap-2">
          <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
            Booking #{index + 1}
          </span>
          <span
            className={`${
              booking.paymentStatus === "paid" ? "bg-green-400" : "bg-red-400"
            } px-3 py-1 rounded-full text-sm font-medium`}
          >
            {booking.paymentStatus}
          </span>
        </div>

        <p className="text-sm text-gray-700">
          Rental Period: {pickupDate.split("T")[0]} to {dropoffDate.split("T")[0]}
        </p>
        <p className="text-sm text-gray-700">Pick-up Location: {booking.location}</p>
      </div>

      {/* Price and Actions */}
      <div className="text-right mt-4 md:mt-0">
        <p className="text-xs text-gray-400">Total Price</p>
        <h3 className="text-xl font-bold text-blue-600">₹{booking.total}</h3>

        <div className="flex flex-row gap-2 mt-3">
          {!booking.given ? (
            <button
              onClick={() => handleCancel(booking.id, booking.vehicleId)}
              className="bg-red-500 text-white font-bold py-2 px-6 rounded"
            >
              Cancel
            </button>
          ) : booking.returned ? (
            <p className="text-green-600 font-semibold text-sm">
              Thank you for renting our vehicle!
            </p>
          ) : (
            <p className="text-red-500 text-sm font-semibold">
              Vehicle already given. Cannot cancel.
            </p>
          )}

          {booking.paymentStatus === "pending" && !booking.given && (
            <>
              <button
                className="px-6 py-2 bg-black text-white rounded transition"
                onClick={() => navigate(`/check-out/${booking.id}`)}
              >
                Pay Now
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-blue-400 text-white rounded transition"
              >
                Edit
              </button>
            </>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/30 z-50">
          <div className="my-component rounded-lg shadow-lg p-6 w-full max-w-sm">
            <label className="block text-sm font-medium mb-1">Pick-Up</label>
            <input
              type="datetime-local"
              min={nowISO}
              className="w-full border px-3 py-2 rounded mb-4"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
            />

            <label className="block text-sm font-medium mb-1">Drop-Off</label>
            <input
              type="datetime-local"
              min={pickupDate || nowISO}
              className="w-full border px-3 py-2 rounded mb-4"
              value={dropoffDate}
              onChange={(e) => setDropoffDate(e.target.value)}
            />

            {calculatedHours > 0 && (
              <div className="flex justify-between items-center mb-2 text-sm">
                <span>Duration:</span>
                <span className="font-semibold">{calculatedHours} hours</span>
              </div>
            )}
            {calculatedTotal > 0 && (
              <div className="flex justify-between items-center mb-4 text-sm">
                <span>Total:</span>
                <span className="font-bold text-blue-600">₹{calculatedTotal}</span>
              </div>
            )}

            <button
              disabled={isSaving}
              onClick={handleSaveChanges}
              className="btn  w-full py-2 rounded mt-2"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="btn  w-full py-2 rounded mt-3"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingCard;
