import { create } from "zustand";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firbaseConfig";

const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user, loading: false }),
  logoutUser: () => set({ user: null, loading: false }),
  logout: async () => {
    await signOut(auth);
    set({ user: null, loading: false });
  },
}));

export default useAuthStore;
