'use client';

import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface PasswordProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const CustomPassword: React.FC<PasswordProps> = ({ value, onChange, placeholder }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex flex-col items-start w-[280px]">
            <label className="mb-2 text-[20px] font-medium text-gray-700">Password</label>
            <TextField
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                placeholder={placeholder || 'Entrez votre mot de passe'}
                className="hover:bg-primary-blue rounded duration-200"
                InputProps={{
                    style: { height: 68 }, // Ajuste la hauteur
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={togglePasswordVisibility} edge="end">
                                {showPassword ? (
                                    <Visibility style={{ color: 'gray' }} />
                                ) : (
                                    <VisibilityOff style={{ color: 'gray' }} />
                                )}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
};

export { CustomPassword };
