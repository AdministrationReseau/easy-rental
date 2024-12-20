import React, { useState, useEffect } from 'react';
import DriverCard from '../DriverCard';
import { DriverProps } from '@/utils/types/DriverProps';

interface DriverListProps {
  vehicleId: number; // ID du véhicule pour filtrer les chauffeurs
  onSelectedDriversChange: (selectedDriver: DriverProps | null) => void; // Fonction pour le chauffeur sélectionné
}

const DriverList: React.FC<DriverListProps> = ({ vehicleId, onSelectedDriversChange }) => {
  const [drivers, setDrivers] = useState<DriverProps[]>([]);
  const [filteredDrivers, setFilteredDrivers] = useState<DriverProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDriver, setSelectedDriver] = useState<DriverProps | null>(null);
  console.log(selectedDriver);
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
        if (data && Array.isArray(data)) {
          setDrivers(data);
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

  const handleDriverSelection = (driver: DriverProps) => {
    setSelectedDriver(driver);
    onSelectedDriversChange(driver);
  };

  if (loading) {
    return <p>Loading drivers...</p>;
  }

  return (
    <div className="flex flex-row gap-4 overflow-x-auto">
      {filteredDrivers.length > 0 ? (
        filteredDrivers.map((driver, index) => (
          <DriverCard
           key={index}
            {...driver}
            onSelect={() => handleDriverSelection(driver)}
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
