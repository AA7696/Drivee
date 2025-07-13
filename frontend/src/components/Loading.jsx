// src/components/Loading.jsx
import React from 'react';

export default function Loading({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center h-60 text-blue-600">
      <p className="text-4xl font-medium">{text}</p>
    </div>
  );
}
