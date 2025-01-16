'use client';

import React, { useState, useEffect } from 'react';
import AgencyList from '@/components/customer/AgencyList';
import SidebarFilterAgency from '@/components/customer/SideBarFilterAgency';
import { AgencyProps, FilterAgencyProps } from '@/utils/types/AgencyProps';



const App: React.FC = () => {
  const [agencies, setAgencies] = useState<AgencyProps[]>([]);
  const [filters, setFilters] = useState<FilterAgencyProps>({
    city: [],
      rating: null,
      type: [],
      status: 'all',
      followers: [0, 100],
  });

  useEffect(() => {
    fetch('/data/agencies.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data && Array.isArray(data)) {
          setAgencies(data);
        } else {
          console.error('Unexpected data format:', data);
          console.log(data);
        }
      })
      .catch((error) => {
        console.error('Error loading Agencies:', error);
      });
  }, []);

  const handleFilterChange = (newFilters: FilterAgencyProps) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <main className="flex flex-row">
        <div className="">
          <SidebarFilterAgency agencies={agencies} onFilter={handleFilterChange} />
        </div>
        {/* <Filter/> */}
        <div className='flex justify-center items-center flex-col'>
          {/* <LocationFilter/> */}
          <AgencyList agencies={agencies} filters={filters} />
        </div>
          
      </main>
    </div>
  );
};

export default App;
