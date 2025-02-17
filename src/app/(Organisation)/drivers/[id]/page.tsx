'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { DriverProps } from '@/utils/types/DriverProps';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/organisation/card';
import { CalendarIcon, Phone, Mail, MapPin, Car, Shield, UserIcon, KeyIcon, List } from 'lucide-react';
import Image from 'next/image';
import { RatingStars } from "@/components/RatingStars";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../../test/Calendar.css'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {LocationProps} from "@/utils/types/LocationProps";

export default function ResourceProfilPage() {
	const [drivers, setDrivers] = useState<DriverProps[]>([]);
	const [activeTab, setActiveTab] = useState('details'); // State to manage active tab
	const { id } = useParams<{ id: string }>();
	const driverId = Number(id);

	const [driverHistories, setDriverHistories] = useState<LocationProps[]>([]); // Updated type
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [filters, setFilters] = useState("");

	const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setFilters(e.target.value);
	};

	interface DateRange {
		start: string | Date;
		end: string | Date;
	}

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


	const filteredHistory = requestedDriverHistory.filter((location) => {
		const matchesVehicle = filters ? location.vehicle.brand.toLowerCase().includes(filters.toLowerCase()) : true;
		return matchesVehicle;
	});

	// Function to check if a date is within any of the ranges
	const isDateInRange = (date: string | Date, ranges: DateRange[]): boolean => {
		const targetDate = new Date(date).setHours(0, 0, 0, 0); // Remove time
		return ranges.some(range => {
			const start = new Date(range.start).setHours(0, 0, 0, 0);
			const end = new Date(range.end).setHours(0, 0, 0, 0);
			return targetDate >= start && targetDate <= end;
		});
	};

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
			<div className="w-full my-4 border-b border-gray-400 justify-between flex flex-row px-6 items-center">
				<div className="flex flex-row items-center">
					<Image
						src={requestedDriver.profile_picture || "/default-driver.png"}
						width={300}
						height={300}
						alt={requestedDriver.first_name}
						className="w-[100px] h-[100px] rounded-full object-cover ring-2 ring-blue-500 ring-offset-2 mr-4 my-3"
					/>
					<div>
						<h4>
							<p className="font-medium text-[40px]">{requestedDriver.first_name} {requestedDriver.last_name}</p>
						</h4>
						<div className="flex flex-row items-center">
							<div className="mr-4">
								<div className="flex flex-row">
									<Shield className="h-4 w-4 text-primary-text" />
									<p className="text-sm text-primary-text ml-1">Experience</p>
								</div>
								<p className="text-sm text-secondary-text">
									{differenceEnAnnees(requestedDriver.created_at)} year(s)
								</p>
							</div>

							<div className="mr-4">
								<div className="flex flex-row mr-4 ">
									<CalendarIcon className="h-4 w-4 text-primary-text" />
									<p className="text-sm text-primary-text ml-1 mr-4">Age</p>
								</div>
								<p className="text-sm text-secondary-text">35 years old</p>
							</div>

							<div className="mr-4">
								<div className="flex flex-row mr-4 ">
									<Mail className="h-4 w-4 text-primary-text" />
									<p className="text-sm text-primary-text ml-1 mr-4">Email</p>
								</div>
								<p className="text-sm text-secondary-text">{requestedDriver.email}</p>
							</div>

							<div className="mr-4">
								<div className="flex flex-row mr-4 ">
									<Phone className="h-4 w-4 text-primary-text" />
									<p className="text-sm text-primary-text ml-1 mr-4">Phone</p>
								</div>
								<p className="text-sm text-secondary-text">{requestedDriver.phone}</p>
							</div>

							<div className="mr-4">
								<div className="flex flex-row mr-4 ">
									<MapPin className="h-4 w-4 text-primary-text" />
									<p className="text-sm text-primary-text ml-1 mr-4">Address</p>
								</div>
								<p className="text-sm text-secondary-text">{requestedDriver.address}</p>
							</div>
						</div>
					</div>
				</div>

				<button
					className="border-primary-blue text-primary-blue h-[40px] rounded-lg p-2 border-2 text- hover:bg-primary-blue hover:text-white">
					Action
				</button>
			</div>

			{/* Tabs for Details and Activity */}
			<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="details">Details</TabsTrigger>
					<TabsTrigger value="activity">Activity</TabsTrigger>
				</TabsList>

				{/* Details Tab Content */}
				<TabsContent value="details" className="space-y-4 flex fle-col md:flex-row justify-between">
					<Card className="hover:shadow-lg transition-shadow duration-300 w-[60%] mt-4">
						<CardHeader>
							<CardTitle className="flex items-center gap-2 justify-between">
								<div className="flex flex-row">
									<UserIcon className="h-5 w-5 text-blue-500 mr-2" />
									Driver Information
								</div>
								<RatingStars rating={requestedDriver?.rating} />
							</CardTitle>
						</CardHeader>

						<CardContent>
							<div className="space-y-4">
								{/* Driver Information */}
								<div className="text-md text-gray-500 space-y-1">
									<p className="flex flex-row items-center">
										<KeyIcon className="h-4 w-4 text-primary-text mr-2" />
										<strong>License Number: </strong> {requestedDriver.license_number}
									</p>
									<p className="flex flex-row items-center">
										<List className="font-bold h-4 w-4 text-primary-text mr-2" />
										<strong>License Type: </strong> {requestedDriver.license_type}
									</p>

									<p className="flex flex-row items-center">
										<Mail className="font-bold h-4 w-4 text-primary-text mr-2" />
										<strong>Email:</strong> {requestedDriver.email}
									</p>
									<p className="flex flex-row items-center">
										<MapPin className="font-bold h-4 w-4 text-primary-text mr-2" />
										<strong>Address:</strong> {requestedDriver.address}
									</p>
									{requestedDriver.location && (
										<p className="flex flex-row items-center">
											<MapPin className="font-bold h-4 w-4 text-primary-text mr-2" />
											<strong>Location:</strong> {requestedDriver.location}
										</p>
									)}

									{/* Vehicle Assigned */}
									{requestedDriver.vehicle_assigned && (
										<div className="pt-4">
											<p className="flex flex-row items-center">
												<Car className="font-bold h-4 w-4 text-primary-text mr-2" />
												<strong>Assigned Vehicles:</strong>
											</p>
											{requestedDriver.vehicle_assigned.length > 0 ? (
												requestedDriver.vehicle_assigned.map((vehicle, key) => (
													<p key={key} className="pl-6">
														{vehicle.brand} {vehicle.model} ({vehicle.year})
													</p>
												))
											) : (
												<p className="pl-6">Not any</p>
											)}
										</div>
									)}

									{/* Insurance Details */}
									<div className="pt-4">
										<p className="flex flex-row items-center">
											<Shield className="font-bold h-4 w-4 text-primary-text mr-2" />
											<strong>Insurance Provider:</strong> {requestedDriver.insurance_provider}
										</p>
										<p className="flex flex-row items-center">
											<Shield className="font-bold h-4 w-4 text-primary-text mr-2" />
											<strong>Insurance Policy Number:</strong> {requestedDriver.insurance_policy}
										</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Scheduling and Availability Section inside Details Tab */}
					<Card className="hover:shadow-lg transition-shadow duration-300">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<CalendarIcon className="h-5 w-5 text-blue-500" />
								Scheduling & Availability
							</CardTitle>
						</CardHeader>
						<CardContent>
							<Calendar
								tileClassName={({date}) => {
									if (isDateInRange(date, requestedDriver?.scheduling?.days_off || [])) {
										return 'day-off';
									}
									if (isDateInRange(date, requestedDriver?.scheduling?.scheduled_ranges || [])) {
										return 'scheduled-range';
									}
									return null;
								}}
							/>

						</CardContent>
					</Card>
				</TabsContent>

				{/* Activity Tab Content */}
				<TabsContent value="activity" className="space-y-4">
					<div className="p-4 bg-white rounded-lg shadow-sm">
						<h3 className="text-xl font-bold mb-4">Driver Activity</h3>

						<div className="mb-2">
							<input
								type="text"
								name="vehicleBrand"
								value={filters}
								onChange={handleFilterChange}
								placeholder="Filter by Vehicle Brand"
								className="p-2 border rounded-lg"
							/>
						</div>

						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-[200px]">Image</TableHead>
									<TableHead>Vehicle Brand</TableHead>
									<TableHead>Pick Up</TableHead>
									<TableHead>Drop Off</TableHead>
									<TableHead>Status</TableHead>
								</TableRow>
							</TableHeader>
							{filteredHistory.map((location: LocationProps) => (

								<TableBody  key={location.id}>
									<TableRow>
										<TableCell className="w-[200px]">
											<img
												src={location.vehicle.image[0]}
												alt={location.vehicle.brand}
												className="w-[75px] rounded"
											/>
										</TableCell>
										<TableCell>
											<h3 className="font-bold">{location.vehicle.brand}</h3>
										</TableCell>
										<TableCell>
											<p className="font-bold">{location.pick_up.place} </p>
											<p>{new Date(location.pick_up.date).toLocaleString()} </p>
										</TableCell>
										<TableCell>
											<p className="font-bold">{location.drop_off.place} </p>
											<p>{new Date(location.drop_off.date).toLocaleString()}</p>
											</TableCell>
										<TableCell>
											<span className={`px-2 py-1 rounded-full text-xs ${
												location.status === 'completed' ? 'bg-green-100 text-green-800' :
												location.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
													'bg-red-100 text-red-800'}`}>{location.status}</span>
										</TableCell>
									</TableRow>
							</TableBody>
							))}
						</Table>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
