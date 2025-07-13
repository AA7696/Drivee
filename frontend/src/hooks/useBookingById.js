import { doc, getDoc } from 'firebase/firestore';
import { useQuery } from '@tanstack/react-query';
import { db } from '../firebase/firbaseConfig';


const getBookingById = async (id) => {
  const docRef = doc(db, 'bookings', id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) throw new Error('Booking not found');
  return { id: docSnap.id, ...docSnap.data() };
};

export const useBookingById = (id) => {
  return useQuery({
    queryKey: ['booking', id],
     queryFn:() => getBookingById(id),
    enabled: !!id,
  });
};
