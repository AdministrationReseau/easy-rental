import React from 'react';
import Image from 'next/image';
import Stars from '@/components/Stars';
import { DriverProps } from '@/utils/types/DriverProps';
import { Delete, Edit, Email, Phone, Timelapse } from '@mui/icons-material';
import Link from 'next/link';

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
  age,
  profile_picture,
  rating,
  phone,
  id,
  onEdit,
  onDelete,
}) => {
  
  return (
    <div className="bg-white text-secondary-text rounded-lg overflow-hidden w-[280px]">
      {/* Header - Brand, Model, Like Button */}
      <div className="flex justify-between items-center p-4 h-[50px]">
          <h2 className="text-md font-semibold text-gray-800">
              {first_name} {last_name}
          </h2>
          <div className='text-nowrap'>
              <button className="rounded-full hover:bg-primary-blue/10">
                  <Edit style={{color: 'blue'}} onClick={() => onEdit(id)} />
              </button>
              <button className="rounded-full hover:bg-red-500/10">
                  <Delete style={{color: 'red'}} onClick={() => onDelete(id)} />
              </button>
          </div>
      </div>

      {/* Image Section */}
      <div className="flex items-center justify-center h-[180px]">
          {profile_picture && (
              <Image
                  src={profile_picture}
                  alt={`${first_name} ${last_name}`}
                  width={250}
                  height={120}
                  className="object-contain"
              />
          )}
      </div>

      {/* Details Section */}
      <div className="flex flex-col justify-between items-start px-4 py-2 text-sm text-gray-600">
        <div className="flex items-center gap-1">
            <Timelapse className="w-5 h-5 text-gray-500" />
            <p>{age} years</p>
        </div>
        <div className="flex items-center gap-1">
            <Phone className="w-5 h-5 text-gray-500" />
            <p>{phone}</p>
        </div>
        <div className="flex items-center gap-1">
            <Email className="w-5 h-5 text-gray-500" />
            <p>{email}</p>
        </div>
      </div>

      {/* Footer Section */}
      <div className="px-4 py-2 flex justify-between items-center">
          <div>
              <span className="text-xl font-semibold text-gray-800">
                  {<Stars value={rating} precision={0.5} />}
              </span>
          </div>
          <Link href={`/drivers/${id}`}>
              <button className="text-sm py-2 px-4 bg-primary-blue text-white rounded-md transition duration-200 transform hover:scale-105 hover:bg-blue-600">
                  View More
              </button>
          </Link>
      </div>
    </div>
  );
};

export default DriverCard;
