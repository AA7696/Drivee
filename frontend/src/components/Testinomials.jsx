// components/Testimonials.jsx
import React from 'react';

// Example images — replace with actual URLs or imports
const testimonials = [
  {
    name: "Rovert Harvest",
    text: "We have been using Rentaly for our trips for several years now and have always been happy with their service. Their customer support is excellent and always available to help. Their prices are also very competitive.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
  },
  {
    name: "Jovan Reels",
    text: "I have been using Rentaly for my car rental needs for over 5 years. I never had any problems. Their customer support is always responsive and helpful. Highly recommended!",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7",
  },
  {
    name: "Kanesha Keyton",
    text: "Endorsed by industry experts, Rentaly is the car rental solution you can trust. We provide fast, reliable and secure car rental services.",
    image: "https://tse1.mm.bing.net/th/id/OIP.BrTshBl7lj4Cej6HtGixRwHaLH?rs=1&pid=ImgDetMain&o=7&rm=3",
  }
];

const Testimonials = () => {
  return (
    <div id='reviews' className="px-6 md:px-20 py-16 bg-gray-50 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-black">What Our Customer Saying...</h2>
      <div className="grid gap-8 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="relative rounded-xl overflow-hidden shadow-lg group"
          >
            <img
              src={t.image}
              alt={t.name}
              className="w-full h-[400px] object-cover transition-transform group-hover:scale-105 duration-300"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent px-4 py-6 text-left text-white">
              <h3 className="text-lg font-semibold">Excellent Service! Car Rent Service</h3>
              <p className="text-sm mt-2 line-clamp-5">{t.text}</p>
              <p className="mt-4 font-medium">— {t.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
