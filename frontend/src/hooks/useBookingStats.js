import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firbaseConfig';

export const useBookingStats = () =>
  useQuery({
    queryKey: ['booking-stats'],
    queryFn: async () => {
      const allSnap = await getDocs(collection(db, 'bookings'));
      const pendingSnap = await getDocs(query(collection(db, 'bookings'), where('paymentStatus', '==', 'pending')));
      const confirmedSnap = await getDocs(query(collection(db, 'bookings'), where('paymentStatus', '==', 'paid')));

      let totalRevenue = 0;
      confirmedSnap.forEach((doc) => {
        totalRevenue += doc.data().total || 0;
      });

      return {
        total: allSnap.size,
        pending: pendingSnap.size,
        confirmed: confirmedSnap.size,
        revenue: totalRevenue,
      };
    },
  });
