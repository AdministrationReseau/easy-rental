'use client';

import { CustomAlert } from '@/components/Alert';
import { Delete } from '@mui/icons-material';
import Notification from '@/components/Notification';
import React, { useEffect, useState } from 'react';
import { NotificationType } from '@/utils/types/notifications';

export default function NotificationPage() {
    const [notifications, setNotifications] = useState<NotificationType[]>([]);

    useEffect(() => {
        const fetchNotifications = async () => {
        try {
            const response = await fetch("/data/notifications.json");
            if (!response.ok) {
            throw new Error("Failed to fetch notifications");
            }
            const data: NotificationType[] = await response.json();
            setNotifications(data);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
        };

        fetchNotifications();
    }, []);

    const [filteredNotifications, setFilteredNotifications] = React.useState(notifications);
    const [checkedNotifications, setCheckedNotifications] = React.useState<number[]>([]);
    const [showAlert, setShowAlert] = React.useState(false);

    // Handle search functionality
    // const handleSearch = (query: string) => {
    //     if (query.trim() === '') {
    //         setFilteredNotifications(notifications); // Reset to all notifications
    //     } else {
    //         const filtered = notifications.filter(
    //             (notification) =>
    //                 notification.title.toLowerCase().includes(query.toLowerCase()) ||
    //                 notification.content.toLowerCase().includes(query.toLowerCase())
    //         );
    //         setFilteredNotifications(filtered);
    //     }
    // };

    // Handle checkbox state
    const handleNotificationCheck = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
        if (event.target.checked) {
            setCheckedNotifications((prev) => [...prev, id]);
        } else {
            setCheckedNotifications((prev) => prev.filter((notificationId) => notificationId !== id));
        }
    };

    // Handle deleting a single notification
    const handleDelete = (id: number) => {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id));
        setCheckedNotifications((prev) => prev.filter((notificationId) => notificationId !== id));
        setFilteredNotifications((prev) => prev.filter((notification) => notification.id !== id));
        setShowAlert(true);
    };

    // Handle deleting all selected notifications
    const handleDeleteSelected = () => {
        setNotifications((prev) => prev.filter((notification) => !checkedNotifications.includes(notification.id)));
        setFilteredNotifications((prev) => prev.filter((notification) => !checkedNotifications.includes(notification.id)));
        setCheckedNotifications([]);
        setShowAlert(true);
    };

    // Show alert for a short duration
    React.useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => setShowAlert(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    return (
        <div className="relative border w-full px-4 max-h-screen mx-auto mt-4 p-4 flex flex-col gap-4">
            <div className='flex gap-4 items-center'>
                <div>
                    <h2 className='font-bold text-xl'>Your notifications</h2>
                    <div className='text-gray-600 text-sm'>
                        Actually, you have <span className='font-black'>{notifications.length} notifications</span>
                    </div>
                </div>
                
                {checkedNotifications.length > 0 && (
                    <div className="flex flex-row gap-2">
                        <div className="hover:bg-black/5 rounded-md">
                            <Delete style={{ color: 'blue' }} onClick={handleDeleteSelected} />
                        </div>
                    </div>
                )}
            </div>

            {/* Success Alert */}
            {showAlert && <CustomAlert message="Notification deleted successfully" type="success" width="w-full" />}

            {/* Notification List */}
            <div className="w-11/12 h-full mx-auto mt-10 p-4 flex flex-col gap-4 overflow-auto">
                {filteredNotifications.map((notification) => (
                    <Notification
                        key={notification.id}
                        id={notification.id}
                        title={notification.title}
                        content={notification.content}
                        handleDelete={handleDelete}
                        handleNotificationCheck={handleNotificationCheck}
                    />
                ))}
            </div>
        </div>
    );
}
