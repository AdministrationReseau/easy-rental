'use client';

import { CustomAlert } from '@/components/Alert';
import SearchField from '@/components/SearchField';
import { Delete } from '@mui/icons-material';
import Notification from '@/components/Notification';
import React from 'react';

export default function NotificationPage() {
    const [notifications, setNotifications] = React.useState<{ id: number; title: string; content: string }[]>([
        { id: 1, title: 'Title 1', content: 'Notification 1' },
        { id: 2, title: 'ATitle 2', content: 'Notification 2' },
        { id: 3, title: 'BTitle 3', content: 'Notification 3' },
        { id: 4, title: 'CTitle 4', content: 'Notification 4' },
        { id: 5, title: 'DTitle 5', content: 'Notification 5' },
        { id: 6, title: 'ETitle 6', content: 'Notification 6' },
        { id: 7, title: 'FTitle 7', content: 'Notification 7' },
        { id: 8, title: 'GTitle 8', content: 'Notification 8' },
        { id: 9, title: 'Title 9', content: 'Notification 9' },
        { id: 10, title: 'Title 10', content: 'Notification 10' },
        { id: 11, title: 'Title 11', content: 'Notification 11' },
        { id: 12, title: 'Title 12', content: 'Notification 12' },
        { id: 13, title: 'Title 13', content: 'Notification 13' },
        { id: 14, title: 'Title 14', content: 'Notification 14' },
        { id: 15, title: 'Title 15', content: 'Notification 15' },
        { id: 16, title: 'Title 16', content: 'Notification 16' },
        { id: 17, title: 'Title 17', content: 'Notification 17' },
        { id: 18, title: 'Title 18', content: 'Notification 18' },
        { id: 19, title: 'Title 19', content: 'Notification 19' },
        { id: 20, title: 'Title 20', content: 'Notification 20' },
    ]);

    const [filteredNotifications, setFilteredNotifications] = React.useState(notifications);
    const [checkedNotifications, setCheckedNotifications] = React.useState<number[]>([]);
    const [showAlert, setShowAlert] = React.useState(false);

    // Handle search functionality
    const handleSearch = (query: string) => {
        if (query.trim() === '') {
            setFilteredNotifications(notifications); // Reset to all notifications
        } else {
            const filtered = notifications.filter(
                (notification) =>
                    notification.title.toLowerCase().includes(query.toLowerCase()) ||
                    notification.content.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredNotifications(filtered);
        }
    };

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
            {/* Search Field and Bulk Delete Button */}
            <div className="absolute left-10 top-2 flex flex-row gap-8 items-center">
                <SearchField placeholder="Search notifications" onSearch={handleSearch} />
                {checkedNotifications.length > 0 && (
                    <div className="flex flex-row gap-2">
                        <div className="hover:bg-black/5 rounded-md">
                        <Delete sx={{ color: 'blue' }} onClick={handleDeleteSelected} />
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
