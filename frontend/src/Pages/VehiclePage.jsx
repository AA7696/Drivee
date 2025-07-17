import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useVehicleById } from '../hooks/useVehicleById';
import Loading from '../components/Loading';
import { useBookingStore } from '../store/useBookingStore';
import { useCreateBooking } from '../hooks/useCreateBooking';
import { auth } from '../firebase/firbaseConfig';
import toast from 'react-hot-toast';


const VehiclePage = () => {
    const { id } = useParams()
    const { data: vehicle, isLoading } = useVehicleById(id);
    const [pickupDate, setPickupDate] = useState('');
    const [dropoffDate, setDropoffDate] = useState('');

    const { setBooking, booking } = useBookingStore();
    const { mutate: createBooking, isPending } = useCreateBooking();

    useEffect(() => {
        if (pickupDate && dropoffDate && vehicle) {
            const now = new Date();
            const start = new Date(pickupDate);
            const end = new Date(dropoffDate);

            if (start < now) {
                toast.error("Pickup must be in the future");
                return;
            }

            if (end <= start) {
                toast.error("Drop-off must be after pickup");
                return;
            }

            const durationHours = Math.ceil((end - start) / (1000 * 60 * 60));
            const total = durationHours * vehicle.price;

            setBooking({
                userId: auth.currentUser?.uid,
                vehicleId: id,
                location: vehicle.location,
                pickupDate,
                dropoffDate,
                duration: durationHours,
                total,
                paymentStatus: 'pending',
                given: false,
                returned: false,
            });
        }
    }, [pickupDate, dropoffDate, vehicle, id, setBooking]);
    if (isLoading) {
        return (
            <>
                <Loading />
            </>
        );
    }

    const handleBooking = async () => {
        if (!booking.location || !booking.pickupDate || !booking.dropoffDate || !booking.total) {
            return toast.error('Please fill all fields.');
        }

        if (!vehicle.isAvailable) {
            return toast.error("Vehicle Allready Booked");
        }

        createBooking(booking);

    };

    const nowISO = new Date().toISOString().slice(0, 16); // 'YYYY-MM-DDTHH:MM'


    return (
        <>

            <div className=' w-screen min-h-screen text-white bg-white '>
                <div
                    className="w-full bg-cover bg-center text-white bg-gray-900"
                >
                    <Navbar />
                </div>

                <div className="p-6 grid grid-cols-1 lg:grid-cols-2 md:gap-10 bg-white mt-10 justify-center items-center">
                    {/* Left Section - Images and Description */}
                    <div className="flex-1 items-center justify-center bg-white p-6 rounded-lg shadow-md border">
                        {/* Main Image */}
                        <img src={vehicle.image} alt={vehicle.name} className="rounded w-full h-64 object-contain " />
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto text-gray-800">
                            {/* Title */}
                            <h1 className="text-3xl font-bold">{vehicle.name}</h1>

                            {/* Specs Overview */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                                <div className="bg-gray-100 p-4 rounded-md text-center">
                                    <p className="font-semibold text-lg">{vehicle.seats} Seats</p>
                                </div>
                                <div className="bg-gray-100 p-4 rounded-md text-center">
                                    <p className="font-semibold text-lg">{vehicle.fuel}</p>
                                </div>
                                <div className="bg-gray-100 p-4 rounded-md text-center">
                                    <p className="font-semibold text-lg">{vehicle.transmission}</p>
                                </div>
                                <div className="bg-gray-100 p-2 flex items-center justify-center  rounded-md text-sm text-center">
                                    <p className="font-semibold text-lg">{vehicle.location}</p>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mt-8">
                                <h2 className="text-xl font-bold mb-2">Description</h2>
                                <p className="text-gray-700">{vehicle.description}</p>
                            </div>

                            {/* Features */}
                            <div className="mt-8">
                                <h2 className="text-xl font-bold mb-2">Features</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <p>Seats: {vehicle.seats}</p>
                                    <p>Horsepower: {vehicle.hp}</p>
                                    <p>Fuel: {vehicle.fuel}</p>
                                    <p>Mileage: {vehicle.mileage}</p>
                                    <p>Engine: {vehicle.engine} cc</p>
                                    <p>Stroke: {vehicle.stroke}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Booking Form */}
                    <div className=" mt-10 md:mt-0">
                        <div className="my-component shadow-lg rounded-lg p-6 border">
                            <h3 className="text-lg font-semibold mb-4">📍 Location</h3>
                            <input className="w-full border px-3 py-2 rounded mb-4" placeholder="Location"
                                value={vehicle.location}
                                readOnly={true}
                            />

                            <label className="block text-sm font-medium">Pick-Up</label>
                            <input type="datetime-local" className="w-full border px-3 py-2 rounded mb-4  "
                                min={nowISO}
                                value={pickupDate}
                                onChange={(e) => setPickupDate(e.target.value)}
                            />

                            <label className="block text-sm font-medium">Drop-Off</label>
                            <input type="datetime-local" className="w-full border px-3 py-2 rounded mb-4"
                                min={pickupDate || nowISO}
                                value={dropoffDate}
                                onChange={(e) => setDropoffDate(e.target.value)}
                            />

                            <div className="flex justify-between items-center mb-4">
                                <span className="">Duration</span>
                                <span className="font-semibold">
                                    {booking?.duration ? `${booking.duration} Hours` : '--'}
                                </span>
                            </div>

                            <div className="flex justify-between items-center mb-6">
                                <span className="">Total</span>
                                <span className="text-lg font-bold">
                                    ₹{booking?.total ? booking.total : '--'}
                                </span>
                            </div>

                            <button className=" btn w-full py-2 rounded  transition"
                                disabled={isPending}
                                onClick={handleBooking}
                            >
                                {isPending ? 'Booking...' : 'BOOK NOW'}
                            </button>
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
};

export default VehiclePage;
