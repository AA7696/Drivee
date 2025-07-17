// src/store/useBookingStore.js
import { create } from 'zustand';


export const useBookingStore = create((set) => ({
  booking: {
    location: '',
    pickupDate: '',
    dropoffDate: '',
    duration: 0,
    total: 0,
    vehicleId: '',
    userId: '',
    paymentStatus: 'pending',
    given: false,
    returned: false,
  },
  setBooking: (data) => set((state) => ({
    booking: { ...state.booking, ...data }
  })),
  clearBooking: () => set({
    booking: {
      location: '',
      pickupDate: '',
      dropoffDate: '',
      duration: 0,
      total: 0,
      vehicleId: '',
      userId: '',
      paymentStatus: 'pending',
      given: false,
      returned: false,
    }
  }),
}));
