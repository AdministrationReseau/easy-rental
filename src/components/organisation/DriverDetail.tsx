'use client';

import React, { useState } from "react";
import Link from "next/link";
import Stars from "../Stars";
import { DriverProps } from "@/utils/types/DriverProps";

export const DriverImage: React.FC<{ driver: DriverProps }> = ({ driver }) => {
  const [currentImage, ] = useState(driver.profile_picture || "/default-avatar.jpg");

  if (!driver) {
    return <p>Loading...</p>;
  }

  return (
    <div className="px-2 w-full">
      {/* Main Image Section */}
      <div
        className="relative bg-cover bg-center min-h-[300px] min-w-[300px] rounded-full shadow-lg w-32 h-32"
        style={{ backgroundImage: `url(${currentImage})` }}
      ></div>
    </div>
  );
};

export const DriverInfo: React.FC<{ driver: DriverProps }> = ({ driver }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full space-y-4">
      {/* Title and Rating */}
      <div>
        <h3 className="text-xl font-bold text-gray-800">
          {driver.first_name} {driver.last_name}
        </h3>
        <span className='flex flex-row py-4 gap-2'>
          <Stars value={driver.rating ?? 0} precision={1} />
          {driver.rating} Rating
        </span>
      </div>

      {/* Driver Information */}
      <div className="text-md text-gray-500 space-y-1">
        <p><strong>Age:</strong> {driver.age} years old</p>
        <p><strong>License Number:</strong> {driver.license_number}</p>
        <p><strong>License Type:</strong> {driver.license_type}</p>
        <p><strong>Phone:</strong> {driver.phone}</p>
        <p><strong>Email:</strong> {driver.email}</p>
        <p><strong>Address:</strong> {driver.address}</p>
        {driver.location && <p><strong>Location:</strong> {driver.location}</p>}

        {/* Vehicle Assigned */}
        {driver.vehicle_assigned && (
          <div className="pt-4">
            <p><strong>Assigned Vehicles:</strong></p>
            {driver.vehicle_assigned.length > 0 ?(
              driver.vehicle_assigned.map((vehicle, key)=>(
                <p key={key}>
                {vehicle.brand}
                {vehicle.model} 
                ({vehicle.year})
                </p>
            ))
            ):(
            <p>Not any</p>
            )}
          </div>
        )}

        {/* Insurance Details */}
        <div className="pt-4">
          <p><strong>Insurance Provider:</strong> {driver.insurance_provider}</p>
          <p><strong>Insurance Policy Number:</strong> {driver.insurance_policy}</p>
        </div>
      </div>
    </div>
  );
};

const DriverDetail: React.FC<{ driver: DriverProps }> = ({ driver }) => {
  return (
    <div className="space-y-8 bg-red w-full">
      <Link href="/drivers">
        <h1 className="p-4 m-4">&gt; Back to Drivers</h1>
      </Link>

      {/* Driver Details Section */}
      <div className="flex flex-col md:flex-row gap-6 w-full rounded-lg ">
        {/* Driver Description */}
        <div className="w-[30%] px-4">
          <DriverImage driver={driver} />
        </div>
        <div className="w-[70%] px-4">
          {/* Driver Info */}
          <DriverInfo driver={driver} />
        </div>
      </div>
    </div>
  );
};

export default DriverDetail;
