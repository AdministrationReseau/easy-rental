'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CarProps } from '@/utils/types/CarProps';
import { LocationProps} from "@/utils/types/RentalInfoProps";
import CarDetail from '@/components/organisation/CarDetail';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Image from "next/image";

export default function ResourceProfilPage() {
    const [vehicles, setVehicles] = useState<CarProps[]>([]);
    const [driverHistories, setDriverHistories] = useState<LocationProps[]>([]); // State for driver histories
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [activeTab, setActiveTab] = useState("details");

    const { id } = useParams<{ id: string }>();
    const vehicleId = Number(id);

    // Fetch vehicles data
    useEffect(() => {
        fetch('/data/cars.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                if (data && Array.isArray(data.vehicles)) {
                    setVehicles(data.vehicles);
                } else {
                    console.error('Unexpected data format:', data);
                }
            })
            .catch((error) => {
                console.error('Error loading vehicles:', error);
                setHasError(true);
            });
    }, []);

    // Fetch driver histories data
    useEffect(() => {
        fetch('/data/history.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                if (data && Array.isArray(data)) {
                    setDriverHistories(data);
                } else {
                    console.error('Unexpected data format:', data);
                }
            })
            .catch((error) => {
                console.error('Error loading driver histories:', error);
                setHasError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (hasError) {
        return <div>Error loading data. Please try again later.</div>;
    }

    if (isNaN(vehicleId)) {
        return <div>Invalid vehicle ID.</div>;
    }

    const requestedVehicle = vehicles.find((vehicle) => vehicle.id === vehicleId);

    if (!requestedVehicle) {
        return <div>Vehicle not found.</div>;
    }

    // Find drivers associated with the vehicle
    const associatedDrivers = driverHistories.filter((history) =>
        history.vehicle.id === vehicleId
    );

    // Function to download driver history as PDF
    const downloadHistoryPDF = () => {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });

        // Add title
        doc.setFontSize(18);
        doc.text(`Driver History for Vehicle: ${requestedVehicle.brand} ${requestedVehicle.model}`, 10, 20);

        // Table headers
        const headers = ['Driver Name', 'Pick-up Place', 'Drop-off Place', 'Status'];
        const columnWidths = [50, 50, 50, 40]; // Adjust column widths as needed

        let y = 30; // Starting Y position

        // Draw headers
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        headers.forEach((header, index) => {
            doc.text(header, 10 + columnWidths.slice(0, index).reduce((a, b) => a + b, 0), y);
        });

        y += 7; // Move down for rows
        doc.setFont('helvetica', 'normal');

        // Draw rows
        associatedDrivers.forEach((history) => {
            const row = [
                history.driver?.name || 'N/A',
                history.pick_up.place,
                history.drop_off.place,
                history.status,
            ];

            row.forEach((cell, index) => {
                doc.text(cell, 10 + columnWidths.slice(0, index).reduce((a, b) => a + b, 0), y);
            });

            y += 7; // Move to next row
        });

        // Save the PDF
        doc.save(`driver_history_${requestedVehicle.brand}_${requestedVehicle.model}.pdf`);
    };


    return (
        <div>
            {/* Tab Navigation */}
            <div className="flex space-x-4 border-b mb-4 justify-between">
                <button
                    onClick={() => setActiveTab("details")}
                    className={`px-4 py-2 ${
                        activeTab === "details"
                            ? "border-b-2 border-blue-500 text-blue-500 font-bold"
                            : "text-gray-500 hover:text-blue-500"
                    }`}
                >
                    Car Details
                </button>
                <button
                    onClick={() => setActiveTab("drivers")}
                    className={`px-4 py-2 ${
                        activeTab === "drivers"
                            ? "border-b-2 border-blue-500 text-blue-500 font-bold"
                            : "text-gray-500 hover:text-blue-500"
                    }`}
                >
                    Associated Drivers
                </button>

                <button
                    onClick={() => setActiveTab("statistics")}
                    className={`px-4 py-2 ${
                        activeTab === "statistics"
                            ? "border-b-2 border-blue-500 text-blue-500 font-bold"
                            : "text-gray-500 hover:text-blue-500"
                    }`}
                >
                    Statistics
                </button>
            </div>

            {/* Tab Content */}
            <div>
                {activeTab === "details" && (
                    <div>
                        {/* Vehicle details */}
                        <CarDetail vehicle={requestedVehicle}/>
                    </div>
                )}

                {activeTab === "drivers" && (
                    <div>
                        {/* Associated drivers */}
                        <div className="mt-8">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold">Associated Drivers</h2>
                                <button
                                    onClick={downloadHistoryPDF}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Download History
                                </button>
                            </div>
                            {associatedDrivers.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {associatedDrivers.map((history) => (
                                        <div
                                            key={history.id}
                                            className="border rounded-lg shadow-md bg-white p-4"
                                        >
                                            <Image
                                                src={history.driver?.image || "/assets/default-driver.jpeg"} // Use driver image
                                                alt={history.driver?.name || "Driver"}
                                                layout="responsive"
                                                width={50}
                                                height={32}
                                                className="w-full h-32 object-cover rounded-lg mb-4"
                                            />
                                            <div>
                                                <p className="font-bold">{history.driver?.name || "N/A"}</p>
                                                <p className="text-sm">Pick-up: {history.pick_up.place}</p>
                                                <p className="text-sm">Drop-off: {history.drop_off.place}</p>
                                                <p className="text-sm">Status: {history.status}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No drivers associated with this vehicle.</p>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === "statistics" && (
                    <div>
                        {/* Vehicle details */}
                        Statistics Goes Here!
                    </div>
                )}
            </div>
        </div>

)
    ;
}