import React from "react";
import Image from "next/image";
import Link from "next/link";

const EarnWithUs = () => {
    return (
        <div className="flex flex-col md:flex-row gap-6 my-16 p-6 bg-blue-500 rounded-lg shadow-lg min-h-[500px]">
            {/* Texte principal */}
            <div className="flex-1 flex flex-col justify-center text-center md:text-left text-white">
                <h2 className="text-2xl md:text-4xl font-bold mb-4">
                    Do You Want To Earn With Us? <br /> So Don’t Be Late.
                </h2>
                <p className="text-sm md:text-base mb-6">
                    Join us today and start earning extra income with ease. Discover
                    opportunities to grow and succeed with our trusted platform.
                </p>
                {/* Bouton */}
                <div>
                    <Link
                        href="/Dashboard"
                        className="bg-white text-blue-500 font-semibold py-3 px-6 md:py-4 md:px-8 rounded-lg shadow-lg hover:bg-gray-100 transition"
                    >
                        Become a Partner
                    </Link>
                </div>
            </div>

            {/* Image */}
            <div className="flex-1 flex justify-center items-center">
                <Image
                    src="/personne2.png"
                    alt="Earn with us"
                    width={500}
                    height={300}
                    className="rounded-lg object-cover w-full max-w-md"
                />
            </div>
        </div>
    );
};

export default EarnWithUs;