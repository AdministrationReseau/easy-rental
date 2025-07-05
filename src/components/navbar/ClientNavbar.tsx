'use client'

import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  FaCar,
  FaHeart,
  FaBell,
  FaUser,
  FaHome,
  FaBuilding,
  FaExchangeAlt,
  FaMoneyBillWave,
  FaQuestionCircle,
  FaSignOutAlt,
  FaUserCircle
} from 'react-icons/fa';

import Navbar from './Navbar';
import {NavLink, NavAction} from "@/types/models/navbar"; // Adjusted import path

const ClientNavbar: React.FC = () => {
  const { t } = useTranslation('common');

  const links: NavLink[] = [
    {
      href: '/client/home', // Adjusted path based on typical client routes
      label: t('components.navbar.client_navbar.home'),
      icon: <FaHome />
    },
    {
      href: '/client/vehicles', // Adjusted path
      label: t('components.navbar.client_navbar.vehicles'),
      icon: <FaCar />
    },
    {
      href: '/client/agencies', // Adjusted path
      label: t('components.navbar.client_navbar.agencies'),
      icon: <FaBuilding />
    }
  ];

  const actions: NavAction[] = [
    {
      type: 'icon',
      icon: <FaHeart />,
      badge: 3, // Example badge count
      href: '/client/profile/favorites', // Adjusted path
      label: t('components.navbar.client_navbar.favorites')
    },
    {
      type: 'icon',
      icon: <FaBell />,
      badge: 2, // Example badge count
      href: '/client/profile/notifications', // Adjusted path
      label: t('components.navbar.client_navbar.notifications')
    },
    {
      type: 'dropdown',
      label: t('components.navbar.client_navbar.profile'),
      icon: <FaUser />,
      items: [
        {
          label: t('components.navbar.client_navbar.account'),
          href: '/client/profile', // Adjusted path
          icon: <FaUserCircle />
        },
        {
          label: t('components.navbar.client_navbar.rentals'),
          href: '/client/profile/bookings', // Adjusted path assuming bookings are rentals
          icon: <FaExchangeAlt />
        },
        {
          label: t('components.navbar.client_navbar.transactions'),
          href: '/client/profile/transactions', // Adjusted path
          icon: <FaMoneyBillWave />
        },
        {
          label: t('components.navbar.client_navbar.help'),
          href: '/client/profile/contact-support', // Adjusted path
          icon: <FaQuestionCircle />
        },
        {
          label: t('components.navbar.client_navbar.logout'),
          href: '/client/profile/logout', // Adjusted path for logout
          icon: <FaSignOutAlt />
        }
      ]
    }
  ];

  return (
    <Navbar
      logo={{
        href: '/client/home', // Adjusted path
        label: 'EASY-RENT',
        icon: <FaCar className="text-primary mr-2 text-2xl" />
      }}
      links={links}
      actions={actions}
      showLanguageSwitcher={true}
      showThemeSwitcher={true}
    />
  );
};

export default ClientNavbar;
