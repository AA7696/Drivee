import React from "react";
import Navbar from "../components/Navbar";
import { useBookingByUserId } from "../hooks/useBookingsByUserId";
import { auth } from "../firebase/firbaseConfig";
import Loading from '../components/Loading'
import Error from "../components/Error";
import BookingCard from "../components/BookingCard";

const MyBooking = () => {

  const {data: bookings, isLoading, isError, refetch} = useBookingByUserId(auth.currentUser?.uid)

  

  if(isLoading){
    return(
      <>
      <Loading />
      </>
    )
  }

  if(isError){
    return(
      <Error />
    )
  }

  return (
    <div className="min-h-screen w-screen bg-white text-black">
      <div
        className="w-full bg-cover bg-center text-white bg-gray-900"
      >
        <Navbar />
      </div>
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-5xl font-bold mb-1 font-sans">My Bookings</h1>
        <p className="text-gray-500 mb-6 mt-5">View and manage your all  bookings</p>

        {bookings.map((booking, index) =>{
          return(
            <BookingCard key={booking.id} booking={booking} index={index} refetch={refetch} />
          )
        })}

      </div>
    </div>
  );
};

export default MyBooking;
