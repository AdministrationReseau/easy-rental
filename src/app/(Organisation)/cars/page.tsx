'use client'

import { useState, useEffect } from 'react';
import ResourceEditForm from '../../../components/ResourceEditForm';
import { ResourceCard } from '@/components/ResourceCard';
import SidebarFilter from '@/components/organisation/SideBarFilterVehicle';
import { CarProps, FilterVehicleProps } from '@/utils/types/CarProps';

export default function VehiclesPage() {
    const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);
    const [formModalResource, setFormModalResource] = useState<CarProps | null>(null);

    const closeEditForm = () => {
        setFormModalResource(null);
        setIsEditFormOpen(false);
    }

    // const openEditForm = (resourceId: number) => {
    //     setFormModalResource(vehicles.find((vehicle) => vehicle.id === resourceId) || null);
    //     setIsEditFormOpen(true);
    // }

    const [vehicles, setVehicles] = useState<CarProps[]>([]);

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

    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => setShowAlert(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    const [, setFilters] = useState<FilterVehicleProps>({
        type: [],
        capacity: null,
        priceRange: [0, Infinity],
    });

    const handleFilterChange = (newFilters: FilterVehicleProps) => {
        setFilters(newFilters);
    };

    return (
        <div className='h-full w-full flex flex-col gap-2 rounded-md'>
            <div className='w-full h-12 p-4 flex flex-row items-center justify-between'>
                <div>
                    <h2 className='text-2xl font-bold'>Your vehicles</h2>
                    <div className='text-gray-600 text-sm'>
                        Actually, you have <span className='font-black'>{vehicles.length} vehicles</span>
                    </div>
                </div>
                <div>
                    <label htmlFor='filter-start-date' className='text-gray-500 mr-2'>Show data from :</label>
                    <input id='filter-start-date' type='date' className='border border-primary-blue/15 p-1 rounded-sm' />
                </div>
            </div>
            <div className="my-4">
                <SidebarFilter vehicles={vehicles} onFilter={handleFilterChange} />
            </div>
            <div className='h-full flex flex-row gap-0'>
                <div className='grid grid-cols-2 gap-4 w-full h-full overflow-auto'>
                    {vehicles.map((vehicle) => (
                        <ResourceCard key={vehicle.id} resource={vehicle} profilActive={false} />
                    ))}
                </div>
            </div>

            { formModalResource && isEditFormOpen &&
                <ResourceEditForm resource={formModalResource} onClose={closeEditForm} />   
            }
        </div>
    );
}

