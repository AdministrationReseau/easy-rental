'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CarProps } from '@/utils/types/CarProps';
import CarDetail from '@/components/organisation/CarDetail';

export default function ResourceProfilPage() {
    const [vehicles, setVehicles] = useState<CarProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError,] = useState(false);

    const { id } = useParams<{ id: string }>();
    const vehicleId = Number(id);

    useEffect(() => {
        fetch('/data/cars.json')
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            if (data && Array.isArray(data.vehicles)) {
              setVehicles(data.vehicles);
              setIsLoading(false);
            } else {
              console.error('Unexpected data format:', data);
            }
          })
          .catch((error) => {
            console.error('Error loading vehicles:', error);
          });
      }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (hasError) {
        return <div>Error loading vehicles. Please try again later.</div>;
    }

    if (isNaN(vehicleId)) {
        return <div>Invalid vehicle ID.</div>;
    }

    const requestedVehicle = vehicles.find(vehicle => vehicle.id === vehicleId);

    if (!requestedVehicle) {
        return <div>Vehicle not found.</div>;
    }

    return <CarDetail vehicle={requestedVehicle} />
}