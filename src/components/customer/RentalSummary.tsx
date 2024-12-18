import React from 'react';
import Link from 'next/link';
import { Favorite, FavoriteBorder, People, LocalGasStation, Speed } from '@mui/icons-material';
import Image from 'next/image';
import Stars from '../Stars';
import { CarProps } from '@/utils/types/CarProps';
import { DriverProps } from '@/utils/types/DriverProps';
import { DateValue } from 'react-aria-components';

export interface rentalInfoProps {
    pickUpDate: DateValue;
    pickUpTime: string;
    pickUpPlace: String;
    backOffDate: DateValue;
    backOffTime: String;
    backOffPlace: string;
    billingName: String;
    billingPhone: number;
    billingAddress: string;
    billingCity: string;
    paymentMethod: String;  // Added payment method field
    driverName: String| undefined;
    promoCode: number;
}

const RentalSummary: React.FC<CarProps & { rentalInfo?: rentalInfoProps }> = ({
    id,
    brand,
    model,
    rating,
    reviews,
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
                </h2>
                <p className='text-secondary-text text-sm'>Prices may change depending on the length of the rental and the price of your rental car</p>
            </div>
            <div className='flex py-6 flex-row justify-between items-center'>
                {/* Image Section */}
                <div className="flex items-center justify-center bg-gray-100">
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
                        <h1 className='text-xl text-primary-text'><b>{brand} {model}</b></h1>
                    </span>
                    <span className='flex flex-row w-full py-4'>
                        <Stars value={rating} precision={1} />
                       <span className='px-4'>{reviews.length} + Reviewer</span> 
                    </span>
                </div>
            </div>
            <div className='flex justify-center'>
                <hr className='w-[80%] h-4'/>
            </div>
            <div>
                <span className='flex flex-row justify-between'>
                    <p className='text-secondary-text'>Name:</p> 
                    <p className='text-primary-text text-xl'>{rentalInfo?.billingName || ''}</p>
                </span>
                <span className='flex flex-row justify-between'>
                    <p className='text-secondary-text'>Phone:</p> 
                    <p className='text-primary-text text-xl'>{rentalInfo?.billingPhone || ''}</p>
                </span><span className='flex flex-row justify-between'>
                    <p className='text-secondary-text'>City:</p>
                    <p className='text-primary-text text-xl'>{rentalInfo?.billingCity || ''}</p>
                </span>
                <span className='flex flex-row justify-between'>
                    <p className='text-secondary-text'>Billing Address:</p>
                    <p className='text-primary-text text-xl'>{rentalInfo?.billingAddress || ''}</p>
                </span>
                <span className='flex flex-row justify-between'>
                    <p className='text-secondary-text'>Pick-Up Date:</p>
                    <p className='text-primary-text text-xl'>{rentalInfo?.pickUpDate || ''}</p>
                </span>
                {/* <span className='flex flex-row justify-between'>
                    <p className='text-secondary-text'>Pick-Up Time:</p> 
                    <p className='text-primary-text text-xl'>{rentalInfo?.pickUpTime || ''}</p>
                </span> */}
                <span className='flex flex-row justify-between'>
                    <p className='text-secondary-text'>Pick-Up Place:</p> 
                    <p className='text-primary-text text-xl'>{rentalInfo?.pickUpPlace || ''}</p>
                </span>
                <span className='flex flex-row justify-between'>
                    <p className='text-secondary-text'>Return Date:</p> 
                    <p className='text-primary-text text-xl'>{rentalInfo?.backOffDate || ''}</p>
                </span>
                {/* <span className='flex flex-row justify-between'>
                    <p className='text-secondary-text'>Return Time:</p> 
                    <p className='text-primary-text text-xl'>{rentalInfo?.backOffTime || ''}</p>
                </span> */}
                <span className='flex flex-row justify-between'>
                    <p className='text-secondary-text'>Return Place:</p> 
                    <p className='text-primary-text text-xl'>{rentalInfo?.backOffPlace || ''}</p>
                </span>
                <span className='flex flex-row justify-between'>
                    <p className='text-secondary-text'>Payment Method:</p>  {/* Added Payment Method field */}
                    <p className='text-primary-text text-xl'>{rentalInfo?.paymentMethod || ''}</p>
                </span>
                <span className='flex flex-row justify-between'>
                    <p className='text-secondary-text'>Driver Name:</p>  {/* Added Payment Method field */}
                    <p className='text-primary-text text-xl'>{rentalInfo?.driverName || ''}</p>
                </span>
                
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

export { RentalSummary };
