// src/hooks/useCreateBooking.js
import { useMutation } from '@tanstack/react-query';
import { db } from '../firebase/firbaseConfig';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import  toast  from 'react-hot-toast';
import { data, useNavigate } from 'react-router-dom';

const createBookingAndUpdateVehicle = async (bookingData) => {
  // Step 1: Create Booking
  const bookingRef = await addDoc(collection(db, 'bookings'), bookingData);

  // Step 2: Update vehicle availability
  const vehicleRef = doc(db, 'vehicles', bookingData.vehicleId);
  await updateDoc(vehicleRef, {
    isAvailable: false
  });

  return bookingRef.id;
};

export const useCreateBooking = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: createBookingAndUpdateVehicle,
    onSuccess: (data) => {
      toast.success('Booking confirmed ');
      navigate(`/check-out/${data}`)
    },
    onError: (error) => {
      toast.error('Booking failed!');
      console.error(error);
    }
  });
};
