import React from 'react';
import Image from 'next/image';
import Stars from '@/components/Stars';
import { DriverProps } from '@/utils/types/DriverProps';
import { Delete, Edit } from '@mui/icons-material';

interface DriverCardProps extends DriverProps {
  onSelect: (driver: DriverProps | null) => void;
  isSelected: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
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
  available,
  onSelect,
  isSelected,
  onEdit,
  onDelete,
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
        available,
      });
    }
  };

  return (
    <div
      className={`bg-white rounded-xl p-2 w-[280px] transition-shadow duration-300 cursor-pointer 
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

        <div className="text-gray-600 text-sm">
          <div className="flex items-center">
            <span className="material-icons text-blue-500 mr-2">mail</span>
            <p>{email}</p>
          </div>
          <div className="flex items-center">
            <span className="material-icons text-blue-500 mr-2">place</span>
            <p className="truncate whitespace-nowrap text-ellipsis">{location || address}</p>
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

        <div className='text-nowrap flex justify-end gap-4'>
            <button className="rounded-full hover:bg-primary-blue/10">
              <Edit style={{color: 'blue'}} onClick={() => onEdit(id)} />
            </button>
            <button className="rounded-full hover:bg-red-500/10">
              <Delete style={{color: 'red'}} onClick={() => onDelete(id)} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default DriverCard;
