'use client'

import { useState, useEffect } from 'react';
import SidebarFilter from '@/components/organisation/SideBarFilterDriver';
import { DriverProps, FilterDriverProps } from '@/utils/types/DriverProps';
import OrgDriverList from '@/components/organisation/OrgDriverList';

export default function DriversPage() {
    const [drivers, setDrivers] = useState<DriverProps[]>([]);
    const [filters, setFilters] = useState<FilterDriverProps>({
        ratingRange: [0, 5],
        ageRange: [0, 100],
        location: '',
    });
    const [isPopupOpen, setIsPopupOpen] = useState(false);

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
            <div className={`my-4 ${isPopupOpen ? 'block' : 'hidden'} lg:block`}>
                <SidebarFilter drivers={drivers} onFilter={handleFilterChange} isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen}/>
            </div>
            <div className='h-full w-full'>
                <OrgDriverList drivers={drivers} filters={filters} />
            </div>
            <button
                className="lg:hidden fixed bottom-4 right-4 bg-primary-blue text-white p-3 rounded-full shadow-lg"
                onClick={() => setIsPopupOpen(true)}
                >
                Filters
            </button>
        </div>
    );
}
