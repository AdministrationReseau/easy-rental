'use client';

import React from 'react';
import { AgencyCard } from '@/components/AgencyCard';
import { AgencyListProps } from '@/utils/types/AgencyProps';

const AgencyList: React.FC<AgencyListProps> = ({ agencies, filters }) => {
  const filteredAgencies = agencies.filter((agency) => {
    if (!agency) return false;

    const matchesCity =
      filters.city.length === 0 || (agency.city && filters.city.includes(agency.city));

    const matchesStars =
      filters.rating === null || (agency.rating && agency.rating >= filters.rating);

    return matchesCity && matchesStars;
  });

  return (
    <div className="p-5 w-full flex">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAgencies.length > 0 ? (
          filteredAgencies.map((agency) => (
            <AgencyCard
              key={agency.id}
              id={agency.id}
              city={agency.city}
              quater={agency.quater}
              name={agency.name}
              followers={agency.followers || 4}
              rating={agency.rating || 4}
              slogan={agency.slogan}
              images={agency.images}
              isOpen={agency.isOpen}
              description={agency.description} 
              openingTime={agency.openingTime} 
              closingTime={agency.closingTime} 
              type={agency.type} 
              createdAt={agency.createdAt} 
              updatedAt={agency.updatedAt} 
              reviews={agency.reviews}
              onLike={(id: number) => { console.log(id); } }
              onDislike={(id: number) => { console.log(id); } } 
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
