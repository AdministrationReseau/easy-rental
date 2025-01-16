import React from "react";
import Image from "next/image";
import Link from "next/link";

const CarFeatureCard = () => {
    return (

        <div>


            <div className="flex flex-col md:flex-row gap-6 p-6 bg-blue-600 rounded-lg shadow-lg w-full h-screen">
                {/* Car Description */}
                <div className="flex-1 flex flex-col justify-center text-center md:text-left text-white p-6 rounded-lg">
                    <h2 className="font-bold text-xl text-2xl md:text-4xl font-bold mb-4 ">Rent cars with the best design and acceleration</h2>
                    <p className="text-sm md:text-base mb-6">Safety and comfort while driving a futuristic and elegant car.</p>
                    <div className="flex flex-row gap-6 md:my-6 ">
                        <Link
                            href="/customer"
                            className="bg-white w-full text-blue-500 font-semibold py-3 px-6 md:py-4 md:px-8 rounded-lg shadow-lg hover:bg-gray-100 transition"
                        >
                            Rent a Vehicle
                        </Link>
                        <Link
                            href="/Dashboard"
                            className="bg-white w-full text-blue-500 font-semibold py-3 px-6 md:py-4 md:px-8 rounded-lg shadow-lg hover:bg-gray-100 transition"
                        >
                            Become a Partner
                        </Link>
                    </div>
                </div>
                <div className="flex-1 flex justify-center items-center">
                    <Image
                        src="/voiture.png"
                        alt="Earn with us"
                        width={1000}
                        height={600}
                        className="rounded-lg object-cover w-full max-w-md"
                    />
                </div>
            </div>



        </div>
    );
};

export default CarFeatureCard;
