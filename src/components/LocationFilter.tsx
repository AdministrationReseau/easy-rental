'use client';

import * as React from 'react';
import { LocationFilterEnum } from '@/utils/enum';
import { CountryPicker } from './CountryPicker';
import { TimePicker } from './TimePicker';
import { DatePicker } from './DatePicker';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'; // Icône pour le switch horizontal

interface LocationFilterProps {
    type: LocationFilterEnum;
}

function LocationFilter({ type }: LocationFilterProps) {
    return (
        <div className="relative bg-white  rounded-lg shadow-md p-4">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-primary-blue shadow-[0_0_10px_2px_rgba(0,96,254,0.6)]"></div>
                <span className="font-semibold text-primary-blue capitalize">{type}</span>
            </div>
            <div className="w-full flex flex-row gap-3">
                <div className="w-[30%] flex flex-col flex-grow">
                    <label className="text-gray-500 text-sm mb-1">Select country - region</label>
                    <CountryPicker />
                </div>
                <div className="w-[1px] bg-gray-300"></div>
                <div className="w-[30%] flex flex-col flex-grow">
                    <label className="text-gray-500 text-sm mb-1">Select your date</label>
                    <DatePicker />
                </div>
                <div className="w-[1px] bg-gray-300"></div>
                <div className="w-[30%] flex flex-col flex-grow">
                    <label className="text-gray-500 text-sm mb-1">Select your time</label>
                    <TimePicker />
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
        <div className=" px-2 flex flex-col lg:flex-row justify-between items-center gap-6 relative w-[70] ">
            <div className="relative w-full flex  lg:flex-row flex-col gap-6 justify-between md:items-center">
                {isDepartureFirst ? (
                    <>
                        <LocationFilter type={LocationFilterEnum.PICKUP} />

                        <div className="flex justify-center items-center">
                            <button
                                className="bg-primary-blue text-white rounded-full p-4 hover:bg-primary-blue/90 focus:outline-none focus:ring-2 focus:ring-primary-blue/50 transition duration-300"
                                onClick={togglePosition}
                            >
                                <SwapHorizIcon className="text-white" fontSize="large" />
                            </button>
                        </div>
                        <LocationFilter type={LocationFilterEnum.DROPOFF} />
                    </>
                ) : (
                    <>
                        <LocationFilter type={LocationFilterEnum.DROPOFF} />

                        <div className="flex justify-center items-center">
                            <button
                                className="bg-primary-blue text-white rounded-full p-4 hover:bg-primary-blue/90 focus:outline-none focus:ring-2 focus:ring-primary-blue/50 transition duration-300"
                                onClick={togglePosition}
                            >
                                <SwapHorizIcon className="text-white" fontSize="large" />
                            </button>
                        </div>
                        <LocationFilter type={LocationFilterEnum.PICKUP} />
                    </>
                )}
            </div>
        </div>
    );
}

export default LocationFilterContainer;
