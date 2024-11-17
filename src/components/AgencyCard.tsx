'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Favorite, FavoriteBorder, People, LocalGasStation, Speed } from '@mui/icons-material'; // Import des icônes pour like et dislike

interface LikeProps {
    isLiked: boolean; // Etat du like : true si aimé, false sinon
    onClick: () => void; // Fonction appelée lorsque l'utilisateur clique sur l'icône
}

const LikeButton: React.FC<LikeProps> = ({ isLiked, onClick }) => {
    return (
        <button onClick={onClick} className="text-xl">
            {isLiked ? (
                <Favorite className="text-red-500" /> // Coeur rouge si aimé
            ) : (
                <FavoriteBorder className="text-gray-500" /> // Coeur incolore si non aimé
            )}
        </button>
    );
};

interface AgencyProps {
    id: string;
    imageUrl: string;
    Agency: string;
    slogan: string;
    stars: number;
    folowers:number;
    isOpen: boolean;
    City: string;
    Location: string;
    onLike: (id: string) => void; // Fonction pour gérer les likes
    onDislike: (id: string) => void; // Fonction pour gérer les dislikes
}

const CarCard: React.FC<CarProps> = ({
    id,
    imageUrl,
    brand,
    model,
    fuel,
    gearbox,
    passengers,
    pricePerDay,
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
        <div className="bg-white text-secondary-text rounded-lg shadow-md overflow-hidden w-[317px] h-[388px]">
            {/* Première ligne - Nom et Like/Dislike */}
            <div className="flex justify-between items-center p-4">
                <h2 className="text-xl font-semibold text-gray-800">{brand} {model}</h2>
                <LikeButton isLiked={isLiked} onClick={toggleLike} />
            </div>

            {/* Deuxième ligne - Marque */}
            <div className="px-4 py-2 text-sm text-secondary-text">
                <p>Marque: {brand}</p>
            </div>

            {/* Image du véhicule */}
            <div className='flex items-center justify-center h-[180px]'>
                <img
                    src={imageUrl}
                    alt={`${brand} ${model}`}
                    className="w-[254px] h-[102px] object-cover"
                />
            </div>

            {/* Détails supplémentaires */}
            <div className='flex justify-between items-center text-sm'>
                <div className="flex items-center gap-2 px-2 py-2">
                    <LocalGasStation className="w-5 h-5" />
                    <p>{fuel} L</p>
                </div>
                <div className="flex items-center gap-2 px-2 py-2">
                    <Speed className="w-5 h- 5" />
                    <p>{gearbox}</p>
                </div>
                <div className="flex items-center gap-2 px-2 py-2">
                    <People className="w-5 h-5" />
                    <p>{passengers} People</p>
                </div>
            </div>
            

            {/* Prix de location et bouton Rent Now */}
            <div className="px-4 py-2 flex justify-between items-center">
                <span className='flex m-2'>
                    <p className="text-xl font-semibold text-gray-800">{pricePerDay} CFA /</p>
                    <p className='text-secondary-text ml-2'>jour</p>
                </span>
                {/* <Link href={`/car-details/${id}`}> */}
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
