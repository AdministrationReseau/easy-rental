'use client';

import React from 'react';
import { AgencyCard } from '@/components/AgencyCard';
import { AgencyListProps, AgencyProps } from '@/utils/types/AgencyProps';

const isAgencyOpen = (agency: AgencyProps) => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const [openingHour, openingMinute] = agency.openingTime.split(':').map(Number);
    const [closingHour, closingMinute] = agency.closingTime.split(':').map(Number);

    const openingTime = openingHour * 60 + openingMinute;
    const closingTime = closingHour * 60 + closingMinute;
    console.log("CurrentTime: ",openingTime," et ", closingTime, " pour",currentTime);
    return currentTime >= openingTime && currentTime <= closingTime;
    
  };
  
const AgencyList: React.FC<AgencyListProps> = ({ agencies, filters }) => {
  const filteredAgencies = agencies.filter((agency) => {
    if (!agency) return false;
    const matchesRating =
      filters.rating === null || (agency.rating && agency.rating >= filters.rating);

    const matchesCity = 
      filters.city.length === 1 && filters.city[0] !== 'all' ? filters.city.includes(agency.city) : true;
    
      const matchesFollowers =
      typeof agency.followers === 'number' &&
      agency.followers>= filters.followers[0] &&
      agency.followers <= filters.followers[1];


    const matchesType = filters.type.length === 0 ||  filters.type.includes(agency.type);

    const matchesStatus = filters.status=== 'all' || isAgencyOpen(agency);

    return matchesRating && matchesFollowers && matchesCity && matchesType && matchesStatus;

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
