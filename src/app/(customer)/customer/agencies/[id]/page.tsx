'use client'

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import AgencyList from '@/components/customer/AgencyList';
// import SidebarFilterAgency from '@/components/customer/SideBarFilterAgency';
import { AgencyProps, FilterAgencyProps } from '@/utils/types/AgencyProps';
import AgencyDetail from '@/components/combiner-components/AgencyDetail';



const AgencyDetails: React.FC = () => {
  const { id } = useParams();
  const [agency, setAgency] = React.useState<AgencyProps | null>(null);
  const [agencies, setAgencies] = useState<AgencyProps[]>([]);
  const [filters] = useState<FilterAgencyProps>({
    city: [],
    rating: null,
    type: [],
    status: 'all',
    followers: [0, 100],
  });

  // Chargement des données des véhicules
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
          const foundAgency = data.find(
            (a: AgencyProps) => a.id.toString() === id
          );
          setAgency(foundAgency || null); // Trouve l'agence correspondant à l'ID
        } else {
          console.error('Unexpected data format:', data);
        }
      })
      .catch((error) => {
        console.error('Error loading Agencies:', error);
      });
  }, [id]);

  if (!agency) {
    return <p>Loading...</p>;
  }

  // const handleFilterChange = (newFilters: FilterAgencyProps) => {
  //   setFilters(newFilters);
  // };


  return (
    <div >
      <main className="flex">
        {/* <div className="filter-container">
          <SidebarFilterAgency agencies={agencies} onFilter={handleFilterChange} />
        </div> */}

        {/* <Filter/> */}
        <div className='flex justify-center items-center flex-col m-4'>
          {/* <LocationFilter/> */}
          <AgencyDetail agency={agency} />
          <AgencyList agencies={agencies} filters={filters} />
        </div>
      </main>
    </div>
  );
};

export default AgencyDetails;
