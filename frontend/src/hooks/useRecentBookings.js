import { useQuery } from '@tanstack/react-query';
import { collection, query, orderBy, limit, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firbaseConfig';

export const useRecentBookings = () =>
  useQuery({
    queryKey: ['recent-bookings'],
    queryFn: async () => {
      const bookingsSnap = await getDocs(
        query(collection(db, 'bookings'), orderBy('pickupDate', 'desc'), limit(5))
      );

      return await Promise.all(
        bookingsSnap.docs.map(async (docSnap) => {
          const booking = docSnap.data();
          let vehicleName = '';
          try {
            const vehicleRef = doc(db, 'vehicles', booking.vehicleId);
            const vehicleSnap = await getDoc(vehicleRef);
            if (vehicleSnap.exists()) {
              vehicleName = vehicleSnap.data().name;
            }
          } catch (err) {
            console.warn('Vehicle fetch failed', err);
          }

          return {
            id: docSnap.id,
            ...booking,
            vehicleName,
          };
        })
      );
    },
  });
