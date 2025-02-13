'use client'

import { useState, useEffect } from 'react';
import SidebarFilter from '@/components/organisation/SideBarFilterVehicle';
import { CarProps, FilterVehicleProps } from '@/utils/types/CarProps';
import CarDetail from '@/components/organisation/CarDetail';
import OrgVehicleList from '@/components/organisation/OrgVehicleList';
// import { AddBox } from '@mui/icons-material';
import CarForm from '@/components/organisation/CarForm';

export default function VehiclesPage() {
    const [vehicles, setVehicles] = useState<CarProps[]>([]);
    const [filters, setFilters] = useState<FilterVehicleProps>({
        type: [],
        capacity: null,
        priceRange: [0, Infinity],
      });
    const [selectedVehicle] = useState<CarProps | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [addCarFormOpened, setAddCarFormOpened] = useState(false);

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

    const addVehicle = (vehicle: CarProps) => {
        setVehicles(prev => [...prev, { ...vehicle, id: Date.now() }]);
    };  

    return (
        <div className='h-full w-[100%] flex flex-col gap-2 rounded-md'>
            <div className='w-full h-12 p-4 flex flex-row items-center justify-between'>
                <div>
                    <h2 className='text-2xl font-bold'>Your vehicles</h2>
                    <div className='text-gray-600 text-sm'>
                        Actually, you have <span className='font-black'>{vehicles.length} vehicles</span>
                    </div>
                </div>
                {/* <div>
                  <button
                    className='bg-primary-blue/90 hover:bg-primary-blue rounded-lg text-white p-2 flex items-center gap-1'
                    onClick={ () => setAddCarFormOpened(true) }>
                    <AddBox/>Add a new car
                  </button>
                </div> */}
            </div>
            <div className={`my-4 ${isPopupOpen ? 'block' : 'hidden'} lg:block`}>
                <SidebarFilter vehicles={vehicles} onFilter={handleFilterChange}  isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen}/>
            </div>
            <div className='w-full h-full'>
                {/* Display CarDetail if a vehicle is selected */}
                {selectedVehicle && (
                    <div className="mb-4">
                        <CarDetail vehicle={selectedVehicle} />
                    </div>
                )}

                <OrgVehicleList
                    vehicles={vehicles}
                    filters={filters}
                />
            </div>
            <button
                className="lg:hidden fixed bottom-4 right-4 bg-primary-blue text-white p-3 rounded-full shadow-lg"
                onClick={() => setIsPopupOpen(true)}
                >
                Filters
            </button>

            { addCarFormOpened && 
              <CarForm addVehicle={addVehicle} carFormOpened={addCarFormOpened} setAddCarFormOpened={setAddCarFormOpened} />
            }
        </div>
    );
}

