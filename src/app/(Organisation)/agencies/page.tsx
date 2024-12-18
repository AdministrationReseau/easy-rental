"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Stars from "@/components/Stars";
import { Delete, Edit, LocationOn } from "@mui/icons-material";

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

const Agence = () => {
    const [agencies, setAgencies] = useState<Agency[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedImages, setSelectedImages] = useState<string[]>([]);

    useEffect(() => {
        const fetchAgencies = async () => {
            try {
                const response = await fetch("/data/agencies.json");
                if (!response.ok) {
                    throw new Error("Failed to fetch agencies");
                }
                const data = await response.json();
                setAgencies(data);
            } catch (error) {
                console.error("Error fetching agencies:", error);
            }
        };

        fetchAgencies();
    }, []);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const imageUrls = Array.from(files).map((file) =>
                URL.createObjectURL(file)
            );
            setSelectedImages(imageUrls);
        }
    };

    return (
        <div className="w-full">
            <main className="items-center flex-grow overflow-y-auto bg-[F6F7F9]">
                <h1 className="text-2xl font-bold mb-4">Agencies List</h1>
                <button
                    className="bg-blue-500 text-white px-4 py-3 rounded mb-4"
                    onClick={() => setShowModal(true)}
                >
                    + ADD AGENCY
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-full">
                    {agencies.map((agency) => (
                        <Link
                            href={`/agencies/${agency.id}`}
                            key={agency.id}
                        >
                            <div
                                key={agency.id}
                                className="bg-white shadow rounded p-4 cursor-pointer"
                            >
                                <Image
                                    src={agency.images[0]}
                                    alt={agency.name}
                                    width={500}
                                    height={200}
                                    className="rounded mb-2"
                                />
                                <div className="">
                                    <div className="flex flex-row justify-between mb-2">
                                        <h2 className="text-lg font-semibold">{agency.name}</h2>
                                        <Stars value={agency.stars} precision={0.5}/>
                                    </div>
                                    <p className="text-secondary-text my-2">
                                        {agency.description}
                                    </p>
                                    <div className="flex flex-row justify-between">
                                        <div className="flex flex-row items-center">
                                            <LocationOn className="text-primary-blue"/>
                                            <p className="text-sm text-primary-blue text-[15px]">
                                                {agency.city}
                                            </p>
                                        </div>
                                        <div className="flex flex-row justify-between w-[60px]">
                                            <Edit className="text-primary-blue mr-2"/>
                                            <Delete className="text-red-text"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Modal de création */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded shadow-lg">
                            <h2 className="text-lg font-bold mb-4">Create Agency</h2>
                            <form>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium">Name</label>
                                    <input
                                        type="text"
                                        className="border border-gray-300 rounded w-full p-2"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium">Description</label>
                                    <textarea
                                        className="border border-gray-300 rounded w-full p-2"
                                    ></textarea>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium">Ville</label>
                                    <input
                                        type="text"
                                        className="border border-gray-300 rounded w-full p-2"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium">
                                        Heure de ouverture
                                    </label>
                                    <input
                                        type="time"
                                        className="border border-gray-300 rounded w-full p-2"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium">
                                        Heure de fermeture
                                    </label>
                                    <input
                                        type="time"
                                        className="border border-gray-300 rounded w-full p-2"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium">
                                        Images
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        className="border border-gray-300 rounded w-full p-2"
                                        onChange={handleImageChange}
                                    />
                                </div>

                                <div className="grid grid-cols-3 gap-2 mb-4">
                                    {selectedImages.map((src, index) => (
                                        <div
                                            key={index}
                                            className="border border-gray-300 rounded overflow-hidden"
                                        >
                                            <Image
                                                src={src}
                                                alt={`Preview ${index + 1}`}
                                                width={100}
                                                height={100}
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="text-right">
                                    <button
                                        type="button"
                                        className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Créer
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Agence;
