import React, { useState, useEffect } from 'react';
import DriverCard from '../DriverCard';
import { DriverProps } from '@/utils/types/DriverProps';

interface DriverListProps {
  vehicleId: number; // ID du véhicule pour filtrer les chauffeurs
}

const DriverList: React.FC<DriverListProps> = ({ vehicleId }) => {
  const [drivers, setDrivers] = useState<DriverProps[]>([]);
  const [filteredDrivers, setFilteredDrivers] = useState<DriverProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Charger les chauffeurs depuis le fichier JSON
    fetch('/data/drivers.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data && Array.isArray(data.drivers)) {
          setDrivers(data.drivers);
        } else {
          console.error('Unexpected data format:', data);
        }
      })
      .catch((error) => console.error('Error loading drivers:', error))
      .finally(() => setLoading(false));
  }, []);

  // Filtrer les chauffeurs assignés à un véhicule spécifique
  useEffect(() => {
    const filtered = drivers.filter(
      (driver) => driver.vehicle_assigned?.id === vehicleId
    );
    setFilteredDrivers(filtered);
  }, [drivers, vehicleId]);

  if (loading) {
    return <p>Loading drivers...</p>;
  }

  return (
    <div className="flex flex-row gap-4 overflow-x-auto">
      {filteredDrivers.length > 0 ? (
        filteredDrivers.map((driver) => (
          <DriverCard
            key={driver.id}
            name={`${driver.first_name} ${driver.last_name}`}
            email={driver.email}
            location={driver.location}
            age={driver.age}
            avatar={driver.profile_picture}
            rating={driver.rating}
            phone={driver.phone}
          />
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No drivers found for this vehicle.
        </p>
      )}
    </div>
  );
};

export default DriverList;
