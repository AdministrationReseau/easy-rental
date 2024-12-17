"use client";
import Image from 'next/image';
import React, { useState } from "react";
import Stars from "@/components/Stars";

interface DriverCardProps {
    name: string;
    email: string;
    location: string;
    age: number;
    avatar: string;
    rating: number;
    phone: string;
}

const DriverCard: React.FC<DriverCardProps> = ({ name, email, location, age, avatar, rating, phone }) => {
    const [buttonText, setButtonText] = useState("Add to Rental");
    const [isDriverAdded, setIsDriverAdded] = useState(false);

    const handleButtonClick = () => {
        setIsDriverAdded(!isDriverAdded);
        setButtonText(isDriverAdded ? "Add to Rental" : "Driver Added");
    };

    return (
        <div className="bg-white rounded-xl p-5 w-[280px] hover:shadow-[0_0_15px_5px_rgba(0,119,255,0.2),0_0_30px_15px_rgba(0,119,255,0.1)] transition-shadow duration-300">

            <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
                <Image
                    src={avatar || "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"}
                    alt={`${name}'s avatar`}
                    layout="fill"
                    objectFit="cover"
                />
            </div>

            {/* Content Section */}
            <div className="flex flex-col space-y-3">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-800">{name}</h2>
                    <Stars value={rating} precision={0.5} />
                </div>

                {/* Details */}
                <div className="text-gray-600 text-sm space-y-2">
                    <div className="flex items-center">
                        <span className="material-icons text-blue-500 mr-2">mail</span>
                        <p>{email}</p>
                    </div>
                    <div className="flex items-center">
                        <span className="material-icons text-blue-500 mr-2">place</span>
                        <p>{location}</p>
                    </div>
                    <div className="flex items-center">
                        <span className="material-icons text-blue-500 mr-2">cake</span>
                        <p>{age} years old</p>
                    </div>
                    <div className="flex items-center">
                        <span className="material-icons text-blue-500 mr-2">call</span>
                        <p>{phone}</p>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-b border-gray-200"></div>

                {/* Action Button */}
                <button
                    onClick={handleButtonClick}
                    className={`mt-3 w-full py-2 rounded-lg font-semibold transition-all duration-300 ${isDriverAdded ? 'bg-blue-100 text-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default DriverCard;
