'use client';

import React from 'react';
import { AgencyCard } from '@/components/AgencyCard';


interface AgencyListProps {
  agencies: any[];
  filters: {
    city: string[];
    stars: number | null;
  };
}

const AgencyList: React.FC<AgencyListProps> = ({ agencies, filters }) => {
  const filteredAgencies = agencies.filter((agency) => {
    if (!agency) return false;

    const matchesCity =
      filters.city.length === 0 || (agency.city && filters.city.includes(agency.city));

    const matchesStars =
      filters.stars === null || (agency.stars && agency.stars >= filters.stars);

      return matchesCity&& matchesStars;
});

  return (
    <div className="p-5 w-full flex">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {filteredAgencies.length > 0 ? (
          filteredAgencies.map((agency) => (
            <AgencyCard
              key={agency.id}
              id={agency.id}
              city={agency.city}
              quater={agency.quater}
              name={agency.name}
              followers={agency.followers || 4}
              stars={agency.stars   || 4}
              slogan={agency.slogan}
              images={agency.images}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No agencies available matching your filters.
          </p>
        )}
      </div>
    </div>
  );
};
  
export default AgencyList;
