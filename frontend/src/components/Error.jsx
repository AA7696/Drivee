// src/components/Error.jsx
import React from 'react';

export default function Error({ message = "Something went wrong." }) {
  return (
    <div className="flex items-center justify-center h-60">
      <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded shadow-md w-fit max-w-md text-center">
        <h2 className="text-lg font-semibold mb-2">🚫 Error</h2>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
}
