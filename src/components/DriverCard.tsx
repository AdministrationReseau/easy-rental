// import React from 'react';
// import Image from 'next/image';
// import Stars from '@/components/Stars';
// import { DriverProps } from '@/utils/types/DriverProps';
//
// interface DriverCardProps extends DriverProps {
//   onSelect: (driver: DriverProps | null) => void;
//   isSelected: boolean;
// }
//
// const DriverCard: React.FC<DriverCardProps> = ({
//   first_name,
//   last_name,
//   email,
//   location,
//   age,
//   profile_picture,
//   rating,
//   phone,
//   id,
//   license_number,
//   license_type,
//   address,
//   vehicle_assigned,
//   insurance_provider,
//   insurance_policy,
//   available,
//   created_at,
//   onSelect,
//   isSelected,
// }) => {
//   const handleClick = () => {
//     // Désélectionner si le chauffeur est déjà sélectionné
//     if (isSelected) {
//       onSelect(null);
//     } else {
//       onSelect({
//         first_name,
//         last_name,
//         email,
//         location,
//         age,
//         profile_picture,
//         rating,
//         phone,
//         id,
//         license_number,
//         license_type,
//         address,
//         vehicle_assigned,
//         insurance_provider,
//         insurance_policy,
//         available,
//         created_at
//       });
//     }
//   };
//
//   return (
//     <div
//       className={`bg-white rounded-xl p-5 w-[280px] transition-shadow duration-300 cursor-pointer
//         ${isSelected ? 'border-2 border-red-500 bg-gray-200' : 'hover:shadow-lg'}
//       `}
//       onClick={handleClick}
//     >
//       <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
//         <Image
//           src={profile_picture || "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"}
//           alt={`${first_name}'s avatar`}
//           layout="fill"
//           objectFit="cover"
//         />
//       </div>
//
//       <div className="flex flex-col space-y-3">
//         <div className="flex justify-between items-center">
//           <h2 className="text-lg font-bold text-gray-800">{first_name} {last_name}</h2>
//           <Stars value={rating} precision={0.5} />
//         </div>
//
//         <div className="text-gray-600 text-sm space-y-2">
//           <div className="flex items-center">
//             <span className="material-icons text-blue-500 mr-2">Mail:</span>
//             <p>{email}</p>
//           </div>
//           <div className="flex items-center">
//             <span className="material-icons text-blue-500 mr-2">Adress:</span>
//             <p>{location || address}</p>
//           </div>
//           <div className="flex items-center">
//             <span className="material-icons text-blue-500 mr-2">Age:</span>
//             <p>{age} years old</p>
//           </div>
//           <div className="flex items-center">
//             <span className="material-icons text-blue-500 mr-2">Phone:</span>
//             <p>{phone}</p>
//           </div>
//         </div>
//
//         <div className="border-b border-gray-200"></div>
//
//         <button
//           onClick={handleClick}
//           className={`mt-3 w-full py-2 rounded-lg font-semibold transition-all duration-300
//             ${isSelected ? 'bg-red-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}
//           `}
//         >
//           {isSelected ? 'Deselect Driver' : 'Select Driver'}
//         </button>
//       </div>
//     </div>
//   );
// };
//
// export default DriverCard;
import React from 'react';
import Image from 'next/image';
import Stars from '@/components/Stars';
import { Delete, Edit, Email, Phone, Timelapse } from '@mui/icons-material';
import Link from 'next/link';
import { DriverCardProps } from "@/utils/types/DriverProps";

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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-[280px] transition-transform transform hover:scale-105">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">
            {first_name} {last_name}
          </h2>
          <div className="flex gap-2">
            <button className="rounded-full p-2 hover:bg-blue-100 transition-colors">
              <Edit style={{ color: 'blue' }} onClick={() => onEdit(id)} />
            </button>
            <button className="rounded-full p-2 hover:bg-red-100 transition-colors">
              <Delete style={{ color: 'red' }} onClick={() => onDelete(id)} />
            </button>
          </div>
        </div>

        <div className="relative w-full h-48 mb-4">
          {profile_picture && (
            <Image
              src={profile_picture}
              alt={`${first_name} ${last_name}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          )}
        </div>

        <div className="flex flex-col gap-3 mb-4">
          <div className="flex items-center space-x-1">
            <Timelapse className="text-blue-500" />
            <span>{age} years</span>
          </div>
          <div className="flex items-center space-x-1">
            <Phone className="text-green-500" />
            <span>{phone}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Email className="text-purple-500" />
            <span>{email}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <Stars value={rating} precision={0.5} />
          </div>
          <Link href={`/drivers/${id}`}>
            <button className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              View More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DriverCard;
