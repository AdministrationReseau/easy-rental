'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Stars from '../Stars';
import { CarProps } from '@/utils/types/CarProps';
import { rentalInfoProps } from '@/utils/types/RentalInfoProps';
import { Button } from '@mui/material';
import { Gift, X } from 'lucide-react';
interface BonusModalProps {
    payment: rentalInfoProps;
    onClose: () => void;
  }
  const BonusModal = ({ payment, onClose }: BonusModalProps) => {
    // const { bonusConfig } = useBonus();
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">Rental Bonus Points</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
  
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-2xl font-bold text-blue-600 text-center">
                50 Points
              </p>
              {/* {payment.paidWithPoints && (
                <p className="text-sm text-blue-600 text-center mt-1">
                  (Points spent on this rental)
                </p>
              )} */}
            </div>
  
            <div className="space-y-2">
              <h4 className="font-semibold">Rental Details:</h4>
              <p className="text-sm text-gray-600">
                {/* Car: {payment.car.brand} {payment.car.model} */}
                Car: Toyota Yaris
              </p>
              <p className="text-sm text-gray-600">
                Amount Spent: 50000 XAF
              </p>
              <p className="text-sm text-gray-600">
                Rental Period: {(payment?.pick_up.date?.toString())} - {(payment?.drop_off.date?.toString())}
              </p>
            </div>
  
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">How Points are Calculated:</h4>
              <div className="text-sm text-gray-600 whitespace-pre-line">
                {/* {bonusConfig.description} */}
                Base points: 1 point per $10 spent\nLoyalty multiplier: 1.5x points
              </div>
            </div>
          </div>
  
          <div className="mt-6">
            <Button onClick={onClose} className="w-full">
              Apply
            </Button>
          </div>
        </div>
      </div>
    );
  };

const RentalSummary: React.FC<CarProps & { rentalInfo?: rentalInfoProps }> = ({
    brand,
    model,
    rating,
    reviews,
    pricePerDay,
    images,
    rentalInfo
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenOnce, setIsOpenOnce] = useState(false);
      
    
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
                        <Stars value={rating  ?? 0} precision={1} />
                        <span className='px-4'>{reviews.length} + 
                        {reviews.length === 1||reviews.length ===0? (
                            <p>Reviewer</p>
                        ):(
                            <p>Reviewers</p>
                        )}
                        </span>
                    </span>
                </div>
            </div>
            <div className='flex justify-center'>
                <hr className='w-[80%] h-4'/>
            </div>
            <div className='flex flex-col gap-2'>
                {/* <span className='flex flex-row justify-between'>
                    <p className='text-secondary-text'>Name:</p> 
                    <p className='text-primary-text text-xl'>{rentalInfo?.user.name || ''}</p>
                </span> */}
                {/* <span className='flex flex-row justify-between'>
                    <p className='text-secondary-text'>Phone:</p> 
                    <p className='text-primary-text text-xl'>{rentalInfo?.user.phone || ''}</p>
                </span><span className='flex flex-row justify-between'>
                    <p className=:'text-secondary-text'>City:</p>
                    <p className='text-primary-text text-xl'>{rentalInfo?.user.city || ''}</p>
                </span>
                <span className='flex flex-row justify-between'>
                    <p className='text-secondary-text'>Billing Address:</p>
                    <p className='text-primary-text text-xl'>{rentalInfo?.user.address || ''}</p>
                </span>
                <span className='flex flex-row justify-between'>
                    <p className='text-secondary-text'>Pick-Up Place:</p> 
                    <p className='text-primary-text text-xl'>{rentalInfo?.pick_up.place || ''}</p>
                </span>
                <span className='flex flex-row justify-between'>
                    <p className='text-secondary-text'>Return Place:</p> 
                    <p className='text-primary-text text-xl'>{rentalInfo?.drop_off.place || ''}</p>
                </span>
                <span className='flex flex-row justify-between'>
                    <p className='text-secondary-text'>Payment Method:</p>  
                    <p className='text-primary-text text-xl'>{rentalInfo?.payment_method || ''}</p>
                </span>
                
                 <span className='flex flex-row justify-between'>
                     <p className='text-secondary-text'>Driver Name:</p> 
                     <p className='text-primary-text text-xl'>{rentalInfo?.driver?.name || ''}</p>
                 </span> */}
                
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

                <button 
                    className={`py-2 px-4 w-full text-white text-sm rounded-md transition duration-200   ${isOpenOnce ? "bg-gray-400" : "bg-primary-blue  hover:bg-primary-blue transform hover:scale-105"}`}
                    onClick={() => (setIsOpen(true), setIsOpenOnce(true))}>
                    Use Your Bonus
                </button>
               { isOpenOnce ?(
                <p className='text-center text-sm text-red-600'>Actual Points : 100 points</p>
               
                    ):(
                        <div className="flex justify-center items-center text-sm text-green-600">
                        <Gift className="w-4 h-4 mr-2" />
                            <span>
                                Points : 200 points
                            </span>
                        </div>
                    )}
                
            </div>
            {/* </div> */}
            <div className='flex flex-row justify-between py-2'>
                <span className='flex flex-col py-2 '>
                    <h1><b>Total Rental price</b></h1>
                    <p className='text-secondary-text text-sm'>Overall price and includes rental discount</p>
                </span>
                <span className='flex items-center text-xl'>
                    <b>{pricePerDay} FCFA</b>
                </span>
            </div>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        {/* <h2 className="text-xl font-bold mb-4">Ceci est un popup !</h2>
                        <p>Tu peux ajouter du contenu ici.</p> */}
                        {rentalInfo?(
                        <BonusModal payment={rentalInfo}
                        onClose={() => (setIsOpen(false),setIsOpenOnce(true))}/>
                    ):(
                        <button
                            onClick={() => setIsOpen(false)}
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
                        >
                            Fermer
                        </button>
                    )
                    }
                        
                    </div>
                </div>
                )}
        </div>
    );
};

export { RentalSummary };
