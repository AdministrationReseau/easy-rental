'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Favorite, FavoriteBorder, People, LocalGasStation, Speed } from '@mui/icons-material';
import Image from "next/image";

interface LikeProps {
    isLiked: boolean;
    onClick: () => void;
}

const LikeButton: React.FC<LikeProps> = ({ isLiked, onClick }) => {
    return (
        <button onClick={onClick} className="text-xl">
            {isLiked ? (
                <Favorite className="text-red-500" />
            ) : (
                <FavoriteBorder className="text-gray-500" />
            )}
        </button>
    );
};

interface CarProps {
    id: string;
    // type: string;
    brand: string;
    model: string;
    // year: number;
    passenger: number;
    pricePerDay: number;
    // vin: string;
    engine: {
        type: string;
        horsepowe : number;
        capacity : number;
    }
    transmission: string;
    // color: string;
    // fuel_efficiency:{
    //     city: number;
    //     hightway: number;
    // }
    // license_plate: string,
    //   registration: {
    //     state: string,
    //     expiry: Date,
    //   },
    //   owner: {
    //     name: string,
    //     address: string,
    //     phone: string,
    //     email: string,
    //   },
    //   service_history: [
    //     {
    //       date: Date,
    //       service_type: string,
    //       mileage: number,
    //       provider: string
    //     },
    //     {
    //       date: Date,
    //       service_type: string,
    //       mileage: number,
    //       provider: string,
    //     }
    //   ],
    //   insurance: {
    //     provider: string,
    //     policy_number: string,
    //     expiry: string,
    //   },
      images: string[];
    onLike: (id: string) => void; // Fonction pour gérer les likes
    onDislike: (id: string) => void; // Fonction pour gérer les dislikes
}

const CarCard: React.FC<CarProps> = ({
    id,
    // type,
    brand,
    model,
    // year,
    // vin,
    engine,
    transmission,
    // color,
    passenger,
    pricePerDay,
    // fuel_efficiency,
    // license_plate,
    // owner,
    // service_history,
    // insurance,
    images,
    onLike,
    onDislike,
}) => {
    const [isLiked, setIsLiked] = useState<boolean>(false);

    // Fonction pour basculer l'état du like
    const toggleLike = () => {
        setIsLiked(!isLiked);
        if (!isLiked) {
            onLike(id); // Appel de la fonction onLike si le véhicule est aimé
        } else {
            onDislike(id); // Appel de la fonction onDislike si le véhicule est non aimé
        }
    };

    return (
        <div className="bg-white text-secondary-text rounded-lg shadow-md overflow-hidden w-[325px] h-[388px]">
            {/* Première ligne - Nom et Like/Dislike */}
            <div className="flex justify-between items-center p-4">
                <h2 className="text-xl font-semibold text-gray-800">{brand} {model}</h2>
                <LikeButton isLiked={isLiked} onClick={toggleLike} />
            </div>

            {/* Deuxième ligne - Marque */}
            <div className="px-4 py-2 text-sm text-secondary-text">
                <p>Marque: {brand}</p>
            </div>

            {/* Image du véhicule - Afficher uniquement la première image */}
            <div className='flex items-center justify-center h-[180px]'>
                {images && images.length > 0 && (
                    <Image
                        src={images[0]}  // Utiliser la première image du tableau
                        alt={`${brand} ${model}`}
                        width={250}
                        height={120}
                        className="object-cover "
                    />
                )}
            </div>

            {/* Détails supplémentaires */}
            <div className='flex justify-between items-center text-sm'>
                <div className="flex items-center gap-2 px-2 py-2">
                    <LocalGasStation className="w-5 h-5" />
                    <p>{engine.capacity} L</p>
                </div>
                <div className="flex items-center gap-2 px-2 py-2">
                    <Speed className="w-5 h-5" />
                    <p>{transmission}</p>
                </div>
                <div className="flex items-center gap-2 px-2 py-2">
                    <People className="w-5 h-5" />
                    <p>{passenger} People</p>
                </div>
            </div>

            {/* Prix de location et bouton Rent Now */}
            <div className="px-4 py-2 flex justify-between items-center">
                <span className='flex m-2'>
                    <p className="text-xl font-semibold text-gray-800">{pricePerDay} CFA /</p>
                    <p className='text-secondary-text ml-2'>jour</p>
                </span>
                <Link href="#">
                    <button className="py-2 px-4 bg-primary-blue text-white rounded-md transition duration-200 hover:scale-105 hover:bg-blue-600 w-[116px] h-[44px]">
                        Rent Now
                    </button>
                </Link>
            </div>
        </div>
    );
};

export { CarCard };
