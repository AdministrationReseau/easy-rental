'use client';
import React, { useEffect, useState } from 'react';
import SearchField from '@/components/SearchField';
import { Delete } from '@mui/icons-material';
import Modal from '@/components/Modal';

type NotificationStatus = 'transaction' | 'rental' | 'maintenance' | 'reminder' | 'support' | 'promotion' | 'document';

interface Notification {
  id: number;
  title: string;
  content: string;
  category: NotificationStatus;
  timestamp: string;
  isRead: boolean;
}

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([]);
  const [checkedNotifications, setCheckedNotifications] = useState<number[]>([]);
  const [showDetails, setShowDetails] = useState<{ title: string; content: string } | null>(null);
  const [showAlert, setShowAlert] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/notifications.json')
      .then((response) => response.json())
      .then((data) => {
        setNotifications(data);
        setFilteredNotifications(data);
      })
      .catch((error) => console.error('Error loading notifications:', error));
  }, []);

  const handleSearch = (query: string) => {
    if (query.trim() === '') {
      setFilteredNotifications(notifications);
    } else {
      const filtered = notifications.filter(
        (notification) =>
          notification.title.toLowerCase().includes(query.toLowerCase()) ||
          notification.content.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredNotifications(filtered);
    }
  };

  const handleNotificationCheck = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    if (event.target.checked) {
      setCheckedNotifications((prev) => [...prev, id]);
    } else {
      setCheckedNotifications((prev) => prev.filter((notificationId) => notificationId !== id));
    }
  };

  const handleDelete = (id: number) => {
    const updatedNotifications = notifications.filter((notification) => notification.id !== id);
    setNotifications(updatedNotifications);
    setFilteredNotifications(updatedNotifications);
    setCheckedNotifications((prev) => prev.filter((notificationId) => notificationId !== id));
    setShowAlert('Notification deleted successfully.');
  };

  const handleDeleteSelected = () => {
    const updatedNotifications = notifications.filter((notification) => !checkedNotifications.includes(notification.id));
    setNotifications(updatedNotifications);
    setFilteredNotifications(updatedNotifications);
    setCheckedNotifications([]);
    setShowAlert('Selection deleted successfully.');
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const openDetails = (notification: { title: string; content: string }) => {
    setShowDetails(notification);
  };

  const closeDetails = () => {
    setShowDetails(null);
  };

  const getStatusColor = (status: NotificationStatus) => {
    switch (status) {
      case 'transaction':
        return 'border-l-8 border-green-500';
      case 'rental':
        return 'border-l-8 border-blue-500';
      case 'maintenance':
        return 'border-l-8 border-yellow-500';
      case 'reminder':
        return 'border-l-8 border-purple-500';
      case 'support':
        return 'border-l-8 border-red-500';
      case 'promotion':
        return 'border-l-8 border-indigo-500';
      case 'document':
        return 'border-l-8 border-teal-500';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-4">
      <div className="w-full max-w-4xl flex flex-col gap-4 mx-12">
        <div className="flex flex-row justify-between w-full">
          <SearchField placeholder="Search" onSearch={handleSearch} />
          {checkedNotifications.length > 0 && (
            <Delete
              onClick={handleDeleteSelected}
              className="text-red-500 hover:text-red-700 cursor-pointer"
              fontSize="large"
            />
          )}
        </div>
        {showAlert && (
          <div className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
            {showAlert}
          </div>
        )}
        <div className="w-full overflow-y-auto">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-center justify-between p-4 mb-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ${getStatusColor(notification.category)}`}
            >
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  onChange={(event) => handleNotificationCheck(event, notification.id)}
                  className="mt-2"
                />
                <div>
                  <h3
                    onClick={() => openDetails(notification)}
                    className="text-lg font-bold cursor-pointer hover:underline"
                  >
                    {notification.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{notification.content}</p>
                  <span className="text-xs text-gray-400">
                    {new Date(notification.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
              <Delete
                onClick={() => handleDelete(notification.id)}
                className="text-red-500 hover:text-red-700 cursor-pointer"
                fontSize="large"
              />
            </div>
          ))}
        </div>
      </div>
      {showDetails && (
        <Modal onClose={closeDetails}>
          <h3 className="text-lg font-bold">{showDetails.title}</h3>
          <p className="text-gray-600 mt-2">{showDetails.content}</p>
          <button
            onClick={closeDetails}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Close
          </button>
        </Modal>
      )}
    </div>
  );
}
