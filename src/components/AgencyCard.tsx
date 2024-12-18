'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Favorite, FavoriteBorder, People,Star, AccessTime} from '@mui/icons-material';
import Image from "next/image"; // Import des icônes pour like et dislike
import { AgencyProps } from '@/utils/types/AgencyProps';

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

const AgencyCard: React.FC<AgencyProps> = ({
    id,
    city,
    quater,
    followers,
    rating,
    slogan,
    name,
    isOpen,
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
    isOpen = true;
    return (
        <div className="bg-white text-secondary-text rounded-lg shadow-md overflow-hidden w-[300px] h-[450px]">
            {/* Première ligne - Nom et Like/Dislike */}
            <div className="flex justify-between items-center p-4">
                <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
                <LikeButton isLiked={isLiked} onClick={toggleLike} />
            </div>

            {/* Deuxième ligne - Marque */}
            <div className="px-4 py-2 text-sm text-secondary-text text-sm h-[70px]">
                <p>{slogan}</p>
            </div>

            {/* Image du véhicule */}
            <div className='flex items-center justify-center h-[200px]'>
                <Image
                    src={images[0]}
                    alt={`${name} `}
                    width={200}
                    height={100}
                    className=" "
                />
            </div>

            {/* Détails supplémentaires */}
            <div className='flex justify-between items-center text-sm'>
                <div className="flex items-center gap-2 px-2 py-2">
                    <Star className="w-5 h-5" />
                    <p>{rating}</p>
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
                    <p className='text-secondary-text ml-2'>{quater}</p>
                </span>
                {/* <Link href={`/car-details/${id}`}> */}
                <Link
                    href={`/customer/agencies/${id}`}
                    className="text-primary-blue mt-2 inline-block"
                >
                    <button className="py-2 px-4 text-sm bg-primary-blue text-white rounded-md transition duration-200 hover:scale-105 hover:bg-blue-600 w-[116px] h-[44px]">
                        View more
                    </button>
                </Link>
            </div>
        </div>
    );
};

export { AgencyCard };
