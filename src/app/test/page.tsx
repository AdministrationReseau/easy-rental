// // 'use client'
// //
// // import { useState, useEffect } from 'react';
// // import Calendar from 'react-calendar';
// //
// // export default function Schedule() {
// //   const [date, setDate] = useState(new Date());
// //   const [slots, setSlots] = useState([]);
// //
// //   useEffect(() => {
// //     async function fetchSlots() {
// //       const { data } = await axios.get('/api/slots');
// //       setSlots(data);
// //     }
// //     fetchSlots();
// //   }, []);
// //
// //   const handleBooking = async (slotId) => {
// //     await axios.post('/api/book', {
// //       customerName: 'Jane Doe',
// //       customerEmail: 'jane.doe@example.com',
// //       slotId,
// //       appointmentDate: date
// //     });
// //     alert('Appointment Booked!');
// //   };
// //
// //   return (
// //     <div>
// //       <Calendar onChange={setDate} value={date} />
// //       <h3>Available Slots on {date.toDateString()}:</h3>
// //       <ul>
// //         {slots.map(slot => (
// //           <li key={slot.id}>
// //             {slot.slot_time}
// //             <button onClick={() => handleBooking(slot.id)}>Book</button>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }
//
// 'use client';
//
// import { useState } from 'react';
// import Calendar from 'react-calendar';
// import { DriverProps} from "@/utils/types/DriverProps"; // Adjust the import path as needed
//
// // Sample driver data
// const drivers: DriverProps[] = [
// 	{
// 		id: 1,
// 		first_name: "John",
// 		last_name: "Doe",
// 		age: 35,
// 		license_number: "D1234567",
// 		license_type: "Class C",
// 		address: "123 Main St, City, CA 90001",
// 		phone: "+1 123-456-7890",
// 		email: "john.doe@example.com",
// 		vehicle_assigned: [{ id: 1, make: "Toyota", model: "Camry", year: 2020 }],
// 		rating: 4.5,
// 		insurance_provider: "State Farm",
// 		insurance_policy: "SF123456789",
// 		profile_picture: "/assets/organisation/drivers/1.jpeg",
// 		available: true,
// 		created_at: "2010-08-18T00:00:00.000Z",
// 		scheduling: {
// 			working_hours: { start: "08:00", end: "18:00" },
// 			days_off: ["Sunday"],
// 			scheduled_rides: [
// 				{ date: "2025-02-16", time: "09:30", destination: "Downtown" },
// 				{ date: "2025-02-16", time: "14:00", destination: "Airport" },
// 			],
// 		},
// 	},
// ];
//
// export default function Schedule() {
// 	const [date, setDate] = useState<Date>(new Date());
// 	const [selectedDriver, setSelectedDriver] = useState<DriverProps | null>(drivers[0]);
//
// 	const selectedDateString = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
//
// 	const availableRides = selectedDriver?.scheduling.scheduled_rides.filter(
// 		(ride) => ride.date === selectedDateString
// 	) || [];
//
// 	const handleBooking = (rideTime: string, destination: string) => {
// 		alert(`Appointment booked with ${selectedDriver?.first_name} ${selectedDriver?.last_name} at ${rideTime} for ${destination}`);
// 	};
//
// 	return (
// 		<div>
// 			<h2>Schedule a Ride</h2>
// 			<Calendar onChange={setDate} value={date} />
// 			<h3>Available Rides on {date.toDateString()}:</h3>
// 			{availableRides.length > 0 ? (
// 				<ul>
// 					{availableRides.map((ride, index) => (
// 						<li key={index}>
// 							{ride.time} - {ride.destination}
// 							<button onClick={() => handleBooking(ride.time, ride.destination)}>Book</button>
// 						</li>
// 					))}
// 				</ul>
// 			) : (
// 				<p>No available rides for this date.</p>
// 			)}
// 		</div>
// 	);
// }
'use client'

import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css'

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
