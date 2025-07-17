import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firbaseConfig";
import useAuthStore from "../store/useAuthStore";

const useAuthListener = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const logoutUser = useAuthStore((state) => state.logoutUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        logoutUser();
      }
    });

    return () => unsubscribe();
  }, [setUser, logoutUser]);
};

export default useAuthListener;
