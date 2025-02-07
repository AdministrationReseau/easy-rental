import React from 'react';
import Image from 'next/image';
import { Person, CalendarMonth, CreditCard, Email, Phone, LocationOn } from '@mui/icons-material';
import Stars from '../Stars';
import { CarProps } from '@/utils/types/CarProps';
import { LocationProps } from '@/utils/types/RentalInfoProps';
import { DriverProps } from '@/utils/types/DriverProps';

const DriverSection :React.FC<{ driver: DriverProps}> = ({
    driver
}) => {
  return (
    <div>
      <div className="flex items-center space-x-3 mb-6">
        <Person className="text-blue-600 text-2xl" />
        <h3 className="font-semibold text-primary-text text-xl">Driver Details</h3>
      </div>

      <div className="">
        {/* Driver Info */}
        <div className=" bg-white rounded-xl p-4 shadow-sm">
          <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
            <Image
              src={driver?.profile_picture || "/placeholder-avatar.jpg"}
              alt={`${driver?.first_name}'s avatar`}
              layout="fill"
              objectFit="cover"
              className="hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-800">
                {driver?.first_name} {driver?.last_name}
              </h2>
              <Stars value={driver?.rating || 0} precision={0.5} />
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Email className="text-blue-500 text-xl" />
                <span>{driver?.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <LocationOn className="text-blue-500 text-xl" />
                <span>{driver?.location || driver?.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Person className="text-blue-500 text-xl" />
                <span>{driver?.age} years old</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="text-blue-500 text-xl" />
                <span>{driver?.phone}</span>
              </div>
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
};

const RentalSection: React.FC<{ pickUpDate:Date|null, pickUpPlace: string, backOffDate: Date|null, backOffPlace:string }> = ({
    pickUpDate,
    pickUpPlace,
    backOffDate,
    backOffPlace
}) => {
    return(
        <div>
         {/* Calendar View */}
         {pickUpDate&&backOffDate?
            <div className="">
                <div className="flex items-center gap-2 mb-6">
                <CalendarMonth className="text-blue-500" />
                <h4 className="font-semibold text-primary-text text-xl">Rental Period</h4>
                </div>
                
                <div className="bg-white rounded-xl p-4 shadow-sm space-y-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-600 mb-2">Pick-up Date & Time & Place</p>
                        <p className="font-semibold text-lg">{new Date(pickUpDate).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                        })}</p>
                        <p> Lieu {pickUpPlace}</p>
                    </div>
    
                    <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm text-green-600 mb-2">Return Date & Time & Place</p>
                        <p className="font-semibold text-lg">{new Date(backOffDate).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                        })}</p>
                        <p> Lieu {backOffPlace}</p>
                    </div>
    
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">Duration</p>
                        <p className="font-semibold text-lg">
                        {Math.ceil((new Date(backOffDate).getTime() - new Date(pickUpDate).getTime()) / (1000 * 60 * 60 * 24))} days
                        </p>
                    </div>
                </div>
            </div>
            :
            <p>No calendar Available</p>}
        </div>
    );
};

const RentalSummaryOrg: React.FC<{vehicle?: CarProps} & { location?: LocationProps } & {driver?: DriverProps | null}> = ({
    vehicle,
    driver,
    location
}) => {

    
    return (
        <div className="w-[80%] bg-white text-gray-700 rounded-2xl p-6 mx-auto shadow-xl border border-gray-100 space-y-6">
            {/* Car Header */}
            <div className="flex items-center justify-between flex-col md:flex-row">
                <div>
                    <h1 className='text-2xl font-bold text-gray-800'>{vehicle?.brand} {vehicle?.model}</h1>
                    <div className='flex items-center space-x-3 mt-2'>
                        <Stars value={vehicle?.rating ?? 0} precision={1} />
                        <span className='text-gray-500'>{vehicle?.reviews.length} Reviews</span>
                    </div>
                </div>
                {vehicle?.images?.[0] && (
                    <Image
                        src={vehicle?.images[0]}
                        alt={`${vehicle?.brand} ${vehicle?.model}`}
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
                        <h3 className="font-semibold text-primary-text text-xl">Renter Details</h3>
                    </div>
                    <div className='w-full  grid grid-cols-2 md:grid-cols-4'>
                        <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden mx-auto mb-2">
                            <Image 
                                src={location? location.user.user_image : "/BG1.png"} 
                                alt={location? location.user.user_name : "default_profile"}
                                width={100}
                                height={100}   
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <p className="text-md text-secondary-text">Name</p>
                            <p className="font-medium">{location?.user.user_name || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="text-md text-secondary-text">Phone</p>
                            <p className="font-medium">{location?.user.user_phone || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="text-md text-secondary-text">City</p>
                            <p className="font-medium">{location?.user.user_address || 'N/A'}</p>
                        </div>
                    </div>
                </div>
                {/* 2. Rental Information Section */}
                
                <div className="bg-blue-50 rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* 4.Section Driver */}
                    <RentalSection pickUpDate={location? location.pick_up_date: null} 
                                    pickUpPlace={location? location.pick_up_place:''} 
                                    backOffDate={location? location.drop_off_date: null}
                                    backOffPlace={location? location.drop_off_place:''}
                                    />
                   
                    { driver? <DriverSection driver={driver} />
                    :<p>No Driver</p>}
                   </div>
               
                {/* 3. Payment Information Section */}
                <div className="bg-blue-50 rounded-xl p-4 space-y-4">
                    <div className="flex items-center space-x-3">
                        <CreditCard className="text-blue-600" />
                        <h3 className="font-semibold text-primary-text text-xl">Payment Details</h3>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Payment Method</p>
                        <p className="font-medium">{location?.payment_method || 'N/A'}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 mt-4">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-semibold">{vehicle?.pricePerDay} FCFA</span>
                        </div>
                        <hr className="my-2 border-purple-100"/>
                        <div className="flex justify-between">
                            <span className="font-bold text-blue-800">Total</span>
                            <span className="text-xl font-bold text-blue-900">{location?.price} FCFA</span>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export { RentalSummaryOrg };