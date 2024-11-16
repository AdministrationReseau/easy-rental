'use client'

import * as React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import StateBox from './StateBox';
import { ProcessState } from '@/utils/enum';

interface CarProfilDescriptionProps {
    starsNumber: number
    name: string
    description: string
    price: number
    caracteristics: { name: string, value: string }[]
    width: number
}

interface EvaluationProps {
    number: number
}

const Evaluation = ({number}: EvaluationProps) => {
    return (
        <div className='flex flex-row gap-0'>
            {[...Array(number)].map((_, index) => (
                <StarIcon key={index} className='text-yellow-500' fontSize='small'/>
            ))}
            {[...Array(5 - number)].map((_, index) => (
                <StarIcon key={index} className='text-yellow-500' fontSize='small'/>
            ))}
        </div>
    )
}

export default function CarProfilDescription({ starsNumber, name, description, price, caracteristics, width=450 }: CarProfilDescriptionProps) {
    return (
        <div style={{ width: `${width}px` }} className='bg-white shadow-sm shadow-primary-blue/15 rounded-md p-4'>
            <div className='w-full relative'>
                <FavoriteIcon className='absolute top-2 right-2 text-red-text'/>
                
                <h3 className='font-bold'>{name}</h3>
                <Evaluation number={starsNumber}/>
            </div>
            <div className='w-full py-8 text-gray-500'>
                <p>{description}</p>
            </div>
            <div className='w-full pb-8'>
                <div className='grid grid-cols-2 gap-x-8'>
                    {caracteristics.map((caracteristic, index) => (
                        <div key={index} className='flex flex-row justify-between'>
                            <span className='text-gray-500'>{caracteristic.name}</span>
                            <span className='text-right'>{caracteristic.value}</span>
                        </div> 
                    ))}
                </div>
            </div>
            <div className='w-full flex flex-row gap-1 justify-between items-center'>
                <div>
                    <span className='text-gray-500'><span className='font-bold text-black'>{price} FCFA </span>per day</span>
                </div>
                <div>
                    <StateBox state={ProcessState.CONFIRMED} />
                </div>
            </div>
        </div>
    );
}