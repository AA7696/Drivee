import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firbaseConfig';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  doc,
  getDoc,
} from 'firebase/firestore';
import { FaCar, FaClipboardList, FaExclamationTriangle } from 'react-icons/fa';

const AdminDashboard = () => {
  const [totalCars, setTotalCars] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [pendingBookings, setPendingBookings] = useState(0);
  const [confirmedBookings, setConfirmedBookings] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [recentBookings, setRecentBookings] = useState([]);

  const fetchDashboardStats = async () => {
    const carSnap = await getDocs(collection(db, 'vehicles'));
    setTotalCars(carSnap.size);

    const bookingSnap = await getDocs(collection(db, 'bookings'));
    setTotalBookings(bookingSnap.size);

    const pendingSnap = await getDocs(
      query(collection(db, 'bookings'), where('paymentStatus', '==', 'pending'))
    );
    setPendingBookings(pendingSnap.size);

    const confirmedSnap = await getDocs(
      query(collection(db, 'bookings'), where('paymentStatus', '==', 'paid'))
    );
    setConfirmedBookings(confirmedSnap.size);

    // 💰 Total Revenue
    let total = 0;
    confirmedSnap.forEach((doc) => {
      const data = doc.data();
      total += data.total || 0;
    });
    setTotalRevenue(total);

    // 📦 Recent Bookings (with user names)
    const latestBookingsSnap = await getDocs(
      query(collection(db, 'bookings'), orderBy('pickupDate', 'desc'), limit(5))
    );

    const latestBookingsWithUser = await Promise.all(
      latestBookingsSnap.docs.map(async (docSnap) => {
        const booking = docSnap.data();
        let vehicleName = '';

        try {
          const vehicleRef = doc(db, 'vehicles', booking.vehicleId);
          const vehicleSnap = await getDoc(vehicleRef);
          if (vehicleSnap.exists()) {
            const vehicleData = vehicleSnap.data();
            vehicleName = vehicleData.name ;
          }
        } catch (error) {
          console.warn('User fetch failed', error);
        }

        return {
          id: docSnap.id,
          ...booking,
        vehicleName,
        };
      })
    );

    setRecentBookings(latestBookingsWithUser);
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
      <p className="text-gray-500 mb-6">
        Monitor overall platform performance including total cars, bookings, revenue, and recent activities
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <DashboardCard title="Total Cars" value={totalCars} icon={<FaCar />} />
        <DashboardCard title="Total Bookings" value={totalBookings} icon={<FaClipboardList />} />
        <DashboardCard title="Pending" value={pendingBookings} icon={<FaExclamationTriangle />} />
        <DashboardCard title="Confirmed" value={confirmedBookings} icon={<FaClipboardList />} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4 bg-white shadow">
          <h2 className="text-xl font-bold mb-2">Recent Bookings</h2>
          <p className="text-sm text-gray-500 mb-4">Latest customer bookings</p>
          {recentBookings.length === 0 ? (
            <p className="text-gray-400">No recent bookings.</p>
          ) : (
            <ul className="space-y-2">
              {recentBookings.map((b) => (
                <li key={b.id} className="border-b pb-2">
                  <div className="font-semibold">{b.vehicleName}</div>
                  <div className="text-sm">
                    ₹{b.total} -{' '}
                    <span className={b.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600'}>
                      {b.paymentStatus}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border rounded-lg p-4 bg-white shadow">
          <h2 className="text-xl font-bold mb-2">Total Revenue</h2>
          <p className="text-sm text-gray-500 mb-4">All-time collected revenue</p>
          <p className="text-3xl font-bold text-blue-600">₹{totalRevenue}</p>
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value, icon }) => (
  <div className="border rounded-lg p-4 bg-white flex items-center justify-between shadow">
    <div>
      <p className="text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
    <div className="bg-blue-100 text-blue-600 p-2 rounded-full text-xl">{icon}</div>
  </div>
);

export default AdminDashboard;
