import React, { useState } from 'react';
import { Button, Calendar, CalendarCell, CalendarGrid, DateInput, DatePicker as ReactDatePicker, DateSegment, Dialog, Group, Heading, Popover, DateValue } from 'react-aria-components';

interface DatePickerStyledProps {
    value?: Date | null;
    onChange?: (value: Date | null) => void;
}

export const DatePickerStyled = ({
    value,
    onChange,
    }: DatePickerStyledProps) => {
    const [selectedDate, setSelectedDate] = useState<DateValue | null>(null);
    const [selectedTime, setSelectedTime] = useState<string>("12:00");
    const [error, setError] = useState<string | null>();
    console.log(selectedDate)
    const handleDateChange = (newDate: DateValue | null) => {
        if (newDate) {
          setSelectedDate(newDate);
          setError(null);
          updateDateTime(newDate, selectedTime);
        } else {
          setError('Please select a valid date.');
        }
      };
    
      const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = event.target.value;
        setSelectedTime(newTime);
        if (selectedDate) {
          updateDateTime(selectedDate, newTime);
        }
      };
      const updateDateTime = (date: DateValue, time: string) => {
        // Extraire les heures et minutes du temps sélectionné
        const [hours, minutes] = time.split(':').map(Number);
        
        // Créer un nouvel objet Date avec la date et l'heure combinées
        const completeDate = new Date(
          date.year,
          date.month - 1, // Les mois en JS commencent à 0
          date.day,
          hours,
          minutes
        );
    
        if (onChange) {
          onChange(completeDate);
        }
      };

    return (
        <div className="w-full text-primary-text my-2">
            <div className="flex flex-row w-full gap-4">
                 {/* Date Selection */}
                <div className="relative w-full">
                    <label htmlFor="datePicker" className="block mb-1 font-medium dark:text-white">
                        Select Date
                    </label>
                    <ReactDatePicker onChange={handleDateChange}>
                        <Group className="flex flex-row w-full rounded-md border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-200 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                            <DateInput className="w-full flex items-center justify-between gap-1 text-gray-700">
                                {segment => (
                                    <DateSegment
                                        segment={segment}
                                        className="px-1 py-0.5 hover:bg-gray-100 focus:outline-none focus:ring-primary-blue focus:ring-1 rounded-sm"
                                    />
                                )}
                            </DateInput>
                            <Button className="text-primary-blue hover:text-blue-600 focus:outline-none focus:ring-primary-blue focus:ring-2 rounded-md">▼</Button>
                        </Group>
                        {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
                        <Popover className="absolute mt-2 w-full max-w-sm bg-white border border-gray-200 rounded-md shadow-lg z-10">
                            <Dialog className="p-4">
                                <Calendar className="flex flex-col items-center gap-4">
                                    <header className="flex items-center justify-between w-full px-2">
                                        <Button slot="previous" className="text-primary-blue hover:text-blue-600 focus:outline-none focus:ring-primary-blue focus:ring-2 rounded-full">◀</Button>
                                        <Heading className=" font-medium text-gray-700" />
                                        <Button slot="next" className="text-primary-blue hover:text-blue-600 focus:outline-none focus:ring-primary-blue focus:ring-2 rounded-full">▶</Button>
                                    </header>
                                    <CalendarGrid className="grid grid-cols-7 gap-1 w-full">
                                        {date => (
                                            <CalendarCell
                                                date={date}
                                                className="text-center text-sm p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-primary-blue focus:ring-2"
                                            />
                                        )}
                                    </CalendarGrid>
                                </Calendar>
                            </Dialog>
                        </Popover>
                    </ReactDatePicker>
                </div>
                {/* Time Selection */}
            {selectedDate && (
                <div className="relative w-full">
                <label htmlFor="timePicker" className="block mb-1 font-medium dark:text-white">
                    Select Time
                </label>
                <input
                    type="time"
                    id="timePicker"
                    value={selectedTime}
                    onChange={handleTimeChange}
                    className="w-full flex justify-around rounded-md border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-200 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                </div>
            )}
            </div>
        </div>
    );
};

export const DateTime = () => {
    
    const [time, setTime] = useState<string>('12:00');
    const handleDateTimeChange = (dateTime: Date | null) => {
        if (dateTime) {
          console.log('Date complète:', dateTime);
          console.log('Format ISO:', dateTime.toISOString());
          // Vous pouvez accéder à toutes les propriétés de l'objet Date
          console.log('Année:', dateTime.getFullYear());
          console.log('Mois:', dateTime.getMonth() + 1); // +1 car les mois commencent à 0
          console.log('Jour:', dateTime.getDate());
          console.log('Heures:', dateTime.getHours());
          console.log('Minutes:', dateTime.getMinutes());
        }
      };

    return (
      <div className="w-full">
        <DatePickerStyled
          onChange={handleDateTimeChange}
        />
      </div>
    );
  };

export const DatePicker = () => {
    return (
        <div className="w-full ">
        <ReactDatePicker>
            <Group className='text-xs flex flex-row gap-2'>
                <DateInput className='flex flex-row'>
                    {(segment) => <DateSegment segment={segment} />}
                </DateInput>
                <Button className='text-primary-blue'>▼</Button>
            </Group>
            <Popover className='text-xs'>
                <Dialog className=''>
                    <Calendar className='flex flex-col justify-center items-center'>
                        <header className='flex flex-row gap-2 items-center'>
                            <Button slot="previous" className='text-primary-blue'>◀</Button>
                            <Heading />
                            <Button slot="next" className='text-primary-blue'>▶</Button>
                        </header>
                        <CalendarGrid>
                            {(date) => <CalendarCell date={date} className='text-right m-[1px]' />}
                        </CalendarGrid>
                    </Calendar>
                </Dialog>
            </Popover>
        </ReactDatePicker>
        </div>
    );
}