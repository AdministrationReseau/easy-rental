'use client';

import React, { useState, useEffect } from 'react';
import CarAttributeDetails from '@/components/CarAttributeDetails';
import CarProfilDescription from '@/components/CarProfilDescription';
import ProfilImg from '@/components/ProfilImg';
import { useParams } from 'next/navigation';
import VehicleList from '@/components/customer/VehicleList';
import SidebarFilter from '@/components/customer/SideBarFilter';
import LocationFilter from '@/components/LocationFilter';
import CarDetail from '@/components/combiner-components/CarDetail';

interface FilterProps {
  type: string[];
  capacity: number | null;
  priceRange: [number, number];
}

const VehicleDetails: React.FC = () => {
  const { id } = useParams(); // Récupère l'ID du véhicule depuis l'URL
  const [vehicle, setVehicle] = useState<any | null>(null);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [filters, setFilters] = useState<FilterProps>({
    type: [],
    capacity: null,
    priceRange: [0, Infinity],
  });

  // Chargement des données des véhicules
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
          const foundVehicle = data.vehicles.find(
            (v: any) => v.id.toString() === id
          );
          setVehicle(foundVehicle || null); // Trouve le véhicule correspondant à l'ID
        } else {
          console.error('Unexpected data format:', data);
        }
      })
      .catch((error) => {
        console.error('Error loading vehicles:', error);
      });
  }, [id]);

  const handleFilterChange = (newFilters: FilterProps) => {
    setFilters(newFilters);
  };

  if (!vehicle) {
    return <p>Loading vehicle details...</p>; // Affiche un message de chargement si les données ne sont pas prêtes
  }

  return (
    <div className='mt-10 bg-gray-100'>
      <main className="flex flex-col">
        {/* Section filtre */}
        <div className="filter-container mb-4">
          <SidebarFilter vehicles={vehicles} onFilter={handleFilterChange} />
        </div>
          {/* Liste des véhicules */}
          <div className="flex">
            <div className="flex justify-center items-center flex-col ml-56">
              {/* <LocationFilter /> */}
              {/* Détails du véhicule sélectionné */}
              <CarDetail vehicle={vehicle} />
              <VehicleList vehicles={vehicles} filters={filters} />
          </div>
        </div>

        
      </main>
    </div>
  );
};

export default VehicleDetails;
