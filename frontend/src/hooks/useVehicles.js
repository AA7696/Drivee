// src/hooks/useVehicles.js
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firbaseConfig';

const fetchVehicles = async () => {
  const querySnapshot = await getDocs(collection(db, 'vehicles'));
  const vehicles = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return vehicles;
};

export const useVehicles = () => {
  return useQuery({
    queryKey: ['vehicles'],
    queryFn: fetchVehicles,
  });
};
