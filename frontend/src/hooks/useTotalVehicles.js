import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firbaseConfig';

export const useTotalVehicles = () =>
  useQuery({
    queryKey: ['total-vehicles'],
    queryFn: async () => {
      const snap = await getDocs(collection(db, 'vehicles'));
      return snap.size;
    },
  });
