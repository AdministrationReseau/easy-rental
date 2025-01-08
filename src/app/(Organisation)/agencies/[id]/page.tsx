"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ArrowBack, LocationOn } from "@mui/icons-material";
import Stars from "@/components/Stars";
import Link from "next/link";

interface Agency {
    id: number;
    name: string;
    description: string;
    city: string;
    openingTime: string;
    closingTime: string;
    stars: number;
    type: "Siège" | "Annexe";
    images: string[];
}

const AgencyDetails = () => {
    const { id } = useParams();
    const [agency, setAgency] = useState<Agency | null>(null);
    const [selectedImage, setSelectedImage] = useState<string>("");

    useEffect(() => {
        if (!id) return;

        const fetchAgency = async () => {
            try {
                const response = await fetch("/data/agencies.json");
                const data: Agency[] = await response.json();
                const selectedAgency = data.find((a) => a.id === parseInt(id as string));
                if (selectedAgency) {
                    setAgency(selectedAgency);
                    setSelectedImage(selectedAgency.images[0]);
                }
            } catch (error) {
                console.error("Erreur lors du chargement des données :", error);
            }
        };

        fetchAgency();
    }, [id]);

    if (!agency) {
        return <p>Chargement des données...</p>;
    }

    return (
        <div className="flex flex-col">
            <Link href="/agencies" className="text-primary-blue font-bold text-lg mb-4">
                <ArrowBack /> Back
            </Link>
            <h1 className="text-3xl font-bold text-primary-blue mb-2 ml-4">{agency.name}</h1>

            <div className="flex flex-row gap-4">
                <div className="bg-white shadow-lg rounded-lg p-4 w-[1100px] flex justify-center">
                    <Image
                        src={selectedImage}
                        alt="Main image"
                        width={1400}
                        height={100}
                        className="rounded w-[1400px] h-[600px]"
                    />
                </div>

                <div className="flex flex-col gap-4">
                    {agency.images.map((img, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedImage(img)}
                            className={`cursor-pointer p-2 rounded-lg ${
                                selectedImage === img ? "border-2 border-primary-blue" : "border"
                            }`}
                        >
                            <Image src={img} alt={`Thumbnail ${index}`} width={200} height={60} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-row gap-4 mt-4">
                <div className="t-8 bg-white p-6 shadow-lg rounded-lg w-[700px]">
                    <div className="flex flex-row justify-between">
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Description</h2>
                        <Stars value={agency.stars} precision={0.5} />
                    </div>
                    <p className="text-gray-600 mb-4">{agency.description}</p>
                </div>

                <div className="flex flex-col gap-4 shadow-lg rounded-lg w-[380px] p-14">
                    <div className="flex items-center mb-4">
                        <LocationOn className="text-primary-blue mr-2" />
                        <p className="text-gray-700">{agency.city}</p>
                    </div>
                    <div className="flex items-center mb-4">
                        <LocationOn className="text-primary-blue mr-2" />
                        <p className="text-gray-700">Ouvre à {agency.openingTime}</p>
                    </div>
                    <div className="flex items-center mb-4">
                        <LocationOn className="text-primary-blue mr-2" />
                        <p className="text-gray-700">Ferme à {agency.closingTime}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgencyDetails;
