'use client'
import React from 'react';
import "@/app/globals.css"
import { Checkbox, FormControlLabel, Alert, TextField } from '@mui/material';
import { JakartaRegular } from '@/fonts'

interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface AlertProps {
    message: string;
    type?: 'success' | 'info' | 'warning' | 'error';
}

interface TextFieldProps {
    label: string;
    value: string;
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
                        className="hover:bg-[var(--primary-blue)] rounded transition duration-200"
                    />
                }
                label={label}
            />
        </div>
    );
};

// Alert Component
const CustomAlert: React.FC<AlertProps> = ({ message, type = 'info' }) => {
    return (
        <div>
            <Alert severity={type} className={
                type === 'success' ? 'bg-[var(--green-background)] green-text' :
                    type === 'warning' ? 'bg-[var(--orange-background)] orange-text' :
                        type === 'error' ? 'bg-[var(--red-background)] red-text' :
                            'bg-[var(--whitish-background)] primary-text'
            }>
                <p className={`
                ${JakartaRegular.className}
                ${type === 'success' ? 'green-text' :
                    type === 'warning' ? 'orange-text' :
                        type === 'error' ? 'red-text' :
                            'primary-text'}
                `}>{message}</p>
            </Alert>
        </div>
    );
};

// TextField Component
const CustomTextField: React.FC<TextFieldProps> = ({ label, value, onChange }) => {
    return (
        <div style={{ overflow: 'auto' }}>
            <TextField
                label={label}
                value={value}
                onChange={onChange}
                variant="outlined"
                fullWidth
                className="mt-4 border border-gray-300 rounded-md bg-[var(--whitish-background)] text-[var(--primary-text)]"
            />
        </div>
    );
};

export { CustomCheckbox, CustomAlert, CustomTextField };