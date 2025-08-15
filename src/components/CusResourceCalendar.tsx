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
	showAddButton: boolean; // New prop to control button visibility
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

const SchedulingCard: React.FC<SchedulingCardProps> = ({ requestedResource, showAddButton }) => {
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

	// const handleAddSchedule = () => {
	// 	if (newSchedule.start && newSchedule.end) {
	// 		setScheduleData([...scheduleData, newSchedule]); // Add new schedule without replacing existing ones
	// 		setModalOpen(false);
	// 	}
	// };

	const handleAddSchedule = () => {
		if (!newSchedule.start || !newSchedule.end) return;

		const newStart = new Date(newSchedule.start).setHours(0, 0, 0, 0);
		const newEnd = new Date(newSchedule.end).setHours(0, 0, 0, 0);

		// Check if the new schedule overlaps with existing schedules
		const isOverlapping = scheduleData.some(({ start, end }) => {
			const existingStart = new Date(start).setHours(0, 0, 0, 0);
			const existingEnd = new Date(end).setHours(0, 0, 0, 0);
			return !(newEnd < existingStart || newStart > existingEnd); // Overlapping condition
		});

		if (isOverlapping) {
			alert("The selected date range is already scheduled or marked as a day-off.");
			return;
		}

		setScheduleData([...scheduleData, newSchedule]);
		setModalOpen(false);
	};


	const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

	return (
		<Card className="hover:shadow-lg transition-shadow duration-300">
			<CardHeader className="flex justify-between items-center flex-row">
				<CardTitle className="flex items-center gap-2">
					<CalendarIcon className="h-5 w-5 text-blue-500" />
					Scheduling & Availability
				</CardTitle>
				{showAddButton && (
					<Button onClick={() => setModalOpen(true)} >
						<PlusCircle /> Add
					</Button>
				)}
			</CardHeader>
			<CardContent>
				<Calendar
					tileClassName={({ date }) => {
						if (date < new Date() || isDateInRange(date, scheduleData)) {
							return "grayed-out";
						}
						return null;
					}}
					// tileDisabled={({ date }) => date < new Date()} // Disable past dates
					tileDisabled={({ date }) => date < new Date() || isDateInRange(date, scheduleData)}
				/>

				{/* Color Legend */}
				<div className="mt-4 flex flex-wrap gap-4">
					<div className="flex items-center gap-2">
						<span className="w-4 h-4 bg-yellow-300 border border-yellow-500 rounded"></span>
						<span className="text-sm">Today</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="w-4 h-4 bg-gray-300 border border-gray-500 rounded"></span>
						<span className="text-sm">Grayed Out (Past or Selected)</span>
					</div>
				</div>
			</CardContent>

			{/* Modal for adding schedule */}
			<Dialog open={modalOpen} onClose={() => setModalOpen(false)} className="h-[400px]">
				<DialogTitle>Add Schedule</DialogTitle>

				<DialogContent className="grid gap-4 p-4" style={{ maxHeight: "80vh", overflowY: "auto" }}>
				{/*<DialogContent className="grid gap-4 p-4">*/}
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
						inputProps={{ min: today }} // Set min date to today
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
