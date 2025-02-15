'use client';

import React from 'react';
import Link from 'next/link';
import { People, LocalGasStation, Speed, Delete, Edit } from '@mui/icons-material';
import Image from 'next/image';
import { CarProps } from '@/utils/types/CarProps';

const CarCard: React.FC<CarProps> = ({
                                         id = 0,
                                         brand = '',
                                         model = '',
                                         engine = { capacity: 0 },
                                         transmission = '',
                                         passenger = 0,
                                         pricePerDay = 0,
                                         images = [],
                                         onEdit = () => {},
                                         onDelete = () => {},
                                     }) => {

    return (
        <div className="bg-white text-secondary-text rounded-lg overflow-hidden w-[280px]">
            {/* Header - Brand, Model, Like Button */}
            <div className="flex justify-between items-center p-4 h-[50px]">
                <h2 className="text-md font-semibold text-gray-800">
                    {brand} {model}
                </h2>
                <div className='text-nowrap'>
                    <button className="rounded-full hover:bg-primary-blue/10">
                        <Edit style={{color: 'blue'}} onClick={(e: React.MouseEvent) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onEdit(id);
                        }}/>
                    </button>
                    <button className="rounded-full hover:bg-red-500/10">
                        <Delete style={{color: 'red'}} onClick={(e: React.MouseEvent) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onDelete(id);
                        }} />
                    </button>
                </div>
            </div>

            {/* Image Section */}
            <div className="flex items-center justify-center h-[180px]">
                {images[0] && (
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
                    <span className="text-gray-500 text-sm ml-1">/ jour</span>
                </div>
                <Link href={`/cars/${id}`}>
                    <button className="text-sm py-2 px-4 bg-primary-blue text-white rounded-md transition duration-200 transform hover:scale-105 hover:bg-blue-600">
                        View More
                    </button>
                </Link>
            </div>
        </div>
    );
};

export { CarCard };
