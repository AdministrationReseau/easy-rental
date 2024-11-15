'use client'
import React from 'react';
import "@/app/globals.css"
import { Checkbox, FormControlLabel } from '@mui/material';

interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// Checkbox Component
const CustomCheckbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
    return (
        <div style={{overflow: 'auto' }}>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={checked}
                        onChange={onChange}
                        color="primary"
                        className="hover:bg-primary-blue rounded duration-200"
                        // className="hover:bg-primary-blue rounded  duration-200 border-2 border-red-500 hover:bg-[var(--primary-blue)]]"
                    />
                }
                label={label}
            />
        </div>
    );
};

export { CustomCheckbox };