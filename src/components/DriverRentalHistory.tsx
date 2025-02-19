import React, { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { LocationProps } from "@/utils/types/LocationProps";

interface DriverActivityProps {
	requestedDriverHistory: LocationProps[];
}

export const DriverRentalHistory: React.FC<DriverActivityProps> = ({requestedDriverHistory,}) => {
	const [filters, setFilters] = useState("");

	const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilters(e.target.value);
	};

	const filteredHistory = requestedDriverHistory.filter((location) =>
		filters
			? location.vehicle.brand.toLowerCase().includes(filters.toLowerCase())
			: true
	);

	return (
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
				<TableBody>
					{filteredHistory.map((location) => (
						<TableRow key={location.id}>
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
								<p className="font-bold">{location.pick_up.place}</p>
								<p>{new Date(location.pick_up.date).toLocaleString()}</p>
							</TableCell>
							<TableCell>
								<p className="font-bold">{location.drop_off.place}</p>
								<p>{new Date(location.drop_off.date).toLocaleString()}</p>
							</TableCell>
							<TableCell>
                <span
	                className={`px-2 py-1 rounded-full text-xs ${
		                location.status === "completed"
			                ? "bg-green-100 text-green-800"
			                : location.status === "pending"
				                ? "bg-yellow-100 text-yellow-800"
				                : "bg-red-100 text-red-800"
	                }`}
                >
                  {location.status}
                </span>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default DriverRentalHistory;
