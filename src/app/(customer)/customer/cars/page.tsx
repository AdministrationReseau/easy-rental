'use client';

import React, { useState, useEffect } from 'react';
import VehicleList from '@/components/customer/VehicleList';
import SidebarFilter from '@/components/customer/SideBarFilterVehicle';
import LocationFilter from '@/components/LocationFilter';
import CarDetail from '@/components/combiner-components/CarDetail';
import { CarProps, FilterVehicleProps } from '@/utils/types/CarProps';


const Cars: React.FC = () => {
  const [vehicles, setVehicles] = useState<CarProps[]>([]);
  const [filters, setFilters] = useState<FilterVehicleProps>({
    type: [],
    capacity: null,
    priceRange: [0, Infinity],
  });
  const [selectedVehicle] = useState<CarProps | null>(null);

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
        } else {
          console.error('Unexpected data format:', data);
        }
      })
      .catch((error) => {
        console.error('Error loading vehicles:', error);
      });
  }, []);

  const handleFilterChange = (newFilters: FilterVehicleProps) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <main className="flex flex-row m-2">
        <div className="">
          <SidebarFilter vehicles={vehicles} onFilter={handleFilterChange} />
        </div>
        <div>
          {/* Display CarDetail if a vehicle is selected */}
          {selectedVehicle && (
            <div className="mb-4">
              <CarDetail vehicle={selectedVehicle} />
            </div>
          )}
          <div className="flex">

            <div className="flex justify-center items-center flex-col">
              <LocationFilter />
              <VehicleList
                vehicles={vehicles}
                filters={filters}
              // Pass down the function
              />
            </div>
          </div>

        </div>

      </main>

    </div>
  );
};

export default Cars;
