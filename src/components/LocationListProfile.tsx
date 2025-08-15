'use client'
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LocationProps } from "@/utils/types/RentalInfoProps";
import { Calendar, CheckCircle, Circle, Clock, CreditCard, Gift, XCircle } from 'lucide-react';

interface LocationListProps {
  locations: LocationProps[];
}

interface StatusProps {
  status: "pending" | "completed" | "cancelled";
}

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
      default:
        return {
          icon: Circle,
          text: 'Unknown',
          className: 'text-gray-600 bg-gray-50'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${config.className}`}>
            <Icon className="w-4 h-4 mr-1" />
      {config.text}
        </span>
  );
};

const LocationList: React.FC<LocationListProps> = ({ locations }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {locations.map((location, index) => (
          <Link href={`/profile/locations/${location.id}`} key={index}>
            <div className="bg-white border rounded-lg shadow-md overflow-hidden">
              <div className="w-full h-40 relative">
                <Image
                  src={location.vehicle?.image[0] || '/placeholder.png'}
                  alt={location.vehicle?.brand || "Vehicle Image"}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-md font-medium text-primary-text">{location.vehicle?.brand || "Toyota"}</h3>
                  <PaymentStatus status={location.status} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>
                                            {new Date(location.pick_up.date).toLocaleDateString()} -{' '}
                      {new Date(location.drop_off.date).toLocaleDateString()}
                                        </span>
                  </div>
                  <div className="flex items-center text-sm font-medium text-gray-900">
                    <CreditCard className="w-4 h-4 mr-2" />
                    <span>{location.price} XAF</span>
                  </div>
                  <div className="flex items-center text-sm text-green-600">
                    <Gift className="w-4 h-4 mr-2" />
                    <span>
                                            {location.paidWithPoints ? 'Points: ' : ''}
                      {location.bonusPoints} points
                                        </span>
                  </div>
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
