import React from 'react';
import { Switch } from '@/components/ui/switch';

interface CalendarDayProps {
    date: string;
    day: number;
    isService: boolean;
    isEditing: boolean;
    onToggle?: (date: string, value: boolean) => void;
}

export const CalendarDay: React.FC<CalendarDayProps> = ({
                                                            date,
                                                            day,
                                                            isService,
                                                            isEditing,
                                                            onToggle,
                                                        }) => {
    const baseClasses = "text-center p-2 border rounded transition-colors duration-200";
    const statusClasses = isService
        ? 'bg-green-50 border-green-200'
        : 'bg-gray-50 border-gray-200';

    return (
        <div className={`${baseClasses} ${statusClasses}`}>
            <div className="mb-1 font-medium">{day}</div>
            {isEditing ? (
                <Switch
                    checked={isService}
                    onChange={(checked) => onToggle?.(date, checked)}
                    className="mt-1"
                />
            ) : (
                <div className={`text-sm ${isService ? 'text-green-600' : 'text-gray-500'}`}>
                    {isService ? 'En service' : 'Repos'}
                </div>
            )}
        </div>
    );
};
