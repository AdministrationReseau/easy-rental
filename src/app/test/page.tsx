'use client'

import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = () => {
	const daysOff = [
		{ start: "2025-02-18", end: "2025-02-18" },
		{ start: "2025-02-25", end: "2025-02-25" }
	];

	const scheduledRanges = [
		{ start: "2025-02-19", end: "2025-02-20" },
		{ start: "2025-02-22", end: "2025-02-27" }
	];

	interface DateRange {
		start: string | Date;
		end: string | Date;
	}

	// Function to check if a date is within any of the ranges
	const isDateInRange = (date: string | Date, ranges: DateRange[]): boolean => {
		const targetDate = new Date(date).setHours(0, 0, 0, 0); // Remove time
		return ranges.some(range => {
			const start = new Date(range.start).setHours(0, 0, 0, 0);
			const end = new Date(range.end).setHours(0, 0, 0, 0);
			return targetDate >= start && targetDate <= end;
		});
	};

	return (
		<div className="p-4">
			<Calendar
				tileClassName={({date}) => {
					if (isDateInRange(date, daysOff)) {
						return 'day-off';
					}
					if (isDateInRange(date, scheduledRanges)) {
						return 'scheduled-range';
					}
					return null;
				}}
			/>

		</div>
	);
};

export default MyCalendar;
