// pages/AdminLogin.jsx
import React, { useState } from 'react';
import { useAdminLogin } from '../hooks/useAdminListener';
import toast from 'react-hot-toast';
import adminBg from '../assets/adminBg.jpg'
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const loginMutation = useAdminLogin();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Please fill in all fields.");
      return;
    }
    loginMutation.mutate(form);
  };

  return (
    <div 
          className="min-h-screen w-screen bg-cover bg-center text-white flex flex-col gap-8 justify-center items-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${adminBg})`,
          }}
    
    >
      <h1 className=' text-orange-300 text-5xl font-bold'>Drivee</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-transparent w-full max-w-sm p-8 rounded-lg shadow-xl border"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-white">Admin Login</h2>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loginMutation.isPending}
          className={`w-full py-3 rounded text-black font-semibold transition ${
            loginMutation.isPending
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-white'
          }`}
        >
          {loginMutation.isPending ? 'Logging in...' : 'Login'}
        </button>
        <button className=' border-2 border-amber-50 w-full '
        onClick={() => navigate('/')}
        >
          Back
        </button>

        {/* Error Message */}
        {loginMutation.isError && (
          <p className="text-red-600 mt-3 text-center text-sm">
            {loginMutation.error?.message || 'Login failed. Try again.'}
          </p>
        )}
      </form>
    </div>
  );
};

export default AdminLoginPage;
