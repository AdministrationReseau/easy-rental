'use client';

import * as React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { LocationFilterEnum } from '@/utils/enum';
import {CountryPicker} from './CountryPicker';
import {TimePicker} from './TimePicker';
import {DatePicker }from './DatePicker';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'; // Icône pour le switch horizontal

interface LocationFilterProps {
    type: LocationFilterEnum;
}

function LocationFilter({ type }: LocationFilterProps) {
    return (
        <div>
            <div className="flex flex-row gap-2 items-center">
                <div className="w-2 h-2 rounded-full bg-primary-blue bg-005FFE shadow-[0_0_10px_1px_rgba(0,96,254,0.6)]"></div>
                <span>{type}</span>
            </div>
            <div className="flex flex-row gap-2 h-12">
                <div className="flex flex-col">
                    <span className="text-gray-500 text-xs">Select country - region</span>
                    <div className="flex h-full items-center">
                        <CountryPicker />
                    </div>
                </div>
                <div className="w-[1px] h-3/5 bg-primary-blue/20"></div>
                <div className="flex flex-col">
                    <span className="text-gray-500 text-xs">Select your date</span>
                    <div className="flex h-full items-center">
                        <DatePicker />
                    </div>
                </div>
                <div className="w-[1px] h-3/5 bg-primary-blue/20"></div>
                <div className="flex flex-col">
                    <span className="text-gray-500 text-xs">Select your time</span>
                    <div className="flex h-full items-center">
                        <TimePicker />
                    </div>
                </div>
            </div>
        </div>
    );
}

function LocationFilterContainer() {
    const [isDepartureFirst, setIsDepartureFirst] = React.useState(true);

    const togglePosition = () => {
        setIsDepartureFirst((prev) => !prev);
    };

    return (
        <div className="bg-white p-4 gap-4 rounded-lg shadow-lg flex flex-row justify-center mt-5 w-[85%]">
            {isDepartureFirst ? (
                <>
                    <LocationFilter type={LocationFilterEnum.PICKUP} />
                    <span className='flex justify-center items-center'>
                        <button
                            className="bg-primary-blue text-white rounded-md py-2 px-4 hover:bg-primary-blue/80 w-[60px] h-[60px]"
                            onClick={togglePosition}
                        >
                            <SwapHorizIcon />
                       </button>
                        </span> 
                    <LocationFilter type={LocationFilterEnum.DROPOFF} />
                </>
            ) : (
                <>
                    <LocationFilter type={LocationFilterEnum.DROPOFF} />
                    <span className='flex justify-center items-center'>
                        <button
                            className="bg-primary-blue text-white rounded-md py-2 px-4 hover:bg-primary-blue/80 w-[60px] h-[60px]"
                            onClick={togglePosition}
                        >
                             <SwapHorizIcon />
                        </button>
                    </span>
                    
                    <LocationFilter type={LocationFilterEnum.PICKUP} />
                </>
            )}
        </div>
    );
}

export default LocationFilterContainer;
