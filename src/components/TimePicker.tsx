'use client'

import * as React from 'react';
import { TimeField, Label, DateInput, DateSegment } from 'react-aria-components';

export const TimePicker = () => {
    return (
        <TimeField>
            <DateInput className='flex flex-row gap-1' >
                {segment => <DateSegment segment={segment} />}
            </DateInput>
        </TimeField>
    );
}

export const TimePickerStyled = () => {
  return (
    <div className="w-full max-w-md ">
      {/* Wrapper for time selection */}
      <div className="flex flex-col gap-4">
        <div className="relative">
          {/* Label pour l'accessibilité */}
          <label className="block  mb-1">
            Select Time
          </label>

          {/* Champ TimeField avec styles */}
          <TimeField>
            <DateInput
              className="w-full px-4 py-2 flex flex-row items-center justify-between gap-2 rounded-[10px] border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            >
              {/* Les segments individuels de l'heure */}
              {segment => (
                <DateSegment
                  segment={segment}
                  className="px-1 py-0.5 rounded-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2"
                />
              )}
            </DateInput>
          </TimeField>
        </div>
      </div>
    </div>
  );
};
