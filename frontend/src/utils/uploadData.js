// src/utils/uploadVehicles.js
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firbaseConfig.js";

const vehicles = [
  {
    name: 'CBR',
    type: 'Bike',
    image: 'https://www.motomag.com/local/cache-vignettes/L400xH300/0-bmw-s1000rr-2012-bleu-c172a.jpg',
    seats: 2,
    hp: 500,
    fuel: 'Petrol',
    engine: 3000,
    stroke: '58.7 Mm',
    gear: '6-Speed',
    mileage: '40 Kmpl',
    price: 56,
    description: 'A high-performance sports bike with aggressive styling, perfect for speed enthusiasts and thrill seekers.',
    location: 'Delhi',
    isAvailable: true,
    transmission: 'Manual',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: 'Honda 140',
    type: 'Bike',
    image: 'https://tse1.mm.bing.net/th/id/OIP.lxoivsgRNuFQYvPfpydCIAHaEo?w=600&h=375&rs=1&pid=ImgDetMain&o=7&rm=3',
    seats: 2,
    hp: 500,
    fuel: 'Petrol',
    engine: 3000,
    stroke: '58.7 Mm',
    gear: '6-Speed',
    mileage: '40 Kmpl',
    price: 56,
    description: 'A stylish and reliable motorbike ideal for daily commuting and long rides with efficient fuel economy.',
    location: 'Mumbai',
    isAvailable: true,
    transmission: 'Manual',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: 'KPR 150',
    type: 'Bike',
    image: 'https://tse1.mm.bing.net/th/id/OIP.1nmr4OHP-tCXJHfo7xzt_QHaEK?w=1300&h=732&rs=1&pid=ImgDetMain&o=7&rm=3',
    seats: 2,
    hp: 500,
    fuel: 'Petrol',
    engine: 3000,
    stroke: '58.7 Mm',
    gear: '6-Speed',
    mileage: '40 Kmpl',
    price: 56,
    description: 'A sleek and agile sports bike offering a perfect blend of power, performance, and efficiency.',
    location: 'Pune',
    isAvailable: true,
    transmission: 'Manual',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: 'Kawasaki 360',
    type: 'Bike',
    image: 'https://cdn11.bigcommerce.com/s-5e84f/images/stencil/1280x1280/products/20545/279207/S1000RR-0914-11-02__13283.1552991322.jpg',
    seats: 2,
    hp: 500,
    fuel: 'Petrol',
    engine: 3000,
    stroke: '58.7 Mm',
    gear: '6-Speed',
    mileage: '40 Kmpl',
    price: 56,
    description: 'An aggressive performance bike designed for the open road, combining speed with control.',
    location: 'Chandigarh',
    isAvailable: true,
    transmission: 'Manual',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: 'Toyota Fortuner',
    type: 'Car',
    image: 'https://tse3.mm.bing.net/th/id/OIP.HLKvwR8qeudZ2XAV-N_wqQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3',
    seats: 7,
    hp: 450,
    fuel: 'Diesel',
    engine: 2755,
    stroke: '103.6 mm',
    gear: '6-Speed Automatic',
    mileage: '10 Kmpl',
    price: 120,
    description: 'A powerful and luxurious SUV built for adventure, offering comfort, space, and rugged performance.',
    location: 'Delhi',
    isAvailable: true,
    transmission: 'Automatic',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: 'Hyundai Creta',
    type: 'Car',
    image: 'https://tse2.mm.bing.net/th/id/OIP.f4neKsFlVjJhZBb1twWtFgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
    seats: 5,
    hp: 400,
    fuel: 'Petrol',
    engine: 1497,
    stroke: '83.5 mm',
    gear: '6-Speed Manual',
    mileage: '16 Kmpl',
    price: 90,
    description: 'A stylish and feature-packed compact SUV ideal for city driving and long family trips.',
    location: 'Bangalore',
    isAvailable: true,
    transmission: 'Manual',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: 'Kia Seltos',
    type: 'Car',
    image: 'https://tse3.mm.bing.net/th/id/OIP.KlHVsevI2W6yhmhSJHvnHQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',
    seats: 5,
    hp: 420,
    fuel: 'Petrol',
    engine: 1493,
    stroke: '90.7 mm',
    gear: '6-Speed Manual',
    mileage: '17 Kmpl',
    price: 95,
    description: 'A bold and modern SUV with advanced features, excellent ride quality, and strong road presence.',
    location: 'Ahmedabad',
    isAvailable: true,
    transmission: 'Manual',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: 'Mahindra Thar',
    type: 'Car',
    image: 'https://tse1.mm.bing.net/th/id/OIP.k2I-6u8qsvnukaHzyRYWngHaEo?w=800&h=500&rs=1&pid=ImgDetMain&o=7&rm=3',
    seats: 4,
    hp: 500,
    fuel: 'Diesel',
    engine: 2184,
    stroke: '97 mm',
    gear: '6-Speed Manual',
    mileage: '15 Kmpl',
    price: 110,
    description: 'An off-road beast designed for adventure lovers, combining rugged build with powerful performance.',
    location: 'Manali',
    isAvailable: true,
    transmission: 'Manual',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const uploadVehicles = async () => {
  try {
    const colRef = collection(db, "vehicles");

    for (let vehicle of vehicles) {
      await addDoc(colRef, vehicle);
      console.log(`✅ Uploaded: ${vehicle.name}`);
    }

    console.log("✅ All vehicles uploaded successfully.");
  } catch (error) {
    console.error("❌ Error uploading vehicles:", error.message);
  }
};

