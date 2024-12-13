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
    stars: number;
    phone: string;
}

const DriverCard: React.FC<DriverCardProps> = ({ name, email, location, age, avatar, stars, phone }) => {
    const [buttonText, setButtonText] = useState("Add to Rental");
    const [isDriverAdded, setIsDriverAdded] = useState(false);

    const handleButtonClick = () => {
        setIsDriverAdded(!isDriverAdded);
        setButtonText(isDriverAdded ? "Add to Rental" : "Driver Added");
    };

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden my-4 p-4 w-full">
            {/* Image Section */}
            <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                    src={avatar || "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"}
                    alt={`${name}'s avatar`}
                    layout="fill"
                    objectFit="cover"
                />
            </div>

            {/* Blue Border Divider */}
            <div className="border-b-2 border-primary-blue mb-4"></div>

            <div className="flex flex-col space-y-3 py-3">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
                    <Stars value={stars} precision={0.5} />
                </div>

                <div className="space-y-2">
                    <div className="flex items-center text-gray-700 text-sm">
                        <svg className="h-5 w-5 fill-current text-blue-500" viewBox="0 0 512 512">
                            <path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z" />
                        </svg>
                        <p className="ml-2">{email}</p>
                    </div>
                    <div className="flex items-center text-gray-700 text-sm">
                        <svg className="h-5 w-5 fill-current text-blue-500" viewBox="0 0 512 512">
                            <path d="M256 32c-88.004 0-160 70.557-160 156.801C96 306.4 256 480 256 480s160-173.6 160-291.199C416 102.557 344.004 32 256 32zm0 212.801c-31.996 0-57.144-24.645-57.144-56 0-31.357 25.147-56 57.144-56s57.144 24.643 57.144 56c0 31.355-25.148 56-57.144 56z" />
                        </svg>
                        <p className="ml-2">{location}</p>
                    </div>
                    <div className="flex items-center text-gray-700 text-sm">
                        <svg className="h-5 w-5 fill-current text-blue-500" viewBox="0 0 512 512">
                            <path d="M256 64c35.348 0 64 28.652 64 64s-28.652 64-64 64-64-28.652-64-64 28.652-64 64-64zm0 128c70.692 0 128 57.308 128 128s-57.308 128-128 128-128-57.308-128-128 57.308-128 128-128z" />
                        </svg>
                        <p className="ml-2">{age} years old</p>
                    </div>
                    <div className="flex items-center text-gray-700 text-sm">
                        <svg className="h-5 w-5 fill-current text-blue-500" viewBox="0 0 512 512">
                            <path d="M512 256c0 33.1-26.9 60-60 60h-392c-33.1 0-60-26.9-60-60s26.9-60 60-60h392c33.1 0 60 26.9 60 60z" />
                        </svg>
                        <p className="ml-2">{phone}</p>
                    </div>
                </div>
            </div>

            {/* Button Section */}
            <button
                // onClick={handleButtonClick}
                className={`mt-4 w-full py-2 rounded-lg transition-all ${isDriverAdded ? 'bg-gray-200 text-gray-400' : 'bg-gray-200 text-gray-400'}`}
            >
                {buttonText}
            </button>
        </div>
    );
};

export default DriverCard;
