import React from 'react';
import { FaCar, FaClipboardList, FaExclamationTriangle } from 'react-icons/fa';
import { useTotalVehicles } from '../hooks/useTotalVehicles';
import { useBookingStats } from '../hooks/useBookingStats';
import { useRecentBookings } from '../hooks/useRecentBookings';

const AdminDashboard = () => {
  const { data: totalVehicles, isLoading: loadingVehicles } = useTotalVehicles();
  const { data: stats, isLoading: loadingStats } = useBookingStats();
  const { data: recentBookings = [], isLoading: loadingRecent } = useRecentBookings();

  if (loadingVehicles || loadingStats || loadingRecent) {
    return <p className="p-6 text-black">Loading dashboard...</p>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
      <p className="text-gray-500 mb-6">Monitor performance and activity</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <DashboardCard title="Total Vehicles" value={totalVehicles} icon={<FaCar />} />
        <DashboardCard title="Total Bookings" value={stats.total} icon={<FaClipboardList />} />
        <DashboardCard title="Pending" value={stats.pending} icon={<FaExclamationTriangle />} />
        <DashboardCard title="Confirmed" value={stats.confirmed} icon={<FaClipboardList />} />
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
          <p className="text-3xl font-bold text-blue-600">₹{stats.revenue}</p>
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
