'use client'

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LocationProps } from "@/utils/types/RentalInfoProps";
import { Calendar, CheckCircle, Circle, Clock, CreditCard, Gift, XCircle } from 'lucide-react';
import { useBonus } from "@/providers/BonusContext";


interface LocationListProps {
    locations: LocationProps[];
}
interface StatusProps{
    status : "pending" | "completed" | "cancelled"
}

const { calculateBonus } = useBonus();



const PaymentStatus = ({ status }: StatusProps) => {
    const getStatusConfig = () => {
      switch (status) {
        case 'completed':
          return {
            icon: CheckCircle,
            text: 'Completed',
            className: 'text-green-600 bg-green-50'
          };
        case 'pending':
          return {
            icon: Clock,
            text: 'Pending',
            className: 'text-yellow-600 bg-yellow-50'
          };
        case 'cancelled':
          return {
            icon: XCircle,
            text: 'Failed',
            className: 'text-red-600 bg-red-50'
          };
      }
    };
  
    const config = getStatusConfig();
    const Icon = config? config.icon : Circle;
  
    return (
      <span className={'w-[100px] inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium'+ config.className}>
        <Icon className="w-4 h-4 mr-1" />
        {config.text}
      </span>
    );
  };
  
 
const LocationList: React.FC<LocationListProps> = ({ locations,  }) => {
    return (
        <div className="w-full">
            {/* <h2 className="text-xl font-semibold mb-4 text-primary-text">Recent Locations</h2> */}
            <div className="grid grid-cols-1  gap-6">
                {locations.map((location, index) => (
                    <Link href={`/rentals/${location.id}`} key={index}>
                    <div
                        key={index}
                        className=" w-full flex flex-col md:flex-row items-center justify-around bg-whitish-background p-4 rounded-lg shadow-sm"
                    >
                        {/* Image et informations */}
                        <div className=" h-full p-2 flex items-center justify-between space-x-2">
                            <Image
                                src={location.vehicle?.image[0]||'/placeholder.png'}
                                alt={location.vehicle?.brand || "Photo du vehicule"}
                                className="w-[300px] h-auto rounded-lg object-cover"
                                width={300}
                                height={300}
                            />
                        </div>
                        <div className="flex flex-row justify-around h-full w-[50%]">
                            <h3 className="text-md text-black font-medium text-primary-text">{location.vehicle?.brand || "Toyota"}</h3>
                            <PaymentStatus status={location.status} />
                        </div>

                        {/* Prix et date */}
                        {/* <div className="flex justify-between w-full mt-2 md:mt-0 md:flex-col flex-row items-end space-y-1">
                            <p className="text-sm font-semibold text-primary-text">{location.price}</p>
                            <p className="text-sm text-secondary-text">{location.date}</p>
                        </div> */}
                        <div className="w-full mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>
                                {new Date(location.pick_up.date).toLocaleDateString()} -{' '}
                                {new Date(location.drop_off.date).toLocaleDateString()}
                            </span>
                            </div>
                            <div className="flex items-center text-sm font-medium text-gray-900">
                            <CreditCard className="w-4 h-4 mr-2" />
                            <span>${location.price}</span>
                            </div>

                            <div className="flex justify-center items-center text-sm text-green-600">
                                <Gift className="w-4 h-4 mr-2" />
                                <span>
                                    {location.paidWithPoints ? 'Points used: ' : ''}
                                    {location.bonusPoints || calculateBonus(location.price)} points
                                </span>
                            </div>
                        </div>
                       
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    );

};

export default LocationList;

