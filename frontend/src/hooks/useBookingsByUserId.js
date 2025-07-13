import { useQuery } from '@tanstack/react-query';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firbaseConfig';
const getBookingsByUserId = async (userId) => {
  const q = query(
    collection(db, 'bookings'),
    where('userId', '==', userId)
  );

  const querySnapshot = await getDocs(q);
  const bookingsWithVehicle = [];

  for (const bookingDoc of querySnapshot.docs) {
    const bookingData = bookingDoc.data();
    const vehicleRef = doc(db, 'vehicles', bookingData.vehicleId);

    const vehicleSnap = await getDoc(vehicleRef);
    const vehicleData = vehicleSnap.exists() ? vehicleSnap.data() : null;

    bookingsWithVehicle.push({
      id: bookingDoc.id,
      ...bookingData,
      vehicle: vehicleData, // embedded vehicle info
    });
  }

  return bookingsWithVehicle;
};

export const useBookingByUserId = (userId) => {
  return useQuery({
    queryKey: ['bookings', userId],
    queryFn: () => getBookingsByUserId(userId),
    enabled: !!userId,
  });
};
