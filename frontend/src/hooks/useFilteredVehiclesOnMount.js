// src/hooks/useFilteredVehiclesOnMount.js
import { useEffect, useState } from 'react';
import { useFilterStore } from '../store/useFilterStore';

export const useFilteredVehiclesOnMount = (vehicles) => {
  const { type, location, fuel, transmission } = useFilterStore();
  const [filteredVehicles, setFilteredVehicles] = useState([]);

  useEffect(() => {
    if (!vehicles || vehicles.length === 0) return;

    const filtered = vehicles.filter(vehicle =>
      (type === '' || vehicle.type === type) &&
      (location === '' || vehicle.location === location) &&
      (fuel === '' || vehicle.fuel === fuel) &&
      (transmission === '' || vehicle.transmission === transmission)
    );

    setFilteredVehicles(filtered);
  }, [vehicles, type, location, fuel, transmission]);

  return filteredVehicles;
};
