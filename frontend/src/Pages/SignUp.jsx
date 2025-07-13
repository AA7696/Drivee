// src/pages/GoogleLogin.jsx
import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firbaseConfig";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/owner"); // Redirect after successful login
    } catch (error) {
      console.error("Google login error:", error.message);
    }
  };

  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={handleGoogleLogin}
        className="flex items-center gap-2 px-4 py-2 border rounded-md bg-white hover:bg-gray-100 shadow"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-5 h-5"
        />
        <span>Sign in with Google</span>
      </button>
    </div>
  );
}
