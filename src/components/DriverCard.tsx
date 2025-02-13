import React from 'react';
import Image from 'next/image';
import Stars from '@/components/Stars';
import { DriverProps } from '@/utils/types/DriverProps';

interface DriverCardProps extends DriverProps {
  onSelect: (driver: DriverProps | null) => void;
  isSelected: boolean;
}

const DriverCard: React.FC<DriverCardProps> = ({
  first_name,
  last_name,
  email,
  location,
  age,
  profile_picture,
  rating,
  phone,
  id,
  license_number,
  license_type,
  address,
  vehicle_assigned,
  insurance_provider,
  insurance_policy,
  created_at,
  onSelect,
  isSelected,
}) => {
  const handleClick = () => {
    // Désélectionner si le chauffeur est déjà sélectionné
    if (isSelected) {
      onSelect(null);
    } else {
      onSelect({
        first_name,
        last_name,
        email,
        location,
        age,
        profile_picture,
        rating,
        phone,
        id,
        license_number,
        license_type,
        address,
        vehicle_assigned,
        insurance_provider,
        insurance_policy,
        created_at
      });
    }
  };

  return (
    <div
      className={`bg-white rounded-xl p-5 w-[280px] transition-shadow duration-300 cursor-pointer 
        ${isSelected ? 'border-2 border-red-500 bg-gray-200' : 'hover:shadow-lg'}
      `}
      onClick={handleClick}
    >
      <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
        <Image
          src={profile_picture || "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"}
          alt={`${first_name}'s avatar`}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="flex flex-col space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">{first_name} {last_name}</h2>
          <Stars value={rating} precision={0.5} />
        </div>

        <div className="text-gray-600 text-sm space-y-2">
          <div className="flex items-center">
            <span className="material-icons text-blue-500 mr-2">mail</span>
            <p>{email}</p>
          </div>
          <div className="flex items-center">
            <span className="material-icons text-blue-500 mr-2">place</span>
            <p>{location || address}</p>
          </div>
          <div className="flex items-center">
            <span className="material-icons text-blue-500 mr-2">calendar_today</span>
            <p>{age} years old</p>
          </div>
          <div className="flex items-center">
            <span className="material-icons text-blue-500 mr-2">call</span>
            <p>{phone}</p>
          </div>
        </div>

        <div className="border-b border-gray-200"></div>

        <button
          onClick={handleClick}
          className={`mt-3 w-full py-2 rounded-lg font-semibold transition-all duration-300 
            ${isSelected ? 'bg-red-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}
          `}
        >
          {isSelected ? 'Deselect Driver' : 'Select Driver'}
        </button>
      </div>
    </div>
  );
};

export default DriverCard;
