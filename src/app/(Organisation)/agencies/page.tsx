"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Stars from "@/components/Stars";
import { Delete, Edit, LocationOn } from "@mui/icons-material";

// Interface for filtering agencies
interface AgencyFilter {
    city: string;
    type: "Siège" | "Annexe" | "All";
}

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
    const [filter, setFilter] = useState<AgencyFilter>({
        city: "All",
        type: "All",
    });
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

    // Filter agencies based on selected filter criteria
    const filteredAgencies = agencies.filter((agency) => {
        return (
            (filter.city === "All" || agency.city === filter.city) &&
            (filter.type === "All" || agency.type === filter.type)
        );
    });

    return (
        <div className="w-full">
            <main className="items-center flex-grow overflow-y-auto bg-[F6F7F9]">
                {/* Statistics Section */}
                <section className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Agency Statistics</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {/* Total Agencies Card */}
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg p-4 flex flex-col items-center shadow-md">
                            <h3 className="text-lg font-medium mb-2">Total Agencies</h3>
                            <p className="text-4xl font-bold">{agencies.length}</p>
                        </div>

                        {/* Agencies by City Cards */}
                        {Object.entries(
                            agencies.reduce((acc, agency) => {
                                acc[agency.city] = (acc[agency.city] || 0) + 1;
                                return acc;
                            }, {} as Record<string, number>)
                        ).map(([city, count]) => (
                            <div
                                key={city}
                                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg p-4 flex flex-col items-center shadow-md"
                            >
                                <h3 className="text-lg font-medium mb-2">{city}</h3>
                                <p className="text-4xl font-bold">{count}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Filter Section */}
                <section className="mb-6 bg-white shadow-md rounded-lg p-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Filter Agencies</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative">
                            <label htmlFor="cityFilter" className="block text-sm font-medium text-gray-600 mb-1">
                                Select City
                            </label>
                            <select
                                id="cityFilter"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                value={filter.city}
                                onChange={(e) => setFilter({ ...filter, city: e.target.value })}
                            >
                                <option value="All">All Cities</option>
                                {agencies
                                    .map((agency) => agency.city)
                                    .filter((value, index, self) => self.indexOf(value) === index)
                                    .map((city) => (
                                        <option key={city} value={city}>
                                            {city}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        <div className="relative">
                            <label htmlFor="typeFilter" className="block text-sm font-medium text-gray-600 mb-1">
                                Select Type
                            </label>
                            <select
                                id="typeFilter"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                value={filter.type}
                                onChange={(e) => {
                                    const type = e.target.value;
                                    if (type === "Siège" || type === "Annexe" || type === "All") {
                                        setFilter({ ...filter, type });
                                    }
                                }}
                            >
                                <option value="All">All Types</option>
                                <option value="Siège">Siège</option>
                                <option value="Annexe">Annexe</option>
                            </select>
                        </div>
                    </div>
                </section>

                <h1 className="text-2xl font-bold mb-4">Agencies List</h1>
                <button
                    className="bg-blue-500 text-white px-4 py-3 rounded mb-4"
                    onClick={() => setShowModal(true)}
                >
                    + ADD AGENCY
                </button>

                {/* Agency Cards */}
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-full">
                    {filteredAgencies.map((agency) => (
                        <Link href={`/agencies/${agency.id}`} key={agency.id}>
                            <div className="bg-white shadow rounded p-4 w-full  cursor-pointer">
                                <Image
                                    src={agency.images[0]}
                                    alt={agency.name}
                                    width={400}
                                    height={250}
                                    className="rounded mb-2 object-cover w-full h-[250px]"
                                />
                                <div className="">
                                    <div className="flex flex-row justify-between mb-2">
                                        <h2 className="text-lg font-semibold">{agency.name}</h2>
                                        <Stars value={agency.stars} precision={0.5} />
                                    </div>
                                    <p className="text-secondary-text my-2">
                                        {agency.description}
                                    </p>
                                    <div className="flex flex-row justify-between">
                                        <div className="flex flex-row items-center">
                                            <LocationOn className="text-primary-blue" />
                                            <p className="text-sm text-primary-blue text-[15px]">
                                                {agency.city}
                                            </p>
                                        </div>
                                        <div className="flex flex-row justify-between w-[60px]">
                                            <Edit className="text-primary-blue mr-2" />
                                            <Delete className="text-red-text" />
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

                                <div className="flex justify-end gap-2">
                                    <button
                                        className="bg-gray-500 text-white px-4 py-2 rounded"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                        type="submit"
                                    >
                                        Submit
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
