import { useQuery } from '@tanstack/react-query';
import { db } from '../firebase/firbaseConfig';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

export const fetchAllBookings = async () => {
  const bookingsSnapshot = await getDocs(collection(db, 'bookings'));
  const bookings = [];

  for (let docSnap of bookingsSnapshot.docs) {
    const bookingData = docSnap.data();

    const [vehicleSnap, userSnap] = await Promise.all([
      getDoc(doc(db, 'vehicles', bookingData.vehicleId)),
      getDoc(doc(db, 'users', bookingData.userId)),
    ]);

    bookings.push({
      id: docSnap.id,
      ...bookingData,
      vehicle: vehicleSnap.exists() ? vehicleSnap.data() : null,
      user: userSnap.exists() ? userSnap.data() : null,
    });
  }

  return bookings;
};

export const useAllBookingsWithUser = () => {
  return useQuery({
    queryKey: ['admin-bookings'],
    queryFn: fetchAllBookings,
  });
};
