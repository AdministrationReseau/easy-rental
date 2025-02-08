'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Driver } from '@/components/ResourceEditForm';
import DriverDetail from '@/components/organisation/DriverDetail';
import { DriverHistory, PassedDriverLocation } from '@/utils/types/HistoryProp';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export default function ResourceProfilPage() {
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [driverHistories, setDriverHistories] = useState<DriverHistory[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [filters, setFilters] = useState("");

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilters(e.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const driversResponse = await fetch("/data/drivers.json");
                const driverHistoriesResponse = await fetch("/data/driver_history.json");

                if (!driversResponse.ok || !driverHistoriesResponse.ok) {
                    throw new Error("Failed to fetch data");
                }

                const driversData: Driver[] = await driversResponse.json();
                const driverHistoriesData: DriverHistory[] = await driverHistoriesResponse.json();

                setDrivers(driversData);
                setDriverHistories(driverHistoriesData);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const { id } = useParams<{ id: string }>();
    const driverId = Number(id);

    if (isNaN(driverId)) {
        return <div>Invalid driver ID</div>;
    }

    const requestedDriver = drivers.find(driver => driver.id === driverId);
    const requestedDriverHistory = driverHistories.find(history => history.driverId === driverId);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!requestedDriver || !requestedDriverHistory) {
        return <div>Invalid driver ID or no history available</div>;
    }

    const filteredHistory = requestedDriverHistory.history.filter((location) => {
        const matchesVehicle = filters ? location.vehicleModel.toLowerCase().includes(filters.toLowerCase()) : true;

        return matchesVehicle;
    });

    const downloadHistoryPDF = () => {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        let yOffset = 20;
        let imagesLoaded = 0;
        const totalImages = requestedDriverHistory.history.length + 1;
        const pageHeight = doc.internal.pageSize.height;

        // Add driver details
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(53, 55, 68);
        doc.setFontSize(34);
        doc.text(`Driver History for ${requestedDriver.first_name} ${requestedDriver.last_name}`, 10, yOffset);
        yOffset += 10;

        doc.setFont('helvetica', 'bold');
        doc.setTextColor(102, 102, 102);
        doc.setFontSize(18);
        doc.text(`Driver Information`, 10, yOffset);
        yOffset += 10;

        // Add driver profile picture and details
        const driverImg = new Image();
        driverImg.src = requestedDriver.profile_picture;
        driverImg.onload = () => {
            if (yOffset + 65 > pageHeight - 20) {
                doc.addPage();
                yOffset = 20;
            }

            doc.addImage(driverImg, 'JPEG', 10, yOffset, 55, 55);
            doc.setTextColor(53, 55, 68);
            doc.setFontSize(10);

            yOffset += 5;

            // Driver details
            const addDriverDetails = () => {
                const details = [
                    ['ID', requestedDriver.id],
                    ['Age', `${requestedDriver.age} years old`],
                    ['Phone', requestedDriver.phone],
                    ['Email', requestedDriver.email],
                    ['License Number', requestedDriver.license_number],
                    ['License Type', requestedDriver.license_type],
                    ['Rating', requestedDriver.rating]
                ];

                details.forEach(([label, value], index) => {
                    const currentY = yOffset + (index * 5);
                    if (currentY > pageHeight - 20) {
                        doc.addPage();
                        yOffset = 20;
                        doc.setTextColor(53, 55, 68);
                        doc.setFontSize(10);
                    }
                    doc.setFont('helvetica', 'bold');
                    doc.text(`${label}:`, 90, currentY + 5);
                    doc.setFont('helvetica', 'normal');
                    doc.text(`${value}`, 130, currentY + 5);
                });
            };

            addDriverDetails();
            yOffset += 60;

            // Locations header
            if (yOffset + 30 > pageHeight - 20) {
                doc.addPage();
                yOffset = 20;
            }

            doc.setFont('helvetica', 'bold');
            doc.setTextColor(102, 102, 102);
            doc.setFontSize(18);
            doc.text(`Locations`, 10, yOffset);
            yOffset += 10;

            imagesLoaded++;
            addLocations();
        };

        driverImg.onerror = () => {
            console.error(`Failed to load driver image: ${requestedDriver.profile_picture}`);
            yOffset += 60;
            addLocations();
        };

        const addLocations = () => {
            requestedDriverHistory.history.forEach((location) => {
                const img = new Image();
                img.src = location.vehicleImage;

                const addLocationEntry = (imageHeight = 30) => {
                    // Check if we need a new page for this location entry
                    if (yOffset + imageHeight > pageHeight - 20) {
                        doc.addPage();
                        yOffset = 20;
                    }

                    const entryStartY = yOffset;

                    // Add image if available
                    if (imageHeight > 0) {
                        doc.addImage(img, img.src.endsWith('.png') ? 'PNG' : 'JPEG', 10, yOffset, 50, imageHeight);
                    }

                    // Add location details
                    doc.setFontSize(9);
                    doc.setTextColor(53, 55, 68);
                    yOffset += 5;

                    const details = [
                        ['ID', location.vehicleId],
                        ['Time', location.time],
                        ['Vehicle', location.vehicleModel],
                        ['Address', location.address],
                        ['Interval', `${new Date(location.intervalOfUse.startTime).toLocaleString()} to ${new Date(location.intervalOfUse.endTime).toLocaleString()}`]
                    ];

                    details.forEach(([label, value], index) => {
                        doc.setFont('helvetica', 'bold');
                        doc.text(`${label}:`, 90, yOffset + (index * 5));
                        doc.setFont('helvetica', 'normal');
                        doc.text(`${value}`, 110, yOffset + (index * 5));
                    });

                    yOffset = entryStartY + Math.max(imageHeight, 25) + 5;
                };

                img.onload = () => {
                    addLocationEntry(30);
                    imagesLoaded++;
                    if (imagesLoaded === totalImages) {
                        doc.save(`driver_history_${requestedDriver.first_name}_${requestedDriver.last_name}.pdf`);
                    }
                };

                img.onerror = () => {
                    console.error(`Failed to load image: ${location.vehicleImage}`);
                    addLocationEntry(0);
                    imagesLoaded++;
                    if (imagesLoaded === totalImages) {
                        doc.save(`driver_history_${requestedDriver.first_name}_${requestedDriver.last_name}.pdf`);
                    }
                };
            });
        };
    };


    return (
        <div>
            <DriverDetail driver={requestedDriver} />
            <div className="mt-8">
                <div className="flex flex-row justify-between">
                    <h2 className="text-2xl font-bold mb-4">Driver History</h2>

                    {/* Filter Section */}
                    <div>
                        <input
                            type="text"
                            name="vehicleModel"
                            value={filters}
                            onChange={handleFilterChange}
                            placeholder="Filter by Vehicle Model"
                            className="p-2 border rounded-lg"
                        />
                    </div>


                    <button
                        onClick={downloadHistoryPDF}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mb-4"
                    >
                        Download History
                    </button>
                </div>



                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredHistory.map((location: PassedDriverLocation) => (
                        <div key={location.id} className="border rounded-lg shadow-md bg-white">
                            <div className="space-y-2">
                                <div className="flex items-center justify-center">
                                    <img
                                        src={location.vehicleImage}
                                        alt={location.vehicleModel}
                                        className="w-50 h-50 rounded-lg object-cover"
                                    />
                                </div>

                                <div className="p-3">
                                    <div>
                                        <strong>Vehicle:</strong> {location.vehicleModel}
                                    </div>

                                    <div className="text-sm">
                                        <strong>Address:</strong> <span
                                        className="text-sm text-gray-700">{location.address}</span>
                                    </div>

                                    <div className="text-sm">
                                        <strong>Start:</strong> <span
                                        className="text-sm text-gray-700">{new Date(location.intervalOfUse.startTime).toLocaleString()}</span>
                                    </div>

                                    <div className="text-sm">
                                        <strong>End:</strong> <span
                                        className="text-sm text-gray-700">{new Date(location.intervalOfUse.endTime).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}



