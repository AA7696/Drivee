import React from 'react'
import './App.css'
import Landing from './Pages/Landing'
import Dashboard from './Pages/Dashboard'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AddVehicle from './components/AddVehicle';
import ManageVehicle from './components/ManageVehicle';
import ManageBookings from './components/ManageBookings';
import RentPage from './Pages/RentPage';
import VehiclePage from './Pages/VehiclePage';
import MyBooking from './Pages/MyBooking';
import useAuthListener from './hooks/useAuthListener';
import { Toaster } from "react-hot-toast";
import ProtectedRoute from './components/ProtectedRoutes';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CheckOutPage from './Pages/CheckOutPage';
import AdminDashboard from './components/AdminDashboard';
import AdminLoginPage from './Pages/AdminLoginPage';
import useAuthStore from "./store/useAuthStore";


const queryClient = new QueryClient();

function App() {
  useAuthListener(); // Initialize auth listener to track user state
  const { user } = useAuthStore(); // Get user data from auth store

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
        <Router>
          <Routes>

            <Route path="/" element={<Landing />} />
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route path="/rent" element={
              <ProtectedRoute>
                <RentPage />
              </ProtectedRoute>
            } />
            <Route path='/my-booking' element={
              <ProtectedRoute>
                <MyBooking />
              </ProtectedRoute>
            } />
            <Route path="/vehicle/:id" element={
              <ProtectedRoute>
                <VehiclePage />
              </ProtectedRoute>
            } />
            <Route path='/check-out/:bookingId' element={
              <ProtectedRoute>
                <CheckOutPage />
              </ProtectedRoute>
            } />
            {user?.email === 'admin@gmail.com'? <>
                        <Route path="/owner" element={<Dashboard />} >
              <Route index element={<AdminDashboard />} />
              <Route path="add-car" element={<AddVehicle />} />
              <Route path="manage-cars" element={<ManageVehicle />} />
              <Route path="manage-bookings" element={<ManageBookings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>

            </>: (<></>)}
            <Route path='*' element={<div>
              <Navigate to="/" replace />
            </div>} />
          </Routes>
        </Router>
         <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>

    </>
  )
}

export default App
