'use client';

import React, { useEffect, useState } from 'react';
import SearchField from '@/components/SearchField';
import { Delete } from '@mui/icons-material';
import Modal from '@/components/Modal';

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<
    { id: number; title: string; content: string; category: string; timestamp: string }[]
  >([]);
  const [filteredNotifications, setFilteredNotifications] = useState(notifications);
  const [checkedNotifications, setCheckedNotifications] = useState<number[]>([]);
  const [showDetails, setShowDetails] = useState<{ title: string; content: string } | null>(null); // Popup content
  const [showAlert, setShowAlert] = useState<string | null>(null); // Success message

  useEffect(() => {
    fetch('/data/notifications.json') // Chemin JSON
      .then((response) => response.json())
      .then((data) => {
        setNotifications(data);
        setFilteredNotifications(data);
      });
  }, []);

  // Recherche
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

  // Sélection multiple
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
    setShowAlert('Notification supprimée avec succès.');
  };

  const handleDeleteSelected = () => {
    const updatedNotifications = notifications.filter((notification) => !checkedNotifications.includes(notification.id));
    setNotifications(updatedNotifications);
    setFilteredNotifications(updatedNotifications);
    setCheckedNotifications([]);
    setShowAlert('Sélection supprimée avec succès.');
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  // Afficher les détails
  const openDetails = (notification: { title: string; content: string }) => {
    setShowDetails(notification);
  };

  const closeDetails = () => {
    setShowDetails(null);
  };

  return (
    <div className="w-[90%] max-h-screen mt-4 flex flex-col gap-4">
      {/* Barre de recherche et suppression multiple */}

      <div className="mx-auto flex flex-row w-[80%] justify-between ">
        <SearchField placeholder="Rechercher" onSearch={handleSearch} />
        {checkedNotifications.length > 0 && (
            <Delete
                onClick={handleDeleteSelected}
                className="text-red-500 hover:text-red-700 cursor-pointer"
                fontSize="large"
            />
        )}
      </div>

      {/* Alerte */}
      {showAlert && (
        <div className="absolute top-16 mb-10 left-10 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
          {showAlert}
        </div>
      )}

      {/* Liste des notifications */}
      <div className="w-11/12 h-full mx-auto mt-10 p-4 flex flex-col gap-4 overflow-auto">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition duration-300"
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
                  className="text-lg font-bold text-blue-600 cursor-pointer hover:underline"
                >
                  {notification.title}
                </h3>
                <p className="text-gray-600 text-sm">{notification.content}</p>
                <span className="text-xs text-gray-400">{notification.timestamp}</span>
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

      {showDetails && (
        <Modal onClose={closeDetails}>
          <h3 className="text-lg font-bold">{showDetails.title}</h3>
          <p className="text-gray-600 mt-2">{showDetails.content}</p>
          <button
            onClick={closeDetails}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Fermer
          </button>
        </Modal>
      )}
    </div>
  );
}
