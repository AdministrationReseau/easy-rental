'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import VehicleList from '@/components/customer/VehicleList';
import CarDetail from '@/components/combiner-components/CarDetail';
import { CarProps, FilterVehicleProps } from '@/utils/types/CarProps';
import Link from 'next/link';


const VehicleDetails: React.FC = () => {
  const { id } = useParams(); // Récupère l'ID du véhicule depuis l'URL
  const [vehicle, setVehicle] = useState<CarProps | null>(null);
  const [vehicles, setVehicles] = useState<CarProps[]>([]);
  const [filters] = useState<FilterVehicleProps>({          //add setFilter to activate filtering
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
            (v: CarProps) => v.id.toString() === id
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

  // const handleFilterChange = (newFilters: FilterVehicleProps) => {
  //   setFilters(newFilters);
  // };

  if (!vehicle) {
    return <p>Loading vehicle details...</p>; // Affiche un message de chargement si les données ne sont pas prêtes
  }

  return (
      <main className="flex  ">
        {/* Section filtre */}
        {/* <div className="filter-container">
          <SidebarFilter vehicles={vehicles} onFilter={handleFilterChange} />
        </div> */}
          {/* Liste des véhicules */}
          <div className="w-screen-full relative">
            <div className="flex justify-center items-center flex-col">
              {/* <LocationFilter /> */}
              {/* Détails du véhicule sélectionné */}
              <CarDetail vehicle={vehicle} />
              <VehicleList vehicles={vehicles} filters={filters} />
              <Link href="/customer/cars">
              <button className='m-4 p-4 text-white bg-primary-blue rounded-lg'>
                  Voir plus de véhicules
              </button>
              </Link>
          </div>
         
        </div>
      </main>
  );
};

export default VehicleDetails;
