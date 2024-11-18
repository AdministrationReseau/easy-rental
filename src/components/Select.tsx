'use client';

import React from 'react';
import "@/app/globals.css";
import { MenuItem, Select, FormControl } from '@mui/material';

interface SelectProps {
    label: string;
    value: string;
    options: { value: string; label: string }[];
    onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const CustomSelect: React.FC<SelectProps> = ({ label, value, options, onChange }) => {
    return (
        <div className="flex flex-col items-start w-[280px]">
            {/* Label au-dessus */}
            <label className="mb-2 text-[20px] font-medium text-gray-700">{label}</label>
            <FormControl fullWidth>
                <Select
                    value={value}
                    onChange={onChange}
                    className="hover:bg-primary-blue rounded duration-200 w-full h-[68px]"
                    displayEmpty
                >
                    {options.map((option, index) => (
                        <MenuItem key={index} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export { CustomSelect };
