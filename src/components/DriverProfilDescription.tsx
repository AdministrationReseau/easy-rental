'use client'

import * as React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import StateBox from './StateBox';
import { ProcessState } from '@/utils/enum';

interface DriverProfilDescriptionProps {
    starsNumber: number
    firstname: string
    lastname: string
    age: number
    gender: number
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

export default function DriverProfilDescription({ starsNumber, firstname, lastname, age, gender, width=450 }: DriverProfilDescriptionProps) {
    const caracteristics = [
        { name: 'Age', value: `${age} ans` },
        { name: 'Genre', value: gender === 0 ? 'Men' : 'Woman' }
    ]

    return (
        <div style={{ width: `${width}px` }} className='bg-white shadow-sm shadow-primary-blue/15 rounded-md p-4'>
            <div className='w-full relative mb-8'>
                <FavoriteIcon className='absolute top-2 right-2 text-red-text'/>
                
                <h3 className='font-bold text-2xl'>{firstname} {lastname}</h3>
                <Evaluation number={starsNumber}/>
            </div>
            <div className='flex flex-col gap-1'>
                {caracteristics.map((caracteristic, index) => (
                    <div key={index} className='w-1/2 flex flex-row justify-between'>
                        <span className='text-gray-500'>{caracteristic.name}</span>
                        <span className='text-right'>{caracteristic.value}</span>
                    </div> 
                ))}
            </div>
            <div className='flex flex-row items-center justify-end'>
                <StateBox state={ProcessState.CONFIRMED} />
            </div>
            
        </div>
    );
}