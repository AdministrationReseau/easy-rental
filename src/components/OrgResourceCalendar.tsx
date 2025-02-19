"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CalendarIcon, PlusCircle } from "lucide-react";
import Calendar from "react-calendar";
import { DriverProps } from "@/utils/types/DriverProps";
import "react-calendar/dist/Calendar.css";
import "@/components/styles/Calendar.css";
import { CarProps } from "@/utils/types/CarProps";
import { Button } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { TextField, MenuItem } from "@mui/material";

interface SchedulingCardProps {
	requestedResource: DriverProps | CarProps;
}

interface DateRange {
	start: string | Date;
	end: string | Date;
	type: "day-off" | "scheduled-range";
}

const isDateInRange = (date: string | Date, ranges?: DateRange[]): boolean => {
	const targetDate = new Date(date).setHours(0, 0, 0, 0);
	if (!ranges) return false;
	return ranges.some((range) => {
		const start = new Date(range.start).setHours(0, 0, 0, 0);
		const end = new Date(range.end).setHours(0, 0, 0, 0);
		return targetDate >= start && targetDate <= end;
	});
};

const SchedulingCard: React.FC<SchedulingCardProps> = ({ requestedResource }) => {
	const [scheduleData, setScheduleData] = useState<DateRange[]>([
		...(requestedResource?.scheduling?.days_off || []).map((d) => ({
			...d,
			type: "day-off" as const
		})),
		...(requestedResource?.scheduling?.scheduled_ranges || []).map((d) => ({
			...d,
			type: "scheduled-range" as const
		})),
	]);

	const [modalOpen, setModalOpen] = useState(false);
	const [newSchedule, setNewSchedule] = useState<DateRange>({
		start: "",
		end: "",
		type: "day-off",
	});

	const handleAddSchedule = () => {
		if (newSchedule.start && newSchedule.end) {
			setScheduleData([...scheduleData, newSchedule]); // Add new schedule without replacing existing ones
			setModalOpen(false);
		}
	};

	const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

	return (
		<Card className="hover:shadow-lg transition-shadow duration-300">
			<CardHeader className="flex justify-between flex-row">
				<CardTitle className="flex items-center justify-between">
					<div className="flex flex-row gap-2 items-center">
						<CalendarIcon className="h-5 w-5 text-blue-500" />
						Scheduling & Availability
					</div>

					<Button onClick={() => setModalOpen(true)} className="gap-1">
						<PlusCircle className="h-5 w-5 text-blue-500"/> <p className="text-black text-bold">Add</p>
					</Button>
				</CardTitle>
			</CardHeader>

			<CardContent>
				<Calendar
					tileClassName={({ date }) => {
						if (isDateInRange(date, scheduleData.filter((d) => d.type === "day-off"))) {
							return "day-off";
						}
						if (isDateInRange(date, scheduleData.filter((d) => d.type === "scheduled-range"))) {
							return "scheduled-range";
						}
						if (date < new Date()) {
							return "past-date";
						}
						return null;
					}}
					tileDisabled={({ date }) => date < new Date()} // Disable past dates
				/>

				{/* Color Legend */}
				<div className="mt-4 flex flex-wrap gap-4">
					<div className="flex items-center gap-2">
						<span className="w-4 h-4 bg-yellow-300 border border-yellow-500 rounded"></span>
						<span className="text-sm">Today</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="w-4 h-4 bg-red-300 border border-red-500 rounded"></span>
						<span className="text-sm">Day Off</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="w-4 h-4 bg-green-300 border border-green-500 rounded"></span>
						<span className="text-sm">Scheduled</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="w-4 h-4 bg-gray-300 border border-gray-500 rounded"></span>
						<span className="text-sm">Past Date</span>
					</div>
				</div>
			</CardContent>

			{/* Modal for adding schedule */}
			<Dialog open={modalOpen} onClose={() => setModalOpen(false)} fullWidth maxWidth="sm">
				<DialogTitle>Add Schedule</DialogTitle>

				<DialogContent className="grid gap-4 p-4 mt-2 " style={{ maxHeight: "80vh", overflowY: "auto" }}>

					<TextField
						label="Start Date"
						type="date"
						value={newSchedule.start as string}
						onChange={(e) => setNewSchedule({ ...newSchedule, start: e.target.value })}
						InputLabelProps={{ shrink: true }}
						fullWidth
						inputProps={{ min: today }} // Set min date to today
					/>
					<TextField
						label="End Date"
						type="date"
						value={newSchedule.end as string}
						onChange={(e) => setNewSchedule({ ...newSchedule, end: e.target.value })}
						InputLabelProps={{ shrink: true }}
						fullWidth
						inputProps={{ min: today }}
					/>
					<TextField
						label="Type"
						select
						value={newSchedule.type}
						onChange={(e) => setNewSchedule({ ...newSchedule, type: e.target.value as "day-off" | "scheduled-range" })}
						fullWidth
					>
						<MenuItem value="day-off">Day Off</MenuItem>
						<MenuItem value="scheduled-range">Scheduled</MenuItem>
					</TextField>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setModalOpen(false)} color="secondary">
						Cancel
					</Button>
					<Button onClick={handleAddSchedule} variant="contained" color="primary">
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</Card>
	);
};

export default SchedulingCard;
