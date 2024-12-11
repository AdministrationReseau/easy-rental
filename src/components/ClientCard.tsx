// cree moi un composant pour le caroussel des clients et un composant ClientCard qui affiche les commentaire des clients dans une carte et affiche les ... si le message du client est trop long pour totalement s'afficher sur le ClientCard qui est de taille fixe.
'use client';

import React from 'react';
import Image from "next/image";
import Stars from './Stars';


interface ClientProps {
    id: string;
    name: string;
    comments: string;

      images: string[];
}

const ClientCard: React.FC<ClientProps> = ({
    //id,
    name,
    comments,
    images,
}) => {
    
    
    return (
        <div className="bg-white text-secondary-text rounded-lg shadow-md overflow-hidden w-[325px] h-[388px]">

            {/* Image du véhicule - Afficher uniquement la première image */}
            <div className='flex items-center justify-center h-[180px]'>
                {images && images.length > 0 && (
                    <Image
                        src={images[0]}  // Utiliser la première image du tableau
                        alt={`${name}`}
                        width={50}
                        height={50}
                        className="object-cover rounded-full "
                    />
                )}
            </div>

            {/* Détails supplémentaires */}
            <div className="px-4 py-2 flex flex-col justify-between items-center">
                <span className='flex m-2'>
                    <p className="text-xl font-semibold ">{comments} </p>
                </span>
            </div>
            

            {/* Prix de location et bouton Rent Now */}
            <div className="px-4 py-2 flex flex-col justify-between items-center">
                <span className='flex m-2'>
                    <p className="text-xl font-semibold text-gray-800">{name} </p>
                </span>
                <Stars value={2.5} precision={0.5}/>
            </div>
        </div>
    );
};

export { ClientCard };
