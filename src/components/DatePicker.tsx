import React, { useState } from 'react';
import { Button, Calendar, CalendarCell, CalendarGrid, DateInput, DatePicker as ReactDatePicker, DateSegment, Dialog, Group, Heading, Label, Popover, DateValue } from 'react-aria-components';

interface DatePickerStyledProps {
  value: DateValue | null;
  onChange?: (value: DateValue | null) => void; // ici on spécifie que onChange attend une fonction qui prend une DateValue ou null
}

export const DatePickerStyled = ({ value, onChange }: DatePickerStyledProps) => {
    const [selectedDate, setSelectedDate] = useState<DateValue | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleDateChange = (newDate: DateValue | null) => {
        if (newDate) {
            setSelectedDate(newDate);
            setError(null);
            if (onChange) onChange(newDate);
        } else {
            setError('Please select a valid date.');
        }
    };

    return (
        <div className="min-w-[250px] max-w-md mx-auto">
            <div className="flex flex-col gap-4">
                <div className="w-full relative">
                    <label htmlFor="datePicker" className="block mb-1 text-sm font-medium text-black dark:text-white">
                        Select Date
                    </label>
                    <ReactDatePicker onChange={handleDateChange}>
                        <Group className="flex flex-row w-full rounded-[10px] border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-200 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
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
                                        <Heading className="text-sm font-medium text-gray-700" />
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
            </div>
        </div>
    );
};

export const DatePicker = () => {
    return (
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
    );
}