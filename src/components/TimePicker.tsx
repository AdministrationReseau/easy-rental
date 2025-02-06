'use client';

import React from 'react';
import { TimeField, DateInput, DateSegment } from 'react-aria-components';

// interface TimePickerStyledProps {
//   value: string | null;
//   onChange?: (value: string) => void; // ici on spécifie que onChange attend une fonction qui prend une chaîne de caractères
// }

export const TimePicker = () => {
    return (
      <div className='w-full'>
        <TimeField>
            <DateInput className='flex flex-row gap-1'>
                {segment => <DateSegment segment={segment} />}
            </DateInput>
        </TimeField>
        </div>
    );
}

// export const TimePickerStyled = ({ value, onChange }: TimePickerStyledProps) => {
//   const [inputValue, setInputValue] = useState<string | null>(value);
  
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newValue = e.target.value;
//     setInputValue(newValue);
//     if (onChange) {
//       onChange(newValue);
//     }
//   };

//   return (
//     <div className="w-full max-w-md">
//       <div className="flex flex-col gap-4">
//         <div className="relative">
//           <label className="block mb-1">Select Time</label>
//           <TimeField>
//             <DateInput
//               value={inputValue}  // Assigner la valeur de l'état local
//               onChange={handleInputChange} // Gérer le changement d'entrée
//               className="w-full px-4 py-2 flex flex-row items-center justify-between gap-2 rounded-[10px] border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//               aria-label="Time Picker" // Option pour l'accessibilité
//             >
//               {segment => (
//                 <DateSegment
//                   segment={segment}
//                   className="px-1 py-0.5 rounded-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2"
//                 />
//               )}
//             </DateInput>
//           </TimeField>
//         </div>
//       </div>
//     </div>
//   );
// };

export const TimePickerStyled = () => {
  return (
    <div className="w-[50%] my-8 h-[50px]">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <label className="block mb-1 text-md font-medium text-black dark:text-white">Select Time</label>
          <TimeField>
          <DateInput 
            className="flex flex-row gap-1 w-full px-4 py-2 items-center justify-between gap-2 rounded-[10px] border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                {segment => <DateSegment segment={segment} className="px-1 py-0.5 rounded-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2" />}
            </DateInput>
          </TimeField>
        </div>
      </div>
    </div>
  );
};
