import React from "react";
import Link from "next/link";
import Image from "next/image";

interface HalfAddProps {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    backgroundImage: string;
    buttonColor?: string; // Allow customization of the button color
    className?: string; // Optional: Custom size and styling
}

const HalfAddContent: React.FC<HalfAddProps> = ({
    title,
    description,
    buttonText,
    buttonLink,
    backgroundImage,
    buttonColor = "bg-blue-600",
}) => {
    return (
        <div
            className={`relative bg-cover bg-center h-[200px] rounded-lg shadow-lg overflow-hidden mb-3 md:h-[300px] md:w-[45%]`}
        >
            <Image
                src={backgroundImage}
                alt="Background Image"
                fill // Replaces `layout="fill"`
                style={{ objectFit: "cover" }} // Replaces `objectFit="cover"`
            />

            <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-12 text-white">
                <h2 className="text-xl md:text-2xl font-bold mb-2">{title}</h2>
                <p className="text-sm md:text-base mb-4">{description}</p>
                <Link
                    href={buttonLink}
                    className={`${buttonColor} text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:opacity-90 transition w-[200px]`}
                >
                    {buttonText}
                </Link>
            </div>
        </div>
    );
};

export default HalfAddContent;
