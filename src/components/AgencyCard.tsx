'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Favorite, FavoriteBorder, People,Star, AccessTime} from '@mui/icons-material'; // Import des icônes pour like et dislike

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
    agency: string;
    slogan: string;
    stars: number;
    followers:number;
    isOpen: boolean;
    city: string;
    location: string;
    onLike: (id: string) => void; // Fonction pour gérer les likes
    onDislike: (id: string) => void; // Fonction pour gérer les dislikes
}

const AgencyCard: React.FC<AgencyProps> = ({
    id,
    imageUrl,
    agency,
    slogan,
    stars,
    followers,
    isOpen,
    city,
    location,
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
                <h2 className="text-xl font-semibold text-gray-800">{agency}</h2>
                <LikeButton isLiked={isLiked} onClick={toggleLike} />
            </div>

            {/* Deuxième ligne - Marque */}
            <div className="px-4 py-2 text-sm text-secondary-text">
                <p>{slogan}</p>
            </div>

            {/* Image du véhicule */}
            <div className='flex items-center justify-center h-[150px]'>
                <img
                    src={imageUrl}
                    alt={`${agency} ${slogan}`}
                    className="w-[300px] h-[125px] object-cover"
                />
            </div>

            {/* Détails supplémentaires */}
            <div className='flex justify-between items-center text-sm'>
                <div className="flex items-center gap-2 px-2 py-2">
                    <Star className="w-5 h-5" />
                    <p>{stars}</p>
                </div>
                <div className="flex items-center gap-2 px-2 py-2">
                <People className="w-5 h-5" />
                    <p>{followers}</p>
                </div>
                <div className="flex items-center gap-2 px-2 py-2">
                    <AccessTime className="w-5 h- 5" />
                    <p>{isOpen}Open</p>
                </div>
            </div>


            {/* Prix de location et bouton Rent Now */}
            <div className="px-4 py-2 flex justify-between items-center">
                <span className='m-2'>
                    <p className="text-xl font-semibold text-gray-800">{city}</p>
                    <p className='text-secondary-text ml-2'>{location}</p>
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

export { AgencyCard };
