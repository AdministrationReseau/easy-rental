'use client';

import React, { useState, useEffect } from 'react';
import AgencyList from '@/components/customer/AgencyList';
import SidebarFilterAgency from '@/components/customer/SideBarFilterAgency';
import LocationFilter from '@/components/LocationFilter';

interface FilterProps {
  city: string[];
  stars: number | null;
}

const App: React.FC = () => {
  const [agencies, setAgencies] = useState<any[]>([]);
  const [filters, setFilters] = useState<FilterProps>({
    city: [],
    stars: null,
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

  const handleFilterChange = (newFilters: FilterProps) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <main className="flex">
        <div className="filter-container">
          <SidebarFilterAgency vehicles={agencies} onFilter={handleFilterChange} />
        </div>
        {/* <Filter/> */}
        <div className='flex justify-center items-center flex-col ml-56'>
          {/* <LocationFilter/> */}
          <AgencyList agencies={agencies} filters={filters} />
        </div>
          
      </main>
    </div>
  );
};

export default App;
