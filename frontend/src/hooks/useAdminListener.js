import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/firbaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const useAdminLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ email, password }) => {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const roleDoc = await getDoc(doc(db, 'roles', user.email));
      if (!roleDoc.exists() ) {
        throw new Error('Access denied. You are not an admin.');
      }

      return user;
    },
    onSuccess: () => {
      toast.success('Admin login successful');
      navigate('/owner');
    },
    onError: (err) => {
      toast.error(err.message || 'Login failed');
    },
  });
};
