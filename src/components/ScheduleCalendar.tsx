// // import React, { useState } from 'react';
// // import Calendar from 'react-calendar';
// // import 'react-calendar/dist/Calendar.css';
// // import { Scheduling } from '@/utils/types/ReservationProps';
// //
// // interface ScheduleCalendarProps {
// // 	scheduling: Scheduling;
// // 	onAddDayOff: (date: Date) => void;
// // 	onAddScheduled: (date: Date) => void;
// // }
// //
// // const ScheduleCalendar: React.FC<ScheduleCalendarProps> = ({ scheduling, onAddDayOff, onAddScheduled }) => {
// // 	const { days_off, scheduled_ranges } = scheduling;
// // 	const [activeStartDate, setActiveStartDate] = useState<Date | null>(null);
// //
// // 	const isDayOff = (date: Date) => {
// // 		const dateString = date.toISOString().split('T')[0];
// // 		return days_off.some(range => dateString >= range.start && dateString <= range.end);
// // 	};
// //
// // 	const isScheduled = (date: Date) => {
// // 		const dateString = date.toISOString().split('T')[0];
// // 		return scheduled_ranges.some(range => dateString >= range.start && dateString <= range.end);
// // 	};
// //
// // 	const tileClassName = ({ date }: { date: Date }) => {
// // 		if (isDayOff(date)) {
// // 			return 'day-off';
// // 		}
// // 		if (isScheduled(date)) {
// // 			return 'scheduled';
// // 		}
// // 		return '';
// // 	};
// //
// // 	const handleClickDay = (date: Date) => {
// // 		if (activeStartDate) {
// // 			if (isDayOff(date)) {
// // 				onAddDayOff(date);
// // 			} else {
// // 				onAddScheduled(date);
// // 			}
// // 			setActiveStartDate(null);
// // 		} else {
// // 			setActiveStartDate(date);
// // 		}
// // 	};
// //
// // 	return (
// // 		<div>
// // 			<Calendar
// // 				tileClassName={tileClassName}
// // 				onClickDay={handleClickDay}
// // 				selectRange={true}
// // 			/>
// // 			<style jsx>{`
// //         .day-off {
// //           background-color: #cccccc;
// //         }
// //         .scheduled {
// //           background-color: #add8e6;
// //         }
// //       `}</style>
// // 		</div>
// // 	);
// // };
// //
// // export default ScheduleCalendar;
//
// import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import { Scheduling } from '@/utils/types/ReservationProps';
//
// interface ScheduleCalendarProps {
// 	scheduling: Scheduling;
// 	onAddDayOff: (date: Date) => void;
// 	onAddScheduled: (date: Date) => void;
// }
//
// const ScheduleCalendar: React.FC<ScheduleCalendarProps> = ({ scheduling, onAddDayOff, onAddScheduled }) => {
// 	const { days_off, scheduled_ranges } = scheduling;
// 	const [activeStartDate, setActiveStartDate] = useState<Date | null>(null);
//
// 	// const isDayOff = (date: Date) => {
// 	// 	const dateString = date.toISOString().split('T')[0];
// 	// 	return days_off.some(range => dateString >= range.start && dateString <= range.end);
// 	// };
// 	//
// 	// const isScheduled = (date: Date) => {
// 	// 	const dateString = date.toISOString().split('T')[0];
// 	// 	return scheduled_ranges.some(range => dateString >= range.start && dateString <= range.end);
// 	// };
//
// 	const isWithinRange = (date: Date, range: { start: string; end: string }) => {
// 		const dateString = date.toISOString().split('T')[0];
// 		return dateString >= range.start && dateString <= range.end;
// 	};
//
// 	// Function to check if a date is a day off
// 	const isDayOff = (date: Date) => {
// 		return days_off.some(range => isWithinRange(date, range));
// 	};
//
// 	// Function to check if a date is scheduled
// 	const isScheduled = (date: Date) => {
// 		return scheduled_ranges.some(range => isWithinRange(date, range));
// 	};
//
// 	const tileClassName = ({ date }: { date: Date }) => {
// 		if (isDayOff(date)) {
// 			return 'day-off';
// 		}
// 		if (isScheduled(date)) {
// 			return 'scheduled';
// 		}
// 		return '';
// 	};
//
// 	const handleClickDay = (date: Date) => {
// 	// 	if (activeStartDate) {
// 	// 		if (isDayOff(date)) {
// 	// 			onAddDayOff(date);
// 	// 		} else {
// 	// 			onAddScheduled(date);
// 	// 		}
// 	// 		setActiveStartDate(null);
// 	// 	} else {
// 	// 		setActiveStartDate(date);
// 	// 	}
// 	// };
//
// 		if (isDayOff(date)) {
// 			return 'day-off';
// 		}
// 		if (isScheduled(date)) {
// 			return 'scheduled';
// 		}
// 		return '';
// 	};
//
// 	return (
// 		<div>
// 			<Calendar
// 				tileClassName={tileClassName}
// 				onClickDay={handleClickDay}
// 				selectRange={true}
// 			/>
// 			{/*<style jsx>{`*/}
//       {/*    .day-off {*/}
//       {/*        background-color: #dd3f3f;*/}
//       {/*    }*/}
//
//       {/*    .scheduled {*/}
//       {/*        background-color: #01465e;*/}
//       {/*    }*/}
//
//
// 			{/*`}</style>*/}
//
// 			<style jsx>{`
//           .day-off {
//               background-color: #cccccc;
//           }
//
//           .scheduled {
//               background-color: #add8e6;
//           }
// 			`}</style>
// 		</div>
// 	);
// };
//
// export default ScheduleCalendar;


import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Scheduling } from '@/utils/types/ReservationProps';

interface ScheduleCalendarProps {
	scheduling: Scheduling;
}

const ScheduleCalendar: React.FC<ScheduleCalendarProps> = ({ scheduling }) => {
	const { days_off, scheduled_ranges } = scheduling;

	// Function to check if a date is within a range
	const isWithinRange = (date: Date, range: { start: string; end: string }) => {
		const dateString = date.toISOString().split('T')[0];
		return dateString >= range.start && dateString <= range.end;
	};

	// Function to check if a date is a day off
	const isDayOff = (date: Date) => {
		return days_off.some(range => isWithinRange(date, range));
	};

	// Function to check if a date is scheduled
	const isScheduled = (date: Date) => {
		return scheduled_ranges.some(range => isWithinRange(date, range));
	};

	// Function to add custom classes to calendar tiles
	const tileClassName = ({ date }: { date: Date }) => {
		if (isDayOff(date)) {
			return 'day-off';
		}
		if (isScheduled(date)) {
			return 'scheduled';
		}
		return '';
	};

	return (
		<div>
			<Calendar
				tileClassName={tileClassName}
			/>
			<style jsx>{`
        .day-off {
          background-color: #cccccc;
        }
        .scheduled {
          background-color: #add8e6;
        }
      `}</style>
		</div>
	);
};

export default ScheduleCalendar;
