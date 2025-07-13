// components/LocalServiceSlider.jsx
import React from "react";

const locations = [
  { name: "Mumbai", image: "https://tse1.mm.bing.net/th/id/OIP.F8O6mGPCYMu5asDoAK5oQgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { name: "Manali", image: "https://cdn.getyourguide.com/image/format=auto,fit=contain,gravity=auto,quality=60,width=1440,height=650,dpr=2/tour_img/6481b3d674bfb.jpeg" },
  { name: "Chandigarh", image: "https://mytriphack.com/wp-content/uploads/2016/03/Open_Hand_monument_Chandigarh-881x661.jpg" },
  { name: "Delhi", image: "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/67000/67991-New-Delhi.jpg" },
  { name: "Bangaluru", image: "https://images.kiwi.com/photos/1200x628/bengaluru_in.jpg" },
];

const Locations = () => {
  return (
    <div className="px-6 md:px-20 py-16 bg-white text-center flex flex-col items-center justify-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-black">Locations Service We Provide</h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 overflow-x-auto scrollbar-hide px-4">
        {locations.map((loc, i) => (
          <div key={i} className="flex flex-col items-center min-w-[120px]">
            <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg border-4 border-white hover:scale-105 transition">
              <img src={loc.image} alt={loc.name} className="w-full h-full object-cover" />
            </div>
            <p className="mt-3 font-medium text-black">{loc.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Locations;
