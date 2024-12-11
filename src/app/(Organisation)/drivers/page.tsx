"use client";
import React, { useState } from "react";
import StateBox from "@/components/StateBox";
import DriverProfilDescription from "@/components/DriverProfilDescription";
import Filter from "@/components/Filter"; // Adjust the import path if necessary
import { ProcessState } from "@/utils/enum";

const DriverListingPage: React.FC = () => {
    const [drivers, setDrivers] = useState([
        { id: 1, firstname: "Jean", lastname: "Dupont", age: 35, gender: 0, starsNumber: 4, status: ProcessState.CONFIRMED },
        { id: 2, firstname: "Marie", lastname: "Curie", age: 42, gender: 1, starsNumber: 5, status: ProcessState.PENDING },
    ]);
    const [filters, setFilters] = useState({ status: "" });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDriver, setSelectedDriver] = useState<number | null>(null);

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters({ ...filters, status: e.target.value });
    };

    const handleDeleteDriver = (id: number) => {
        setDrivers(drivers.filter((driver) => driver.id !== id));
    };

    const openProfileModal = (id: number) => {
        setSelectedDriver(id);
        setIsModalOpen(true);
    };

    const closeProfileModal = () => {
        setSelectedDriver(null);
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filter Component */}
                <div>
                    <Filter />
                </div>

                {/* Main Content */}
                <div className="col-span-3">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Liste des Conducteurs</h1>

                    {/* Filters */}
                    <div className="mb-6">
                        <label className="block mb-4">
                            <span className="text-gray-600">Filtrer par statut</span>
                            <select
                                value={filters.status}
                                onChange={handleFilterChange}
                                className="w-full mt-2 p-2 border rounded"
                            >
                                <option value="">Tous</option>
                                <option value={ProcessState.PENDING}>En attente</option>
                                <option value={ProcessState.CONFIRMED}>Confirmé</option>
                                <option value={ProcessState.CANCELED}>Annulé</option>
                            </select>
                        </label>
                    </div>

                    {/* Driver List */}
                    <table className="w-full bg-white shadow rounded">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="text-left p-4">Nom</th>
                            <th className="text-left p-4">Statut</th>
                            <th className="text-left p-4">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {drivers
                            .filter((driver) => !filters.status || driver.status === filters.status)
                            .map((driver) => (
                                <tr key={driver.id} className="border-t">
                                    <td className="p-4">
                                        {driver.firstname} {driver.lastname}
                                    </td>
                                    <td className="p-4">
                                        <StateBox state={driver.status} />
                                    </td>
                                    <td className="p-4 space-x-2">
                                        <button
                                            onClick={() => openProfileModal(driver.id)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Voir Profil
                                        </button>
                                        <button
                                            onClick={() => handleDeleteDriver(driver.id)}
                                            className="text-red-600 hover:underline"
                                        >
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Profile Modal */}
                    {isModalOpen && selectedDriver !== null && (
                        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white p-6 rounded shadow-lg relative">
                                <button
                                    onClick={closeProfileModal}
                                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                                >
                                    ✕
                                </button>
                                <DriverProfilDescription
                                    {...drivers.find((driver) => driver.id === selectedDriver)!}
                                    width={400}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DriverListingPage;
