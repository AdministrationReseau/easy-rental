'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Favorite, FavoriteBorder, People, LocalGasStation, Speed } from '@mui/icons-material';
import Image from 'next/image';

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
    brand: string;
    model: string;
    passenger: number;
    pricePerDay: number;
    engine: {
        type: string;
        horsepower: number;
        capacity: number;
    };
    transmission: string;
    images: string[];
    onLike: (id: string) => void;
    onDislike: (id: string) => void;
}

const CarCard: React.FC<CarProps> = ({
    id,
    brand,
    model,
    engine,
    transmission,
    passenger,
    pricePerDay,
    images,
    onLike,
    onDislike,
}) => {
    const [isLiked, setIsLiked] = useState<boolean>(false);

    const toggleLike = () => {
        setIsLiked(!isLiked);
        if (!isLiked) {
            onLike(id);
        } else {
            onDislike(id);
        }
    };

    return (
        <div className="bg-white text-gray-700 rounded-lg shadow-md overflow-hidden w-[325px]">
            {/* Header - Brand, Model, Like Button */}
            <div className="flex justify-between items-center p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                    {brand} {model}
                </h2>
                <LikeButton isLiked={isLiked} onClick={toggleLike} />
            </div>

            {/* Image Section */}
            <div className="flex items-center justify-center h-[180px] bg-gray-100">
                {images?.[0] && (
                    <Image
                        src={images[0]}
                        alt={`${brand} ${model}`}
                        width={250}
                        height={120}
                        className="object-contain"
                    />
                )}
            </div>

            {/* Details Section */}
            <div className="flex justify-between items-center px-4 py-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                    <LocalGasStation className="w-5 h-5 text-gray-500" />
                    <p>{engine.capacity}L</p>
                </div>
                <div className="flex items-center gap-1">
                    <Speed className="w-5 h-5 text-gray-500" />
                    <p>{transmission}</p>
                </div>
                <div className="flex items-center gap-1">
                    <People className="w-5 h-5 text-gray-500" />
                    <p>{passenger} People</p>
                </div>
            </div>

            {/* Footer Section */}
            <div className="px-4 py-2 flex justify-between items-center">
                <div>
                    <span className="text-xl font-semibold text-gray-800">
                        {pricePerDay} CFA
                    </span>
                    <span className="text-gray-500 ml-1">/ jour</span>
                </div>
                <Link href={`/customer/cars/${id}`}>
                    <button className="py-2 px-4 bg-primary-blue text-white rounded-md transition duration-200 transform hover:scale-105 hover:bg-blue-600">
                        Rent Now
                    </button>
                </Link>
            </div>
        </div>
    );
};

export { CarCard };
