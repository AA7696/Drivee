import { useQuery } from '@tanstack/react-query';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firbaseConfig';

const fetchVehicleById = async (id) => {
  const docRef = doc(db, 'vehicles', id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error('Vehicle not found');
  }

  return { id: docSnap.id, ...docSnap.data() };
};

export const useVehicleById = (id) => {
  return useQuery({
    queryKey: ['vehicle', id],
    queryFn: () => fetchVehicleById(id),
    enabled: !!id, // only run when id is truthy
  });
};
