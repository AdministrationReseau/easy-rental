'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { DriverProps } from '@/utils/types/DriverProps';
import {LocationProps} from "@/utils/types/LocationProps";
import DriverHeader from "@/components/DriverHeader";
import OrgDriverDetail from "@/components/OrgDriverDetail";
import OrgDriverCalendar from "@/components/OrgResourceCalendar";
import DriverRentalHistory from "@/components/DriverRentalHistory";

export default function ResourceProfilPage() {
	const [drivers, setDrivers] = useState<DriverProps[]>([]);
	const [activeTab, setActiveTab] = useState('details'); // State to manage active tab
	const { id } = useParams<{ id: string }>();
	const driverId = Number(id);

	const [driverHistories, setDriverHistories] = useState<LocationProps[]>([]); // Updated type
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);


	useEffect(() => {

		const fetchData = async () => {
			try {
				const driversResponse = await fetch("/data/drivers.json");
				const driverHistoriesResponse = await fetch("/data/history.json");

				if (!driversResponse.ok || !driverHistoriesResponse.ok) {
					throw new Error("Failed to fetch data");
				}

				const driversData: DriverProps[] = await driversResponse.json();
				const driverHistoriesData: LocationProps[] = await driverHistoriesResponse.json(); // Updated type

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

	if (isNaN(driverId)) {
		return <div>Invalid driver ID</div>;
	}


	const requestedDriver = drivers.find(driver => driver.id === driverId);
	const requestedDriverHistory = driverHistories.filter(history => history.driver?.id === driverId); // Updated filter logic

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;
	if (!requestedDriver || !requestedDriverHistory.length) {
		return <div>Invalid driver ID or no history available</div>;
	}



	if (!requestedDriver) {
		return <div>Driver not found</div>;
	}

	// Function to calculate years of experience
	const differenceEnAnnees = (dateString: string | number | Date) => {
		const dateCible = new Date(dateString);
		const dateActuelle = new Date();
		const diff = dateActuelle.getFullYear() - dateCible.getFullYear();
		const anniversairePasse =
			(dateActuelle.getMonth() > dateCible.getMonth()) ||
			(dateActuelle.getMonth() === dateCible.getMonth() && dateActuelle.getDate() >= dateCible.getDate());
		return anniversairePasse ? diff : diff - 1;
	};

	return (
		<div className="h-full w-full flex flex-col gap-2 rounded-md">
			{/* Header */}
			<DriverHeader requestedDriver={requestedDriver} differenceEnAnnees={differenceEnAnnees} />

			{/* Tabs for Details and Activity */}
			<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="details">Details</TabsTrigger>
					<TabsTrigger value="activity">Activity</TabsTrigger>
				</TabsList>

				{/* Details Tab Content */}
				<TabsContent value="details" className="space-y-4 flex fle-col md:flex-row justify-between">
					<OrgDriverDetail requestedDriver={requestedDriver} />

					<OrgDriverCalendar requestedResource={requestedDriver} />
				</TabsContent>

				{/* Activity Tab Content */}
				<TabsContent value="activity" className="space-y-4">
					<DriverRentalHistory requestedDriverHistory = {requestedDriverHistory}/>
				</TabsContent>
			</Tabs>
		</div>
	);
}
