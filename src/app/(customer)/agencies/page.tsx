'use client';

import React, { useState, useEffect } from 'react';
import AgencyList from '@/components/customer/AgencyList';
import SidebarFilterAgency from '@/components/customer/SideBarFilterAgency';
import { AgencyProps, FilterAgencyProps } from '@/utils/types/AgencyProps';
import { agencyService } from '@/utils/services';



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
const loadInitialData = async () => {
            try {
                const fetchedAgencies = await agencyService.getAllAgencies();
                setAgencies(fetchedAgencies);
            } catch (err) {
                console.error("Erreur lors du chargement des agences.",err);
            } 
            };
            loadInitialData();
      
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
                <h1 className="text-5xl font-bold text-center text-blue-800 mb-8 ">All availables agencies </h1>
          <AgencyList agencies={agencies} filters={filters} />
        </div>
          
      </main>
    </div>
  );
};

export default App;
