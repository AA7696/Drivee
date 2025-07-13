import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBookingById } from '../hooks/useBookingById';
import { useVehicleById } from '../hooks/useVehicleById';
import { loadRazorpay } from '../utils/razorpayLoader';
import { doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase/firbaseConfig';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { bookingId } = useParams();
  const { data: booking, isLoading } = useBookingById(bookingId);
  const { data: vehicle } = useVehicleById(booking?.vehicleId);
  const [isPaying, setIsPaying] = useState(false);
  const navigate = useNavigate();

  if (isLoading || !vehicle) return <Loading />;

  const handlePayment = async () => {
    if (!booking?.total || booking.total <= 0) {
      toast.error('Invalid booking amount');
      return;
    }

    setIsPaying(true);
    const res = await loadRazorpay();

    if (!res) {
      toast.error('Failed to load Razorpay SDK');
      setIsPaying(false);
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: booking.total * 100, // amount in paise
      currency: 'INR',
      name: 'Drivee Rentals',
      description: `Booking for ${vehicle.name}`,
      image: '/logo.png', // optional
      handler: async (response) => {
        try {
          await updateDoc(doc(db, 'bookings', bookingId), {
            paymentStatus: 'paid',
            razorpayPaymentId: response.razorpay_payment_id,
          });
          toast.success('Payment successful!');
          navigate('/my-booking');
          
        } catch (err) {
          toast.error('Failed to update payment status');
          console.error('Razorpay payment update error:', err);
        } finally {
          setIsPaying(false);
        }
      },
      prefill: {
        name: auth.currentUser?.displayName || 'User',
        email: auth.currentUser?.email || 'user@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#000000',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen w-screen bg-gray-900">

      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-center text-white mb-10">
          Checkout & Payment
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vehicle Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6 border">
            <img
              src={vehicle.image}
              alt={vehicle.name}
              className="w-full h-56 object-fill rounded-lg mb-4"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {vehicle.name}
            </h2>
            <div className="text-gray-600 space-y-1">
              <p><strong>Fuel:</strong> {vehicle.fuel}</p>
              <p><strong>Transmission:</strong> {vehicle.transmission}</p>
              <p><strong>Location:</strong> {vehicle.location}</p>
              <p><strong>Seats:</strong> {vehicle.seats}</p>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6 border space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Booking Summary</h3>

            <div className="flex justify-between text-gray-700">
              <span>📍 Location:</span>
              <span>{booking.location}</span>
            </div>

            <div className="flex justify-between text-gray-700">
              <span>📅 Pickup:</span>
              <span>{new Date(booking.pickupDate).toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-gray-700">
              <span>📅 Drop-Off:</span>
              <span>{new Date(booking.dropoffDate).toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-gray-700">
              <span>⏱ Duration:</span>
              <span>{booking.duration} hours</span>
            </div>

            <div className="flex justify-between text-xl font-bold border-t pt-4 text-black">
              <span>Total:</span>
              <span>₹{booking.total.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between border-t pt-3 text-gray-700">
              <span>Payment Status:</span>
              <span
                className={`font-bold ${
                  booking.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {booking.paymentStatus}
              </span>
            </div>

            {booking.paymentStatus === 'pending' && (
              <button
                onClick={handlePayment}
                disabled={isPaying}
                className={`w-full mt-6 py-3 rounded-lg text-lg font-semibold transition duration-300
                  ${
                    isPaying
                      ? 'bg-gray-400 cursor-not-allowed text-white'
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
              >
                {isPaying ? 'Processing...' : 'Pay Now'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
