'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Favorite, FavoriteBorder, People, LocalGasStation, Speed } from '@mui/icons-material';
import Image from 'next/image';
import Stars from '../Stars';
import { CarProps } from '@/utils/types/CarProps';

export interface rentalInfoProps {
    pickUpDate: string,
    pickUpTime: string,
    backOffDate: string,
    backOffTime: String
    billingName: String,
    billingPhone: number,
    billingAddress: string,
    billingCity: string,
    promoCode: number,
}

const RentalSummary: React.FC<CarProps& { rentalInfo?: rentalInfoProps }> = ({
    id,
    brand,
    model,
    engine,
    rating,
    reviews,
    transmission,
    passenger,
    pricePerDay,
    images,
    rentalInfo
}) => {
  

    return (
        <div className="bg-white text-gray-700 rounded-lg p-4 max-w-full shadow-md overflow-hidden">
            {/* Header - Brand, Model, Like Button */}
            <div className="flex flex-col py-2">
                <h2 className="text-lg font-semibold text-gray-800">
                    <b>Rental Summary</b>
                    {/* {brand} {model} */}
                </h2>
                <p className='text-secondary-text text-sm'>Prices may change depending on the lenght of the rental and the price of your rental car</p>
               
            </div>
            <div className='flex py-6 flex-row justify-between items-center'>
                {/* Image Section */}
                <div className="flex items-center justify-center  bg-gray-100">
                    {images?.[0] && (
                        <Image
                            src={images[0]}
                            alt={`${brand} ${model}`}
                            width={200}
                            height={200}
                            className="object-contain rounded-lg"
                        />
                    )}
                </div>
                <div>
                    <span>
                        <h1 className='text-xl'><b>{brand} {model}</b></h1>
                    </span>
                    <span className='flex flex-row py-4'>
                        <Stars value={rating} precision={1} />
                        {reviews.length} + Reviewer
                    </span>
                </div>
            </div>
            <div className='flex justify-center'>
                <hr className='w-[80%] h-4'/>
            </div>
            <div>
                <h1 className="text-xl font-bold">{brand} {model}</h1>
                <p><b>Pick-Up Date:</b> {rentalInfo?.pickUpDate || 'N/A'}</p>
                <p><b>Pick-Up Time:</b> {rentalInfo?.pickUpTime || 'N/A'}</p>
                <p><b>Return Date:</b> {rentalInfo?.backOffDate || 'N/A'}</p>
                <p><b>Return Time:</b> {rentalInfo?.backOffTime || 'N/A'}</p>
                <p><b>Customer:</b> {rentalInfo?.billingName || 'N/A'}</p>
                <p><b>Phone:</b> {rentalInfo?.billingPhone || 'N/A'}</p>
            </div>
            <div className='flex flex-row justify-between py-2'>
                <h1 className='text-secondary-text'> Subtotal</h1>
                <p><b>{pricePerDay} Francs cfa</b></p>
            </div>
            <div className='flex flex-row justify-between py-2'>
                <h1 className='text-secondary-text'> Tax</h1>
                <p><b>0 Francs cfa</b></p>
            </div>
            <div>
                <button className="py-2 px-4 w-full bg-gray-100 text-secondary-text text-sm rounded-md transition duration-200 transform hover:scale-105 hover:bg-gray-400 hover:text-primary-text">
                    Apply Promo Code
                </button>
            </div>
            <div className='flex flex-row justify-between py-2'>
                <span className='flex flex-col py-2 '>
                    <h1><b>Total Rental price</b></h1>
                    <p className='text-secondary-text text-sm'>Overall price and includes rental discount</p>
                </span>
                <span className='flex items-center text-xl'>
                    <b>{pricePerDay} FCFA</b>
                </span>
            </div>
        </div>
    );
};

export { RentalSummary  };
