import { useMutation } from '@tanstack/react-query';
import { db } from '../firebase/firbaseConfig';
import { collection, addDoc, doc, updateDoc, serverTimestamp, runTransaction } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Create booking + mark vehicle unavailable
const createBookingAndUpdateVehicle = async (bookingData) => {
  const vehicleRef = doc(db, 'vehicles', bookingData.vehicleId);
  const bookingsRef = collection(db, 'bookings');

  const bookingId = await runTransaction(db, async (transaction) => {
    const vehicleDoc = await transaction.get(vehicleRef);

    if (!vehicleDoc.exists()) {
      throw new Error('Vehicle does not exist.');
    }

    const isAvailable = vehicleDoc.data().isAvailable;

    if (!isAvailable) {
      throw new Error('Vehicle is already booked.');
    }

    // Add booking
    const newBookingRef = doc(bookingsRef); // Generate a new booking doc
    transaction.set(newBookingRef, {
      ...bookingData,
      createdAt: serverTimestamp(),
    });

    // Mark vehicle unavailable
    transaction.update(vehicleRef, {
      isAvailable: false,
    });

    return newBookingRef.id;
  });

  return bookingId;
};
export const useCreateBooking = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createBookingAndUpdateVehicle,
    onSuccess: (bookingId) => {
      toast.success('Booking confirmed!');
      navigate(`/check-out/${bookingId}`);
    },
    onError: (error) => {
       if (error.message.includes("Vehicle is already booked.")) {
    toast.error("Oops! Vehicle just got booked by someone else.");
  } else {
    toast.error("Booking failed!");
  }
    },
  });
};
