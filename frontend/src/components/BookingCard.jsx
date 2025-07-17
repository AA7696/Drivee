import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firbaseConfig";
import toast from "react-hot-toast";

const BookingCard = ({ booking, index, refetch }) => {
  const navigate = useNavigate();

  const handleCancel = async (bookingId, vehicleId) => {
    const confirm = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirm) return;

    try {
      // Step 1: Delete booking
      await deleteDoc(doc(db, "bookings", bookingId));

      // Step 2: Mark vehicle as available
      await updateDoc(doc(db, "vehicles", vehicleId), {
        isAvailable: true,
      });

      toast.success("Booking cancelled.");
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel booking.");
    }
  };

  return (
    <div className="border rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm bg-white mt-4">
      {/* Vehicle Image & Info */}
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

      {/* Booking Details */}
      <div className="flex-1 mt-4 md:mt-0 md:ml-6 space-y-2">
        <div className="flex items-center gap-2">
          <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
            Booking #{index + 1}
          </span>
          <span
            className={`${booking.paymentStatus === "paid" ? "bg-green-400" : "bg-red-400"
              } px-3 py-1 rounded-full text-sm font-medium`}
          >
            {booking.paymentStatus}
          </span>
        </div>

        <div className="flex items-center text-sm gap-2 text-gray-700">
          <span>
            Rental Period: {booking.pickupDate.split("T")[0]} to{" "}
            {booking.dropoffDate.split("T")[0]}
          </span>
        </div>

        <div className="flex items-center text-sm gap-2 text-gray-700">
          <span>Pick-up Location: {booking.location}</span>
        </div>
      </div>

      {/* Price and Actions */}
      <div className="text-right mt-4 md:mt-0">
        <p className="text-xs text-gray-400">Total Price</p>
        <h3 className="text-xl font-bold text-blue-600">₹{booking.total}</h3>

        <div className="flex flex-col gap-2 mt-3">
          {/* Cancel Button - only if vehicle not given */}
          {!booking.given ? (
            <button
              onClick={() => handleCancel(booking.id, booking.vehicleId)}
              className="bg-red-500 text-white font-bold py-2 px-6 rounded"
            >
              Cancel
            </button>
          ) : (
            booking.returned ? (
              <p className="text-green-600 font-semibold text-sm">
                 Thank you for renting our vehicle!
              </p>
            ) : (
              <p className="text-red-500 text-sm font-semibold">
                Vehicle already given. Cannot cancel.
              </p>
            )
          )}

          {/* Pay Now Button - only if not paid */}
          {booking.paymentStatus === "pending" && (
            <button
              className="px-6 py-2 bg-black text-white rounded transition"
              onClick={() => navigate(`/check-out/${booking.id}`)}
            >
              Pay Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
