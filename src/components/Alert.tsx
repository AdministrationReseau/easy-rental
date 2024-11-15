'use client'

import React from 'react';
import "@/app/globals.css"
import { Alert } from '@mui/material';
import { JakartaRegular } from '@/fonts'

interface AlertProps {
    message: string;
    type?: 'success' | 'info' | 'warning' | 'error';
    width: string;
}

const CustomAlert: React.FC<AlertProps> = ({ message, type = 'info', width }) => {
    return (
        <div className={width}>
            <Alert
                severity={type}
                className={`
                
                    ${type === 'success' ? 'bg-green-background' :
                        type === 'warning' ? 'bg-orange-background' :
                            type === 'error' ? 'bg-red-background' :
                                'bg-whitish-background primary-text'}
                `}
            >
                <p className={`
                ${JakartaRegular.className}
                ${type === 'success' ? 'text-green-text' :
                    type === 'warning' ? 'text-orange-text' :
                        type === 'error' ? 'text-red-text' :
                            'text-green-text'}
                `}>{message}</p>
            </Alert>
        </div>
    );
};

export { CustomAlert };