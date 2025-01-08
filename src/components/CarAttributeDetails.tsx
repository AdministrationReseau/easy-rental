'use client'

import * as React from 'react';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import GroupIcon from '@mui/icons-material/Group';


interface CarAttributeDetailsProps {
    name: string
    value: string
}

const getIcon = (name: string) => {
    switch (name) {
        case 'milage': return <AddRoadIcon fontSize='large'/>;
        case 'steering': return <DirectionsCarIcon fontSize='large'/>;
        case 'fuel': return <LocalGasStationIcon fontSize='large'/>;
        case 'capacity': return <GroupIcon fontSize='large'/>;
        default: return <DirectionsCarIcon fontSize='large'/>;
    }
}

export default function CarAttributeDetails({ name, value }: CarAttributeDetailsProps) {
    return (
        <div className='flex flex-col gap-2 items-center bg-white shadow-sm shadow-primary-blue/10 rounded-md p-4 w-full'>
            {getIcon(name)}
                
            <div>
                <span className='font-bold'>{name}</span>
                <span className='text-gray-500'>({value})</span>
            </div>
        </div>
    );
}