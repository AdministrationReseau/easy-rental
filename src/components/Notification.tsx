'use client';

import { Delete } from '@mui/icons-material';
import React from 'react';

interface NotificationProps {
    id: number;
    title: string;
    content: string;
    handleDelete: (id: number) => void;
    handleNotificationCheck: (event: React.ChangeEvent<HTMLInputElement>, id: number) => void;
}

export default function Notification({
    id,
    title,
    content,
    handleDelete,
    handleNotificationCheck,
}: NotificationProps) {
    return (
        <div className="flex flex-row items-center px-4 py-3 gap-2 mx-auto w-full border border-gray-200 hover:border-gray-300 hover:shadow-sm">
            <div className="flex flex-row gap-2 w-20">
                <div className="hover:bg-primary-blue/5 rounded-md">
                    {/* Checkbox */}
                    <input
                        type="checkbox"
                        className="w-4 h-4 border border-primary-blue"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleNotificationCheck(e, id)
                        }
                    />
                </div>
            </div>

            <div className="flex flex-row gap-2 w-full">
                <div className="font-bold">{title}</div>
                <div className="text-gray-700">{content}</div>
            </div>

            <div className="flex flex-row gap-2">
                <div className="hover:bg-black/5 rounded-md">
                    {/* Delete Button */}
                    <Delete sx={{ color: 'blue' }} onClick={() => handleDelete(id)} />
                </div>
            </div>
        </div>
    );
};
