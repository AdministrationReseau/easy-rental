import React from 'react';
import Image from 'next/image';
import { Person, CalendarMonth, CreditCard } from '@mui/icons-material';
import Stars from '../Stars';
import { CarProps } from '@/utils/types/CarProps';
import { rentalInfoProps } from '@/utils/types/RentalInfoProps';
import DriverList from '../customer/DriverList';

const RentalSummaryOrg: React.FC<CarProps & { rentalInfo?: rentalInfoProps }> = ({
    brand,
    model,
    rating,
    reviews,
    pricePerDay,
    images,
    id,
    rentalInfo
}) => {
    return (
        <div className="w-[80%] bg-white text-gray-700 rounded-2xl p-6 mx-auto shadow-xl border border-gray-100 space-y-6">
            {/* Car Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className='text-2xl font-bold text-gray-800'>{brand} {model}</h1>
                    <div className='flex items-center space-x-3 mt-2'>
                        <Stars value={rating ?? 0} precision={1} />
                        <span className='text-gray-500'>{reviews.length} Reviews</span>
                    </div>
                </div>
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

            {/* 3 Sections Layout */}
            <div className="grid grid-cols-1 gap-6">
                {/* 1. Renter Information Section */}
                <div className="bg-blue-50 rounded-xl p-4 space-y-4">
                    <div className="flex items-center space-x-3">
                        <Person className="text-blue-600" />
                        <h3 className="font-bold text-blue-800">Renter Details</h3>
                    </div>
                    <div className='flex flex-row w-full justify-between flex-wrap'>
                    <div>
                        <p className="text-sm text-gray-600">Name</p>
                        <p className="font-medium">{rentalInfo?.billingName || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium">{rentalInfo?.billingPhone || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">City</p>
                        <p className="font-medium">{rentalInfo?.billingCity || 'N/A'}</p>
                    </div>
                    </div>
                </div>
                {/* 2. Rental Information Section */}
                <div className="bg-green-50 rounded-xl p-4 space-y-4">
                    <div className="flex items-center space-x-3">
                        <CalendarMonth className="text-green-600" />
                        <h3 className="font-bold text-green-800">Rental Details</h3>
                    </div>
                    <div  className='grid grid-cols-2 w-full'>
                        <div>
                            <div>
                                <p className="text-sm text-gray-600">Pick-Up Time</p>
                                <p className="font-medium">{rentalInfo?.pickUpTime || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Pick-Up Place</p>
                                <p className="font-medium">{rentalInfo?.pickUpPlace || 'N/A'}</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p className="text-sm text-gray-600">Return Time</p>
                                <p className="font-medium">{rentalInfo?.backOffTime || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Return Place</p>
                                <p className="font-medium">{rentalInfo?.backOffPlace || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4.Section Driver */}
                <div className="bg-pink-50 rounded-xl p-4 space-y-4">
                    <div className="flex items-center space-x-3">
                        <CreditCard className="text-pink-600" />
                        <h3 className="font-bold text-pink-800">Driver Detail</h3>
                    </div>
                    <div className='w-full overflow-x-auto relative'>
                        <DriverList vehicleId={Number(id)} onSelectedDriversChange={() => true} />
                    </div>
                </div>
                
               
                {/* 3. Payment Information Section */}
                <div className="bg-purple-50 rounded-xl p-4 space-y-4">
                    <div className="flex items-center space-x-3">
                        <CreditCard className="text-purple-600" />
                        <h3 className="font-bold text-purple-800">Payment Details</h3>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Payment Method</p>
                        <p className="font-medium">{rentalInfo?.paymentMethod || 'N/A'}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 mt-4">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-semibold">{pricePerDay} FCFA</span>
                        </div>
                        <hr className="my-2 border-purple-100"/>
                        <div className="flex justify-between">
                            <span className="font-bold text-purple-800">Total</span>
                            <span className="text-xl font-bold text-purple-900">{pricePerDay} FCFA</span>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export { RentalSummaryOrg };