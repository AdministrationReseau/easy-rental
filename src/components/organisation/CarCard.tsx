'use client';

import React from 'react';
import { Heart, User, Sliders, Calendar, Award, BarChart, Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { CarProps } from '@/utils/types/CarProps';
import Link from 'next/link';

interface CarCardProps extends CarProps {
  onLike: (id: number) => void;
  onDislike: (id: number) => void;
  onEdit: () => void;
  onDelete: (id: number) => void;
}

export const CarCard: React.FC<CarCardProps> = ({
  id,
  images,
  brand,
  model,
  transmission,
  year,
  passenger,
  pricePerDay,
  available,
  favorite,
  rating,
  type,
  onLike,
  onDislike,
  onEdit,
  onDelete,
}) => {
  const handleLikeClick = () => {
    if (favorite) {
      onDislike(id);
    } else {
      onLike(id);
    }
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* Image container avec overlay pour status disponibilité */}
      <div className="relative h-48 w-full">
        <Image
          src={images?.[0] || '/placeholder-car.jpg'}
          alt={`${brand} ${model}`}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
        {/* Badge de disponibilité */}
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${
          available ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {available ? 'Disponible' : 'Indisponible'}
        </div>
        {/* Badge de type de véhicule */}
        {type && (
          <div className="absolute top-3 right-12 px-3 py-1 rounded-full bg-blue-500 text-white text-xs font-medium">
            {type}
          </div>
        )}
        {/* Bouton favori */}
        <button
          onClick={handleLikeClick}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
          aria-label={favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <Heart fill={favorite ? '#f43f5e' : 'none'} color={favorite ? '#f43f5e' : '#64748b'} size={18} />
        </button>
      </div>

      {/* Contenu */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <Link href={`/cars/${id}`}>
                <h3 className="font-semibold text-lg text-gray-800 cursor-pointer">{brand} {model}</h3>
            </Link>
            <p className="text-sm text-gray-500">{year}</p>
          </div>
          <div className="flex items-center">
            <Award size={14} className="text-yellow-500 mr-1" />
            <span className="text-sm font-medium">{rating}/5</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 my-3">
          <div className="flex items-center text-gray-600">
            <Sliders size={14} className="mr-2" />
            <span className="text-xs">{transmission}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <User size={14} className="mr-2" />
            <span className="text-xs">{passenger} places</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar size={14} className="mr-2" />
            <span className="text-xs">{year}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <BarChart size={14} className="mr-2" />
            <span className="text-xs">{type || 'N/A'}</span>
          </div>
        </div>

        <div className="mt-auto pt-3 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <span className="font-bold text-lg text-blue-600">{pricePerDay}XAF</span>
              <span className="text-xs text-gray-500"> /jour</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={onEdit}
                className="p-2 rounded-full bg-gray-100 hover:bg-blue-200 transition-colors"
                aria-label="Modifier"
              >
                <Edit size={16} className="text-gray-600" />
              </button>
              <button
                onClick={() => onDelete(id)}
                className="p-2 rounded-full bg-gray-100 hover:bg-red-100 transition-colors"
                aria-label="Supprimer"
              >
                <Trash2 size={16} className="text-gray-600 hover:text-red-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
