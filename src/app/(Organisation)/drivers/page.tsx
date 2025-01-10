'use client'

import { useState, useEffect } from 'react';
import ResourceEditForm from '../../../components/ResourceEditForm';
import { ResourceCard } from '@/components/ResourceCard';
import SidebarFilter from '@/components/organisation/SideBarFilterDriver';
import { DriverProps, FilterDriverProps } from '@/utils/types/DriverProps';
import { Link } from 'react-aria-components';

export default function DriversPage() {
    const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);
    const [formModalResource, setFormModalResource] = useState<DriverProps | null>(null);

    const closeEditForm = () => {
        setFormModalResource(null);
        setIsEditFormOpen(false);
    }

    const [drivers, setDrivers] = useState<DriverProps[]>([]);

    useEffect(() => {
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
          .catch((error) => {
            console.error('Error loading drivers:', error);
          });
      }, []);

    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => setShowAlert(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    const [, setFilters] = useState<FilterDriverProps>({
        rating: null,
        ageRange: [0, 100],
        location: '',
    });

    const handleFilterChange = (newFilters: FilterDriverProps) => {
        setFilters(newFilters);
    };

    return (
        <div className='h-full w-full flex flex-col gap-2 rounded-md'>
            <div className='w-full h-12 p-4 flex flex-row items-center justify-between'>
                <div>
                    <h2 className='text-2xl font-bold'>Your drivers</h2>
                    <div className='text-gray-600 text-sm'>
                        Actually, you have <span className='font-black'>{drivers.length} drivers</span>
                    </div>
                </div>
                <div>
                    <label htmlFor='filter-start-date' className='text-gray-500 mr-2'>Show data from :</label>
                    <input id='filter-start-date' type='date' className='border border-primary-blue/15 p-1 rounded-sm' />
                </div>
            </div>
            <div className="my-4">
                <SidebarFilter drivers={drivers} onFilter={handleFilterChange} />
            </div>
            <div className='h-full flex flex-row gap-0'>
                <div className='grid grid-cols-2 gap-4 w-full h-full overflow-auto'>
                    {drivers.map((driver) => (
                        <Link key={driver.id} href={`/drivers/${driver.id}`}>
                            <ResourceCard key={driver.id} resource={driver} profilActive={false} />
                        </Link>
                    ))}
                </div>
            </div>

            { formModalResource && isEditFormOpen &&
                <ResourceEditForm resource={formModalResource} onClose={closeEditForm} />   
            }
        </div>
    );
}
